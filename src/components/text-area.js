import React from 'react';
import Color from 'color';
import PropTypes from 'prop-types';
import Spacing from 'components/spacing';
import Text from 'components/text';
import { colors } from 'styles/color';
import { secondaryFontStyle, fontCSS } from 'styles/font';
import compose from 'util/compose';
import withCSS from 'util/with-css';
import withToggleState from 'util/with-toggle-state';

/**
 * Styled textarea element for blobs of text input.
 */
const TextArea = ({
  error,
  handleMouseOver,
  handleMouseOut,
  handleFocus,
  handleBlur,
  isHover,
  isFocus,
  style: overrides,
  ...proxyProps
}) => {
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
    ...isHover && {
      border: `1px solid ${hoverColor}`,
    },
    ...isFocus && {
      border: `1px solid ${focusColor}`,
    },
    ...overrides,
  };

  return (
    <div>
      <textarea
        style={style}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
  // HOC props
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseOut: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  isHover: PropTypes.bool.isRequired,
  isFocus: PropTypes.bool.isRequired,
};

TextArea.defaultProps = {
  error: null,
  style: {},
};

export default compose(
  withCSS({ key: 'text', css: fontCSS }),
  withToggleState({ key: 'isHover', enable: 'handleMouseOver', disable: 'handleMouseOut' }),
  withToggleState({ key: 'isFocus', enable: 'handleFocus', disable: 'handleBlur' }),
)(TextArea);
