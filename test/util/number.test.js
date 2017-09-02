import { clip } from 'util/number';

describe('Number util', () => {
  test('Clip', () => {
    expect(clip(0, 255)(-1)).toBe(0);
    expect(clip(0, 255)(0)).toBe(0);
    expect(clip(0, 255)(256)).toBe(255);
    expect(clip(0, 255)(255)).toBe(255);
    expect(clip(0, 255)(50)).toBe(50);
  });
});
