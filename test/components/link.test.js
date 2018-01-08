import React from 'react';
import { mount } from 'enzyme';
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

    expect(link.find('a').props().style.borderBottom).toBeUndefined();
    expect(link.find('a').props().style.color).toBe('currentColor');
    link.find('a').simulate('mouseover');
    expect(link.find('a').props().style.borderBottom).toBe('2px solid currentColor');
    link.find('a').simulate('mousedown');
    expect(link.find('a').props().style.borderBottom).toBe('2px solid currentColor');
    expect(link.find('a').props().style.color).toBe('black');
    link.find('a').simulate('mouseup');
    expect(link.find('a').props().style.color).toBe('currentColor');
    link.find('a').simulate('mouseout');
    expect(link.find('a').props().style.borderBottom).toBeUndefined();
  });

  test('Plain type', () => {
    const link = mount(
      <Link type="plain" activeColor="black">
        link
      </Link>,
    );

    expect(link.find('a').props().style.borderBottom).toBeUndefined();
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

  test('Props proxy', () => {
    const mockOnClick = jest.fn();
    const link = mount(
      <Link href="href" onClick={mockOnClick} />,
    );

    link.simulate('click');
    expect(mockOnClick).toBeCalled();
  });
});
