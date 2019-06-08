import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'components/text-field';
import { transitionStyle } from 'styles/transition';

/**
 * Styled textarea element for blobs of text input.
 *
 * This component behaves similarly to TextField, with some minor modifications.
 */
const TextArea = ({ error, secondary, style: overrides, ...proxyProps }) => {
  const style = {
    ...transitionStyle('border'),
    ...overrides,
  };

  return (
    <TextField
      error={error}
      secondary={secondary}
      style={style}
      {...proxyProps}
      textarea
    />
  );
};

TextArea.propTypes = {
  // Error string, if the input contents are invalid. This will use a dedicated error style.
  error: PropTypes.string,
  // True to use the secondary component variant.
  secondary: PropTypes.bool,
  // Optional style overrides.
  style: PropTypes.object,
};

TextArea.defaultProps = {
  error: null,
  secondary: false,
  style: {},
};

export default TextArea;
