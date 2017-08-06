import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import Spinner from 'components/spinner';
import { colors } from 'styles/color';

describe('Spinner', () => {
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
});
