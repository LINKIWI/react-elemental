import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import LoadingBar, { POSITION_LEFT, POSITION_RIGHT } from 'components/loading-bar';

describe('Loading bar', () => {
  test('Accepts proxy props', () => {
    const onClick = jest.fn();
    const loadingBar = shallow(
      <LoadingBar
        onClick={onClick}
      />,
    );

    expect(loadingBar.at(0).props().onClick).toBe(onClick);
  });

  test('Standard rendering', () => {
    const loadingBar = shallow(
      <LoadingBar
        color="white"
        thickness={3}
      />,
    );

    expect(loadingBar.find('div').length).toBe(2);
  });

  test('State update logic', () => {
    const clock = sinon.useFakeTimers();
    const loadingBar = shallow(
      <LoadingBar duration={500} delay={50} />,
    );

    // Initial state
    expect(loadingBar.state().position).toBe(POSITION_LEFT);
    expect(loadingBar.childAt(0).props().style.marginLeft)
      .toBe(`calc(${POSITION_LEFT}% + ${-POSITION_RIGHT}px)`);

    // Simulate time events
    clock.tick(5);
    expect(loadingBar.state().position).toBe(POSITION_RIGHT);
    clock.tick(550);
    expect(loadingBar.state().position).toBe(POSITION_LEFT);

    // Unmount clears timeout
    loadingBar.unmount();

    clock.restore();
  });
});
