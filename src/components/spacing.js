import React from 'react';
import PropTypes from 'prop-types';
import { marginStyle } from 'styles/spacing';

/**
 * Spacing component to add padding and margins.
 */
const Spacing = (props) => {
  const { padding, size, top, right, bottom, left, inline, style: overrides, children } = props;

  const property = padding ? 'padding' : 'margin';
  const dimensions = [
    top && 'top',
    right && 'right',
    bottom && 'bottom',
    left && 'left',
  ].filter(Boolean);
  const style = {
    ...marginStyle(property, size, dimensions),
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
    <div style={style}>
      {children}
    </div>
  );
};

Spacing.propTypes = {
  padding: PropTypes.bool,
  size: PropTypes.string,
  top: PropTypes.bool,
  right: PropTypes.bool,
  bottom: PropTypes.bool,
  left: PropTypes.bool,
  inline: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.any,
};

Spacing.defaultProps = {
  padding: false,
  size: 'default',
  top: false,
  right: false,
  bottom: false,
  left: false,
  inline: false,
  style: {},
  children: null,
};

export default Spacing;
