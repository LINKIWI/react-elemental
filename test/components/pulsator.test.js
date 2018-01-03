import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import Pulsator from 'components/pulsator';
import { colors } from 'styles/color';

describe('Pulsator', () => {
  test('Accepts proxy props', () => {
    const onClick = jest.fn();
    const pulsator = mount(
      <Pulsator
        onClick={onClick}
      />,
    );

    expect(pulsator.at(0).props().onClick).toBe(onClick);
  });

  test('Standard rendering', () => {
    const clock = sinon.useFakeTimers();
    const pulsator = mount(
      <Pulsator />,
    );

    expect(pulsator.find('div').length).toBe(1);
    expect(pulsator.find('div').props().style.backgroundColor).toBeDefined();

    clock.tick(1200);

    pulsator.unmount();
    clock.restore();
  });

  test('Color pulsation', () => {
    const clock = sinon.useFakeTimers();
    const pulsator = mount(
      <Pulsator color={colors.red} />,
    );

    expect(pulsator.state().color).toBe(colors.gray5);
    clock.tick(600);
    expect(pulsator.state().color).toBe(colors.red);
    clock.tick(600);
    expect(pulsator.state().color).toBe(colors.gray5);

    pulsator.unmount();
    clock.restore();
  });

  test('Optional pulsation disable', () => {
    const clock = sinon.useFakeTimers();
    const pulsator = mount(
      <Pulsator color={colors.primary} pulsate={false} />,
    );

    expect(pulsator.state().color).toBe(colors.primary);
    clock.tick(600);
    expect(pulsator.state().color).toBe(colors.primary);
    clock.tick(600);
    expect(pulsator.state().color).toBe(colors.primary);

    pulsator.unmount();
    clock.restore();
  });

  test('Transparent modifier', () => {
    const clock = sinon.useFakeTimers();
    const pulsator = mount(
      <Pulsator color={colors.primary} transparent />,
    );

    expect(pulsator.state().color).toBe('unset');
    clock.tick(600);
    expect(pulsator.state().color).toBe(colors.primary);
    clock.tick(600);
    expect(pulsator.state().color).toBe('unset');

    pulsator.unmount();
    clock.restore();
  });

  test('Changes in pulsation prop', () => {
    const clock = sinon.useFakeTimers();
    const pulsator = mount(
      <Pulsator
        color={colors.primary}
        pulsate={false}
        transparent
      />,
    );

    expect(pulsator.state().color).toBe(colors.primary);
    clock.tick(600);
    expect(pulsator.state().color).toBe(colors.primary);

    pulsator.setProps({ pulsate: true });

    expect(pulsator.state().color).toBe('unset');
    clock.tick(600);
    expect(pulsator.state().color).toBe(colors.primary);
    clock.tick(600);
    expect(pulsator.state().color).toBe('unset');

    pulsator.setProps({ pulsate: false });

    expect(pulsator.state().color).toBe(colors.primary);
    clock.tick(600);
    expect(pulsator.state().color).toBe(colors.primary);

    pulsator.unmount();
    clock.restore();
  });

  test('Changes in color prop', () => {
    const clock = sinon.useFakeTimers();
    const pulsator = mount(
      <Pulsator transparent />,
    );

    expect(pulsator.state().color).toBe('unset');
    clock.tick(600);
    expect(pulsator.state().color).toBe(colors.primary);
    clock.tick(600);
    expect(pulsator.state().color).toBe('unset');
    pulsator.setProps({ color: colors.green });
    expect(pulsator.state().color).toBe(colors.green);
    clock.tick(600);
    expect(pulsator.state().color).toBe('unset');

    pulsator.unmount();
    clock.restore();
  });

  test('Changes in color prop with pulsation disabled', () => {
    const pulsator = mount(
      <Pulsator color={colors.green} pulsate={false} transparent />,
    );

    expect(pulsator.state().color).toBe(colors.green);
    pulsator.setProps({ color: undefined });
    expect(pulsator.state().color).toBe(colors.primary);

    pulsator.unmount();
  });
});
