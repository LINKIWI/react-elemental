import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { compose, withForwardedRef, withToggleState } from '@linkiwi/hoc';
import { transitionStyle } from 'styles/transition';
import omit from 'util/omit';
import { KEY_CODE_ENTER } from 'util/constants';

/**
 * Styled link element.
 */
class Link extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['regular', 'plain', 'underline']),
    href: PropTypes.string,
    activeColor: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
    // HOC props
    handleMouseOver: PropTypes.func.isRequired,
    handleMouseOut: PropTypes.func.isRequired,
    handleMouseDown: PropTypes.func.isRequired,
    handleMouseUp: PropTypes.func.isRequired,
    handleFocus: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    isHover: PropTypes.bool.isRequired,
    isActive: PropTypes.bool.isRequired,
    isFocus: PropTypes.bool.isRequired,
    forwardedRef: PropTypes.oneOfType([
      PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
      PropTypes.func,
    ]),
  };

  static defaultProps = {
    type: 'regular',
    href: '#',
    activeColor: 'currentColor',
    style: {},
    children: null,
    forwardedRef: null,
  };

  handleMouseOut = () => {
    const { handleMouseOut, handleMouseUp, handleBlur } = this.props;

    // Also simulate a mouseup and blur event so that the active state is properly reset if the user
    // moves the mouse outside of the container without releasing the mouse.
    handleMouseOut();
    handleMouseUp();
    handleBlur();
  };

  handleKeyDown = ({ keyCode }) => (keyCode === KEY_CODE_ENTER) && this.props.handleMouseDown();

  handleKeyUp = ({ keyCode }) => (keyCode === KEY_CODE_ENTER) && this.props.handleMouseUp();

  render() {
    const {
      type,
      activeColor,
      href,
      style: overrides,
      children,
      handleMouseOver,
      handleMouseDown,
      handleMouseUp,
      handleFocus,
      handleBlur,
      isHover,
      isActive,
      isFocus,
      forwardedRef,
      ...props
    } = this.props;

    const proxyProps = omit(props, ['handleMouseOut']);

    const borderSize = type === 'plain' ? '0' : '2px';
    const style = {
      borderBottom: '0 solid currentColor',
      color: 'currentColor',
      opacity: 0.8,
      textDecoration: 'none',
      ...transitionStyle('all', 'alpha'),
      ...(isHover || isFocus) && {
        borderBottom: `${borderSize} solid currentColor`,
        opacity: '1.0',
      },
      ...isActive && {
        borderBottom: `${borderSize} solid currentColor`,
        color: activeColor,
      },
      ...type === 'underline' && {
        borderBottom: '2px solid currentColor',
      },
      ...overrides,
    };

    return (
      <a
        ref={forwardedRef}
        href={href}
        style={style}
        onMouseOver={handleMouseOver}
        onMouseOut={this.handleMouseOut}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        {...proxyProps}
      >
        {children}
      </a>
    );
  }
}

export default compose(
  withForwardedRef,
  withToggleState({ key: 'isHover', enable: 'handleMouseOver', disable: 'handleMouseOut' }),
  withToggleState({ key: 'isActive', enable: 'handleMouseDown', disable: 'handleMouseUp' }),
  withToggleState({ key: 'isFocus', enable: 'handleFocus', disable: 'handleBlur' }),
)(Link);
