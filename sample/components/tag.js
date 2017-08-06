import React from 'react';
import { Spacing, Tag, Text, colors } from 'react-elemental';

const SampleTag = () => (
  <div>
    <Spacing size="huge" bottom>
      <Text size="gamma" color="primary" uppercase>
        Tags
      </Text>
      <Text>
        Tags serve as simple, textual status indicators.
      </Text>
    </Spacing>

    <Spacing size="huge" bottom>
      <Spacing bottom>
        <Text size="iota" color="gray70" uppercase bold>
          Sizes
        </Text>
      </Spacing>

      <Spacing bottom>
        <Spacing size="micro" bottom>
          <Text size="kilo" color="gray30" uppercase bold>
            Beta
          </Text>
        </Spacing>

        <Spacing size="tiny" right inline>
          <Tag size="beta" text="Elasticsearch" />
        </Spacing>
        <Spacing size="tiny" right inline>
          <Tag size="beta" text="Node" />
        </Spacing>
        <Spacing size="tiny" right inline>
          <Tag size="beta" text="React" />
        </Spacing>
      </Spacing>

      <Spacing bottom>
        <Spacing size="micro" bottom>
          <Text size="kilo" color="gray30" uppercase bold>
            Alpha
          </Text>
        </Spacing>

        <Spacing size="tiny" right inline>
          <Tag size="alpha" text="Hello world" />
        </Spacing>
        <Spacing size="tiny" right inline>
          <Tag size="alpha" text="Lots of tags here" />
        </Spacing>
      </Spacing>
    </Spacing>

    <Spacing size="huge" bottom>
      <Spacing bottom>
        <Text size="iota" color="gray70" uppercase bold>
          Customizable colors
        </Text>
      </Spacing>

      <Spacing size="tiny" right inline>
        <Tag
          text="Request errored"
          outlineColor={colors.red}
          backgroundColor={colors.redLight}
        />
      </Spacing>
      <Spacing size="tiny" right inline>
        <Tag
          text="Approved"
          outlineColor={colors.green}
          backgroundColor={colors.greenLight}
        />
      </Spacing>
      <Spacing size="tiny" right inline>
        <Tag
          text="Warning"
          outlineColor={colors.yellow}
          backgroundColor={colors.yellowLight}
        />
      </Spacing>
    </Spacing>

    <Spacing size="huge" bottom>
      <Spacing bottom>
        <Text size="iota" color="gray70" uppercase bold>
          Dismissable tags
        </Text>
      </Spacing>

      <Spacing size="small" bottom>
        <Text>
          You can optionally specify that the tag is dismissable. When the user clicks the clear
          icon, the tag will be permanently hidden.
        </Text>
      </Spacing>

      <Spacing size="tiny" right inline>
        <Tag text="Dismiss me" dismissable />
      </Spacing>
      <Spacing size="tiny" right inline>
        <Tag
          text="Dismiss me again"
          outlineColor={colors.green}
          backgroundColor={colors.greenLight}
          dismissable
        />
      </Spacing>
    </Spacing>
  </div>
);

export default SampleTag;
