import React, { Component } from 'react';

/**
 * HOC factory for abstracting state management for any components that have a notion of toggling
 * a boolean flag between an enabled and disabled state. This HOC handles internal state transitions
 * for keeping track of the toggle. It passes this state, along with functions for setting and
 * resetting that state, as props to the wrapped component.
 *
 * @param {Object} opts Object of options, `key`, describing the name of the prop to use for
 *                      describing the current toggle state, `enable`, describing the name of the
 *                      prop to use for enabling the toggle state, and `disable`, describing the
 *                      name of the prop to use for disabling the toggle state.
 * @returns {Function} HOC factory that takes a component class to wrap, and returns the HOC itself.
 */
const withToggleState = ({ key, enable, disable }) => (WrappedComponent) =>
  class WithToggleStateHOC extends Component {
    state = { isToggled: false };

    handleToggle = (isToggled) => () => this.setState({ isToggled });

    enable = this.handleToggle(true);

    disable = this.handleToggle(false);

    render() {
      const { isToggled } = this.state;

      const props = {
        ...this.props,
        [key]: isToggled,
        [enable]: this.enable,
        [disable]: this.disable,
      };

      return (
        <WrappedComponent {...props} />
      );
    }
  };

export default withToggleState;
