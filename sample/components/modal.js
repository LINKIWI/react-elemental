import React, { Component } from 'react';
import { Button, Modal, Spacing, Text } from 'react-elemental';

const ModalContents = () => (
  <Spacing size="large" top right bottom left padding>
    <Spacing bottom>
      <Text size="delta" color="primary" bold>
        Modal title
      </Text>
      <Text size="epsilon" color="gray50">
        Some subtitle goes here
      </Text>
    </Spacing>

    <Spacing bottom>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum ex eu ante
        tempor, nec bibendum ipsum egestas. Integer feugiat id metus et vehicula. Duis in blandit
        augue. Sed eu lobortis neque. Integer iaculis leo in dolor sodales, non bibendum turpis
        iaculis. Nunc elementum maximus orci, quis sagittis ligula ullamcorper ultricies.
      </Text>
    </Spacing>

    <Text right>
      <Button text="Some button here" />
    </Text>
  </Spacing>
);

export default class SampleModal extends Component {
  state = {
    isVisible: {
      alpha: false,
      beta: false,
      gamma: false,
      persistent: false,
    },
  };

  setVisibility = (size, isVisible) => () => this.setState((prevState) => ({
    isVisible: {
      ...prevState.isVisible,
      [size]: isVisible,
    },
  }));

  render() {
    const { isVisible: { alpha, beta, gamma, persistent } } = this.state;

    return (
      <div>
        <Spacing size="huge" bottom>
          <Text size="gamma" color="primary" uppercase>
            Modals
          </Text>
          <Text>
            Modals are used to present temporarily-relevant UI elements in a overlayed dialog.
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
                Alpha
              </Text>
            </Spacing>

            {
              alpha && (
                <Modal
                  size="alpha"
                  onHide={this.setVisibility('alpha', false)}
                >
                  <ModalContents />
                </Modal>
              )
            }
            <Button
              text="Show modal"
              onClick={this.setVisibility('alpha', true)}
            />
          </Spacing>

          <Spacing bottom>
            <Spacing size="tiny" bottom>
              <Text size="kilo" color="gray30" uppercase bold>
                Beta
              </Text>
            </Spacing>

            {
              beta && (
                <Modal
                  size="beta"
                  onHide={this.setVisibility('beta', false)}
                >
                  <ModalContents />
                </Modal>
              )
            }
            <Button
              text="Show modal"
              onClick={this.setVisibility('beta', true)}
            />
          </Spacing>

          <Spacing bottom>
            <Spacing size="tiny" bottom>
              <Text size="kilo" color="gray30" uppercase bold>
                Gamma
              </Text>
            </Spacing>

            {
              gamma && (
                <Modal
                  size="gamma"
                  onHide={this.setVisibility('gamma', false)}
                >
                  <ModalContents />
                </Modal>
              )
            }
            <Button
              text="Show modal"
              onClick={this.setVisibility('gamma', true)}
            />
          </Spacing>
        </Spacing>

        <Spacing size="huge" bottom>
          <Spacing bottom>
            <Text size="iota" color="gray70" uppercase bold>
              Persistence
            </Text>
          </Spacing>

          <Spacing bottom>
            <Spacing size="tiny" bottom>
              <Text size="kilo" color="gray30" uppercase bold>
                Persistent modal
              </Text>
            </Spacing>

            {
              persistent && (
                <Modal persistent>
                  <ModalContents />
                </Modal>
              )
            }
            <Button
              text="Show modal"
              onClick={this.setVisibility('persistent', true)}
            />
          </Spacing>
        </Spacing>
      </div>
    );
  }
}
