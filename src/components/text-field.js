import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import Spacing from 'components/spacing';
import Text from 'components/text';
import { colors } from 'styles/color';
import { primaryFontStyle } from 'styles/font';

/**
 * Input element for accepting user text input.
 */
class TextField extends Component {
  static propTypes = {
    label: PropTypes.string,
    sublabel: PropTypes.string,
    error: PropTypes.string,
    secondary: PropTypes.bool,
    style: PropTypes.object,
  };
  static defaultProps = {
    label: null,
    sublabel: null,
    error: null,
    secondary: false,
    style: {},
  };

  render() {
    const { label, sublabel, error, secondary, style: overrides, ...props } = this.props;

    const hoverRed = '#ffbabc';
    const hoverBlue = '#a4d9f5';
    const primaryIdleColor = error ? colors.redLight : colors.gray10;
    const secondaryIdleColor = error ? colors.redLight : colors.primaryLight;
    const primaryHoverColor = error ? hoverRed : colors.gray20;
    const secondaryHoverColor = error ? hoverRed : hoverBlue;
    const focusColor = error ? colors.red : colors.primary;

    const baseStyle = {
      transition: 'all 0.15s ease',
      width: '100%',
      ...primaryFontStyle('kilo', colors.gray80, false),
    };

    const primaryStyle = {
      border: `1px solid ${primaryIdleColor}`,
      boxSizing: 'border-box',
      padding: '10px',
      ':hover': {
        border: `1px solid ${primaryHoverColor}`,
      },
      ':focus': {
        border: `1px solid ${focusColor}`,
      },
    };

    const secondaryStyle = {
      borderLeft: 'none',
      borderTop: 'none',
      borderRight: 'none',
      borderBottom: `1px solid ${secondaryIdleColor}`,
      padding: '3px 1px',
      ':hover': {
        borderBottom: `1px solid ${secondaryHoverColor}`,
      },
      ':focus': {
        borderBottom: `1px solid ${focusColor}`,
      },
    };

    const style = {
      ...baseStyle,
      ...secondary ? secondaryStyle : primaryStyle,
      ...overrides,
    };

    return (
      <div>
        {
          (label || sublabel) && (
            <Spacing size="tiny" bottom>
              {
                label && (
                  <Text size="kilo" color="gray50" uppercase bold>
                    {label}
                  </Text>
                )
              }
              {
                label && (
                  <Text size="lambda" color="gray25">
                    {sublabel}
                  </Text>
                )
              }
            </Spacing>
          )
        }

        <input
          style={style}
          {...props}
        />

        {
          error && (
            <Spacing size="micro" top>
              <Text color="red" size="lambda" bold>
                {error}
              </Text>
            </Spacing>
          )
        }
      </div>
    );
  }
}

export default Radium(TextField);
