import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import LoadingBar, { POSITION_LEFT, POSITION_RIGHT, BOUNCE_INTERVAL } from 'components/loading-bar';

describe('Loading bar', () => {
  test('Standard rendering', () => {
    const loadingBar = mount(
      <LoadingBar
        color="white"
        thickness={3}
        width="100px"
        position="absolute"
      />,
    );

    expect(loadingBar.find('div').length).toBe(2);
  });

  test('State update logic', () => {
    const clock = sinon.useFakeTimers();
    const loadingBar = mount(
      <LoadingBar />,
    );

    // Initial state
    expect(loadingBar.state().position).toBe(POSITION_LEFT);
    expect(loadingBar.childAt(0).props().style.marginLeft)
      .toBe(`calc(${POSITION_LEFT}% + ${-POSITION_RIGHT}px)`);

    // Simulate time events
    clock.tick(5);
    expect(loadingBar.state().position).toBe(POSITION_RIGHT);
    clock.tick(BOUNCE_INTERVAL);
    expect(loadingBar.state().position).toBe(POSITION_LEFT);

    // Unmount clears timeout
    loadingBar.unmount();

    clock.restore();
  });
});
