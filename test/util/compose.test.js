import compose from 'util/compose';

describe('Compose', () => {
  test('No passed arguments is equivalent to identity', () => {
    const func = compose()(() => 5);

    expect(func()).toBe(5);
  });

  test('Single argument is equivalent to that argument', () => {
    const func = compose((num) => num + 1);

    expect(func(5)).toBe(6);
  });

  test('Multi-function composition', () => {
    const func = compose(
      (num) => num + 1,
      (num) => num * 2,
    );

    expect(func(5)).toBe(11);
  });
});
