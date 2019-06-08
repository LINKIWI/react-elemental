import { durations, transitionStyle } from 'styles/transition';

describe('Transition', () => {
  test('Durations', () => {
    const names = [
      'alpha',
      'beta',
      'gamma',
      'epsilon',
    ];

    names.forEach((name) => expect(durations[name]).toBeDefined());
  });

  test('Transition style factory', () => {
    expect(transitionStyle()).toEqual({
      transition: 'all 170ms cubic-bezier(0, .75, .34, 1)',
    });
    expect(transitionStyle('property')).toEqual({
      transition: 'property 170ms cubic-bezier(0, .75, .34, 1)',
    });
    expect(transitionStyle('property', 'alpha')).toEqual({
      transition: 'property 120ms cubic-bezier(0, .75, .34, 1)',
    });
    expect(transitionStyle('property', '2s')).toEqual({
      transition: 'property 2s cubic-bezier(0, .75, .34, 1)',
    });
  });
});
