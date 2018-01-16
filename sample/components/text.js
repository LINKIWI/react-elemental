import React from 'react';
import PropTypes from 'prop-types';
import { Spacing, Text, sizes } from 'react-elemental';

const Sizes = ({ secondary = false }) => (
  <div>
    {
      Object.keys(sizes).map((size) => (
        <Spacing key={size} bottom>
          <Spacing size="micro" bottom>
            <Text size="kilo" color="gray30" uppercase bold>
              {size}
            </Text>
          </Spacing>

          <Text size={size} secondary={secondary}>
            The quick brown fox jumps over the lazy dog.
          </Text>
        </Spacing>
      ))
    }
  </div>
);

Sizes.propTypes = {
  secondary: PropTypes.bool.isRequired,
};

const SampleText = () => (
  <div>
    <Spacing size="huge" bottom>
      <Text size="gamma" color="primary" uppercase>
        Typography
      </Text>
      <Text>
        The Elemental typeface is Karla (primary), and Source Code Pro (secondary). There are
        eight standard sizes.
      </Text>
    </Spacing>

    <Spacing size="huge" bottom>
      <Spacing bottom>
        <Text size="iota" color="gray70" uppercase bold>
          Primary typeface
        </Text>
      </Spacing>

      <Sizes secondary={false} />
    </Spacing>

    <Spacing size="huge" bottom>
      <Spacing bottom>
        <Text size="iota" color="gray70" uppercase bold>
          Secondary typeface
        </Text>
      </Spacing>

      <Sizes secondary />
    </Spacing>

    <Spacing size="huge" bottom>
      <Spacing bottom>
        <Text size="iota" color="gray70" uppercase bold>
          Styles
        </Text>
      </Spacing>

      <Text bold>
        Primary boldface
      </Text>
      <Text>
        Primary regular
      </Text>
      <Text secondary bold>
        Secondary boldface
      </Text>
      <Text secondary>
        Secondary regular
      </Text>
    </Spacing>
  </div>
);

export default SampleText;
