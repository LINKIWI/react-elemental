import React from 'react';
import { Link, Spacing, Text, colors } from 'react-elemental';

const SampleLink = () => (
  <div>
    <Spacing size="huge" bottom>
      <Text size="gamma" color="primary" uppercase>
        Links
      </Text>
      <Text>
        Links are textual prompts for navigation events.
      </Text>
    </Spacing>

    <Spacing size="huge" bottom>
      <Spacing bottom>
        <Text size="iota" color="gray70" uppercase bold>
          Types
        </Text>
      </Spacing>

      <Spacing bottom>
        <Spacing size="micro" bottom>
          <Text size="kilo" color="gray30" uppercase bold>
            Light
          </Text>
        </Spacing>

        <div style={{ backgroundColor: colors.gray80 }}>
          <Spacing padding top right bottom left>
            <Link type="light" href="">
              Use light links against dark backgrounds
            </Link>
          </Spacing>
        </div>
      </Spacing>

      <Spacing bottom>
        <Spacing size="micro" bottom>
          <Text size="kilo" color="gray30" uppercase bold>
            Dark
          </Text>
        </Spacing>

        <Link type="dark" href="">
          Use dark links in scenarios where additional color is distracting
        </Link>
      </Spacing>

      <Spacing bottom>
        <Spacing size="micro" bottom>
          <Text size="kilo" color="gray30" uppercase bold>
            Primary
          </Text>
        </Spacing>

        <Link type="primary" href="">
          Use primary links in most scenarios
        </Link>
      </Spacing>
    </Spacing>
  </div>
);

export default SampleLink;
