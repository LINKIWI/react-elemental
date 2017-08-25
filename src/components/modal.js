import React, { Component } from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';
import Close from 'react-icons/lib/md/close';
import { withWindowState } from 'react-window-state';
import Spacing from 'components/spacing';
import { colors } from 'styles/color';

const KEY_CODE_ESC = 27;

const noop = () => {};

const widthMap = {
  alpha: 900,
  beta: 600,
  gamma: 400,
};

/**
 * Container for a full-page modal dialog.
 */
class Modal extends Component {
  static propTypes = {
    size: PropTypes.oneOf(['alpha', 'beta', 'gamma']),
    dismissable: PropTypes.bool,
    onHide: PropTypes.func,
    win: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    }).isRequired,
    style: PropTypes.object,
    children: PropTypes.any,
  };

  static defaultProps = {
    size: 'beta',
    dismissable: true,
    onHide: noop,
    style: {},
    children: null,
  };

  state = {
    modal: null,
  };

  componentDidUpdate(prevProps, prevState) {
    // After the modal's ref has been set, put it into focus so that it can properly listen for
    // keyboard events.
    if (!prevState.modal && this.state.modal) {
      this.state.modal.focus();
    }
  }

  setRef = (modal) => {
    if (!this.state.modal) {
      this.setState({ modal });
    }
  };

  handleBackdropClick = ({ target }) => {
    const { onHide } = this.props;
    const { modal } = this.state;

    const func = (!modal || modal.contains(target)) ? noop : onHide;
    return func();
  };

  handleKeyDown = ({ keyCode }) => {
    const { onHide } = this.props;

    const func = (keyCode === KEY_CODE_ESC) ? onHide : noop;
    return func();
  };

  render() {
    const { size, dismissable, onHide, win, style: overrides, children } = this.props;
    const { modal } = this.state;

    const modalHeight = modal ? modal.scrollHeight : 0;
    const width = win.width < widthMap[size] ? '100%' : `${widthMap[size]}px`;
    const modalStyle = {
      backgroundColor: colors.white,
      left: '50%',
      position: 'fixed',
      top: '50%',
      transform: 'translateX(-50%) translateY(-50%)',
      width,
      zIndex: 100,
      ...(win.height < modalHeight) && {
        height: '100%',
        overflow: 'auto',
      },
      ...overrides,
    };

    const backdropStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      height: '100%',
      left: 0,
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 99,
    };

    const closeStyle = {
      color: colors.gray20,
      cursor: 'pointer',
      position: 'absolute',
      right: '24px',
      top: '24px',
      transition: '0.15s all ease',
      ':hover': {
        color: colors.gray15,
      },
      ':active': {
        color: colors.gray30,
      },
    };

    const closeIconStyle = {
      height: '32px',
      width: '32px',
    };

    return (
      <div
        style={backdropStyle}
        onClick={this.handleBackdropClick}
      >
        <div
          ref={this.setRef}
          style={modalStyle}
          onKeyDown={this.handleKeyDown}
          tabIndex={0}
        >
          <Spacing size="large" padding top right bottom left>
            {dismissable && (
              <div style={closeStyle} onClick={onHide}>
                <Close style={closeIconStyle} />
              </div>
            )}

            {children}
          </Spacing>
        </div>
      </div>
    );
  }
}

export default withWindowState(Radium(Modal));
