import React, { Component } from 'react';
import { Checkbox, Spacing, Text } from 'react-elemental';

export default class SampleCheckbox extends Component {
  state = {
    enabled: true,
    disabledChecked: true,
  };

  handleChange = (key) => (isChecked) => this.setState({ [key]: isChecked });

  render() {
    const { label, active, enabled, disabled, disabledChecked } = this.state;

    return (
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
            <Checkbox
              label="Label"
              onChange={this.handleChange('label')}
              checked={label}
            />
          </Spacing>

          <Spacing size="small" bottom>
            <Checkbox
              label="Active"
              onChange={this.handleChange('active')}
              checked={active}
            />
          </Spacing>

          <Spacing size="small" bottom>
            <Checkbox
              label="Enabled"
              onChange={this.handleChange('enabled')}
              checked={enabled}
            />
          </Spacing>

          <Spacing size="small" bottom>
            <Checkbox
              label="Disabled state"
              onChange={this.handleChange('disabled')}
              checked={disabled}
              disabled
            />
          </Spacing>

          <Spacing size="small" bottom>
            <Checkbox
              label="Disabled, defaulted to checked"
              onChange={this.handleChange('disabledChecked')}
              checked={disabledChecked}
              disabled
            />
          </Spacing>
        </Spacing>
      </div>
    );
  }
}
