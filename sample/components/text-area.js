import React from 'react';
import { Label, Spacing, Text, TextArea } from 'react-elemental';

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

      <Label
        label="Text area"
        sublabel="Type some monospaced text in here."
      />
      <TextArea
        placeholder="Type away"
        style={{
          height: '100px',
          width: '600px',
        }}
      />
    </Spacing>

    <Spacing size="huge" bottom>
      <Spacing bottom>
        <Text size="iota" color="gray70" uppercase bold>
          Error state
        </Text>
      </Spacing>

      <Label label="Oh noes" />
      <TextArea
        error="Some error message here"
        placeholder="Bad text"
        style={{
          height: '100px',
          width: '600px',
        }}
      />
    </Spacing>

    <Spacing size="huge" bottom>
      <Spacing bottom>
        <Text size="iota" color="gray70" uppercase bold>
          Secondary style
        </Text>
      </Spacing>

      <Label label="Secondary variant" />
      <TextArea
        placeholder="The secondary style uses an underline border, similar to a secondary TextField"
        style={{ width: '600px' }}
        secondary
      />
    </Spacing>
  </div>
);

export default SampleTextArea;
