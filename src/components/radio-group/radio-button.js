import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spacing from 'components/spacing';
import Text from 'components/text';
import { colors } from 'styles/color';
import compose from 'util/compose';
import withToggleState from 'util/with-toggle-state';

/**
 * Single radio button option in an externally controlled group of such options.
 */
class RadioButton extends Component {
  static propTypes = {
    // Whether the button is currently selected.
    active: PropTypes.bool.isRequired,
    // Selection accent color.
    color: PropTypes.string.isRequired,
    // Whether the button is disabled.
    disabled: PropTypes.bool.isRequired,
    // Label to display next to the radio button.
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]).isRequired,
    // HOC-supplied props
    isHover: PropTypes.bool.isRequired,
    isFocus: PropTypes.bool.isRequired,
    handleMouseEnter: PropTypes.func.isRequired,
    handleMouseLeave: PropTypes.func.isRequired,
    handleFocus: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps, prevState, shouldFocus) {
    if (shouldFocus && this.button.current) {
      this.button.current.focus();
    }
  }

  getSnapshotBeforeUpdate(prevProps) {
    // Focus the element if the component transitions from an inactive to active state.
    // This mimics the behavior of native browser radio options; the element is automatically
    // selected (made active) when it gains focus.
    return !prevProps.active && this.props.active;
  }

  button = React.createRef();

  render() {
    const {
      active,
      color,
      disabled,
      label,
      isHover,
      isFocus,
      handleMouseEnter,
      handleMouseLeave,
      handleFocus,
      handleBlur,
      ...props
    } = this.props;

    const radioColor = (() => {
      if (active) {
        return color;
      }

      if (isHover) {
        return colors.gray20;
      }

      return colors.gray10;
    })();

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
      height: '10px',
      justifyContent: 'center',
      opacity: disabled ? 0.5 : 1,
      transition: 'all 0.15s ease',
      width: '10px',
    };

    const radioStyle = {
      backgroundColor: radioColor,
      borderRadius: '50%',
      height: '100%',
      transition: 'all 0.15s ease',
      width: '100%',
    };

    const radioFocusStyle = {
      backgroundColor: color,
      borderRadius: '50%',
      height: '30px',
      opacity: isFocus ? 0.15 : 0,
      position: 'absolute',
      transition: 'all 0.15s ease',
      width: '30px',
    };

    return (
      <button
        ref={this.button}
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
