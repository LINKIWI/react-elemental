import React, { Component } from 'react';
import { colors, RadioGroup, Spacing, Tag, Text } from 'react-elemental';

export default class SampleRadioGroup extends Component {
  state = {};

  handleChange = (key) => (selected) => this.setState({ [key]: selected });

  render() {
    const { text, custom } = this.state;

    return (
      <div>
        <Spacing size="huge" bottom>
          <Text size="gamma" color="primary" uppercase>
            Radio Groups
          </Text>
          <Text>
            Radio groups allow choosing a single option from a pool of multiple, static values.
          </Text>
        </Spacing>

        <Spacing size="huge" bottom>
          <Spacing bottom>
            <Text size="iota" color="gray70" uppercase bold>
              Text labels
            </Text>
          </Spacing>

          <RadioGroup
            options={[
              { value: 's', label: 'Small' },
              { value: 'm', label: 'Medium' },
              { value: 'l', label: 'Large' },
              { value: 'xl', label: 'Extra large (out of stock)', disabled: true },
            ]}
            value={text}
            onChange={this.handleChange('text')}
          />
        </Spacing>

        <Spacing size="huge" bottom>
          <Spacing bottom>
            <Text size="iota" color="gray70" uppercase bold>
              Custom styling and labels
            </Text>
          </Spacing>

          <Spacing bottom>
            <RadioGroup
              options={[
                {
                  value: 'Yes',
                  label: (
                    <Spacing size="small" left>
                      <Tag
                        text="Yes"
                        backgroundColor={colors.greenLight}
                        outlineColor={colors.green}
                      />
                    </Spacing>
                  ),
                },
                {
                  value: 'No',
                  label: (
                    <Spacing size="small" left>
                      <Tag
                        text="No"
                        backgroundColor={colors.redLight}
                        outlineColor={colors.red}
                      />
                    </Spacing>
                  ),
                },
              ]}
              value={custom}
              accentColor={colors.gray80}
              style={{ display: 'flex' }}
              radioRenderer={(option) => (
                <Spacing key={option.props.value} right>
                  {option}
                </Spacing>
              )}
              onChange={this.handleChange('custom')}
            />
          </Spacing>
        </Spacing>
      </div>
    );
  }
}
