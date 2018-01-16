export const spacing = {
  default: '24px',
  micro: '4px',
  tiny: '6px',
  small: '12px',
  large: '36px',
  huge: '50px',
  enormous: '100px',
};

/**
 * Factory function for generating a margin style object of the specified size, for the specified
 * dimension(s).
 *
 * @param {string} property Name of the CSS property to which the options should be applied.
 * @param {string} size Name of the spacing size.
 * @param {Array} dimensions A single dimension on which to apply the style, or an array of
 *                                  dimensions, each of which has the spacing applied.
 * @returns {Object} Style object with the margins applied on the appropriate dimensions.
 */
export const marginStyle = (property, size, dimensions) => {
  const forDimension = (dimension) =>
    (dimensions.includes(dimension) ? (spacing[size] || size) : '0');

  return {
    [property]: [
      forDimension('top'),
      forDimension('right'),
      forDimension('bottom'),
      forDimension('left'),
    ].join(' '),
  };
};

export const buttonOutlinesCSS = () => `
  button::-moz-focus-inner {
    border: 0;
  }
`;
