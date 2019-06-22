import { mount, shallow } from 'enzyme';
import React from 'react';
import Spacing from 'components/spacing';

describe('Spacing', () => {
  test('Accepts proxy props', () => {
    const onClick = jest.fn();
    const spacing = mount(
      <Spacing
        onClick={onClick}
      />,
    );

    expect(spacing.at(0).props().onClick).toBe(onClick);
  });

  test('Inline and block variants', () => {
    const inlineSpacing = shallow(
      <Spacing inline />,
    );
    expect(inlineSpacing.find('span').length).toBe(1);
    expect(inlineSpacing.find('div').length).toBe(0);

    const blockSpacing = shallow(
      <Spacing />,
    );
    expect(blockSpacing.find('span').length).toBe(0);
    expect(blockSpacing.find('div').length).toBe(1);
  });

  test('Dimensions props translate to style values', () => {
    const spacingTop = shallow(
      <Spacing top />,
    );
    expect(spacingTop.at(0).props().style.margin).toBe('24px 0 0 0');

    const spacingRight = shallow(
      <Spacing right />,
    );
    expect(spacingRight.at(0).props().style.margin).toBe('0 24px 0 0');

    const spacingBottom = shallow(
      <Spacing bottom />,
    );
    expect(spacingBottom.at(0).props().style.margin).toBe('0 0 24px 0');

    const spacingLeft = shallow(
      <Spacing left />,
    );
    expect(spacingLeft.at(0).props().style.margin).toBe('0 0 0 24px');
  });

  test('Padding modifier', () => {
    const spacing = shallow(
      <Spacing size="huge" right left padding />,
    );

    expect(spacing.at(0).props().style.padding).toBe('0 50px 0 50px');
  });
});
