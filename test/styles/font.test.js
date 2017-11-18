import { sizes, primaryFontStyle, secondaryFontStyle } from 'styles/font';

describe('Fonts', () => {
  test('Sizes', () => {
    const names = [
      'alpha',
      'beta',
      'gamma',
      'delta',
      'epsilon',
      'iota',
      'kilo',
      'lambda',
    ];

    names.forEach((name) => expect(sizes[name]).toBeDefined());
  });

  test('Primary style bold variant', () => {
    const regular = primaryFontStyle('alpha', 'gray50', false);
    expect(regular.fontFamily).toBe('primary--regular');

    const bold = primaryFontStyle('alpha', 'gray50', true);
    expect(bold.fontFamily).toBe('primary--bold');
  });

  test('Primary style size and color fallbacks', () => {
    const predefinedSize = primaryFontStyle('alpha', 'gray50', false);
    expect(predefinedSize.fontSize).toBe('60px');

    const customSize = primaryFontStyle('60px', 'gray50', false);
    expect(customSize.fontSize).toBe('60px');

    const predefinedColor = primaryFontStyle('alpha', 'gray50', false);
    expect(predefinedColor.color).toBe('rgb(127, 127, 127)');

    const customColor = primaryFontStyle('alpha', '#ce8ce8', false);
    expect(customColor.color).toBe('#ce8ce8');
  });

  test('Secondary style bold variant', () => {
    const regular = secondaryFontStyle('alpha', 'gray50', false);
    expect(regular.fontFamily).toBe('secondary--regular');

    const bold = secondaryFontStyle('alpha', 'gray50', true);
    expect(bold.fontFamily).toBe('secondary--bold');
  });

  test('Secondary style size and color fallbacks', () => {
    const predefinedSize = secondaryFontStyle('alpha', 'gray50', false);
    expect(predefinedSize.fontSize).toBe('60px');

    const customSize = secondaryFontStyle('60px', 'gray50', false);
    expect(customSize.fontSize).toBe('60px');

    const predefinedColor = secondaryFontStyle('alpha', 'gray50', false);
    expect(predefinedColor.color).toBe('rgb(127, 127, 127)');

    const customColor = secondaryFontStyle('alpha', '#ce8ce8', false);
    expect(customColor.color).toBe('#ce8ce8');
  });
});
