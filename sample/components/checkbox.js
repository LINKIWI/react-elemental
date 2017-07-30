import React from 'react';
import { Checkbox, Spacing, Text } from 'react-elemental';

const SampleCheckbox = () => (
  <div>
    <Spacing size="huge" bottom>
      <Text size="gamma" color="primary" uppercase>
        Checkbox
      </Text>
      <Text>
        Checkboxes denote opt-in choices controlled by the user.
      </Text>
    </Spacing>

    <Spacing size="huge" bottom>
      <Spacing bottom>
        <Text size="iota" color="gray70" uppercase bold>
          Generic
        </Text>
      </Spacing>

      <Spacing size="small" bottom>
        <Checkbox label="Label" />
      </Spacing>
      <Spacing size="small" bottom>
        <Checkbox label="Active" />
      </Spacing>
      <Spacing size="small" bottom>
        <Checkbox label="Enabled" isChecked />
      </Spacing>
      <Spacing size="small" bottom>
        <Checkbox label="Disabled state" disabled />
      </Spacing>
      <Spacing size="small" bottom>
        <Checkbox label="Disabled, defaulted to checked" isChecked disabled />
      </Spacing>
    </Spacing>
  </div>
);

export default SampleCheckbox;
