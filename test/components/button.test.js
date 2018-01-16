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

  test('Optional text props', () => {
    const buttonWithoutText = shallow(
      <Button />,
    );
    expect(buttonWithoutText.find(Text).length).toBe(0);

    const buttonWithText = mount(
      <Button text="text" />,
    );
    expect(buttonWithText.find(Text).length).toBe(1);
    expect(buttonWithText.find(Text).props().children).toBe('text');
    expect(buttonWithText.find(Text).props().color).toBe('gray5');
  });

  test('Idle and hover background colors', () => {
    const idleColor = '#3eb8f0';
    const button = shallow(
      <Button color={idleColor} />,
    ).find('Button').dive();

    expect(button.state().buttonState).toBe('idle');
    expect(button.find('button').props().style.backgroundColor).toBe(idleColor);

    button.simulate('mouseenter');
    expect(button.state().buttonState).toBe('hover');
    expect(button.find('button').props().style.backgroundColor).not.toBe(idleColor);

    button.simulate('mouseout');
    expect(button.state().buttonState).toBe('idle');
    expect(button.find('button').props().style.backgroundColor).toBe(idleColor);
  });

  test('Idle and click/active background colors', () => {
    const idleColor = '#3eb8f0';
    const button = shallow(
      <Button color={idleColor} />,
    ).find('Button').dive();

    button.simulate('mousedown');
    expect(button.state().buttonState).toBe('active');
    expect(button.find('button').props().style.backgroundColor).not.toBe(idleColor);

    button.simulate('mouseup');
    expect(button.state().buttonState).toBe('hover');
    expect(button.find('button').props().style.backgroundColor).not.toBe(idleColor);

    button.simulate('mouseout');
    expect(button.state().buttonState).toBe('idle');
    expect(button.find('button').props().style.backgroundColor).toBe(idleColor);
  });

  test('Styles for secondary button', () => {
    const color = '#3eb8f0';
    const button = mount(
      <Button color={color} text="text" secondary />,
    );

    expect(button.find('button').props().style.backgroundColor).toBe('transparent');
    expect(button.find(Text).props().color).toBe(color);
  });

  test('Disabled button', () => {
    const color = '#3eb8f0';
    const button = mount(
      <Button color={color} disabled />,
    );

    expect(button.find('button').props().style.pointerEvents).toBe('none');
  });

  test('Rendering different sizes with children', () => {
    const sizes = ['gamma', 'alpha', 'beta'];

    sizes.forEach((size) => {
      const button = mount(
        <Button size={size}>
          children
        </Button>,
      );

      expect(button.find('button').text()).toBe('children');
    });
  });

  test('Color props change', () => {
    const initialColor = '#3eb8f0';
    const nextColor = '#d32f2f';
    const button = mount(
      <Button color={initialColor} size="alpha">
        children
      </Button>,
    );

    button.setProps({ color: nextColor });
    expect(button.find('button').props().style.backgroundColor).toBe(nextColor);
    // Unrelated props change should not affect color
    button.setProps({ size: 'beta' });
    expect(button.find('button').props().style.backgroundColor).toBe(nextColor);
  });

  test('Appropriately reduced padding for secondary style', () => {
    const button = mount(
      <Button size="beta" secondary>
        children
      </Button>,
    );

    expect(button.find('button').props().style.padding).toBe('8px 14px');
  });
});
