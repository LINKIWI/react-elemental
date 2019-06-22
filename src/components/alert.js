import PropTypes from 'prop-types';
import React from 'react';
import Spacing from 'components/spacing';
import Text from 'components/text';
import Clear from 'icons/clear';
import { colors } from 'styles/color';
import noop from 'util/noop';

// Mapping of alert types to their corresponding background and text colors
const typeColorMap = {
  info: {
    color: colors.blue,
    background: colors.blueLight,
  },
  success: {
    color: colors.green,
    background: colors.greenLight,
  },
  warn: {
    color: colors.yellow,
    background: colors.yellowLight,
  },
  error: {
    color: colors.red,
    background: colors.redLight,
  },
};

// Mapping of alert types to their corresponding text sizes.
const textSizeMap = {
  alpha: 'iota',
  beta: 'kilo',
};

// Mapping of alert types to their container padding values.
const paddingMap = {
  alpha: '16px 22px',
  beta: '10px 15px',
};

/**
 * Educational status alerts.
 */
const Alert = ({
  type,
  size,
  title,
  message,
  dismissible,
  style: overrides,
  onDismiss,
  ...proxyProps
}) => {
  const { color, background } = typeColorMap[type];

  const style = {
    backgroundColor: background,
    padding: paddingMap[size],
    ...overrides,
  };

  const dismissStyle = {
    background: 'inherit',
    border: 0,
    cursor: 'pointer',
    float: 'right',
  };

  const clearStyle = {
    fill: color,
    height: '16px',
  };

  return (
    <div style={style} {...proxyProps}>
      {dismissible && (
        <button onClick={onDismiss} style={dismissStyle}>
          <Clear style={clearStyle} />
        </button>
      )}

      <Text size={textSizeMap[size]} color={color} bold inline>
        {title}
      </Text>

      <Spacing size="small" left inline>
        <Text size={textSizeMap[size]} color={color} inline>
          {message}
        </Text>
      </Spacing>
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(['info', 'success', 'warn', 'error']),
  size: PropTypes.oneOf(['alpha', 'beta']),
  title: PropTypes.string.isRequired,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  dismissible: PropTypes.bool,
  style: PropTypes.object,
  onDismiss: PropTypes.func,
};

Alert.defaultProps = {
  type: 'info',
  size: 'alpha',
  dismissible: false,
  style: {},
  onDismiss: noop,
};

export default Alert;
