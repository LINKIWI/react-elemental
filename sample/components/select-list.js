import React from 'react';
import { Label, SelectList, Spacing, Text } from 'react-elemental';

const SampleSelectList = () => (
  <div>
    <Spacing size="huge" bottom>
      <Text size="gamma" color="primary" uppercase>
        Select list
      </Text>
      <Text>
        Select lists are used to allow users to choose one item from a dropdown menu of items.
      </Text>
    </Spacing>

    <Spacing size="huge" bottom>
      <Spacing bottom>
        <Text size="iota" color="gray70" uppercase bold>
          Generic
        </Text>
      </Spacing>

      <Spacing bottom>
        <SelectList
          placeholder="Placeholder"
          options={[
            { label: 'Some obnoxiously long label name', value: 'first-item' },
            { label: 'Second item', value: 'second-item' },
            { label: 'Third item', value: 'third-item' },
          ]}
        />
      </Spacing>

      <Spacing bottom>
        <Label label="Inverted" />
        <SelectList
          placeholder="Placeholder"
          options={[
            { label: 'The selection options', value: 'first-item' },
            { label: 'Expand upwards', value: 'second-item' },
            { label: 'Rather than downwards', value: 'third-item' },
          ]}
          inverted
        />
      </Spacing>

      <Spacing bottom>
        <Label
          label="Label"
          sublabel="Select an item from the dropdown"
        />
        <SelectList
          placeholder="Now with customizable width!"
          options={[
            { label: 'Some obnoxiously long label name', value: 'first-item' },
            { label: 'Second item', value: 'second-item' },
            { label: 'Third item', value: 'third-item' },
          ]}
          style={{
            width: '500px',
          }}
        />
      </Spacing>

      <Spacing bottom>
        <Label label="Scrollbar when there are a lot of options" />
        <SelectList
          height={300}
          options={[
            { label: 'Some obnoxiously long label name', value: 'first-item' },
            { label: 'Second item', value: 'second-item' },
            { label: 'Third item', value: 'third-item' },
            { label: 'Wow', value: 'wow' },
            { label: 'so', value: 'so' },
            { label: 'many', value: 'many' },
            { label: 'options', value: 'options' },
            { label: 'to', value: 'to' },
            { label: 'choose', value: 'choose' },
            { label: 'from', value: 'from' },
            { label: 'in', value: 'in' },
            { label: 'this', value: 'this' },
            { label: 'dropdown', value: 'dropdown' },
          ]}
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
        <Label
          label="Oops"
          sublabel="You, as the end user, unsurprisingly supplied bad input"
        />
        <SelectList
          placeholder="Placeholder"
          width={200}
          options={[
            { label: 'Some obnoxiously long label name', value: 'first-item' },
            { label: 'Second item', value: 'second-item' },
            { label: 'Third item', value: 'third-item' },
          ]}
          error="That's a bad selection."
        />
      </Spacing>
    </Spacing>
  </div>
);

export default SampleSelectList;
