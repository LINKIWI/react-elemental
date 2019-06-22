import PropTypes from 'prop-types';
import React from 'react';
import { withForwardedRef } from '@linkiwi/hoc';
import TextField from 'components/text-field';
import { transitionStyle } from 'styles/transition';

/**
 * Styled textarea element for blobs of text input.
 *
 * This component behaves similarly to TextField, with some minor modifications.
 */
const TextArea = ({ error, secondary, style: overrides, forwardedRef, ...proxyProps }) => {
  const style = {
    ...transitionStyle('border'),
    ...overrides,
  };

  return (
    <TextField
      ref={forwardedRef}
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
  // HOC props
  forwardedRef: PropTypes.oneOfType([
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    PropTypes.func,
  ]),
};

TextArea.defaultProps = {
  error: null,
  secondary: false,
  style: {},
  forwardedRef: null,
};

export default withForwardedRef(TextArea);
