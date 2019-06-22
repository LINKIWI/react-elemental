import PropTypes from 'prop-types';
import React from 'react';
import Spacing from 'components/spacing';
import { colors } from 'styles/color';
import { spacing } from 'styles/spacing';

/**
 * Fixed-position notification element. This component is purely presentational; in actual usage,
 * it should be wrapped in a manager to handle logic for conditional display.
 *
 * @constructor
 */
const Toast = (props) => {
  const {
    color = colors.primaryLight,
    accent = colors.primary,
    style: overrides,
    children,
  } = props;

  const style = {
    backgroundColor: color,
    bottom: spacing.large,
    right: spacing.large,
    opacity: 0.95,
    position: 'fixed',
    ...overrides,
  };

  const accentStyle = {
    backgroundColor: accent,
    height: '100%',
    left: 0,
    opacity: 0.95,
    position: 'absolute',
    width: '2px',
  };

  return (
    <div style={style}>
      <div style={accentStyle} />

      <Spacing right left padding>
        <Spacing size="small" top bottom padding>
          {children}
        </Spacing>
      </Spacing>
    </div>
  );
};

Toast.propTypes = {
  color: PropTypes.string,
  accent: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};

Toast.defaultProps = {
  color: undefined,
  accent: undefined,
  style: {},
  children: null,
};

export default Toast;
