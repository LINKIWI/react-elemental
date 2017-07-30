import React from 'react';
import { Spacing, Text, TextArea } from 'react-elemental';

const SampleTextArea = () => (
  <div>
    <Spacing size="huge" bottom>
      <Text size="gamma" color="primary" uppercase>
        Text areas
      </Text>
      <Text>
        Allow the user to enter an arbitrary-length text blob.
      </Text>
    </Spacing>

    <Spacing size="huge" bottom>
      <Spacing bottom>
        <Text size="iota" color="gray70" uppercase bold>
          Generic
        </Text>
      </Spacing>

      <TextArea
        label="Text area"
        sublabel="Type some monospaced text in here."
        placeholder="Type away"
        height={100}
        width={600}
      />
    </Spacing>

    <Spacing size="huge" bottom>
      <Spacing bottom>
        <Text size="iota" color="gray70" uppercase bold>
          Error state
        </Text>
      </Spacing>

      <TextArea
        label="Oh noes"
        error="Some error message here"
        value="Bad text"
        height={100}
        width={600}
      />
    </Spacing>
  </div>
);

export default SampleTextArea;
