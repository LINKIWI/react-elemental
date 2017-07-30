import React from 'react';
import PropTypes from 'prop-types';
import { primaryFontStyle, secondaryFontStyle } from 'styles/font';

/**
 * Text component with automatic typeface formatting.
 */
const Text = (props) => {
  const { secondary, size, color, bold, inline, uppercase, style: overrides, children } = props;

  const styleFactory = secondary ? secondaryFontStyle : primaryFontStyle;
  const style = {
    ...styleFactory(size, color, bold),
    textTransform: uppercase ? 'uppercase' : 'none',
    ...overrides,
  };

  if (inline) {
    return (
      <span style={style}>
        {children}
      </span>
    );
  }

  return (
    <p style={style}>
      {children}
    </p>
  );
};

Text.propTypes = {
  secondary: PropTypes.bool,
  size: PropTypes.string,
  color: PropTypes.string,
  bold: PropTypes.bool,
  inline: PropTypes.bool,
  uppercase: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.any,
};

Text.defaultProps = {
  secondary: false,
  size: 'iota',
  color: 'gray80',
  bold: false,
  inline: false,
  uppercase: false,
  style: {},
  children: null,
};

export default Text;
