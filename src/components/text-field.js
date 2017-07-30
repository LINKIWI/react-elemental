import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import Spacing from 'components/spacing';
import Text from 'components/text';
import { colors } from 'styles/color';
import { primaryFontStyle } from '../styles/font';

/**
 * Input element for accepting user text input.
 */
class TextField extends Component {
  static propTypes = {
    label: PropTypes.string,
    sublabel: PropTypes.string,
    error: PropTypes.string,
    style: PropTypes.object,
  };
  static defaultProps = {
    label: null,
    sublabel: null,
    error: null,
    style: {},
  };

  render() {
    const { label, sublabel, error, style: overrides, ...props } = this.props;

    const idleColor = error ? colors.redLight : colors.primaryLight;
    const focusColor = error ? colors.red : colors.primary;

    const style = {
      borderLeft: 'none',
      borderTop: 'none',
      borderRight: 'none',
      borderBottom: `1px solid ${idleColor}`,
      opacity: 0.7,
      padding: '3px 1px',
      transition: 'all 0.15s ease',
      width: '100%',
      ...primaryFontStyle('kilo', error ? colors.red : 'gray80', false),
      ':hover': {
        opacity: 0.9,
      },
      ':focus': {
        opacity: 1,
        borderBottom: `1px solid ${focusColor}`,
      },
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
