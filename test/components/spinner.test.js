import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import Spinner from 'components/spinner';
import { colors } from 'styles/color';

describe('Spinner', () => {
  test('Accepts proxy props', () => {
    const onClick = jest.fn();
    const spinner = mount(
      <Spinner
        onClick={onClick}
      />,
    );

    expect(spinner.at(0).props().onClick).toBe(onClick);
  });

  test('Standard rendering', () => {
    const clock = sinon.useFakeTimers();
    const spinner = mount(
      <Spinner />,
    );

    expect(spinner.find('div').length).toBe(1);
    expect(spinner.find('div').props().style.backgroundColor).toBeDefined();

    clock.tick(1200);

    spinner.unmount();
    clock.restore();
  });

  test('Color pulsation', () => {
    const clock = sinon.useFakeTimers();
    const spinner = mount(
      <Spinner color={colors.red} />,
    );

    expect(spinner.state().color).toBe(colors.gray5);
    clock.tick(600);
    expect(spinner.state().color).toBe(colors.red);
    clock.tick(600);
    expect(spinner.state().color).toBe(colors.gray5);

    spinner.unmount();
    clock.restore();
  });

  test('Optional pulsation disable', () => {
    const clock = sinon.useFakeTimers();
    const spinner = mount(
      <Spinner color={colors.primary} pulsate={false} />,
    );

    expect(spinner.state().color).toBe(colors.primary);
    clock.tick(600);
    expect(spinner.state().color).toBe(colors.primary);
    clock.tick(600);
    expect(spinner.state().color).toBe(colors.primary);

    spinner.unmount();
    clock.restore();
  });

  test('Transparent modifier', () => {
    const clock = sinon.useFakeTimers();
    const spinner = mount(
      <Spinner color={colors.primary} transparent />,
    );

    expect(spinner.state().color).toBe('unset');
    clock.tick(600);
    expect(spinner.state().color).toBe(colors.primary);
    clock.tick(600);
    expect(spinner.state().color).toBe('unset');

    spinner.unmount();
    clock.restore();
  });

  test('Changes in pulsation prop', () => {
    const clock = sinon.useFakeTimers();
    const spinner = mount(
      <Spinner
        color={colors.primary}
        pulsate={false}
        transparent
      />,
    );

    expect(spinner.state().color).toBe(colors.primary);
    clock.tick(600);
    expect(spinner.state().color).toBe(colors.primary);

    spinner.setProps({ pulsate: true });

    expect(spinner.state().color).toBe('unset');
    clock.tick(600);
    expect(spinner.state().color).toBe(colors.primary);
    clock.tick(600);
    expect(spinner.state().color).toBe('unset');

    spinner.setProps({ pulsate: false });

    expect(spinner.state().color).toBe(colors.primary);
    clock.tick(600);
    expect(spinner.state().color).toBe(colors.primary);

    spinner.unmount();
    clock.restore();
  });

  test('Changes in color prop', () => {
    const clock = sinon.useFakeTimers();
    const spinner = mount(
      <Spinner transparent />,
    );

    expect(spinner.state().color).toBe('unset');
    clock.tick(600);
    expect(spinner.state().color).toBe(colors.primary);
    clock.tick(600);
    expect(spinner.state().color).toBe('unset');
    spinner.setProps({ color: colors.green });
    clock.tick(600);
    expect(spinner.state().color).toBe(colors.green);

    spinner.unmount();
    clock.restore();
  });
});
