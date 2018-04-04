import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { colors, RadioGroup, Spacing, Tag, Text } from 'react-elemental';

const CustomRadioLabel = ({ text }) => (
  <Spacing size="small" left>
    <Tag
      text={text}
      backgroundColor={colors.gray5}
      outlineColor={colors.gray40}
    />
  </Spacing>
);

CustomRadioLabel.propTypes = {
  text: PropTypes.string.isRequired,
};

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
                { value: 'hello', label: <CustomRadioLabel text="hello" /> },
                { value: 'world', label: <CustomRadioLabel text="world" /> },
              ]}
              value={custom}
              accentColor={colors.green}
              idleColor={colors.greenLight}
              onChange={this.handleChange('custom')}
            />
          </Spacing>
        </Spacing>
      </div>
    );
  }
}
