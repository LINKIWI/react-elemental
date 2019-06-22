import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { colors } from 'styles/color';
import { transitionStyle } from 'styles/transition';
import omit from 'util/omit';

export const GRACE_TIMEOUT_INTERVAL = 150;

/**
 * Wrap an arbitrary element with a tooltip next to the element on hover.
 */
export default class Tooltip extends Component {
  static propTypes = {
    contents: PropTypes.element.isRequired,
    persistent: PropTypes.bool,
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    offset: PropTypes.number,
    top: PropTypes.bool,
    bottom: PropTypes.bool,
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
  };

  static defaultProps = {
    persistent: false,
    width: 'auto',
    offset: 0,
    top: true,
    bottom: false,
    style: {},
  };

  constructor(props) {
    super(props);

    const { persistent } = props;

    this.state = {
      displayTooltip: persistent,
    };
  }

  handleMouseOver = () => {
    // If we mouse-over the element again before the timeout expires, simply clear the interval so
    // that the display is maintained.
    clearInterval(this.interval);

    this.setState({ displayTooltip: true });
  };

  handleMouseOut = () => {
    const { persistent } = this.props;

    // The logic here is to set a delay before actually changing the state of the component to
    // no longer display the tooltip. This allows the mouse to temporarily exit the tooltip zone
    // while still preserving display of the tooltip.
    this.interval = setTimeout(() => this.setState({ displayTooltip: persistent }),
      GRACE_TIMEOUT_INTERVAL);
  };

  render() {
    const {
      contents,
      width,
      offset,
      bottom,
      children,
      style: overrides,
      ...props
    } = this.props;
    const { displayTooltip } = this.state;

    const proxyProps = omit(props, ['persistent', 'top']);

    const placementProperty = bottom ? 'top' : 'bottom';

    const containerStyle = {
      display: 'inline-block',
      position: 'relative',
    };

    const tooltipStyle = {
      background: colors.gray80,
      left: offset,
      opacity: displayTooltip ? 0.95 : 0,
      padding: '7px 15px',
      position: 'absolute',
      visibility: displayTooltip ? 'inherit' : 'hidden',
      width,
      [placementProperty]: 'calc(100% + 5px)',
      ...transitionStyle(),
      ...overrides,
    };

    return (
      <div
        style={containerStyle}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        {children}

        <span style={tooltipStyle} {...proxyProps}>
          {contents}
        </span>
      </div>
    );
  }
}
