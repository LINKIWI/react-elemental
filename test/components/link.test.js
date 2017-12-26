import React from 'react';
import { shallow } from 'enzyme';
import { BaseLink as Link } from 'components/link';

describe('Link', () => {
  test('Standard rendering', () => {
    const link = shallow(
      <Link href="href">
        link
      </Link>,
    );

    expect(link.find('a').length).toBe(1);
    expect(link.find('a').props().href).toBe('href');
    expect(link.find('a').children().text()).toBe('link');
    expect(link.find('a').props().style[':hover'].borderBottom.startsWith('2px solid')).toBe(true);
    expect(link.find('a').props().style[':active'].borderBottom.startsWith('2px solid')).toBe(true);
  });

  test('Plain type', () => {
    const link = shallow(
      <Link type="plain">
        link
      </Link>,
    );

    expect(link.find('a').props().style[':active'].borderBottom.startsWith('0 solid')).toBe(true);
  });

  test('Underline type', () => {
    const link = shallow(
      <Link type="underline">
        link
      </Link>,
    );

    expect(link.find('a').props().style.borderBottom.startsWith('2px solid')).toBe(true);
  });

  test('Props proxy', () => {
    const mockOnClick = jest.fn();
    const link = shallow(
      <Link href="href" onClick={mockOnClick} />,
    );

    link.simulate('click');
    expect(mockOnClick).toBeCalled();
  });
});
