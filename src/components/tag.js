import React from 'react';
import PropTypes from 'prop-types';
import Text from 'components/text';
import { colors } from 'styles/color';

const paddingMap = {
  alpha: '4px 14px',
  beta: '3px 10px',
};

const textSizeMap = {
  alpha: 'lambda',
  beta: '11px',
};

/**
 * Textual status indicators.
 */
const Tag = ({ outlineColor, backgroundColor, size, text, style: overrides }) => {
  const style = {
    backgroundColor,
    border: `1px solid ${outlineColor}`,
    display: 'inline-block',
    padding: paddingMap[size],
    ...overrides,
  };

  const textStyle = {
    display: 'flex',
  };

  return (
    <div style={style}>
      <Text size={textSizeMap[size]} color={outlineColor} style={textStyle} uppercase bold inline>
        {text}
      </Text>
    </div>
  );
};

Tag.propTypes = {
  outlineColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  text: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['alpha', 'beta']),
  style: PropTypes.object,
};

Tag.defaultProps = {
  outlineColor: colors.primary,
  backgroundColor: colors.primaryLight,
  size: 'beta',
  style: {},
};

export default Tag;
