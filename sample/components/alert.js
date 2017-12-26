import React from 'react';
import { Alert, Spacing, Text } from 'react-elemental';

const SampleAlert = () => (
  <div>
    <Spacing size="huge" bottom>
      <Text size="gamma" color="primary" uppercase>
        Alerts
      </Text>
      <Text>
        Alerts are used to educate the user about the current state of the application.
      </Text>
    </Spacing>

    <Spacing size="huge" bottom>
      <Spacing bottom>
        <Text size="iota" color="gray70" uppercase bold>
          Types
        </Text>
      </Spacing>

      <Spacing bottom>
        <Spacing size="tiny" bottom>
          <Text size="kilo" color="gray30" uppercase bold>
            Info
          </Text>
        </Spacing>

        <Alert
          type="info"
          title="Info Alert"
          message="This is a generic informational alert. It should be used for neutral messaging."
        />
      </Spacing>

      <Spacing bottom>
        <Spacing size="tiny" bottom>
          <Text size="kilo" color="gray30" uppercase bold>
            Success
          </Text>
        </Spacing>

        <Alert
          type="success"
          title="Success!"
          message="Inform the user that an action has been completed successfully."
        />
      </Spacing>

      <Spacing bottom>
        <Spacing size="tiny" bottom>
          <Text size="kilo" color="gray30" uppercase bold>
            Warn
          </Text>
        </Spacing>

        <Alert
          type="warn"
          title="Be careful!"
          message="Warn the user about something."
        />
      </Spacing>

      <Spacing bottom>
        <Spacing size="tiny" bottom>
          <Text size="kilo" color="gray30" uppercase bold>
            Error
          </Text>
        </Spacing>

        <Alert
          type="error"
          title="There was an error."
          message={
            'Inform the user that his or her action resulted in an error, and convey appropriate ' +
            'action items that can be taken to resolve the situation.'
          }
        />
      </Spacing>
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

        <Alert
          type="success"
          size="alpha"
          title="Alpha size"
          message={
            'This is the larger of two available alert sizes. It should be used for global ' +
            'alerts that are relevant to the entire page.'
          }
        />
      </Spacing>

      <Spacing bottom>
        <Spacing size="tiny" bottom>
          <Text size="kilo" color="gray30" uppercase bold>
            Beta
          </Text>
        </Spacing>

        <Alert
          type="success"
          size="beta"
          title="Beta size"
          message={
            'This is the smaller of two available alert sizes. It should be used when the alert ' +
            'is relevant only to a single component.'
          }
        />
      </Spacing>
    </Spacing>

    <Spacing size="huge" bottom>
      <Spacing bottom>
        <Text size="iota" color="gray70" uppercase bold>
          Dismissible alerts
        </Text>
      </Spacing>

      <Spacing size="small" bottom>
        <Text>
          You can optionally specify that the alert is dismissible. When the user clicks the clear
          icon, the alert will be permanently hidden.
        </Text>
      </Spacing>

      <Alert
        type="warn"
        size="alpha"
        title="Dismiss me"
        message="Click the clear icon toward the right"
        dismissible
      />
    </Spacing>
  </div>
);

export default SampleAlert;
