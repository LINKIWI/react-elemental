import React from 'react';
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
const TextField = ({
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
}) => {
  const hoverRed = new Color(colors.red).lighten(0.7).string();
  const primaryIdleColor = error ? colors.redLight : colors.gray10;
  const secondaryIdleColor = error ? colors.redLight : colors.primaryLight;
  const primaryHoverColor = error ? hoverRed : colors.gray20;
  const secondaryHoverColor = error ? hoverRed : new Color(colors.primary).lighten(0.4).string();
  const focusColor = error ? colors.red : colors.primary;

  const baseStyle = {
    borderRadius: 0,
    transition: 'all 0.15s ease',
    width: '100%',
    ...primaryFontStyle('kilo', colors.gray80, false),
  };

  const primaryStyle = {
    border: `1px solid ${primaryIdleColor}`,
    boxSizing: 'border-box',
    padding: '10px',
    ...isHover && {
      border: `1px solid ${primaryHoverColor}`,
    },
    ...isFocus && {
      border: `1px solid ${focusColor}`,
    },
  };

  const secondaryStyle = {
    backgroundColor: 'transparent',
    borderLeft: 'none',
    borderTop: 'none',
    borderRight: 'none',
    borderBottom: `1px solid ${secondaryIdleColor}`,
    padding: '3px 1px',
    ...isHover && {
      borderBottom: `1px solid ${secondaryHoverColor}`,
    },
    ...isFocus && {
      borderBottom: `1px solid ${focusColor}`,
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
};

TextField.propTypes = {
  error: PropTypes.string,
  secondary: PropTypes.bool,
  style: PropTypes.object,
  // HOC props
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseOut: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  isHover: PropTypes.bool.isRequired,
  isFocus: PropTypes.bool.isRequired,
};

TextField.defaultProps = {
  error: null,
  secondary: false,
  style: {},
};

export default compose(
  withCSS({ key: 'text', css: fontCSS }),
  withToggleState({ key: 'isHover', enable: 'handleMouseOver', disable: 'handleMouseOut' }),
  withToggleState({ key: 'isFocus', enable: 'handleFocus', disable: 'handleBlur' }),
)(TextField);
