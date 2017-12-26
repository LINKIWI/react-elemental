import React from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import Radium from 'radium';
import Spacing from 'components/spacing';
import Text from 'components/text';
import { colors } from 'styles/color';
import { primaryFontStyle } from 'styles/font';

/**
 * Input element for accepting user text input.
 */
const TextField = ({ error, secondary, style: overrides, ...props }) => {
  const hoverRed = new Color(colors.red).lighten(0.7).string();
  const primaryIdleColor = error ? colors.redLight : colors.gray10;
  const secondaryIdleColor = error ? colors.redLight : colors.primaryLight;
  const primaryHoverColor = error ? hoverRed : colors.gray20;
  const secondaryHoverColor = error ? hoverRed : new Color(colors.primary).lighten(0.4).string();
  const focusColor = error ? colors.red : colors.primary;

  const baseStyle = {
    transition: 'all 0.15s ease',
    width: '100%',
    ...primaryFontStyle('kilo', colors.gray80, false),
  };

  const primaryStyle = {
    border: `1px solid ${primaryIdleColor}`,
    borderRadius: 0,
    boxSizing: 'border-box',
    padding: '10px',
    ':hover': {
      border: `1px solid ${primaryHoverColor}`,
    },
    ':focus': {
      border: `1px solid ${focusColor}`,
    },
  };

  const secondaryStyle = {
    borderLeft: 'none',
    borderTop: 'none',
    borderRight: 'none',
    borderBottom: `1px solid ${secondaryIdleColor}`,
    padding: '3px 1px',
    ':hover': {
      borderBottom: `1px solid ${secondaryHoverColor}`,
    },
    ':focus': {
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
};

TextField.defaultProps = {
  error: null,
  secondary: false,
  style: {},
};

export default Radium(TextField);
