import React from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';

/**
 * Styled link element.
 */
export const BaseLink = ({
  type,
  activeColor,
  href,
  style: overrides,
  children,
  ...proxyProps
}) => {
  const borderSize = type === 'plain' ? '0' : '2px';
  const style = {
    color: 'currentColor',
    opacity: 0.8,
    textDecoration: 'none',
    transition: '0.15s all ease',
    ':hover': {
      borderBottom: `${borderSize} solid currentColor`,
      opacity: '1.0',
    },
    ':active': {
      borderBottom: `${borderSize} solid currentColor`,
      color: activeColor,
    },
    ...type === 'underline' && { borderBottom: '2px solid currentColor' },
    ...overrides,
  };

  return (
    <a href={href} style={style} {...proxyProps}>
      {children}
    </a>
  );
};

BaseLink.propTypes = {
  type: PropTypes.oneOf(['regular', 'plain', 'underline']),
  href: PropTypes.string,
  activeColor: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};

BaseLink.defaultProps = {
  type: 'regular',
  href: '#',
  activeColor: 'currentColor',
  style: {},
  children: null,
};

export default Radium(BaseLink);
