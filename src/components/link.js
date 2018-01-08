import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'util/compose';
import withToggleState from 'util/with-toggle-state';

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
    isHover: PropTypes.bool.isRequired,
    isActive: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    type: 'regular',
    href: '#',
    activeColor: 'currentColor',
    style: {},
    children: null,
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
      type,
      activeColor,
      href,
      style: overrides,
      children,
      handleMouseOver,
      handleMouseOut,
      handleMouseDown,
      handleMouseUp,
      isHover,
      isActive,
      ...proxyProps
    } = this.props;

    const borderSize = type === 'plain' ? '0' : '2px';
    const style = {
      color: 'currentColor',
      opacity: 0.8,
      textDecoration: 'none',
      transition: '0.15s all ease',
      ...isHover && {
        borderBottom: `${borderSize} solid currentColor`,
        opacity: '1.0',
      },
      ...isHover && isActive && {
        borderBottom: `${borderSize} solid currentColor`,
        color: activeColor,
      },
      ...type === 'underline' && { borderBottom: '2px solid currentColor' },
      ...overrides,
    };

    return (
      <a
        href={href}
        style={style}
        onMouseOver={handleMouseOver}
        onMouseOut={this.handleMouseOut}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        {...proxyProps}
      >
        {children}
      </a>
    );
  }
}

export default compose(
  withToggleState({ key: 'isHover', enable: 'handleMouseOver', disable: 'handleMouseOut' }),
  withToggleState({ key: 'isActive', enable: 'handleMouseDown', disable: 'handleMouseUp' }),
)(Link);
