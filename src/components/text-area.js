import React, { Component } from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';
import Spacing from 'components/spacing';
import Text from 'components/text';
import { colors } from 'styles/color';
import { secondaryFontStyle } from 'styles/font';

/**
 * Styled textarea element for blobs of text input.
 */
class TextArea extends Component {
  static propTypes = {
    error: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    error: null,
    style: {},
  };

  render() {
    const { error, style: overrides, ...props } = this.props;

    const style = {
      border: `1px solid ${error ? colors.redLight : colors.gray10}`,
      borderRadius: 0,
      boxSizing: 'border-box',
      padding: '6px 6px',
      transition: 'border 0.15s ease',
      ...secondaryFontStyle('kilo', 'gray80', false),
      ':focus': {
        border: `1px solid ${error ? colors.red : colors.primary}`,
      },
      ...overrides,
    };

    return (
      <div>
        <textarea
          style={style}
          {...props}
        />

        {error && (
          <Spacing size="micro" top>
            <Text color="red" size="lambda" bold>
              {error}
            </Text>
          </Spacing>
        )}
      </div>
    );
  }
}

export default Radium(TextArea);
