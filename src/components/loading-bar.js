import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { colors } from 'styles/color';
import { transitionStyle } from 'styles/transition';
import omit from 'util/omit';

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
      style: overrides,
      ...props
    } = this.props;
    const { position } = this.state;

    const proxyProps = omit(props, ['delay']);
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
      width: '100px',
      marginLeft: `calc(${position}% + ${offset}px)`,
      ...transitionStyle('all', `${duration}ms`, 'ease'),
    };

    return (
      <div style={containerStyle} {...proxyProps}>
        <div style={loadingBarStyle} />
      </div>
    );
  }
}
