import React from 'react';
import PropTypes from 'prop-types';
import Spacing from 'components/spacing';
import Text from 'components/text';
import { colors } from 'styles/color';

/**
 * SelectList placeholder item. This is the SelectList item that is always rendered, regardless of
 * whether the dropdown is currently expanded.
 */
const SelectListPlaceholder = (props) => {
  const { label, width, arrowDirection, error, onClick } = props;

  const style = {
    backgroundColor: 'white',
    border: `1px solid ${error ? colors.red : colors.gray10}`,
    cursor: 'pointer',
    display: 'flex',
    padding: '8px 10px',
    width,
    transition: 'all 0.15s ease',
  };

  const arrowStyle = {
    alignSelf: 'center',
    marginLeft: 'auto',
    transform: `${arrowDirection === 'up' ? 'rotate(180deg)' : 'rotate(0deg)'}`,
    transition: 'all 0.2s ease',
  };

  return (
    <div
      style={style}
      onClick={onClick}
    >
      <Spacing size="small" padding right>
        <Text size="iota" inline>
          {label}
        </Text>
      </Spacing>

      <Text size="kilo" color="gray30" style={arrowStyle} inline>
        ▾
      </Text>
    </div>
  );
};

SelectListPlaceholder.propTypes = {
  label: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  arrowDirection: PropTypes.oneOf(['up', 'down']).isRequired,
  error: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

SelectListPlaceholder.defaultProps = {
  error: null,
};

export default SelectListPlaceholder;
