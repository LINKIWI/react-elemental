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

  test('Error message', () => {
    const textArea = shallow(
      <TextArea
        error="error"
      />,
    );

    expect(textArea.find(Text).length).toBe(1);
    expect(textArea.find(Text).at(0).children().text()).toBe('error');
  });

  test('Width and height are set via style', () => {
    const textArea = shallow(
      <TextArea
        style={{
          height: '10px',
          width: '20px',
        }}
      />,
    );

    expect(textArea.find('textarea').props().style.height).toBe('10px');
    expect(textArea.find('textarea').props().style.width).toBe('20px');
  });
});
