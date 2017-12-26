import React from 'react';
import { LoadingBar, Spacing, Text, colors } from 'react-elemental';

const SampleLoadingBar = () => (
  <div>
    <Spacing size="huge" bottom>
      <Text size="gamma" color="primary" uppercase>
        Loading bar
      </Text>
      <Text>
        Component to indicate indeterminate progress.
      </Text>
    </Spacing>

    <Spacing size="huge" bottom>
      <Spacing bottom>
        <Text size="iota" color="gray70" uppercase bold>
          Generic
        </Text>
      </Spacing>

      <Spacing size="small" bottom>
        <Text>
          You can pass a custom color, thickness, duration, and bounce delay.
        </Text>
      </Spacing>

      <Spacing bottom>
        <LoadingBar thickness={2} />
      </Spacing>

      <Spacing bottom>
        <LoadingBar color={colors.green} thickness={4} />
      </Spacing>

      <Spacing bottom>
        <LoadingBar color={colors.yellow} thickness={4} duration={3000} />
      </Spacing>

      <Spacing bottom>
        <LoadingBar color={colors.red} thickness={4} duration={500} delay={50} />
      </Spacing>
    </Spacing>
  </div>
);

export default SampleLoadingBar;
