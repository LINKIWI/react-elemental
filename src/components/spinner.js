import PropTypes from 'prop-types';
import React from 'react';
import { withCSS } from '@linkiwi/hoc';
import { colors } from 'styles/color';

const sizeMap = {
  alpha: '26px',
  beta: '18px',
  gamma: '12px',
  delta: '8px',
};

const Spinner = ({
  size,
  ringColor,
  accentColor = colors.primary,
  duration,
  thickness,
  style: overrides,
  ...proxyProps
}) => (
  <div
    style={{
      animation: `elemental-spinner ${duration}s linear infinite`,
      border: `${thickness}px solid ${ringColor}`,
      borderTop: `${thickness}px solid ${accentColor}`,
      borderRadius: '50%',
      display: 'inline-block',
      height: sizeMap[size],
      width: sizeMap[size],
      ...overrides,
    }}
    {...proxyProps}
  />
);

Spinner.propTypes = {
  size: PropTypes.oneOf(['alpha', 'beta', 'gamma', 'delta']),
  ringColor: PropTypes.string,
  accentColor: PropTypes.string,
  duration: PropTypes.number,
  thickness: PropTypes.number,
  style: PropTypes.object,
};

Spinner.defaultProps = {
  size: 'alpha',
  ringColor: colors.gray5,
  accentColor: undefined,
  duration: 0.65,
  thickness: 3,
  style: {},
};

export default withCSS({
  key: () => 'elemental:spinner',
  css: () => `
    @keyframes elemental-spinner {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }
  `,
})(Spinner);
