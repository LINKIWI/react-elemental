import React from 'react';
import { mount, shallow } from 'enzyme';
import Check from 'react-icons/lib/md/check';
import Checkbox from 'components/checkbox';
import Text from 'components/text';

describe('Checkbox', () => {
  test('Accepts proxy props', () => {
    const onClick = jest.fn();
    const checkbox = mount(
      <Checkbox
        onClick={onClick}
      />,
    );

    expect(checkbox.at(0).props().onClick).toBe(onClick);
  });

  test('Setting ref in state', () => {
    const checkbox = mount(
      <Checkbox />,
    );

    expect(checkbox.state().ref).toBeTruthy();
  });

  test('Standard rendering', () => {
    const checkbox = shallow(
      <Checkbox label="label" />,
    );

    expect(checkbox.find(Check).length).toBe(1);
    expect(checkbox.find(Text).length).toBe(1);
    expect(checkbox.find(Text).props().children).toBe('label');
  });

  test('Check and uncheck actions', () => {
    const checkbox = shallow(
      <Checkbox />,
    );

    expect(checkbox.state().isCurrentlyChecked).toBe(false);
    expect(checkbox.instance().isChecked()).toBe(false);
    checkbox.childAt(0).simulate('click');
    expect(checkbox.state().isCurrentlyChecked).toBe(true);
    expect(checkbox.instance().isChecked()).toBe(true);
    checkbox.childAt(0).simulate('click');
    expect(checkbox.state().isCurrentlyChecked).toBe(false);
    expect(checkbox.instance().isChecked()).toBe(false);
  });

  test('Keyboard actions', () => {
    const checkbox = shallow(
      <Checkbox />,
    );

    const checkContainer = checkbox.childAt(0).childAt(0);

    checkContainer.simulate('keydown', { keyCode: 32 });
    expect(checkbox.instance().isChecked()).toBe(true);
    checkContainer.simulate('keydown', { keyCode: 13 });
    expect(checkbox.instance().isChecked()).toBe(false);
    checkContainer.simulate('keydown', { keyCode: 27 });
    expect(checkbox.instance().isChecked()).toBe(false);
    checkContainer.simulate('keydown', { keyCode: 32 });
    expect(checkbox.instance().isChecked()).toBe(true);
    checkContainer.simulate('keydown', { keyCode: 27 });
    expect(checkbox.instance().isChecked()).toBe(false);
    checkContainer.simulate('keydown', { keyCode: 10 });
    expect(checkbox.instance().isChecked()).toBe(false);
  });

  test('Disabled checkbox', () => {
    const checkbox = shallow(
      <Checkbox disabled />,
    );

    expect(checkbox.instance().isChecked()).toBe(false);
    checkbox.childAt(0).simulate('click');
    expect(checkbox.instance().isChecked()).toBe(false);
    checkbox.childAt(0).childAt(0).simulate('keydown', { keyCode: 32 });
    expect(checkbox.instance().isChecked()).toBe(false);
  });

  test('Safe ref access', () => {
    const checkbox = mount(
      <Checkbox />,
    );

    const checkContainer = checkbox.childAt(0).childAt(0);

    checkContainer.simulate('mouseout');
    checkbox.setState({ ref: null });
    checkContainer.simulate('mouseout');
  });
});
