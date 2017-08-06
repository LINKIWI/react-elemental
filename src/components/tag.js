import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Clear from 'react-icons/lib/md/clear';
import Text from 'components/text';
import { colors } from 'styles/color';
import { spacing } from 'styles/spacing';

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
class Tag extends Component {
  static propTypes = {
    outlineColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    text: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['alpha', 'beta']),
    dismissable: PropTypes.bool,
    style: PropTypes.object,
  };

  static defaultProps = {
    outlineColor: undefined,
    backgroundColor: undefined,
    size: 'beta',
    dismissable: false,
    style: {},
  };

  state = {
    isVisible: true,
  };

  handleDismiss = () => this.setState({ isVisible: false });

  render() {
    const {
      outlineColor = colors.primary,
      backgroundColor = colors.primaryLight,
      size,
      text,
      dismissable,
      style: overrides,
    } = this.props;
    const { isVisible } = this.state;

    const style = {
      alignItems: 'center',
      backgroundColor,
      border: `1px solid ${outlineColor}`,
      display: 'inline-flex',
      padding: paddingMap[size],
      ...overrides,
    };

    const clearStyle = {
      color: colors.gray20,
      cursor: 'pointer',
      float: 'right',
      marginLeft: spacing.tiny,
    };

    if (!isVisible) {
      return null;
    }

    return (
      <div style={style}>
        <Text size={textSizeMap[size]} color={outlineColor} uppercase bold inline>
          {text}
        </Text>

        {dismissable && (
          <Clear
            width={clearSizeMap[size]}
            height={clearSizeMap[size]}
            style={clearStyle}
            onClick={this.handleDismiss}
          />
        )}
      </div>
    );
  }
}

export default Tag;
