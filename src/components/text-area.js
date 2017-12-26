import React from 'react';
import Color from 'color';
import Radium from 'radium';
import PropTypes from 'prop-types';
import Spacing from 'components/spacing';
import Text from 'components/text';
import { colors } from 'styles/color';
import { secondaryFontStyle } from 'styles/font';

/**
 * Styled textarea element for blobs of text input.
 */
const TextArea = ({ error, style: overrides, ...proxyProps }) => {
  const hoverRed = new Color(colors.red).lighten(0.7).string();
  const idleColor = error ? colors.redLight : colors.gray10;
  const hoverColor = error ? hoverRed : colors.gray20;
  const focusColor = error ? colors.red : colors.primary;

  const style = {
    border: `1px solid ${idleColor}`,
    borderRadius: 0,
    boxSizing: 'border-box',
    padding: '10px',
    transition: 'border 0.15s ease',
    ...secondaryFontStyle('kilo', 'gray80', false),
    ':hover': {
      border: `1px solid ${hoverColor}`,
    },
    ':focus': {
      border: `1px solid ${focusColor}`,
    },
    ...overrides,
  };

  return (
    <div>
      <textarea
        style={style}
        {...proxyProps}
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
};

TextArea.propTypes = {
  error: PropTypes.string,
  style: PropTypes.object,
};

TextArea.defaultProps = {
  error: null,
  style: {},
};

export default Radium(TextArea);
