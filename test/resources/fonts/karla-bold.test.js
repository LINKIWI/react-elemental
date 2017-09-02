import karlaBold from 'resources/fonts/karla-bold';

describe('Karla bold', () => {
  test('Font is exported', () => {
    expect(karlaBold).toBeDefined();
    expect(typeof karlaBold).toBe('string');
  });
});
