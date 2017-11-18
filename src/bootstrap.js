import { colors } from 'styles/color';
import { fonts } from 'styles/font';

const DEFAULT_COLORS = {
  primary: colors.blue,
  primaryLight: colors.blueLight,
  primaryDark: colors.blueDark,
};

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

/**
 * Universal spacing properties to apply to all elements in the document.
 */
const universalSpacing = `
  * {
    margin: 0;
    outline: none;
    padding: 0;
  }
`;

/**
 * Inject a CSS style declaration into the document head.
 *
 * @param {string} css Valid CSS string.
 */
const injectCSS = (css) => {
  const node = document.createElement('style');
  node.innerHTML = css;
  document.body.appendChild(node);
};

/**
 * Bootstrap Elemental. This will inject all necessary global CSS declarations and initialize custom
 * style overrides passed in as options.
 *
 * @param {Object} fontOpts Describes the primary and secondary fonts.
 * @param {Object} colorOpts Optional color overrides for the library's default primary colors.
 */
const bootstrap = (fontOpts = {}, colorOpts = {}) => {
  const { primary = {}, secondary = {} } = fontOpts;
  const bootstrapColors = {
    ...DEFAULT_COLORS,
    ...colorOpts,
  };

  fonts.primary.regular = primary.regular || '';
  fonts.primary.bold = primary.bold || '';
  fonts.secondary.regular = secondary.regular || '';
  fonts.secondary.bold = secondary.bold || '';

  colors.primary = bootstrapColors.primary;
  colors.primaryLight = bootstrapColors.primaryLight;
  colors.primaryDark = bootstrapColors.primaryDark;

  injectCSS(fontFaceStyle('primary--regular', fonts.primary.regular));
  injectCSS(fontFaceStyle('primary--bold', fonts.primary.bold));
  injectCSS(fontFaceStyle('secondary--regular', fonts.secondary.regular));
  injectCSS(fontFaceStyle('secondary--bold', fonts.secondary.bold));
  injectCSS(universalSpacing);
};

export default bootstrap;
