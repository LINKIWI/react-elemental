import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { compose, withToggleState } from '@linkiwi/hoc';
import Spacing from 'components/spacing';
import Text from 'components/text';
import { transitionStyle } from 'styles/transition';

/**
 * Single radio button option in an externally controlled group of such options.
 */
class RadioButton extends Component {
  static propTypes = {
    // Whether the button is currently selected.
    active: PropTypes.bool.isRequired,
    // Selection accent color.
    accentColor: PropTypes.string.isRequired,
    // Color used when the option is idle (not selected).
    idleColor: PropTypes.string.isRequired,
    // Whether the button is disabled.
    disabled: PropTypes.bool.isRequired,
    // Label to display next to the radio button.
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]).isRequired,
    // Unique value assigned to this radio button
    value: PropTypes.string.isRequired,
    // HOC-supplied props
    isHover: PropTypes.bool.isRequired,
    isFocus: PropTypes.bool.isRequired,
    handleMouseEnter: PropTypes.func.isRequired,
    handleMouseLeave: PropTypes.func.isRequired,
    handleFocus: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps, prevState, { shouldFocus }) {
    if (shouldFocus && this.button.current) {
      this.button.current.focus();
    }
  }

  getSnapshotBeforeUpdate(prevProps) {
    return {
      // Focus the element if the component transitions from an inactive to active state.
      // This mimics the behavior of native browser radio options; the element is automatically
      // selected (made active) when it gains focus.
      shouldFocus: !prevProps.active && this.props.active,
    };
  }

  button = React.createRef();

  render() {
    const {
      active,
      accentColor,
      idleColor,
      disabled,
      label,
      value,
      isHover,
      isFocus,
      handleMouseEnter,
      handleMouseLeave,
      handleFocus,
      handleBlur,
      ...props
    } = this.props;

    const containerStyle = {
      alignItems: 'center',
      background: 'inherit',
      border: 0,
      cursor: disabled ? 'inherit' : 'pointer',
      display: 'flex',
      pointerEvents: disabled ? 'none' : 'inherit',
    };

    const radioContainerStyle = {
      alignItems: 'center',
      borderRadius: '50%',
      display: 'flex',
      flexShrink: 0,
      height: '12px',
      justifyContent: 'center',
      opacity: disabled ? 0.5 : 1,
      width: '12px',
      ...transitionStyle(),
    };

    const radioStyle = {
      backgroundColor: active ? accentColor : idleColor,
      borderRadius: '50%',
      height: '100%',
      opacity: (isHover || active) ? 1 : 0.7,
      width: '100%',
      ...transitionStyle(),
    };

    const radioFocusStyle = {
      backgroundColor: accentColor,
      borderRadius: '50%',
      height: '30px',
      opacity: isFocus ? 0.15 : 0,
      position: 'absolute',
      width: '30px',
      ...transitionStyle(),
    };

    return (
      <button
        ref={this.button}
        role="radio"
        aria-checked={active}
        aria-labelledby={typeof label === 'string' ? label : value}
        style={containerStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      >
        <div style={radioContainerStyle}>
          <div style={radioStyle} />
          <div style={radioFocusStyle} />
        </div>

        {typeof label === 'string' ? (
          <Spacing size="small" left inline>
            <Text size="iota" color="gray80" inline>
              {label}
            </Text>
          </Spacing>
        ) : label}
      </button>
    );
  }
}

export default compose(
  withToggleState({
    key: 'isHover',
    enable: 'handleMouseEnter',
    disable: 'handleMouseLeave',
  }),
  withToggleState({
    key: 'isFocus',
    enable: 'handleFocus',
    disable: 'handleBlur',
  }),
)(RadioButton);
