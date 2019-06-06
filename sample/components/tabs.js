import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spacing, Tabs, Text } from 'react-elemental';

const CustomTabOption = ({ children }) => (
  <Spacing size="tiny" top bottom padding>
    <Spacing size="small" left right padding>
      <Text size="kilo" color="gray60" uppercase bold>
        {children}
      </Text>
    </Spacing>
  </Spacing>
);

CustomTabOption.propTypes = {
  children: PropTypes.string.isRequired,
};

export default class SampleTabs extends Component {
  state = {};

  handleChange = (key) => (selected) => this.setState({ [key]: selected });

  render() {
    const { simple, complex = 'options', custom = 'can', invert = 'highlight' } = this.state;

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
              Primary
            </Text>
          </Spacing>

          <Tabs
            options={[
              { value: 'one', label: 'one' },
              { value: 'two', label: 'two' },
              { value: 'three', label: 'three' },
            ]}
            value={simple}
            onChange={this.handleChange('simple')}
          />
        </Spacing>

        <Spacing size="huge" bottom>
          <Spacing bottom>
            <Text size="iota" color="gray70" uppercase bold>
              Secondary
            </Text>
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
              secondary
            />
          </Spacing>

          <Spacing size="small" bottom>
            <Text>
              The tab options can also be condensed to fit their contents exactly, rather than
              distributing the width evenly across all options.
            </Text>
          </Spacing>

          <Spacing bottom>
            <Tabs
              options={[
                { value: 'labels', label: <CustomTabOption>Labels</CustomTabOption> },
                { value: 'can', label: <CustomTabOption>can</CustomTabOption> },
                { value: 'be', label: <CustomTabOption>be</CustomTabOption> },
                { value: 'arbitrary', label: <CustomTabOption>arbitrary</CustomTabOption> },
                { value: 'children', label: <CustomTabOption>children</CustomTabOption> },
              ]}
              value={custom}
              onChange={this.handleChange('custom')}
              secondary
              fit
            />
          </Spacing>

          <Tabs
            options={[
              { value: 'highlight', label: <CustomTabOption>Highlight</CustomTabOption> },
              { value: 'selector', label: <CustomTabOption>Selector</CustomTabOption> },
              { value: 'inverted', label: <CustomTabOption>inverted</CustomTabOption> },
            ]}
            value={invert}
            onChange={this.handleChange('invert')}
            secondary
            fit
            invert
          />
        </Spacing>
      </div>
    );
  }
}
