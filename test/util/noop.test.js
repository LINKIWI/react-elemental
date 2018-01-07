import noop from 'util/noop';

describe('Noop', () => {
  test('Noop does nothing', () => {
    expect(noop()).not.toBeDefined();
  });
});
