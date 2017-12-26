import React from 'react';
import PropTypes from 'prop-types';
import Spacing from 'components/spacing';
import Text from 'components/text';
import { colors } from 'styles/color';

const noop = () => {};

/**
 * Horizontally organized segments of options.
 *
 * @constructor
 */
const Tabs = ({ options, value: selected, onChange, style: overrides, ...proxyProps }) => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    ...overrides,
  };

  const optionStyle = {
    border: `1px solid ${colors.gray10}`,
    cursor: 'pointer',
    flex: 1,
    textAlign: 'center',
    transition: 'background-color 0.15s ease',
  };

  return (
    <div style={containerStyle} {...proxyProps}>
      {options.map(({ value, label }, idx) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          style={{
            ...optionStyle,
            backgroundColor: selected === value ? colors.gray10 : 'inherit',
            ...idx < options.length - 1 && { borderRight: 'none' },
          }}
        >
          <Spacing size="tiny" top bottom padding>
            <Text color="gray60">
              {label}
            </Text>
          </Spacing>
        </button>
      ))}
    </div>
  );
};

Tabs.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
  value: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
};

Tabs.defaultProps = {
  options: [],
  value: null,
  onChange: noop,
  style: {},
};

export default Tabs;
