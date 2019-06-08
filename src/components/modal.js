import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Clear from 'icons/clear';
import { colors } from 'styles/color';
import { transitionStyle } from 'styles/transition';
import compose from 'util/compose';
import noop from 'util/noop';
import omit from 'util/omit';
import withToggleState from 'util/with-toggle-state';

const KEY_CODE_ESC = 27;

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
    persistent: PropTypes.bool,
    onHide: PropTypes.func,
    style: PropTypes.object,
    children: PropTypes.any,
    // HOC props
    handleMouseOver: PropTypes.func.isRequired,
    handleMouseOut: PropTypes.func.isRequired,
    handleMouseDown: PropTypes.func.isRequired,
    handleMouseUp: PropTypes.func.isRequired,
    isHover: PropTypes.bool.isRequired,
    isActive: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    size: 'beta',
    persistent: false,
    onHide: noop,
    style: {},
    children: null,
  };

  state = {
    modal: null,
    windowWidth: null,
    windowHeight: null,
  };

  componentDidMount() {
    window.addEventListener('resize', this.onResize);

    this.onResize();
  }

  componentDidUpdate(prevProps, prevState) {
    // After the modal's ref has been set, put it into focus so that it can properly listen for
    // keyboard events.
    if (!prevState.modal && this.state.modal) {
      this.state.modal.focus();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => this.setState({
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  });

  setRef = (modal) => {
    if (!this.state.modal) {
      this.setState({ modal });
    }
  };

  handleBackdropClick = ({ target }) => {
    const { persistent, onHide } = this.props;
    const { modal } = this.state;

    const func = (!modal || modal.contains(target) || persistent) ? noop : onHide;
    return func();
  };

  handleKeyDown = ({ keyCode }) => {
    const { persistent, onHide } = this.props;

    const func = (keyCode === KEY_CODE_ESC && !persistent) ? onHide : noop;
    return func();
  };

  handleMouseOut = () => {
    const { handleMouseOut, handleMouseUp } = this.props;

    // Also simulate a mouseup event so that the active state is properly reset if the user moves
    // the mouse outside of the container without releasing the mouse.
    handleMouseOut();
    handleMouseUp();
  };

  render() {
    const {
      size,
      persistent,
      onHide,
      style: overrides,
      children,
      handleMouseOver,
      handleMouseDown,
      handleMouseUp,
      isHover,
      isActive,
      ...props
    } = this.props;
    const { modal, windowWidth, windowHeight } = this.state;

    const proxyProps = omit(props, ['handleMouseOut']);

    if (windowWidth === null || windowHeight === null) {
      return null;
    }

    const modalHeight = modal ? modal.scrollHeight : 0;
    const width = windowWidth < widthMap[size] ? '100%' : `${widthMap[size]}px`;
    const modalStyle = {
      backgroundColor: colors.white,
      left: '50%',
      position: 'fixed',
      top: '50%',
      transform: 'translateX(-50%) translateY(-50%)',
      width,
      zIndex: 100,
      ...(windowHeight < modalHeight) && {
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
      background: 'inherit',
      border: 0,
      fill: colors.gray20,
      cursor: 'pointer',
      position: 'absolute',
      right: '24px',
      top: '24px',
      ...transitionStyle(),
      ...isHover && {
        fill: colors.gray15,
      },
      ...isActive && isHover && {
        fill: colors.gray30,
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
          {...proxyProps}
        >
          {!persistent && (
            <button
              style={closeStyle}
              onClick={onHide}
              onMouseOver={handleMouseOver}
              onMouseOut={this.handleMouseOut}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
            >
              <Clear style={closeIconStyle} />
            </button>
          )}

          {children}
        </div>
      </div>
    );
  }
}

export default compose(
  withToggleState({ key: 'isHover', enable: 'handleMouseOver', disable: 'handleMouseOut' }),
  withToggleState({ key: 'isActive', enable: 'handleMouseDown', disable: 'handleMouseUp' }),
)(Modal);
