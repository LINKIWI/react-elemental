import { mount } from 'enzyme';
import React, { createRef } from 'react';
import Checkbox from 'components/checkbox';
import Text from 'components/text';
import Check from 'icons/check';
import { colors } from 'styles/color';

describe('Checkbox', () => {
  test('Accepts proxy props', () => {
    const onClick = jest.fn();
    const checkbox = mount(
      <Checkbox
        onClick={onClick}
      />,
    );

    expect(checkbox.find('button').props().onClick).toBe(onClick);
  });

  test('Standard rendering', () => {
    const checkbox = mount(
      <Checkbox label="label" />,
    );

    expect(checkbox.find(Check).length).toBe(1);
    expect(checkbox.find(Text).length).toBe(1);
    expect(checkbox.find(Text).props().children).toBe('label');
  });

  test('Rendering of checked checkbox', () => {
    const checkbox = mount(
      <Checkbox />,
    );

    expect(checkbox.find(Check).props().style.opacity).toBe(0);
  });

  test('Rendering of hovered checkbox', () => {
    const checkbox = mount(
      <Checkbox />,
    );

    checkbox.find('button').simulate('mouseenter');

    expect(checkbox.find('button').childAt(0).props().style.border)
      .toBe(`1px solid ${colors.gray20}`);
  });

  test('Rendering of focused checkbox', () => {
    const checkbox = mount(
      <Checkbox />,
    );

    checkbox.find('button').simulate('focus');

    expect(checkbox.find('button').childAt(0).props().style.border)
      .toBe(`1px solid ${colors.gray20}`);
  });

  test('Rendering of disabled checkbox', () => {
    const onChange = jest.fn();
    const checkbox = mount(
      <Checkbox onChange={onChange} disabled />,
    );

    expect(checkbox.find('button').props().style.cursor).toBe('inherit');
    checkbox.find('button').simulate('click');
    expect(onChange.mock.calls.length).toBe(0);
  });

  test('Check change callback for unchecked checkbox', () => {
    const onChange = jest.fn();
    const checkbox = mount(
      <Checkbox onChange={onChange} />,
    );

    expect(onChange.mock.calls.length).toBe(0);
    checkbox.at(0).simulate('click');
    expect(onChange).toBeCalledWith(true);
  });

  test('Uncheck change callback for checked checkbox', () => {
    const onChange = jest.fn();
    const checkbox = mount(
      <Checkbox onChange={onChange} checked />,
    );

    expect(onChange.mock.calls.length).toBe(0);
    checkbox.at(0).simulate('click');
    expect(onChange).toBeCalledWith(false);
  });

  test('Disabled checkbox', () => {
    const onChange = jest.fn();
    const checkbox = mount(
      <Checkbox onChange={onChange} disabled />,
    );

    expect(onChange.mock.calls.length).toBe(0);
    checkbox.at(0).simulate('click');
    expect(onChange.mock.calls.length).toBe(0);
  });

  test('Ref forwarding to underlying button', () => {
    const ref = createRef();
    const checkbox = mount(
      <Checkbox ref={ref} />,
    );

    expect(checkbox.find('button').length).toBe(1);
    expect(ref.current).toBeDefined();
  });
});
