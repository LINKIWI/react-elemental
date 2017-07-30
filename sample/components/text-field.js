import React from 'react';
import { Spacing, Text, TextField } from 'react-elemental';

const SampleTextField = () => (
  <div>
    <Spacing size="huge" bottom>
      <Text size="gamma" color="primary" uppercase>
        Text fields
      </Text>
      <Text>
        Text fields are used for accepting user text input.
      </Text>
    </Spacing>

    <Spacing size="huge" bottom>
      <Spacing bottom>
        <Text size="iota" color="gray70" uppercase bold>
          Generic
        </Text>
      </Spacing>

      <Spacing bottom>
        <TextField placeholder="Placeholder text" />
      </Spacing>

      <Spacing bottom>
        <TextField label="This is a label" />
      </Spacing>

      <Spacing bottom>
        <TextField
          label="This is a label"
          sublabel="This is a sublabel, usually used for providing instructions text"
        />
      </Spacing>
    </Spacing>

    <Spacing size="huge" bottom>
      <Spacing bottom>
        <Text size="iota" color="gray70" uppercase bold>
          Error state
        </Text>
      </Spacing>

      <Spacing bottom>
        <TextField
          label="Number"
          sublabel="Enter any number"
          value="Some invalid user input"
          error="That's not a number."
        />
      </Spacing>
    </Spacing>
  </div>
);

export default SampleTextField;
