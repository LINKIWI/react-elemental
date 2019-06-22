import { mount } from 'enzyme';
import React from 'react';
import RadioButton from 'components/radio-group/radio-button';
import Text from 'components/text';

describe('Radio button', () => {
  const defaultProps = {
    active: false,
    accentColor: 'black',
    idleColor: 'white',
    disabled: false,
    label: 'label',
    value: 'value',
  };

  test('Rendering of text label', () => {
    const radio = mount(
      <RadioButton
        {...defaultProps}
        label="text"
      />,
    );

    expect(radio.find(Text).length).toBe(1);
    expect(radio.find(Text).text()).toBe('text');
    expect(radio.find('button').prop('aria-labelledby')).toBe('text');
  });

  test('Rendering arbitrary node as label', () => {
    const radio = mount(
      <RadioButton
        {...defaultProps}
        label={
          <a href="#">anchor</a>
        }
      />,
    );

    expect(radio.find(Text).length).toBe(0);
    expect(radio.find('a').length).toBe(1);
    expect(radio.find('button').prop('aria-labelledby')).toBe(defaultProps.value);
  });

  test('Active style', () => {
    const radio = mount(
      <RadioButton
        {...defaultProps}
        active
      />,
    );

    expect(radio.find('button').props().role).toBe('radio');
    expect(radio.find('button').prop('aria-checked')).toBe(true);
    expect(radio.find('button').childAt(0).childAt(0).props().style.backgroundColor)
      .toBe(defaultProps.accentColor);
    expect(radio.find('button').childAt(0).childAt(0).props().style.opacity).toBe(1);
  });

  test('Focused style', () => {
    const radio = mount(
      <RadioButton {...defaultProps} />,
    );

    expect(radio.find('button').childAt(0).childAt(1).props().style.opacity).toBe(0);
    radio.simulate('focus');
    expect(radio.find('button').childAt(0).childAt(1).props().style.opacity).toBe(0.15);
    radio.simulate('blur');
    expect(radio.find('button').childAt(0).childAt(1).props().style.opacity).toBe(0);
  });

  test('Hover style', () => {
    const radio = mount(
      <RadioButton {...defaultProps} />,
    );

    expect(radio.find('button').childAt(0).childAt(0).props().style.opacity).toBe(0.7);
    radio.simulate('mouseenter');
    expect(radio.find('button').childAt(0).childAt(0).props().style.opacity).toBe(1);
    radio.simulate('mouseleave');
    expect(radio.find('button').childAt(0).childAt(0).props().style.opacity).toBe(0.7);
  });

  test('Disabled style', () => {
    const radio = mount(
      <RadioButton
        {...defaultProps}
        disabled
      />,
    );

    expect(radio.find('button').props().style.cursor).toBe('inherit');
    expect(radio.find('button').childAt(0).props().style.opacity).toBe(0.5);
  });

  test('Focus when transitioning from inactive to active', () => {
    const mockFocus = jest.fn();
    const radio = mount(
      <RadioButton {...defaultProps} />,
    );

    radio.find('RadioButton').instance().button.current.focus = mockFocus;

    radio.setProps({ active: true });
    expect(radio.find('RadioButton').props().active).toBe(true);
    expect(mockFocus).toBeCalled();
  });
});
