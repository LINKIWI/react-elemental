import React from 'react';
import { Spacing, Spinner, Text, colors } from 'react-elemental';

const SampleSpinner = () => (
  <div>
    <Spacing size="huge" bottom>
      <Text size="gamma" color="primary" uppercase>
        Spinners
      </Text>
      <Text>
        Spinners indicate indeterminate progress when there is no clearly defined container in the
        interface.
      </Text>
    </Spacing>

    <Spacing size="huge" bottom>
      <Spacing bottom>
        <Text size="iota" color="gray70" uppercase bold>
          Sizes
        </Text>
      </Spacing>

      <Spacing bottom>
        <Spacing size="tiny" bottom>
          <Text size="kilo" color="gray30" uppercase bold>
            Alpha
          </Text>
        </Spacing>

        <Spinner size="alpha" />
      </Spacing>

      <Spacing bottom>
        <Spacing size="tiny" bottom>
          <Text size="kilo" color="gray30" uppercase bold>
            Beta
          </Text>
        </Spacing>

        <Spinner size="beta" />
      </Spacing>

      <Spacing bottom>
        <Spacing size="tiny" bottom>
          <Text size="kilo" color="gray30" uppercase bold>
            Gamma
          </Text>
        </Spacing>

        <Spinner size="gamma" />
      </Spacing>

      <Spacing bottom>
        <Spacing size="tiny" bottom>
          <Text size="kilo" color="gray30" uppercase bold>
            Delta
          </Text>
        </Spacing>

        <Spinner size="delta" />
      </Spacing>
    </Spacing>

    <Spacing size="huge" bottom>
      <Spacing bottom>
        <Text size="iota" color="gray70" uppercase bold>
          Customizable colors
        </Text>
      </Spacing>

      <Spacing size="small" bottom>
        <Spacing size="small" right inline>
          <Spinner size="delta" accentColor={colors.green} />
        </Spacing>
        <Text color="gray50" size="kilo" uppercase bold inline>
          Succeeding
        </Text>
      </Spacing>

      <Spacing size="small" bottom>
        <Spacing size="small" right inline>
          <Spinner size="delta" accentColor={colors.red} />
        </Spacing>
        <Text color="gray50" size="kilo" uppercase bold inline>
          Erroring
        </Text>
      </Spacing>

      <Spacing size="small" bottom>
        <Spacing size="small" right inline>
          <Spinner size="delta" accentColor={colors.orange} />
        </Spacing>
        <Text color="gray50" size="kilo" uppercase bold inline>
          Why not orange?
        </Text>
      </Spacing>
    </Spacing>

    <Spacing size="huge" bottom>
      <Spacing bottom>
        <Text size="iota" color="gray70" uppercase bold>
          Customizable thickness and duration
        </Text>
      </Spacing>

      <Spacing size="small" bottom>
        <Spacing size="small" right inline>
          <Spinner size="delta" thickness={1} />
        </Spacing>
        <Text color="gray50" size="kilo" uppercase bold inline>
          Thin spinner
        </Text>
      </Spacing>

      <Spacing size="small" bottom>
        <Spacing size="small" right inline>
          <Spinner size="alpha" thickness={5} />
        </Spacing>
        <Text color="gray50" size="kilo" uppercase bold inline>
          Thick spinner
        </Text>
      </Spacing>

      <Spacing size="small" bottom>
        <Spacing size="small" right inline>
          <Spinner size="delta" duration={1.2} />
        </Spacing>
        <Text color="gray50" size="kilo" uppercase bold inline>
          Slow spinner
        </Text>
      </Spacing>
    </Spacing>
  </div>
);

export default SampleSpinner;
