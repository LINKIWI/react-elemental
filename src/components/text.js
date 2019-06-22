import PropTypes from 'prop-types';
import React from 'react';
import { primaryFontStyle, secondaryFontStyle } from 'styles/font';

/**
 * Text component with automatic typeface formatting.
 */
const Text = (props) => {
  const {
    secondary,
    size,
    color,
    bold,
    inline,
    uppercase,
    center,
    right,
    style: overrides,
    children,
    ...proxyProps
  } = props;

  const fontStyleFactory = secondary ? secondaryFontStyle : primaryFontStyle;
  const textAlign = (() => {
    if (center) {
      return 'center';
    }
    if (right) {
      return 'right';
    }
    return 'unset';
  })();
  const style = {
    ...fontStyleFactory(size, color, bold),
    textTransform: uppercase ? 'uppercase' : 'none',
    textAlign,
    ...overrides,
  };

  if (inline) {
    return (
      <span style={style} {...proxyProps}>
        {children}
      </span>
    );
  }

  return (
    <p style={style} {...proxyProps}>
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
  center: PropTypes.bool,
  right: PropTypes.bool,
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
  center: false,
  right: false,
  style: {},
  children: null,
};

export default Text;
