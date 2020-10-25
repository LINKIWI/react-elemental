import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { colors } from 'styles/color';
import { transitionStyle } from 'styles/transition';
import omit from 'util/omit';

const sizeMap = {
  alpha: '26px',
  beta: '18px',
  gamma: '12px',
  delta: '8px',
};

const DEFAULT_IDLE_COLOR = colors.gray5;

const PULSATION_INTERVAL = 600;

/**
 * Indeterminate progress indication spinner.
 */
export default class Pulsator extends Component {
  static propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOf(['alpha', 'beta', 'gamma', 'delta']),
    inactive: PropTypes.bool,
    transparent: PropTypes.bool,
    style: PropTypes.object,
  };

  static defaultProps = {
    color: undefined,
    size: 'beta',
    inactive: false,
    transparent: false,
    style: {},
  };

  constructor(props) {
    super(props);

    const { inactive, transparent, color = colors.primary } = this.props;

    this.idleColor = transparent ? 'unset' : DEFAULT_IDLE_COLOR;

    this.state = {
      color: inactive ? color : this.idleColor,
    };
  }

  componentDidMount() {
    const { inactive } = this.props;

    if (!inactive) {
      this.startPulsation();
    }
  }

  componentDidUpdate(prevProps) {
    const { color = colors.primary, inactive } = this.props;
    const { color: prevColor = colors.primary, inactive: prevInactive } = prevProps;

    // Transition: inactive -> active
    if (prevInactive && !inactive) {
      this.startPulsation();
    }

    // Transition: active -> inactive
    if (!prevInactive && inactive) {
      this.stopPulsation();
    }

    // Color changes should be effected immediately
    if (prevColor !== color) {
      this.setState({ color });  // eslint-disable-line react/no-did-update-set-state
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  startPulsation = () => {
    this.setState({ color: this.idleColor });
    this.interval = setInterval(this.tick, PULSATION_INTERVAL);
  };

  stopPulsation = () => {
    const { color = colors.primary } = this.props;

    // If turning off pulsation, we should also reset the color back to the prop-specified color.
    this.setState({ color });
    clearInterval(this.interval);
  };

  tick = () => {
    const { color: pulseColor = colors.primary } = this.props;

    this.setState(({ color }) => ({
      color: (color === this.idleColor) ? pulseColor : this.idleColor,
    }));
  };

  render() {
    const { size, style: overrides, ...props } = this.props;
    const { color } = this.state;

    const proxyProps = omit(props, ['inactive', 'transparent']);

    const style = {
      backgroundColor: color,
      borderRadius: '50%',
      display: 'inline-block',
      height: sizeMap[size],
      width: sizeMap[size],
      ...transitionStyle(),
      ...overrides,
    };

    return (
      <div style={style} {...proxyProps} />
    );
  }
}
