import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import Spacing from 'components/spacing';
import Text from 'components/text';
import { colors } from 'styles/color';
import { primaryFontStyle, fontCSS } from 'styles/font';
import compose from 'util/compose';
import withCSS from 'util/with-css';
import withToggleState from 'util/with-toggle-state';

/**
 * Input element for accepting user text input.
 */
class TextField extends Component {
  static propTypes = {
    // Error string, if the input contents are invalid. This will use a dedicated error style.
    error: PropTypes.string,
    // True to use the secondary component variant.
    secondary: PropTypes.bool,
    // Optional style overrides.
    style: PropTypes.object,
    // HOC props
    handleMouseOver: PropTypes.func.isRequired,
    handleMouseOut: PropTypes.func.isRequired,
    handleFocus: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    isHover: PropTypes.bool.isRequired,
    isFocus: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    error: null,
    secondary: false,
    style: {},
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
      style: overrides,
      handleMouseOver,
      handleMouseOut,
      handleFocus,
      handleBlur,
      isHover,
      isFocus,
      ...props
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
      transition: 'all 0.15s ease',
      width: '100%',
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

    return (
      <div>
        <input
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={style}
          {...props}
        />

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
  withCSS({ key: 'text', css: fontCSS }),
  withToggleState({ key: 'isHover', enable: 'handleMouseOver', disable: 'handleMouseOut' }),
  withToggleState({ key: 'isFocus', enable: 'handleFocus', disable: 'handleBlur' }),
)(TextField);
