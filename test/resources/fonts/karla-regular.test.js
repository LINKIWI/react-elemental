import karlaRegular from 'resources/fonts/karla-regular';

describe('Karla regular', () => {
  test('Font is exported', () => {
    expect(karlaRegular).toBeDefined();
    expect(typeof karlaRegular).toBe('string');
  });
});
