import PropTypes from 'prop-types';
import React from 'react';
import { withToggleState } from '@linkiwi/hoc';
import { colors } from 'styles/color';
import { transitionStyle } from 'styles/transition';

/**
 * Single tab option for the primary style.
 */
const PrimaryTabOption = ({
  baseStyle,
  isHover,
  isIntermediate,
  isSelected,
  onClick,
  handleMouseEnter,
  handleMouseLeave,
  children,
}) => {
  const primaryIdleStyle = {
    backgroundColor: isHover ? 'rgba(253, 253, 253)' : 'inherit',
    border: `1px solid ${colors.gray10}`,
    ...transitionStyle('background-color'),
  };

  const primaryActiveStyle = {
    backgroundColor: colors.gray10,
  };

  const style = {
    ...baseStyle,
    ...primaryIdleStyle,
    ...isSelected && primaryActiveStyle,
    ...isIntermediate && { borderRight: 'none' },
  };

  return (
    <button
      style={style}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
};

PrimaryTabOption.propTypes = {
  // Object describing base style properties to apply to the button
  baseStyle: PropTypes.object.isRequired,
  // Boolean indicating whether the option is not the last tab option
  isIntermediate: PropTypes.bool.isRequired,
  // Boolean indicating if the option is currently selected (active)
  isSelected: PropTypes.bool.isRequired,
  // Click callback handler
  onClick: PropTypes.func.isRequired,
  // Button contents
  children: PropTypes.node.isRequired,
  // HOC props
  isHover: PropTypes.bool.isRequired,
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
};

export default withToggleState({
  key: 'isHover',
  enable: 'handleMouseEnter',
  disable: 'handleMouseLeave',
})(PrimaryTabOption);
