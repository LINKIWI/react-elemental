import bootstrap from 'bootstrap';
import { colors } from 'styles/color';
import { fonts } from 'styles/font';
import injectCSS from 'util/inject-css';

jest.mock('util/inject-css', () => jest.fn());

describe('Imperative bootstrapping', () => {
  test('Setting global properties', () => {
    const fontOpts = {
      primary: { regular: 'primary-regular', bold: 'primary-bold' },
      secondary: { regular: 'secondary-regular', bold: 'secondary-bold' },
    };
    const colorOpts = {
      primary: 'primary',
      primaryLight: 'primary-light',
      primaryDark: 'primary-dark',
    };

    bootstrap(fontOpts, colorOpts);

    expect(fonts.primary.regular).toBe('primary-regular');
    expect(fonts.primary.bold).toBe('primary-bold');
    expect(fonts.secondary.regular).toBe('secondary-regular');
    expect(fonts.secondary.bold).toBe('secondary-bold');
    expect(colors.primary).toBe('primary');
    expect(colors.primaryLight).toBe('primary-light');
    expect(colors.primaryDark).toBe('primary-dark');
  });

  test('Global CSS injection', () => {
    bootstrap();

    expect(injectCSS).toBeCalled();
  });
});
