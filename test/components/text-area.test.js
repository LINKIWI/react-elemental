import { mount } from 'enzyme';
import React, { createRef } from 'react';
import Text from 'components/text';
import TextArea from 'components/text-area';
import TextField from 'components/text-field';
import { colors } from 'styles/color';
import { transitionStyle } from 'styles/transition';

describe('Text area', () => {
  test('Accepts proxy props', () => {
    const textArea = mount(
      <TextArea rows={40} />,
    );

    expect(textArea.find('textarea').props().rows).toBe(40);
  });

  test('Proxies into TextField with style override', () => {
    const textArea = mount(
      <TextArea />,
    );

    expect(textArea.find(TextField).length).toBe(1);
    expect(textArea.find(TextField).props().style).toEqual(transitionStyle('border'));
    expect(textArea.find(TextField).props().textarea).toBe(true);
  });

  test('Error message', () => {
    const textArea = mount(
      <TextArea
        error="error"
      />,
    );

    expect(textArea.find(Text).length).toBe(1);
    expect(textArea.find(Text).at(0).children().text()).toBe('error');
  });

  test('Width and height are set via style', () => {
    const textArea = mount(
      <TextArea
        style={{
          height: '10px',
          width: '20px',
        }}
      />,
    );

    expect(textArea.find('textarea').props().style.height).toBe('10px');
    expect(textArea.find('textarea').props().style.width).toBe('20px');
  });

  test('Hover style', () => {
    const textArea = mount(
      <TextArea />,
    );

    expect(textArea.find('textarea').props().style.border).toBe(`1px solid ${colors.gray10}`);
    textArea.find('textarea').simulate('mouseover');
    expect(textArea.find('textarea').props().style.border).toBe(`1px solid ${colors.gray20}`);
    textArea.find('textarea').simulate('mouseout');
    expect(textArea.find('textarea').props().style.border).toBe(`1px solid ${colors.gray10}`);
  });

  test('Focus style', () => {
    const textArea = mount(
      <TextArea />,
    );

    expect(textArea.find('textarea').props().style.border).toBe(`1px solid ${colors.gray10}`);
    textArea.find('textarea').simulate('focus');
    expect(textArea.find('textarea').props().style.border).toBe(`1px solid ${colors.primary}`);
    textArea.find('textarea').simulate('blur');
    expect(textArea.find('textarea').props().style.border).toBe(`1px solid ${colors.gray10}`);
  });

  test('Secondary style is proxied to TextField', () => {
    const textArea = mount(
      <TextArea secondary />,
    );

    expect(textArea.find(TextField).props().secondary).toBe(true);
  });

  test('Unable to unset internal textarea prop on TextField', () => {
    const textArea = mount(
      <TextArea textarea={false} />,
    );

    expect(textArea.find('textarea').length).toBe(1);
  });

  test('Ref forwarding to underlying textarea', () => {
    const ref = createRef();
    const textArea = mount(
      <TextArea ref={ref} />,
    );

    expect(textArea.find('textarea').length).toBe(1);
    expect(ref.current).toBeDefined();
  });
});
