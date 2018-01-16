import { colors } from 'styles/color';

export const fonts = {
  primary: {
    regular: '',
    bold: '',
  },
  secondary: {
    regular: '',
    bold: '',
  },
};

export const sizes = {
  alpha: '60px',
  beta: '54px',
  gamma: '46px',
  delta: '36px',
  epsilon: '24px',
  iota: '15px',
  kilo: '13px',
  lambda: '12px',
};

export const primaryFontStyle = (size, color, bold) => ({
  fontFamily: bold ? 'primary--bold' : 'primary--regular',
  fontSize: sizes[size] || size,
  color: colors[color] || color,
});

export const secondaryFontStyle = (size, color, bold) => ({
  fontFamily: bold ? 'secondary--bold' : 'secondary--regular',
  fontSize: sizes[size] || size,
  color: colors[color] || color,
});

/**
 * Generate a font-face CSS declaration.
 *
 * @param {string} name Name of the font.
 * @param {string} src Font src. May be URL or base64-encoded font data.
 */
const fontFaceStyle = (name, src) => `
  @font-face {
    font-family: '${name}';
    src: ${src};
  }
`;

export const fontCSS = () => [
  fontFaceStyle('primary--regular', fonts.primary.regular),
  fontFaceStyle('primary--bold', fonts.primary.bold),
  fontFaceStyle('secondary--regular', fonts.secondary.regular),
  fontFaceStyle('secondary--bold', fonts.secondary.bold),
].join('\n');
