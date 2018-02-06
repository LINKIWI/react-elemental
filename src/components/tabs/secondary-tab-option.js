import React from 'react';
import PropTypes from 'prop-types';
import { colors } from 'styles/color';

/**
 * Single tab option for the secondary style.
 */
const SecondaryTabOption = ({
  baseStyle,
  isSelected,
  isInvert,
  onClick,
  children,
}) => {
  const secondaryIdleStyle = {
    borderTop: '2px solid rgba(0, 0, 0, 0)',
    borderRight: 0,
    borderBottom: '2px solid rgba(0, 0, 0, 0)',
    borderLeft: 0,
    transition: 'border 0.1s ease',
  };

  const secondaryActiveStyle = {
    [isInvert ? 'borderTop' : 'borderBottom']: `2px solid ${colors.primary}`,
  };

  const style = {
    ...baseStyle,
    ...secondaryIdleStyle,
    ...isSelected && secondaryActiveStyle,
  };

  return (
    <button onClick={onClick} style={style}>
      {children}
    </button>
  );
};

SecondaryTabOption.propTypes = {
  // Object describing base style properties to apply to the button
  baseStyle: PropTypes.object.isRequired,
  // Boolean indicating if the option is currently selected (active)
  isSelected: PropTypes.bool.isRequired,
  // Boolean indciating whether the active highlight style is inverted
  isInvert: PropTypes.bool.isRequired,
  // Click callback handler
  onClick: PropTypes.func.isRequired,
  // Button contents
  children: PropTypes.node.isRequired,
};

export default SecondaryTabOption;
