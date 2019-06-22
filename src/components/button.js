import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { compose, withForwardedRef, withToggleState } from '@linkiwi/hoc';
import Text from 'components/text';
import { colors } from 'styles/color';
import { transitionStyle } from 'styles/transition';
import { KEY_CODE_ENTER } from 'util/constants';
import omit from 'util/omit';

// Mapping of button sizes to the corresponding default text size.
const textSizeMap = {
  gamma: 'lambda',
  beta: 'kilo',
  alpha: 'iota',
};

// Mapping of primary button sizes to the corresponding button padding values.
const primaryPaddingMap = {
  gamma: '6px 12px',
  beta: '10px 16px',
  alpha: '12px 22px',
};

// Mapping of secondary button sizes to the corresponding button padding values.
const secondaryPaddingMap = {
  gamma: '4px 10px',
  beta: '8px 14px',
  alpha: '10px 20px',
};

/**
 * Button component.
 */
class Button extends Component {
  static propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOf(['alpha', 'beta', 'gamma']),
    text: PropTypes.string,
    disabled: PropTypes.bool,
    secondary: PropTypes.bool,
    style: PropTypes.object,
    children: PropTypes.any,
    // HOC props
    handleMouseEnter: PropTypes.func.isRequired,
    handleMouseLeave: PropTypes.func.isRequired,
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
    color: undefined,
    size: 'beta',
    text: null,
    disabled: false,
    secondary: false,
    style: {},
    children: null,
    forwardedRef: null,
  };

  handleMouseLeave = () => {
    const { handleMouseLeave, handleMouseUp } = this.props;

    handleMouseLeave();
    handleMouseUp();
  };

  handleKeyDown = ({ keyCode }) => (keyCode === KEY_CODE_ENTER) && this.props.handleMouseDown();

  handleKeyUp = ({ keyCode }) => (keyCode === KEY_CODE_ENTER) && this.props.handleMouseUp();

  render() {
    const {
      color = colors.primary,
      size,
      text,
      disabled,
      secondary,
      style: overrides,
      children,
      handleMouseEnter,
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

    const proxyProps = omit(props, ['handleMouseLeave']);

    const brightness = (() => {
      if (isActive) {
        return 0.95;
      }

      if (isHover || isFocus) {
        return 1.05;
      }

      return 1;
    })();

    const style = {
      backgroundColor: secondary ? 'transparent' : color,
      border: secondary ? `2px solid ${color}` : 'none',
      borderRadius: 0,
      color,
      cursor: 'pointer',
      filter: `brightness(${brightness})`,
      opacity: disabled ? 0.4 : 1,
      padding: (secondary ? secondaryPaddingMap : primaryPaddingMap)[size],
      pointerEvents: disabled ? 'none' : 'inherit',
      textDecoration: 'none',
      ...transitionStyle(),
      ...overrides,
    };

    return (
      <button
        ref={forwardedRef}
        type="button"
        style={style}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        disabled={disabled}
        {...proxyProps}
      >
        {text && (
          <Text
            size={textSizeMap[size]}
            color={secondary ? color : 'gray5'}
            style={{ pointerEvents: 'none' }}
            uppercase
            bold
            inline
          >
            {text}
          </Text>
        )}

        {children}
      </button>
    );
  }
}

export default compose(
  withForwardedRef,
  withToggleState({ key: 'isHover', enable: 'handleMouseEnter', disable: 'handleMouseLeave' }),
  withToggleState({ key: 'isActive', enable: 'handleMouseDown', disable: 'handleMouseUp' }),
  withToggleState({ key: 'isFocus', enable: 'handleFocus', disable: 'handleBlur' }),
)(Button);
