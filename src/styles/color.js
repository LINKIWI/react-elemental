const range = (low, high, skip) => ((low === high) ?
  [] : [low].concat(range(low + skip, high, skip)));

const gray = {
  black: 'rgb(0, 0, 0)',
  white: 'rgb(255, 255, 255)',
  transparent: 'rgba(0, 0, 0, 0.4)',
  // Shades of gray for each fifth percentage
  ...range(5, 100, 5).reduce((grayShades, shadePercent) => {
    const calcGrayRGB = (percentage) => 255 - Math.round(255 * (percentage / 100));
    const grayShade = calcGrayRGB(shadePercent);

    return {
      ...grayShades,
      [`gray${shadePercent}`]: `rgb(${grayShade}, ${grayShade}, ${grayShade})`,
    };
  }, {}),
};

const others = {
  greenLight: '#e8f5e9',
  green: '#388e3c',
  redLight: '#ffebee',
  red: '#d32f2f',
  blueLight: '#d6ecf5',
  blue: '#3eb8f0',
  blueDark: '#036996',
  orangeLight: '#e69f97',
  orange: '#e74c3c',
  yellow: '#b49b5c',
  yellowLight: '#fcf8e3',
  purpleLight: '#d8bce8',
  purple: '#9b59b6',
  purpleDark: '#8e44ad',
};

const primary = {
  primary: others.blue,
  primaryLight: others.blueLight,
  primaryDark: others.blueDark,
};

export const colors = { ...gray, ...others, ...primary };

export default undefined;
