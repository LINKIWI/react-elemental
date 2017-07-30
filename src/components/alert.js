import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Clear from 'react-icons/lib/md/clear';
import Spacing from 'components/spacing';
import Text from 'components/text';
import { colors } from 'styles/color';

// Mapping of alert types to their corresponding background and text colors
const typeColorMap = {
  info: {
    color: colors.blue,
    background: colors.blueLight,
  },
  success: {
    color: colors.green,
    background: colors.greenLight,
  },
  warn: {
    color: colors.yellow,
    background: colors.yellowLight,
  },
  error: {
    color: colors.red,
    background: colors.redLight,
  },
};

// Mapping of alert types to their corresponding text sizes.
const textSizeMap = {
  alpha: 'iota',
  beta: 'kilo',
};

// Mapping of alert types to their container padding values.
const paddingMap = {
  alpha: '16px 22px',
  beta: '10px 15px',
};

/**
 * Educational status alerts.
 */
class Alert extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['info', 'success', 'warn', 'error']),
    size: PropTypes.oneOf(['alpha', 'beta']),
    title: PropTypes.string.isRequired,
    message: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]).isRequired,
    dismissable: PropTypes.bool,
    style: PropTypes.object,
  };

  static defaultProps = {
    type: 'info',
    size: 'alpha',
    dismissable: false,
    style: {},
  };

  state = {
    isVisible: true,
  };

  handleDismiss = () => this.setState({ isVisible: false });

  render() {
    const { type, size, title, message, dismissable, style: overrides } = this.props;
    const { isVisible } = this.state;
    const { color, background } = typeColorMap[type];

    const style = {
      backgroundColor: background,
      padding: paddingMap[size],
      ...overrides,
    };

    const clearStyle = {
      cursor: 'pointer',
      float: 'right',
    };

    if (!isVisible) {
      return null;
    }

    return (
      <Spacing size="large" style={style} bottom>
        {
          dismissable && (
            <Text color="gray15" style={clearStyle} onClick={this.handleDismiss} inline>
              <Clear />
            </Text>
          )
        }

        <Text size={textSizeMap[size]} color={color} bold inline>
          {title}
        </Text>

        <Spacing size="small" left inline>
          <Text size={textSizeMap[size]} color={color} inline>
            {message}
          </Text>
        </Spacing>
      </Spacing>
    );
  }
}

export default Alert;
