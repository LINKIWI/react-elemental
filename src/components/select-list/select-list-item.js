import PropTypes from 'prop-types';
import React from 'react';
import { withToggleState } from '@linkiwi/hoc';
import Spacing from 'components/spacing';
import Text from 'components/text';
import { colors } from 'styles/color';
import { transitionStyle } from 'styles/transition';

/**
 * Dropdown menu in an expanded SelectList.
 */
const SelectListItem = ({
  label,
  isSelected,
  onClick,
  style: overrides,
  isHover,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  const style = {
    alignItems: 'center',
    backgroundColor: (isHover || isSelected) ? colors.primaryLight : 'white',
    border: `1px solid ${colors.gray10}`,
    boxSizing: 'border-box',
    cursor: 'pointer',
    display: 'flex',
    padding: '10px',
    ...transitionStyle(),
    ...overrides,
  };

  return (
    <div
      style={style}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Spacing size="small" padding right>
        <Text size="kilo" style={{ display: 'block' }} inline>
          {label}
        </Text>
      </Spacing>
    </div>
  );
};

SelectListItem.propTypes = {
  label: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
  // HOC props
  isHover: PropTypes.bool.isRequired,
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
};

SelectListItem.defaultProps = {
  isSelected: false,
  style: {},
};

export default withToggleState({
  key: 'isHover',
  enable: 'handleMouseEnter',
  disable: 'handleMouseLeave',
})(SelectListItem);
