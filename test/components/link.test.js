import { mount } from 'enzyme';
import React, { createRef } from 'react';
import Link from 'components/link';

describe('Link', () => {
  test('Standard rendering', () => {
    const link = mount(
      <Link href="href">
        link
      </Link>,
    );

    expect(link.find('a').length).toBe(1);
    expect(link.find('a').props().href).toBe('href');
    expect(link.find('a').text()).toBe('link');
  });

  test('Regular type', () => {
    const link = mount(
      <Link activeColor="black">
        link
      </Link>,
    );

    expect(link.find('a').props().style.borderBottom).toBe('0 solid currentColor');
    expect(link.find('a').props().style.color).toBe('currentColor');
    link.find('a').simulate('mouseover');
    expect(link.find('a').props().style.borderBottom).toBe('2px solid currentColor');
    link.find('a').simulate('mousedown');
    expect(link.find('a').props().style.borderBottom).toBe('2px solid currentColor');
    expect(link.find('a').props().style.color).toBe('black');
    link.find('a').simulate('mouseup');
    expect(link.find('a').props().style.color).toBe('currentColor');
    link.find('a').simulate('mouseout');
    expect(link.find('a').props().style.borderBottom).toBe('0 solid currentColor');
  });

  test('Plain type', () => {
    const link = mount(
      <Link type="plain" activeColor="black">
        link
      </Link>,
    );

    expect(link.find('a').props().style.borderBottom).toBe('0 solid currentColor');
    expect(link.find('a').props().style.color).toBe('currentColor');
    link.find('a').simulate('mouseover');
    expect(link.find('a').props().style.borderBottom).toBe('0 solid currentColor');
    link.find('a').simulate('mousedown');
    expect(link.find('a').props().style.borderBottom).toBe('0 solid currentColor');
    expect(link.find('a').props().style.color).toBe('black');
    link.find('a').simulate('mouseup');
    expect(link.find('a').props().style.color).toBe('currentColor');
  });

  test('Underline type', () => {
    const link = mount(
      <Link type="underline" activeColor="black">
        link
      </Link>,
    );

    expect(link.find('a').props().style.borderBottom).toBe('2px solid currentColor');
    expect(link.find('a').props().style.color).toBe('currentColor');
    link.find('a').simulate('mouseover');
    expect(link.find('a').props().style.borderBottom).toBe('2px solid currentColor');
    link.find('a').simulate('mousedown');
    expect(link.find('a').props().style.borderBottom).toBe('2px solid currentColor');
    expect(link.find('a').props().style.color).toBe('black');
    link.find('a').simulate('mouseup');
    expect(link.find('a').props().style.color).toBe('currentColor');
  });

  test('Focus style', () => {
    const link = mount(
      <Link activeColor="black">
        link
      </Link>,
    );

    expect(link.find('Link').props().isFocus).toBe(false);
    link.find('a').simulate('focus');
    expect(link.find('Link').props().isFocus).toBe(true);
    link.find('a').simulate('blur');
    expect(link.find('Link').props().isFocus).toBe(false);
  });

  test('Styles on keyboard actions', () => {
    const link = mount(
      <Link activeColor="black">
        link
      </Link>,
    );

    expect(link.find('Link').props().isActive).toBe(false);
    link.find('a').simulate('keydown', { keyCode: 13 });
    expect(link.find('Link').props().isActive).toBe(true);
    link.find('a').simulate('keyup', { keyCode: 13 });
    expect(link.find('Link').props().isActive).toBe(false);
  });

  test('Props proxy', () => {
    const mockOnClick = jest.fn();
    const link = mount(
      <Link href="href" onClick={mockOnClick} />,
    );

    link.simulate('click');
    expect(mockOnClick).toBeCalled();
  });

  test('Ref forwarding to underlying anchor', () => {
    const ref = createRef();
    const checkbox = mount(
      <Link ref={ref} />,
    );

    expect(checkbox.find('a').length).toBe(1);
    expect(ref.current).toBeDefined();
  });
});
