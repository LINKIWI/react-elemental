import React from 'react';
import {
  Button,
  Label,
  SelectList,
  Spacing,
  Text,
  TextField,
} from 'react-elemental';

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
          Primary
        </Text>
      </Spacing>

      <Spacing bottom>
        <TextField placeholder="Placeholder text" />
      </Spacing>

      <Spacing bottom>
        <Label label="This is a label" />
        <TextField />
      </Spacing>

      <Spacing bottom>
        <Label
          label="This is a label"
          sublabel="This is a sublabel, usually used for providing instructions text"
        />
        <TextField />
      </Spacing>

      <Spacing bottom>
        <Label
          label="Number"
          sublabel="Enter any number"
        />
        <TextField
          value="Some invalid user input"
          error="That's not a number."
          onChange={() => {}}
        />
      </Spacing>

      <Spacing style={{ display: 'flex' }} bottom>
        <Spacing size="tiny" right inline>
          <TextField
            placeholder="Name"
            style={{
              width: '400px',
            }}
          />
        </Spacing>

        <Spacing size="tiny" right inline>
          <SelectList
            width="150px"
            options={[
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
            ]}
          />
        </Spacing>

        <Button text="Submit" />
      </Spacing>
    </Spacing>

    <Spacing size="huge" bottom>
      <Spacing bottom>
        <Text size="iota" color="gray70" uppercase bold>
          Secondary
        </Text>
      </Spacing>

      <Spacing bottom>
        <TextField placeholder="Placeholder text" secondary />
      </Spacing>

      <Spacing bottom>
        <Label label="This is a label" />
        <TextField secondary />
      </Spacing>

      <Spacing bottom>
        <Label
          label="This is a label"
          sublabel="This is a sublabel, usually used for providing instructions text"
        />
        <TextField
          secondary
        />
      </Spacing>

      <Spacing bottom>
        <Label
          label="Number"
          sublabel="Enter any number"
        />
        <TextField
          value="Some invalid user input"
          error="That's not a number."
          onChange={() => {}}
          secondary
        />
      </Spacing>
    </Spacing>
  </div>
);

export default SampleTextField;
