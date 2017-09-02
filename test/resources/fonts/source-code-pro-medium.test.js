import sourceCodeProMedium from 'resources/fonts/source-code-pro-medium';

describe('Source Code Pro medium', () => {
  test('Font is exported', () => {
    expect(sourceCodeProMedium).toBeDefined();
    expect(typeof sourceCodeProMedium).toBe('string');
  });
});
