import { colors } from 'styles/color';

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
  fontFamily: bold ? 'karla--bold' : 'karla--regular',
  fontSize: sizes[size] || size,
  color: colors[color] || color,
});

export const secondaryFontStyle = (size, color, bold) => ({
  fontFamily: bold ? 'source-code-pro--medium' : 'source-code-pro--regular',
  fontSize: sizes[size] || size,
  color: colors[color] || color,
  letterSpacing: '-0.03em',
  lineHeight: '1.2em',
});
