import Color from 'color';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { compose, withForwardedRef, withToggleState } from '@linkiwi/hoc';
import Spacing from 'components/spacing';
import Text from 'components/text';
import { colors } from 'styles/color';
import { primaryFontStyle } from 'styles/font';
import { transitionStyle } from 'styles/transition';

/**
 * Input element for accepting user text input.
 */
class TextField extends Component {
  static propTypes = {
    // Error string, if the input contents are invalid. This will use a dedicated error style.
    error: PropTypes.string,
    // True to use the secondary component variant.
    secondary: PropTypes.bool,
    // [INTERNAL] True to render a textarea element rather than an input element.
    textarea: PropTypes.bool,
    // Optional style overrides.
    style: PropTypes.object,
    // HOC props
    handleMouseOver: PropTypes.func.isRequired,
    handleMouseOut: PropTypes.func.isRequired,
    handleFocus: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    isHover: PropTypes.bool.isRequired,
    isFocus: PropTypes.bool.isRequired,
    forwardedRef: PropTypes.oneOfType([
      PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
      PropTypes.func,
    ]),
  };

  static defaultProps = {
    error: null,
    secondary: false,
    textarea: false,
    style: {},
    forwardedRef: null,
  };

  constructor(props) {
    super(props);

    this.errorColors = {
      idle: new Color(colors.red).fade(0.85).string(),
      hover: new Color(colors.red).fade(0.7).string(),
      focus: colors.red,
    };

    this.primaryColors = {
      idle: colors.gray10,
      hover: colors.gray20,
      focus: colors.primary,
    };

    this.secondaryColors = {
      idle: new Color(colors.primary).fade(0.8).string(),
      hover: new Color(colors.primary).fade(0.6).string(),
      focus: colors.primary,
    };
  }

  render() {
    const {
      error,
      secondary,
      textarea,
      style: overrides,
      handleMouseOver,
      handleMouseOut,
      handleFocus,
      handleBlur,
      isHover,
      isFocus,
      forwardedRef,
      ...proxyProps
    } = this.props;

    const colorSet = (() => {
      // Error colors take precedent and are identical for both primary and secondary styles.
      if (error) {
        return this.errorColors;
      }

      if (secondary) {
        return this.secondaryColors;
      }

      return this.primaryColors;
    })();

    const baseStyle = {
      borderRadius: 0,
      boxSizing: 'border-box',
      width: '100%',
      ...transitionStyle(),
      ...primaryFontStyle('kilo', colors.gray80, false),
    };

    const primaryStyle = {
      border: `1px solid ${colorSet.idle}`,
      padding: '10px',
      ...isHover && {
        border: `1px solid ${colorSet.hover}`,
      },
      ...isFocus && {
        border: `1px solid ${colorSet.focus}`,
      },
    };

    const secondaryStyle = {
      backgroundColor: 'transparent',
      borderLeft: 'none',
      borderTop: 'none',
      borderRight: 'none',
      borderBottom: `1px solid ${colorSet.idle}`,
      padding: '3px 1px',
      ...isHover && {
        borderBottom: `1px solid ${colorSet.hover}`,
      },
      ...isFocus && {
        borderBottom: `1px solid ${colorSet.focus}`,
      },
    };

    const style = {
      ...baseStyle,
      ...secondary ? secondaryStyle : primaryStyle,
      ...overrides,
    };

    // The styles and properties for TextArea and TextField are exactly identical sans the rendered
    // HTML element.
    const elementProps = {
      ref: forwardedRef,
      onMouseOver: handleMouseOver,
      onMouseOut: handleMouseOut,
      onFocus: handleFocus,
      onBlur: handleBlur,
      style,
      ...proxyProps,
    };

    return (
      <div>
        {textarea ? (
          <textarea {...elementProps} />
        ) : (
          <input {...elementProps} />
        )}

        {error && (
          <Spacing size="micro" top>
            <Text color="red" size="lambda" bold>
              {error}
            </Text>
          </Spacing>
        )}
      </div>
    );
  }
}

export default compose(
  withForwardedRef,
  withToggleState({ key: 'isHover', enable: 'handleMouseOver', disable: 'handleMouseOut' }),
  withToggleState({ key: 'isFocus', enable: 'handleFocus', disable: 'handleBlur' }),
)(TextField);
