import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { colors } from 'styles/color';

export const POSITION_LEFT = 0;
export const POSITION_RIGHT = 100;

/**
 * Indeterminate loading bar component.
 */
export default class LoadingBar extends Component {
  static propTypes = {
    color: PropTypes.string,
    thickness: PropTypes.number,
    duration: PropTypes.number,
    delay: PropTypes.number,
    style: PropTypes.object,
  };

  static defaultProps = {
    color: undefined,
    thickness: 4,
    duration: 900,
    delay: 125,
    style: {},
  };

  state = {
    position: POSITION_LEFT,
  };

  componentDidMount() {
    // When the component mounts, we want to immediately start the animation from left to right.
    // However, to avoid a race condition whereby we update the state while the component is
    // mounting, we will queue this event to occur as soon as possible *after* the component is
    // mounted. It is also necessary to record the interval as a class property to that it can be
    // canceled promptly if the component is immediately unmounted.
    this.interval = setTimeout(this.tick, 1);
  }

  componentWillUnmount() {
    clearTimeout(this.interval);
  }

  tick = () => {
    const { duration, delay } = this.props;

    // On every tick, we'll update the position to the other boundary.
    this.setState(({ position }) => ({
      position: (position === POSITION_LEFT) ? POSITION_RIGHT : POSITION_LEFT,
    }));

    // Additionally, we'll schedule another tick after the animation has completed and the requested
    // bounce delay has elapsed.
    this.interval = setTimeout(this.tick, duration + delay);
  };

  render() {
    const {
      color = colors.primary,
      thickness,
      duration,
      delay,
      style: overrides,
      ...proxyProps
    } = this.props;
    const { position } = this.state;
    const offset = position === POSITION_LEFT ? -POSITION_RIGHT : POSITION_LEFT;

    const containerStyle = {
      overflow: 'hidden',
      height: thickness,
      width: '100%',
      position: 'relative',
      ...overrides,
    };

    const loadingBarStyle = {
      backgroundColor: color,
      height: thickness,
      transition: `all ${duration / 1000}s cubic-bezier(.75, 0, .32, .99)`,
      width: '100px',
      marginLeft: `calc(${position}% + ${offset}px)`,
    };

    return (
      <div style={containerStyle} {...proxyProps}>
        <div style={loadingBarStyle} />
      </div>
    );
  }
}
