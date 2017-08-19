import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { colors } from 'styles/color';

export const POSITION_LEFT = 0;
export const POSITION_RIGHT = 100;
export const BOUNCE_INTERVAL = 1100;

/**
 * Indeterminate loading bar component.
 */
export default class LoadingBar extends Component {
  static propTypes = {
    color: PropTypes.string,
    thickness: PropTypes.number,
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    position: PropTypes.oneOf(['relative', 'absolute']),
    style: PropTypes.object,
  };

  static defaultProps = {
    color: undefined,
    thickness: 4,
    width: '100%',
    position: 'relative',
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
    // On every tick, we'll update the position to the other boundary.
    // Additionally, we'll schedule another tick for BOUNCE_INTERVAL ms from now.
    this.setState(({ position }) => ({
      position: (position === POSITION_LEFT) ? POSITION_RIGHT : POSITION_LEFT,
    }));

    this.interval = setTimeout(this.tick, BOUNCE_INTERVAL);
  };

  render() {
    const {
      color = colors.primary,
      thickness,
      width,
      position: positionStyle,
      style: overrides,
      ...proxyProps
    } = this.props;
    const { position } = this.state;
    const offset = position === POSITION_LEFT ? -POSITION_RIGHT : POSITION_LEFT;

    const containerStyle = {
      overflow: 'hidden',
      height: thickness,
      width,
      position: positionStyle,
      ...overrides,
    };

    const loadingBarStyle = {
      backgroundColor: color,
      height: thickness,
      transition: 'all 1s cubic-bezier(.75, 0, .32, .99)',
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
