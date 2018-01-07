import React from 'react';
import { mount } from 'enzyme';
import Text from 'components/text';
import TextField from 'components/text-field';

describe('Text field', () => {
  test('Accepts proxy props', () => {
    const textField = mount(
      <TextField type="password" />,
    );

    expect(textField.find('input').props().type).toBe('password');
  });

  test('Error message', () => {
    const textField = mount(
      <TextField
        error="error"
      />,
    );

    expect(textField.find(Text).length).toBe(1);
    expect(textField.find(Text).at(0).children().text()).toBe('error');
  });

  test('Primary style', () => {
    const textField = mount(
      <TextField />,
    );

    expect(textField.find('input').props().style.border).toBeDefined();
  });

  test('Secondary style', () => {
    const textField = mount(
      <TextField secondary />,
    );

    expect(textField.find('input').props().style.border).toBe(undefined);
    expect(textField.find('input').props().style.borderBottom).toBeDefined();
  });

  test('Hover state', () => {
    const textField = mount(
      <TextField />,
    );

    const primaryIdleColor = textField.find('input').props().style.border;
    textField.find('input').simulate('mouseover');
    expect(textField.find('input').props().style.border).not.toEqual(primaryIdleColor);
    textField.find('input').simulate('mouseout');
    expect(textField.find('input').props().style.border).toEqual(primaryIdleColor);
  });

  test('Focus state', () => {
    const textField = mount(
      <TextField />,
    );

    const primaryIdleColor = textField.find('input').props().style.border;
    textField.find('input').simulate('focus');
    expect(textField.find('input').props().style.border).not.toEqual(primaryIdleColor);
    textField.find('input').simulate('blur');
    expect(textField.find('input').props().style.border).toEqual(primaryIdleColor);
  });
});
