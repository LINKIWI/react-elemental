import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { colors } from 'styles/color';

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

  componentWillReceiveProps(nextProps) {
    const { color = colors.primary } = nextProps;

    if (this.props.inactive && !nextProps.inactive) {
      this.setState({ color: this.idleColor });
      this.startPulsation();
    }

    if (!this.props.inactive && nextProps.inactive) {
      // If turning off pulsation, we should also reset the color back to the prop-specified color.
      this.setState({ color });
      clearInterval(this.interval);
    }

    if (this.props.color !== color) {
      this.setState({ color });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  startPulsation = () => {
    this.interval = setInterval(this.tick, PULSATION_INTERVAL);
  };

  tick = () => {
    const { color: pulseColor = colors.primary } = this.props;

    this.setState(({ color }) => ({
      color: (color === this.idleColor) ? pulseColor : this.idleColor,
    }));
  };

  render() {
    const { size, style: overrides, inactive, transparent, ...proxyProps } = this.props;
    const { color } = this.state;

    const style = {
      backgroundColor: color,
      borderRadius: '50%',
      display: 'inline-block',
      height: sizeMap[size],
      width: sizeMap[size],
      transition: 'all 0.2s cubic-bezier(0, 0.67, 0.28, 1)',
      ...overrides,
    };

    return (
      <div style={style} {...proxyProps} />
    );
  }
}
