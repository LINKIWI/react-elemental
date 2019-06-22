import { mount } from 'enzyme';
import React, { createRef } from 'react';
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
    const buttonWithoutText = mount(
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

  test('Hover style', () => {
    const button = mount(
      <Button />,
    );

    expect(button.find('button').props().style.filter).toBe('brightness(1)');
    button.simulate('mouseenter');
    expect(button.find('button').props().style.filter).toBe('brightness(1.05)');
    button.simulate('mouseleave');
    expect(button.find('button').props().style.filter).toBe('brightness(1)');
  });

  test('Active style', () => {
    const button = mount(
      <Button />,
    );

    expect(button.find('button').props().style.filter).toBe('brightness(1)');
    button.simulate('mousedown');
    expect(button.find('button').props().style.filter).toBe('brightness(0.95)');
    button.simulate('mouseup');
    expect(button.find('button').props().style.filter).toBe('brightness(1)');
  });

  test('Hover and active style', () => {
    const button = mount(
      <Button />,
    );

    expect(button.find('button').props().style.filter).toBe('brightness(1)');
    button.simulate('mouseenter');
    expect(button.find('button').props().style.filter).toBe('brightness(1.05)');
    button.simulate('mousedown');
    expect(button.find('button').props().style.filter).toBe('brightness(0.95)');
    button.simulate('mouseup');
    expect(button.find('button').props().style.filter).toBe('brightness(1.05)');
    button.simulate('mouseleave');
    expect(button.find('button').props().style.filter).toBe('brightness(1)');
  });

  test('Focus style', () => {
    const button = mount(
      <Button />,
    );

    expect(button.find('button').props().style.filter).toBe('brightness(1)');
    button.simulate('focus');
    expect(button.find('button').props().style.filter).toBe('brightness(1.05)');
    button.simulate('blur');
    expect(button.find('button').props().style.filter).toBe('brightness(1)');
  });

  test('Styles on keyboard actions', () => {
    const button = mount(
      <Button />,
    );

    expect(button.find('Button').props().isActive).toBe(false);
    button.find('button').simulate('keydown', { keyCode: 13 });
    expect(button.find('Button').props().isActive).toBe(true);
    button.find('button').simulate('keyup', { keyCode: 13 });
    expect(button.find('Button').props().isActive).toBe(false);
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

  test('Semantic type of button', () => {
    const button = mount(
      <Button>
        children
      </Button>,
    );

    expect(button.find('button').props().type).toBe('button');
    button.setProps({ type: 'submit' });
    expect(button.find('button').props().type).toBe('submit');
  });

  test('Disabled button has appropriate semantic attribute', () => {
    const button = mount(
      <Button disabled>
        children
      </Button>,
    );

    expect(button.find('button').props().disabled).toBe(true);
  });

  test('Ref forwarding to underlying button', () => {
    const ref = createRef();
    const button = mount(
      <Button ref={ref} />,
    );

    expect(button.find('button').length).toBe(1);
    expect(ref.current).toBeDefined();
  });
});
