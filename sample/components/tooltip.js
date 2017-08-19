import React from 'react';
import { Spacing, Spinner, Text, Tooltip, colors } from 'react-elemental';

const SampleTooltip = () => (
  <div>
    <Spacing size="huge" bottom>
      <Text size="gamma" color="primary" uppercase>
        Tooltips
      </Text>
      <Text>
        Tooltips are used to provide contextual information on specific elements for purposes of
        user education.
      </Text>
    </Spacing>

    <Spacing size="huge" bottom>
      <Spacing bottom>
        <Text size="iota" color="gray70" uppercase bold>
          Customizations
        </Text>
      </Spacing>

      <Spacing bottom>
        <Spacing size="micro" bottom>
          <Text size="kilo" color="gray30" uppercase bold>
            Top
          </Text>
        </Spacing>

        <Tooltip
          contents={
            <Text color="gray10" size="kilo" center>
              Tooltip contents
            </Text>
          }
        >
          <Text>
            Hover over me
          </Text>
        </Tooltip>
      </Spacing>

      <Spacing bottom>
        <Spacing size="micro" bottom>
          <Text size="kilo" color="gray30" uppercase bold>
            Bottom
          </Text>
        </Spacing>

        <Tooltip
          contents={
            <Text color="gray10" size="kilo" center>
              Tooltip contents
            </Text>
          }
          bottom
        >
          <Text>
            Hover over me
          </Text>
        </Tooltip>
      </Spacing>

      <Spacing bottom>
        <Spacing size="micro" bottom>
          <Text size="kilo" color="gray30" uppercase bold>
            Custom width
          </Text>
        </Spacing>

        <Tooltip
          contents={
            <Text color="gray10" size="kilo" center>
              Some really long tooltip contents
            </Text>
          }
          width="300px"
        >
          <Text>
            Hover over me
          </Text>
        </Tooltip>
      </Spacing>

      <Spacing bottom>
        <Spacing size="micro" bottom>
          <Text size="kilo" color="gray30" uppercase bold>
            Horizontal offset
          </Text>
        </Spacing>

        <Tooltip
          contents={
            <Text color="gray10" size="kilo" center>
              Tooltip contents
            </Text>
          }
          offset={-40}
        >
          <Text>
            Hover over me
          </Text>
        </Tooltip>
      </Spacing>

      <Spacing bottom>
        <Spacing size="micro" bottom>
          <Text size="kilo" color="gray30" uppercase bold>
            Arbitrary tooltip contents
          </Text>
        </Spacing>

        <Tooltip
          contents={
            <Spacing>
              <Spacing inline right>
                <Text size="epsilon" bold inline>
                  Status
                </Text>
              </Spacing>

              <Spacing inline>
                <Spinner color={colors.green} />
              </Spacing>

              <Text color="gray60" size="kilo">
                Live application status via websocket
              </Text>
            </Spacing>
          }
          style={{ backgroundColor: colors.gray5 }}
          width={150}
          bottom
        >
          <Text>
            Hover over me
          </Text>
        </Tooltip>
      </Spacing>
    </Spacing>
  </div>
);

export default SampleTooltip;
