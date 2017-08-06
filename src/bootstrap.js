import { colors } from 'styles/color';
import karlaBold from 'resources/fonts/karla-bold.txt';
import karlaRegular from 'resources/fonts/karla-regular.txt';
import sourceCodeProMedium from 'resources/fonts/source-code-pro-medium.txt';
import sourceCodeProRegular from 'resources/fonts/source-code-pro-regular.txt';

const DEFAULT_COLORS = {
  primary: colors.blue,
  primaryLight: colors.blueLight,
  primaryDark: colors.blueDark,
};

/**
 * Generate a font-face CSS style declaration.
 *
 * @param {string} name Name of the font.
 * @param {string} data Base64-encoded font data.
 */
const fontFaceStyle = (name, data) => `
  @font-face {
    font-family: '${name}';
    src: url(data:application/x-font-ttf;base64,${data});
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
 * @param {Object} colorOpts Optional color overrides for the library's default primary colors.
 */
const bootstrap = (colorOpts = {}) => {
  const bootstrapColors = {
    ...DEFAULT_COLORS,
    ...colorOpts,
  };

  colors.primary = bootstrapColors.primary;
  colors.primaryLight = bootstrapColors.primaryLight;
  colors.primaryDark = bootstrapColors.primaryDark;

  injectCSS(fontFaceStyle('karla--regular', karlaRegular));
  injectCSS(fontFaceStyle('karla--bold', karlaBold));
  injectCSS(fontFaceStyle('source-code-pro--regular', sourceCodeProRegular));
  injectCSS(fontFaceStyle('source-code-pro--medium', sourceCodeProMedium));
  injectCSS(universalSpacing);
};

export default bootstrap;
