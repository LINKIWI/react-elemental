import { colors } from 'styles/color';

describe('Colors', () => {
  test('Gray shades', () => {
    expect(colors.gray0).toBeUndefined();
    expect(colors.gray100).toBeUndefined();
    expect(colors.gray5).toBeDefined();
    expect(colors.gray55).toBeDefined();
    expect(colors.gray70).toBeDefined();
    expect(colors.gray95).toBeDefined();
  });

  test('Primary colors', () => {
    expect(colors.primary).toBeDefined();
    expect(colors.primaryLight).toBeDefined();
    expect(colors.primaryDark).toBeDefined();
  });
});
