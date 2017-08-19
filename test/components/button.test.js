import React from 'react';
import { mount, shallow } from 'enzyme';
import Button from 'components/button';
import Text from 'components/text';

describe('Button', () => {
  test('Accepts proxy props', () => {
    const button = mount(
      <Button
        type="submit"
      />,
    );

    expect(button.at(0).props().type).toBe('submit');
  });

  test('Setting ref in state', () => {
    const button = mount(
      <Button />,
    );

    expect(button.state().ref).toBeTruthy();
  });

  test('Optional text props', () => {
    const buttonWithoutText = shallow(
      <Button />,
    );
    expect(buttonWithoutText.find(Text).length).toBe(0);

    const buttonWithText = shallow(
      <Button text="text" />,
    );
    expect(buttonWithText.find(Text).length).toBe(1);
    expect(buttonWithText.find(Text).props().children).toBe('text');
    expect(buttonWithText.find(Text).props().color).toBe('gray5');
  });

  test('Idle and hover background colors', () => {
    const idleColor = '#3eb8f0';
    const hoverColor = '#41c1fc';
    const button = mount(
      <Button color={idleColor} />,
    );

    expect(button.state().color).toBe(idleColor);
    expect(button.find('button').props().style.backgroundColor).toBe(idleColor);

    button.simulate('mouseenter');
    expect(button.state().color).toBe(hoverColor);
    expect(button.find('button').props().style.backgroundColor).toBe(hoverColor);

    button.simulate('mouseout');
    expect(button.state().color).toBe(idleColor);
    expect(button.find('button').props().style.backgroundColor).toBe(idleColor);
  });

  test('Idle and click/active background colors', () => {
    const idleColor = '#3eb8f0';
    const hoverColor = '#41c1fc';
    const activeColor = '#3bafe4';
    const button = mount(
      <Button color={idleColor} />,
    );

    button.simulate('mousedown');
    expect(button.state().color).toBe(activeColor);
    expect(button.find('button').props().style.backgroundColor).toBe(activeColor);

    button.simulate('mouseup');
    expect(button.state().color).toBe(hoverColor);
    expect(button.find('button').props().style.backgroundColor).toBe(hoverColor);

    button.simulate('mouseout');
    expect(button.state().color).toBe(idleColor);
    expect(button.find('button').props().style.backgroundColor).toBe(idleColor);
  });

  test('Styles for secondary button', () => {
    const color = '#3eb8f0';
    const button = shallow(
      <Button color={color} text="text" secondary />,
    );

    expect(button.find('button').props().style.backgroundColor).toBe('white');
    expect(button.find(Text).props().color).toBe(color);
  });

  test('Disabled button', () => {
    const color = '#3eb8f0';
    const button = shallow(
      <Button color={color} disabled />,
    );

    expect(button.find('button').props().style.pointerEvents).toBe('none');
  });

  test('Rendering different sizes with children', () => {
    const sizes = ['gamma', 'alpha', 'beta'];

    sizes.forEach((size) => {
      const button = shallow(
        <Button size={size}>
          children
        </Button>,
      );

      expect(button.find('button').text()).toBe('children');
    });
  });
});
