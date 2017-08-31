import React, { Component } from 'react';
import { Button, Spacing, Text, colors } from 'react-elemental';

export default class SampleButton extends Component {
  state = {
    buttonColor: colors.orange,
  };

  componentDidMount() {
    setInterval(this.toggleColor, 2000);
  }

  toggleColor = () => this.setState(({ buttonColor }) => ({
    buttonColor: buttonColor === colors.orange ? colors.green : colors.orange,
  }));

  render() {
    const { buttonColor } = this.state;

    return (
      <div>
        <Spacing size="huge" bottom>
          <Text size="gamma" color="primary" uppercase>
            Buttons
          </Text>
          <Text>
            Buttons convey user actionability.
          </Text>
        </Spacing>

        <Spacing size="huge" bottom>
          <Spacing bottom>
            <Text size="iota" color="gray70" uppercase bold>
              Sizes
            </Text>
          </Spacing>

          <Spacing bottom>
            <Spacing size="tiny" bottom>
              <Text size="kilo" color="gray30" uppercase bold>
                Gamma
              </Text>
            </Spacing>

            <Button
              size="gamma"
              text="Click me"
            />
          </Spacing>

          <Spacing bottom>
            <Spacing size="tiny" bottom>
              <Text size="kilo" color="gray30" uppercase bold>
                Beta
              </Text>
            </Spacing>

            <Button
              size="beta"
              text="Click me"
            />
          </Spacing>

          <Spacing bottom>
            <Spacing size="tiny" bottom>
              <Text size="kilo" color="gray30" uppercase bold>
                Alpha
              </Text>
            </Spacing>

            <Button
              size="alpha"
              text="Click me"
            />
          </Spacing>
        </Spacing>

        <Spacing size="huge" bottom>
          <Spacing bottom>
            <Text size="iota" color="gray70" uppercase bold>
              Customizability
            </Text>
          </Spacing>

          <Spacing size="small" bottom>
            <Text>
              You can pass a custom color and arbitrary children.
            </Text>
          </Spacing>

          <Spacing size="small" bottom>
            <Button
              color={colors.purple}
              text="Purple button!"
            />
          </Spacing>

          <Spacing size="small" bottom>
            <Button
              color={buttonColor}
              text="Color changing button"
            />
          </Spacing>

          <Button color={colors.greenLight}>
            <Text bold inline>
              hello
            </Text>
            <Text inline>
              world
            </Text>
          </Button>
        </Spacing>

        <Spacing size="huge" bottom>
          <Spacing bottom>
            <Text size="iota" color="gray70" uppercase bold>
              Disabled state
            </Text>
          </Spacing>

          <Button
            text="I'm a disabled button"
            disabled
          />
        </Spacing>

        <Spacing size="huge" bottom>
          <Spacing bottom>
            <Text size="iota" color="gray70" uppercase bold>
              Secondary style
            </Text>
          </Spacing>

          <Spacing size="small" bottom>
            <Button text="Secondary" secondary />
          </Spacing>
          <Button color={colors.green} text="Colors!" secondary />
        </Spacing>
      </div>
    );
  }
}
