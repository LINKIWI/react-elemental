import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import Text from 'components/text';
import { colors } from 'styles/color';
import noop from 'util/noop';

const COLOR_INTENSITY_RATIO = 0.08;

const STATE_IDLE = 'idle';
const STATE_HOVER = 'hover';
const STATE_ACTIVE = 'active';

// Mapping of button sizes to the corresponding default text size.
const textSizeMap = {
  gamma: 'lambda',
  beta: 'kilo',
  alpha: 'iota',
};

// Mapping of primary button sizes to the corresponding button padding values.
const primaryPaddingMap = {
  gamma: '6px 12px',
  beta: '10px 16px',
  alpha: '12px 22px',
};

// Mapping of secondary button sizes to the corresponding button padding values.
const secondaryPaddingMap = {
  gamma: '4px 10px',
  beta: '8px 14px',
  alpha: '10px 20px',
};

/**
 * Button component.
 */
class Button extends Component {
  static propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOf(['alpha', 'beta', 'gamma']),
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

    this.state = {
      buttonState: STATE_IDLE,
      buttonColors: {
        [STATE_IDLE]: color,
        [STATE_HOVER]: new Color(color).lighten(COLOR_INTENSITY_RATIO).string(),
        [STATE_ACTIVE]: new Color(color).darken(COLOR_INTENSITY_RATIO).string(),
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    // Need to ensure that the idle, hover, and active colors are appropriately updated if the
    // button's base color changes.
    if (this.props.color !== nextProps.color) {
      this.setState({
        buttonColors: {
          [STATE_IDLE]: nextProps.color,
          [STATE_HOVER]: new Color(nextProps.color).lighten(COLOR_INTENSITY_RATIO).string(),
          [STATE_ACTIVE]: new Color(nextProps.color).darken(COLOR_INTENSITY_RATIO).string(),
        },
      });
    }
  }

  /**
   * Set the hover background color when moving the mouse into the button.
   */
  handleMouseEnter = () => this.setState({ buttonState: STATE_HOVER });

  /**
   * Blur the button element and set the idle color when the mouse leaves the button.
   */
  handleMouseOut = () => this.setState({ buttonState: STATE_IDLE });

  /**
   * Set the active color when the button is depressed.
   */
  handleMouseDown = () => this.setState({ buttonState: STATE_ACTIVE });

  /**
   * Set the hover color when the button is released.
   */
  handleMouseUp = () => this.setState({ buttonState: STATE_HOVER });

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
    const { buttonState, buttonColors } = this.state;

    const color = buttonColors[buttonState];
    const style = {
      backgroundColor: secondary ? 'transparent' : color,
      border: secondary ? `2px solid ${color}` : 'none',
      borderRadius: 0,
      cursor: 'pointer',
      opacity: disabled ? 0.4 : 1,
      pointerEvents: disabled ? 'none' : 'inherit',
      textDecoration: 'none',
      transition: 'all 0.15s ease-out',
      ...overrides,
    };
    const childrenStyle = {
      padding: (secondary ? secondaryPaddingMap : primaryPaddingMap)[size],
    };

    return (
      <button
        onClick={onClick}
        style={style}
        onMouseEnter={this.handleMouseEnter}
        onMouseOut={this.handleMouseOut}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        {...proxyProps}
      >
        <div style={childrenStyle}>
          {text && (
            <Text
              size={textSizeMap[size]}
              color={secondary ? color : 'gray5'}
              style={{ pointerEvents: 'none' }}
              uppercase
              bold
              inline
            >
              {text}
            </Text>
          )}

          {children}
        </div>
      </button>
    );
  }
}

export default Button;
