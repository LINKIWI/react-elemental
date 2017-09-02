import React from 'react';
import { mount, shallow } from 'enzyme';
import Text from 'components/text';
import TextField from 'components/text-field';

describe('Text field', () => {
  test('Accepts proxy props', () => {
    const textField = mount(
      <TextField type="password" />,
    );

    expect(textField.find('input').props().type).toBe('password');
  });

  test('Label and sublabels', () => {
    const textField = shallow(
      <TextField
        label="label"
        sublabel="sublabel"
      />,
    );

    expect(textField.find(Text).length).toBe(2);
    expect(textField.find(Text).at(0).children().text()).toBe('label');
    expect(textField.find(Text).at(1).children().text()).toBe('sublabel');
  });

  test('Error message', () => {
    const textField = shallow(
      <TextField
        error="error"
      />,
    );

    expect(textField.find(Text).length).toBe(1);
    expect(textField.find(Text).at(0).children().text()).toBe('error');
  });

  test('Primary style', () => {
    const textField = shallow(
      <TextField />,
    );

    expect(textField.find('input').props().style.border).toBeDefined();
  });

  test('Secondary style', () => {
    const textField = shallow(
      <TextField secondary />,
    );

    expect(textField.find('input').props().style.border).toBe(undefined);
    expect(textField.find('input').props().style.borderBottom).toBeDefined();
  });
});
