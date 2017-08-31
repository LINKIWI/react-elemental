import React, { Component } from 'react';
import { Button, Spacing, Text, Toast } from 'react-elemental';

export default class SampleToast extends Component {
  state = {
    isVisible: false,
  };

  showToast = () => {
    this.setState({ isVisible: true });
    setTimeout(() => this.setState({ isVisible: false }), 5000);
  };

  render() {
    const { isVisible } = this.state;

    return (
      <div>
        <Spacing size="huge" bottom>
          <Text size="gamma" color="primary" uppercase>
            Toasts
          </Text>
          <Text>
            Toasts are used to present temporary notification alerts.
          </Text>
        </Spacing>

        <Spacing size="huge" bottom>
          <Spacing bottom>
            <Text size="iota" color="gray70" uppercase bold>
              Generic
            </Text>
          </Spacing>

          <Spacing bottom>
            <Button
              text="Show toast for 5 seconds"
              onClick={this.showToast}
            />
          </Spacing>
        </Spacing>

        {isVisible && (
          <Toast>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
          </Toast>
        )}
      </div>
    );
  }
}
