import { mount } from 'enzyme';
import React from 'react';
import Text from 'components/text';

describe('Text', () => {
  test('Accepts proxy props', () => {
    const onClick = jest.fn();
    const text = mount(
      <Text onClick={onClick}>
        text
      </Text>,
    );

    expect(text.at(0).props().onClick).toBe(onClick);
  });

  test('Standard rendering', () => {
    const text = mount(
      <Text>
        text
      </Text>,
    );

    expect(text.find('p').length).toBe(1);
    expect(text.find('p').text()).toBe('text');
  });

  test('Inline rendering', () => {
    const text = mount(
      <Text inline>
        text
      </Text>,
    );

    expect(text.find('p').length).toBe(0);
    expect(text.find('span').length).toBe(1);
    expect(text.find('span').text()).toBe('text');
  });

  test('Uppercase modifier', () => {
    const text = mount(
      <Text uppercase>
        text
      </Text>,
    );

    expect(text.find('p').props().style.textTransform).toBe('uppercase');
  });

  test('Alignment modifiers', () => {
    const centerText = mount(
      <Text center>
        text
      </Text>,
    );
    expect(centerText.find('p').props().style.textAlign).toBe('center');

    const rightText = mount(
      <Text right>
        text
      </Text>,
    );
    expect(rightText.find('p').props().style.textAlign).toBe('right');
  });

  test('Primary/secondary font style', () => {
    const primaryText = mount(
      <Text>
        text
      </Text>,
    );
    expect(primaryText.find('p').props().style.fontFamily).toBe('primary--regular');

    const secondaryText = mount(
      <Text secondary>
        text
      </Text>,
    );
    expect(secondaryText.find('p').props().style.fontFamily).toBe('secondary--regular');
  });
});
