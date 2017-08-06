import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { colors } from 'styles/color';

const sizeMap = {
  alpha: '26px',
  beta: '18px',
  gamma: '12px',
  delta: '8px',
};

const COLOR_IDLE = colors.gray5;

/**
 * Indeterminate progress indication spinner.
 */
export default class Spinner extends Component {
  static propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOf(['alpha', 'beta', 'gamma', 'delta']),
    style: PropTypes.object,
  };

  static defaultProps = {
    color: undefined,
    size: 'beta',
    style: {},
  };

  state = {
    color: COLOR_IDLE,
  };

  componentDidMount() {
    this.interval = setInterval(this.tick, 600);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick = () => {
    const { color: pulseColor = colors.primary } = this.props;

    this.setState(({ color }) => ({
      color: (color === pulseColor) ? COLOR_IDLE : pulseColor,
    }));
  };

  render() {
    const { size, style: overrides } = this.props;
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
      <div style={style} />
    );
  }
}
