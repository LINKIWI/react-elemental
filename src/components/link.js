import React, { Component } from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';
import { colors } from 'styles/color';
import { primaryFontStyle } from 'styles/font';

const textColorMap = {
  light: colors.gray10,
  dark: colors.gray80,
  primary: undefined,
};

const activeColorMap = {
  light: colors.gray10,
  dark: colors.gray80,
  primary: colors.gray80,
};

/**
 * Styled link element.
 */
export class BaseLink extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['light', 'dark', 'primary']),
    href: PropTypes.string,
    plain: PropTypes.bool,
    underline: PropTypes.bool,
    fake: PropTypes.bool,
    style: PropTypes.object,
    children: PropTypes.any,
  };

  static defaultProps = {
    type: 'primary',
    href: '#',
    plain: false,
    underline: false,
    fake: false,
    style: {},
    children: null,
  };

  handleClick = (evt) => {
    const { fake } = this.props;

    if (fake) {
      evt.preventDefault();
    }
  };

  render() {
    const {
      type,
      href,
      plain,
      underline,
      fake,
      style: overrides,
      children,
      ...proxyProps
    } = this.props;

    const borderSize = plain ? '0' : '2px';
    const style = {
      color: colors.primary,
      opacity: 0.8,
      textDecoration: 'none',
      transition: '0.15s all ease',
      ':hover': {
        borderBottom: `${borderSize} solid ${colors.primary}`,
        opacity: '1.0',
      },
      ':active': {
        borderBottom: `${borderSize} solid ${activeColorMap[type]}`,
        color: activeColorMap[type],
      },
      ...underline && { borderBottom: `2px solid ${colors.primary}` },
      ...primaryFontStyle('iota', textColorMap[type] || colors.primary, false),
      ...overrides,
    };

    return (
      <a href={href} style={style} onClick={this.handleClick} {...proxyProps}>
        {children}
      </a>
    );
  }
}

export default Radium(BaseLink);
