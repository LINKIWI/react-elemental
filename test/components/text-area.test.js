import React from 'react';
import { mount, shallow } from 'enzyme';
import Text from 'components/text';
import TextArea from 'components/text-area';

describe('Text area', () => {
  test('Accepts proxy props', () => {
    const textArea = mount(
      <TextArea rows={40} />,
    );

    expect(textArea.find('textarea').props().rows).toBe(40);
  });

  test('Label and sublabels', () => {
    const textArea = shallow(
      <TextArea
        label="label"
        sublabel="sublabel"
      />,
    );

    expect(textArea.find(Text).length).toBe(2);
    expect(textArea.find(Text).at(0).children().text()).toBe('label');
    expect(textArea.find(Text).at(1).children().text()).toBe('sublabel');
  });

  test('Error message', () => {
    const textArea = shallow(
      <TextArea
        error="error"
      />,
    );

    expect(textArea.find(Text).length).toBe(1);
    expect(textArea.find(Text).at(0).children().text()).toBe('error');
  });
});
