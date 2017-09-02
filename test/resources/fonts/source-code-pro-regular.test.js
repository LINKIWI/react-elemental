import sourceCodeProRegular from 'resources/fonts/source-code-pro-regular';

describe('Source Code Pro regular', () => {
  test('Font is exported', () => {
    expect(sourceCodeProRegular).toBeDefined();
    expect(typeof sourceCodeProRegular).toBe('string');
  });
});
