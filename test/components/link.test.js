import React from 'react';
import { shallow } from 'enzyme';
import { BaseLink as Link } from 'components/link';
import { colors } from 'styles/color';

describe('Link', () => {
  test('Standard rendering', () => {
    const link = shallow(
      <Link href="href">
        link
      </Link>,
    );

    const linkStyle = link.at(0).props().style;

    expect(link.find('a').length).toBe(1);
    expect(link.find('a').props().href).toBe('href');
    expect(link.find('a').children().text()).toBe('link');
    expect(link.find('a').props().style.color).toBe(colors.primary);
    expect(linkStyle[':hover'].borderBottom.startsWith('2px solid')).toBe(true);
    expect(linkStyle[':active'].borderBottom.startsWith('2px solid')).toBe(true);
  });

  test('Light and dark variants', () => {
    const lightLink = shallow(
      <Link href="href" type="light">
        link
      </Link>,
    );
    expect(lightLink.find('a').props().style.color).toBe(colors.gray10);

    const darkLink = shallow(
      <Link href="href" type="dark">
        link
      </Link>,
    );
    expect(darkLink.find('a').props().style.color).toBe(colors.gray80);
  });

  test('Props proxy', () => {
    const mockOnClick = jest.fn();
    const link = shallow(
      <Link href="href" onClick={mockOnClick} />,
    );

    link.simulate('click');
    expect(mockOnClick).toBeCalled();
  });

  test('Plain modifier', () => {
    const link = shallow(
      <Link href="href" plain>
        link
      </Link>,
    );

    const linkStyle = link.at(0).props().style;

    expect(linkStyle[':hover'].borderBottom.startsWith('0 solid')).toBe(true);
    expect(linkStyle[':active'].borderBottom.startsWith('0 solid')).toBe(true);
  });
});
