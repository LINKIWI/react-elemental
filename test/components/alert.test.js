import React from 'react';
import { shallow } from 'enzyme';
import { Alert, Text } from 'react-elemental';

describe('Alert', () => {
  test('Standard alert rendering', () => {
    const alert = shallow(
      <Alert
        type="info"
        title="title"
        message="message"
      />,
    );

    expect(alert.find(Text).length).toBe(2);
  });
});
