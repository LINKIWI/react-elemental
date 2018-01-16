import { colors } from 'styles/color';
import { fonts } from 'styles/font';
import injectCSS from 'util/inject-css';

const DEFAULT_COLORS = {
  primary: colors.blue,
  primaryLight: colors.blueLight,
  primaryDark: colors.blueDark,
};

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

  // Injection of universal styles, not specific to any single component
  injectCSS(universalSpacing);
};

export default bootstrap;
