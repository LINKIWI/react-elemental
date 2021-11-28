import { durations, timing, transitionStyle } from 'styles/transition';

describe('Transition', () => {
  test('Durations', () => {
    const names = [
      'alpha',
      'beta',
      'gamma',
      'epsilon',
      'iota',
    ];

    names.forEach((name) => expect(durations[name]).toBeDefined());
  });

  test('Timing functions', () => {
    const names = [
      'default',
      'ease',
    ];

    names.forEach((name) => expect(timing[name]).toBeDefined());
  });

  test('Transition style factory', () => {
    expect(transitionStyle()).toEqual({
      transition: `all ${durations.gamma} ${timing.default}`,
    });
    expect(transitionStyle('property')).toEqual({
      transition: `property ${durations.gamma} ${timing.default}`,
    });
    expect(transitionStyle('property', 'alpha')).toEqual({
      transition: `property ${durations.alpha} ${timing.default}`,
    });
    expect(transitionStyle('property', '2s')).toEqual({
      transition: `property 2s ${timing.default}`,
    });
    expect(transitionStyle('property', 'alpha', 'ease')).toEqual({
      transition: `property ${durations.alpha} ${timing.ease}`,
    });
    expect(transitionStyle('property', 'alpha', 'ease-in')).toEqual({
      transition: `property ${durations.alpha} ease-in`,
    });
  });
});
