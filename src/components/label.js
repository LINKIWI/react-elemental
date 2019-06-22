import PropTypes from 'prop-types';
import React from 'react';
import Spacing from 'components/spacing';
import Text from 'components/text';

/**
 * Text label accompanying an input field.
 *
 * @constructor
 */
const Label = ({ label, sublabel, ...proxyProps }) => (
  <Spacing size="tiny" bottom {...proxyProps}>
    {label && (
      <Text size="kilo" color="gray50" uppercase bold>
        {label}
      </Text>
    )}

    {sublabel && (
      <Text size="lambda" color="gray25">
        {sublabel}
      </Text>
    )}
  </Spacing>
);

Label.propTypes = {
  label: PropTypes.string,
  sublabel: PropTypes.string,
};

Label.defaultProps = {
  label: null,
  sublabel: null,
};

export default Label;
