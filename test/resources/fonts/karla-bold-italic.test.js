import karlaBoldItalic from 'resources/fonts/karla-bold-italic';

describe('Karla bold italic', () => {
  test('Font is exported', () => {
    expect(karlaBoldItalic).toBeDefined();
    expect(typeof karlaBoldItalic).toBe('string');
  });
});
