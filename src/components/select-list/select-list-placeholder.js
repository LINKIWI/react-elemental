import PropTypes from 'prop-types';
import React from 'react';
import Spacing from 'components/spacing';
import Text from 'components/text';
import { colors } from 'styles/color';
import { transitionStyle } from 'styles/transition';

/**
 * SelectList placeholder item. This is the SelectList item that is always rendered, regardless of
 * whether the dropdown is currently expanded.
 */
const SelectListPlaceholder = (props) => {
  const {
    label,
    color,
    arrowDirection,
    onClick,
    onHoverStateChange,
  } = props;

  const style = {
    alignItems: 'center',
    backgroundColor: 'white',
    border: `1px solid ${color}`,
    boxSizing: 'border-box',
    cursor: 'pointer',
    display: 'flex',
    padding: '10px',
    ...transitionStyle(),
  };

  const arrowStyle = {
    alignSelf: 'center',
    marginLeft: 'auto',
    transform: `${arrowDirection === 'up' ? 'rotate(180deg)' : 'rotate(0deg)'}`,
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    MsUserSelect: 'none',
    ...transitionStyle(),
  };

  return (
    <div
      style={style}
      onClick={onClick}
      onMouseEnter={onHoverStateChange(true)}
      onMouseLeave={onHoverStateChange(false)}
    >
      <Spacing size="small" padding right>
        <Text size="kilo" style={{ display: 'block' }} inline>
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
  color: PropTypes.string,
  arrowDirection: PropTypes.oneOf(['up', 'down']).isRequired,
  onClick: PropTypes.func.isRequired,
  onHoverStateChange: PropTypes.func.isRequired,
};

SelectListPlaceholder.defaultProps = {
  color: colors.gray10,
};

export default SelectListPlaceholder;
