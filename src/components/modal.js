import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { colors } from 'styles/color';
import noop from 'util/noop';
import omit from 'util/omit';

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

  render() {
    const {
      size,
      style: overrides,
      children,
      ...props
    } = this.props;
    const { modal, windowWidth, windowHeight } = this.state;

    const proxyProps = omit(props, ['persistent', 'onHide', 'handleMouseOut']);

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
          {children}
        </div>
      </div>
    );
  }
}

export default Modal;
