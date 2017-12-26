import React from 'react';
import PropTypes from 'prop-types';
import Clear from 'react-icons/lib/md/clear';
import Text from 'components/text';
import { colors } from 'styles/color';
import { spacing } from 'styles/spacing';
import noop from 'util/noop';

const paddingMap = {
  alpha: '4px 10px',
  beta: '3px 8px',
};

const textSizeMap = {
  alpha: 'lambda',
  beta: '11px',
};

const clearSizeMap = {
  alpha: '14px',
  beta: '12px',
};

/**
 * Textual status indicators.
 */
const Tag = ({
  outlineColor = colors.primary,
  backgroundColor = colors.primaryLight,
  size,
  text,
  dismissible,
  onDismiss,
  style: overrides,
  ...proxyProps
}) => {
  const style = {
    alignItems: 'center',
    backgroundColor,
    border: `1px solid ${outlineColor}`,
    display: 'inline-flex',
    padding: paddingMap[size],
    ...overrides,
  };

  const clearStyle = {
    color: outlineColor,
    cursor: 'pointer',
    float: 'right',
    marginLeft: spacing.tiny,
  };

  return (
    <div style={style} {...proxyProps}>
      <Text size={textSizeMap[size]} color={outlineColor} uppercase bold inline>
        {text}
      </Text>

      {dismissible && (
        <Clear
          width={clearSizeMap[size]}
          height={clearSizeMap[size]}
          style={clearStyle}
          onClick={onDismiss}
        />
      )}
    </div>
  );
};

Tag.propTypes = {
  outlineColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  text: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['alpha', 'beta']),
  dismissible: PropTypes.bool,
  onDismiss: PropTypes.func,
  style: PropTypes.object,
};

Tag.defaultProps = {
  outlineColor: undefined,
  backgroundColor: undefined,
  size: 'beta',
  dismissible: false,
  onDismiss: noop,
  style: {},
};

export default Tag;
