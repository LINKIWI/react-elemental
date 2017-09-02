import karlaItalic from 'resources/fonts/karla-italic';

describe('Karla italic', () => {
  test('Font is exported', () => {
    expect(karlaItalic).toBeDefined();
    expect(typeof karlaItalic).toBe('string');
  });
});
