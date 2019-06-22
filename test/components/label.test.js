import { shallow } from 'enzyme';
import React from 'react';
import Label from 'components/label';
import Text from 'components/text';

describe('Label', () => {
  test('Only renders main label', () => {
    const label = shallow(
      <Label label="label" />,
    );

    expect(label.find(Text).length).toBe(1);
  });

  test('Only renders sublabel', () => {
    const label = shallow(
      <Label sublabel="label" />,
    );

    expect(label.find(Text).length).toBe(1);
  });

  test('Renders both label and sublabel', () => {
    const label = shallow(
      <Label label="label" sublabel="sublabel" />,
    );

    expect(label.find(Text).length).toBe(2);
  });
});
