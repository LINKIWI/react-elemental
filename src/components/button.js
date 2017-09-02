import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Text from 'components/text';
import { colors } from 'styles/color';
import { colorRatio } from 'util/color';

const noop = () => {};

const HOVER_INTENSITY_RATIO = 1.05;
const ACTIVE_INTENSITY_RATIO = 0.95;

const STATE_IDLE = 'idle';
const STATE_HOVER = 'hover';
const STATE_ACTIVE = 'active';

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

    this.state = {
      ref: null,
      buttonState: STATE_IDLE,
      buttonColors: {
        [STATE_IDLE]: color,
        [STATE_HOVER]: colorRatio(color, HOVER_INTENSITY_RATIO),
        [STATE_ACTIVE]: colorRatio(color, ACTIVE_INTENSITY_RATIO),
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
          [STATE_HOVER]: colorRatio(nextProps.color, HOVER_INTENSITY_RATIO),
          [STATE_ACTIVE]: colorRatio(nextProps.color, ACTIVE_INTENSITY_RATIO),
        },
      });
    }
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
  handleMouseEnter = () => this.setState({ buttonState: STATE_HOVER });

  /**
   * Blur the button element and set the idle color when the mouse leaves the button.
   */
  handleMouseOut = () => {
    const { ref } = this.state;

    if (ref) {
      ref.blur();
    }

    this.setState({ buttonState: STATE_IDLE });
  };

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
      backgroundColor: secondary ? 'white' : color,
      border: secondary ? `2px solid ${color}` : 'none',
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
            <Text
              size={textSizeMap[size]}
              color={secondary ? color : 'gray5'}
              uppercase
              bold
              inline
            >
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
