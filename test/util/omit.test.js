import omit from 'util/omit';

describe('Omit', () => {
  test('Omit shallow copies the object', () => {
    const obj = { a: 1, b: 2 };

    expect(omit(obj)).toEqual({ a: 1, b: 2 });
    expect(obj).toEqual({ a: 1, b: 2 });
  });

  test('Omit present object keys', () => {
    const obj = { a: 1, b: 2, c: 3 };

    expect(omit(obj, ['a', 'b'])).toEqual({ c: 3 });
  });

  test('Omit nonexistent object keys', () => {
    const obj = { a: 1, b: 2, c: 3 };

    expect(omit(obj, ['d'])).toEqual({ a: 1, b: 2, c: 3 });
  });
});
