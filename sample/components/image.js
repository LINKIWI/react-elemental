import React from 'react';
import { Image, Spacing, Text } from 'react-elemental';

const SampleImage = () => (
  <div>
    <Spacing size="huge" bottom>
      <Text size="gamma" color="primary" uppercase>
        Image
      </Text>
      <Text>
        Wrapper around standard external images
      </Text>
    </Spacing>

    <Spacing size="huge" bottom>
      <Spacing bottom>
        <Text size="iota" color="gray70" uppercase bold>
          Standard
        </Text>
      </Spacing>

      <Image
        src="/images/image/map.jpg"
        alt="Map of Great Britain"
        color="#b9ad97"
        width="400px"
        height="642px"
      />
    </Spacing>

    <Spacing size="huge" bottom>
      <Spacing bottom>
        <Text size="iota" color="gray70" uppercase bold>
          Intermediate
        </Text>
      </Spacing>

      <Spacing size="small" bottom>
        <Text>
          You can optionally choose to show the intermediate, in-progress image before it has
          completely finished fetching. This works nicely for progressive JPEGs.
        </Text>
      </Spacing>

      <Image
        src="/images/image/path.jpg"
        alt="Multi-drone GPS path"
        color="#080808"
        width="600px"
        height="313px"
        showIntermediate
        lazy
      />
    </Spacing>
  </div>
);

export default SampleImage;
