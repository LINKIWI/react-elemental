import { hexToRGB, rgbToHex, colorRatio } from 'util/color';

describe('Color util', () => {
  test('Hex to RGB', () => {
    expect(hexToRGB('#000000')).toEqual([0, 0, 0]);
    expect(hexToRGB('#ffffff')).toEqual([255, 255, 255]);
    expect(hexToRGB('#184554')).toEqual([24, 69, 84]);
  });

  test('RGB to hex', () => {
    expect(rgbToHex([0, 0, 0])).toBe('#000');
    expect(rgbToHex([255, 255, 255])).toBe('#ffffff');
    expect(rgbToHex([24, 69, 84])).toBe('#184554');
  });

  test('Color ratio', () => {
    expect(colorRatio('#184554', 1)).toBe('#184554');
    expect(colorRatio('#184554', 0.9)).toBe('#163e4c');
    expect(colorRatio('#184554', 1.1)).toBe('#1a4c5c');
  });
});
