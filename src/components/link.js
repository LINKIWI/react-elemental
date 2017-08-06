import React from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';
import { colors } from 'styles/color';
import { primaryFontStyle } from 'styles/font';

const textColorMap = {
  light: colors.gray10,
  dark: colors.gray80,
  primary: colors.primary,
};

const activeColorMap = {
  light: colors.gray10,
  dark: colors.gray80,
  primary: colors.gray80,
};

/**
 * Styled link element.
 *
 * @constructor
 */
const Link = ({ type, href, style: overrides, children, ...proxyProps }) => {
  const style = {
    color: colors.primary,
    opacity: 0.8,
    textDecoration: 'none',
    transition: '0.15s all ease',
    ':hover': {
      borderBottom: `2px solid ${colors.primary}`,
      opacity: '1.0',
    },
    ':active': {
      borderBottom: `2px solid ${activeColorMap[type]}`,
      color: activeColorMap[type],
    },
    ...primaryFontStyle('iota', textColorMap[type], false),
    ...overrides,
  };

  return (
    <a href={href} style={style} {...proxyProps}>
      {children}
    </a>
  );
};

Link.propTypes = {
  type: PropTypes.oneOf(['light', 'dark', 'primary']),
  href: PropTypes.string.isRequired,
  style: PropTypes.object,
  children: PropTypes.any,
};

Link.defaultProps = {
  type: 'primary',
  style: {},
  children: null,
};

export default Radium(Link);
