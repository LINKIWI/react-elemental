import { modulo } from 'util/number';

describe('Number', () => {
  test('Behavior is identical to modulus operator for non-negative integers', () => {
    expect(0 % 5).toBe(0);
    expect(modulo(0, 5)).toBe(0);
    expect(1 % 5).toBe(1);
    expect(modulo(1, 5)).toBe(1);
    expect(5 % 5).toBe(0);
    expect(modulo(5, 5)).toBe(0);
    expect(7 % 5).toBe(2);
    expect(modulo(7, 5)).toBe(2);
  });

  test('Wrapping modulus for negative integers', () => {
    expect(modulo(-1, 5)).toBe(4);
    expect(modulo(-2, 5)).toBe(3);
  });
});
