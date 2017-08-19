import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Text from 'components/text';
import { colors } from 'styles/color';

const noop = () => {};

/**
 * Parse an RGB hex string into individual red, green, and blue components.
 *
 * @param {string} hex Color hex string, e.g. '#aabbcc'
 * @returns {Array} Array of [red, green, blue] integers in the range [0, 255].
 */
const parseHexToRGB = (hex) => {
  const red = hex.substring(1, 3);
  const green = hex.substring(3, 5);
  const blue = hex.substring(5, 7);

  return [red, green, blue].map((component) => parseInt(component, 16));
};

/**
 * Construct an RGB hex string from individual red, green, blue integer values.
 *
 * @param {Array} Array of [red, green, blue] component values, each in range [0 255].
 * @returns {string} RGB hex string for the specified input.
 */
const rgbToHex = ([red, green, blue]) =>
  `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;

// Mapping of button sizes to the corresponding default text size.
const textSizeMap = {
  gamma: 'lambda',
  beta: 'kilo',
  alpha: 'iota',
};

// Mapping of button sizes to the corresponding button padding values.
const paddingMap = {
  gamma: '6px 12px',
  beta: '10px 16px',
  alpha: '12px 22px',
};

/**
 * Button component.
 */
class Button extends Component {
  static propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOf(['gamma', 'beta', 'alpha']),
    text: PropTypes.string,
    disabled: PropTypes.bool,
    secondary: PropTypes.bool,
    style: PropTypes.object,
    onClick: PropTypes.func,
    children: PropTypes.any,
  };

  static defaultProps = {
    color: undefined,
    size: 'beta',
    text: null,
    disabled: false,
    secondary: false,
    style: {},
    onClick: noop,
    children: null,
  };

  constructor(props) {
    super(props);

    const { color = colors.primary } = props;

    const rgb = parseHexToRGB(color);

    this.idleColor = color;
    this.hoverColor = rgbToHex(rgb.map((component) => Math.min(Math.round(component * 1.05), 255)));
    this.activeColor = rgbToHex(rgb.map((component) => Math.round(component * 0.95)));

    this.state = {
      ref: null,
      color: this.idleColor,
    };
  }

  /**
   * Set a ref to the rendered button element in component state.
   *
   * @param {HTMLElement} ref Ref to the top-level button element.
   */
  setRef = (ref) => {
    if (!this.state.ref) {
      this.setState({ ref });
    }
  };

  /**
   * Set the hover background color when moving the mouse into the button.
   */
  handleMouseEnter = () => this.setState({ color: this.hoverColor });

  /**
   * Blur the button element and set the idle color when the mouse leaves the button.
   */
  handleMouseOut = () => {
    const { ref } = this.state;

    if (ref) {
      ref.blur();
    }

    this.setState({ color: this.idleColor });
  };

  /**
   * Set the active color when the button is depressed.
   */
  handleMouseDown = () => this.setState({ color: this.activeColor });

  /**
   * Set the hover color when the button is released.
   */
  handleMouseUp = () => this.setState({ color: this.hoverColor });

  render() {
    const {
      onClick,
      size,
      text,
      disabled,
      secondary,
      style: overrides,
      children,
      ...proxyProps
    } = this.props;
    const { color } = this.state;

    const style = {
      backgroundColor: secondary ? 'white' : color,
      border: secondary ? `1px solid ${color}` : 'none',
      borderRadius: 0,
      cursor: 'pointer',
      opacity: disabled ? 0.4 : 1,
      padding: paddingMap[size],
      pointerEvents: disabled ? 'none' : 'inherit',
      textDecoration: 'none',
      transition: 'all 0.15s ease-out',
      ...overrides,
    };

    return (
      <button
        ref={this.setRef}
        onClick={onClick}
        style={style}
        onMouseEnter={this.handleMouseEnter}
        onMouseOut={this.handleMouseOut}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        {...proxyProps}
      >
        {
          text && (
            <Text size={textSizeMap[size]} color={secondary ? color : 'gray5'} uppercase bold>
              {text}
            </Text>
          )
        }

        {children}
      </button>
    );
  }
}

export default Button;
