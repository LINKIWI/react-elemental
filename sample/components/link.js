import React from 'react';
import { Link, Spacing, Text, colors } from 'react-elemental';

const onClick = (evt) => evt.preventDefault();

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
            Regular
          </Text>
        </Spacing>

        <Text color={colors.primary}>
          <Link href="" activeColor={colors.black} onClick={onClick}>
            Links will inherit whatever color is used in the parent Text element.
          </Link>
        </Text>
      </Spacing>

      <Spacing bottom>
        <Spacing size="micro" bottom>
          <Text size="kilo" color="gray30" uppercase bold>
            Plain
          </Text>
        </Spacing>

        <Text color={colors.primary}>
          <Link type="plain" href="" activeColor={colors.black} onClick={onClick}>
            Use plain links to disable the underline on hover
          </Link>
        </Text>
      </Spacing>

      <Spacing bottom>
        <Spacing size="micro" bottom>
          <Text size="kilo" color="gray30" uppercase bold>
            Underline
          </Text>
        </Spacing>

        <Text color={colors.primary}>
          <Link type="underline" href="" activeColor={colors.black} onClick={onClick}>
            Use underline links to always show the underline
          </Link>
        </Text>
      </Spacing>
    </Spacing>
  </div>
);

export default SampleLink;
