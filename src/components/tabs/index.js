import PropTypes from 'prop-types';
import React from 'react';
import Spacing from 'components/spacing';
import Text from 'components/text';
import PrimaryTabOption from 'components/tabs/primary-tab-option';
import SecondaryTabOption from 'components/tabs/secondary-tab-option';
import noop from 'util/noop';

/**
 * Horizontally organized segments of options.
 */
const Tabs = ({
  options,
  value: selected,
  secondary,
  fit,
  invert,
  onChange,
  style: overrides,
  ...proxyProps
}) => {
  const containerStyle = {
    alignItems: 'end',
    display: 'flex',
    justifyContent: fit ? 'inherit' : 'space-around',
    ...overrides,
  };

  const buttonIdleStyle = {
    backgroundColor: 'inherit',
    borderRadius: 0,
    cursor: 'pointer',
    textAlign: 'center',
    width: '100%',
  };

  const TabOption = secondary ? SecondaryTabOption : PrimaryTabOption;

  return (
    <div style={containerStyle} {...proxyProps}>
      {options.map(({ value, label }, idx) => (
        <div key={value} style={fit ? {} : { flex: 1 }}>
          <TabOption
            baseStyle={buttonIdleStyle}
            isIntermediate={idx < options.length - 1}
            isSelected={selected === value}
            isInvert={invert}
            onClick={() => onChange(value)}
          >
            {typeof label === 'string' ? (
              <Spacing size="tiny" top bottom padding>
                <Text color="gray60">
                  {label}
                </Text>
              </Spacing>
            ) : label}
          </TabOption>
        </div>
      ))}
    </div>
  );
};

Tabs.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]).isRequired,
  })),
  value: PropTypes.string,
  secondary: PropTypes.bool,
  fit: PropTypes.bool,
  invert: PropTypes.bool,
  onChange: PropTypes.func,
  style: PropTypes.object,
};

Tabs.defaultProps = {
  options: [],
  value: null,
  secondary: false,
  fit: false,
  invert: false,
  onChange: noop,
  style: {},
};

export default Tabs;
