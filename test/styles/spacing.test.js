import { marginStyle, spacing } from 'styles/spacing';

describe('Spacing', () => {
  test('Sizes', () => {
    const names = [
      'default',
      'micro',
      'tiny',
      'small',
      'large',
      'huge',
      'enormous',
    ];

    names.forEach((name) => expect(spacing[name]).toBeDefined());
  });

  test('Margin style', () => {
    const predefinedSize = marginStyle('margin', 'default', ['top', 'right']);
    expect(predefinedSize).toEqual({ margin: '24px 24px 0 0' });

    const customSize = marginStyle('padding', '18px', ['bottom', 'left']);
    expect(customSize).toEqual({ padding: '0 0 18px 18px' });
  });
});
