import { mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import Tooltip, { GRACE_TIMEOUT_INTERVAL } from 'components/tooltip';

describe('Tooltip', () => {
  test('Tooltip wraps children elements and adds tooltip element', () => {
    const tooltip = mount(
      <Tooltip contents={<span>tooltip</span>}>
        children
      </Tooltip>,
    );

    expect(tooltip.childAt(0).childAt(0)).toBeDefined();
    expect(tooltip.childAt(0).childAt(1)).toBeDefined();
  });

  test('Persistent modifier', () => {
    const tooltip = mount(
      <Tooltip
        contents={<span>tooltip</span>}
        persistent
      >
        children
      </Tooltip>,
    );

    expect(tooltip.childAt(0).childAt(0).props().style.visibility).toBe('inherit');
  });

  test('Tooltip display is toggled by mouse events', () => {
    const clock = sinon.useFakeTimers();
    const tooltip = mount(
      <Tooltip contents={<span>tooltip</span>}>
        children
      </Tooltip>,
    );

    expect(tooltip.childAt(0).childAt(0).props().style.opacity).toBe(0);
    tooltip.childAt(0).simulate('mouseOver');
    expect(tooltip.childAt(0).childAt(0).props().style.opacity).toBe(0.95);
    tooltip.childAt(0).simulate('mouseOut');
    // Allow a sufficiently long amount of time to pass
    clock.tick(GRACE_TIMEOUT_INTERVAL * 100);
    expect(tooltip.update().childAt(0).childAt(0).props().style.opacity).toBe(0);

    clock.restore();
  });

  test('Tooltip remains visible for a grace period after mouse out', () => {
    const clock = sinon.useFakeTimers();
    const tooltip = mount(
      <Tooltip contents={<span>tooltip</span>}>
        children
      </Tooltip>,
    );

    expect(tooltip.childAt(0).childAt(0).props().style.opacity).toBe(0);
    tooltip.childAt(0).simulate('mouseOver');
    expect(tooltip.childAt(0).childAt(0).props().style.opacity).toBe(0.95);
    tooltip.childAt(0).simulate('mouseOut');
    expect(tooltip.childAt(0).childAt(0).props().style.opacity).toBe(0.95);
    clock.tick(GRACE_TIMEOUT_INTERVAL / 2);
    expect(tooltip.update().childAt(0).childAt(0).props().style.opacity).toBe(0.95);
    clock.tick(GRACE_TIMEOUT_INTERVAL / 2);
    expect(tooltip.update().childAt(0).childAt(0).props().style.opacity).toBe(0);
    tooltip.childAt(0).simulate('mouseOver');
    expect(tooltip.childAt(0).childAt(0).props().style.opacity).toBe(0.95);
    clock.tick(GRACE_TIMEOUT_INTERVAL / 2);
    tooltip.update().childAt(0).simulate('mouseOver');
    expect(tooltip.childAt(0).childAt(0).props().style.opacity).toBe(0.95);
    tooltip.childAt(0).simulate('mouseOut');
    clock.tick(GRACE_TIMEOUT_INTERVAL / 2);
    expect(tooltip.update().childAt(0).childAt(0).props().style.opacity).toBe(0.95);
    clock.tick(GRACE_TIMEOUT_INTERVAL / 2);
    expect(tooltip.update().childAt(0).childAt(0).props().style.opacity).toBe(0);

    clock.restore();
  });

  test('Placement modifier', () => {
    const tooltip = mount(
      <Tooltip contents={<span>tooltip</span>} bottom>
        children
      </Tooltip>,
    );

    expect(tooltip.childAt(0).childAt(0).props().style.bottom).toBeUndefined();
    expect(tooltip.childAt(0).childAt(0).props().style.top).toBeDefined();
  });
});
