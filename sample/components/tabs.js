import React, { Component } from 'react';
import { Spacing, Tabs, Text } from 'react-elemental';

export default class SampleTabs extends Component {
  state = {};

  handleChange = (key) => (selected) => this.setState({ [key]: selected });

  render() {
    const { simple, complex = 'options' } = this.state;

    return (
      <div>
        <Spacing size="huge" bottom>
          <Text size="gamma" color="primary" uppercase>
            Tabs
          </Text>
          <Text>
            Tabs allow visual segmentation of categories within the same semantic hierarchy.
          </Text>
        </Spacing>

        <Spacing size="huge" bottom>
          <Spacing bottom>
            <Text size="iota" color="gray70" uppercase bold>
              Generic
            </Text>
          </Spacing>

          <Spacing bottom>
            <Tabs
              options={[
                { value: 'one', label: 'one' },
                { value: 'two', label: 'two' },
              ]}
              value={simple}
              onChange={this.handleChange('simple')}
            />
          </Spacing>

          <Spacing bottom>
            <Tabs
              options={[
                { value: 'lots', label: 'lots' },
                { value: 'of', label: 'of' },
                { value: 'options', label: 'options' },
                { value: 'to', label: 'to' },
                { value: 'choose', label: 'choose' },
                { value: 'from', label: 'from' },
                { value: 'here', label: 'here' },
              ]}
              value={complex}
              onChange={this.handleChange('complex')}
            />
          </Spacing>
        </Spacing>
      </div>
    );
  }
}

