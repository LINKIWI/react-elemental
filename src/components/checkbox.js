import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spacing from 'components/spacing';
import Text from 'components/text';
import Check from 'icons/check';
import { colors } from 'styles/color';
import noop from 'util/noop';

/**
 * Styled checkbox element.
 */
class Checkbox extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    label: PropTypes.string,
    style: PropTypes.object,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.node,
  };

  static defaultProps = {
    checked: false,
    label: null,
    style: {},
    disabled: false,
    onChange: noop,
    children: null,
  };

  state = { isHover: false, isFocus: false };

  handleClick = () => {
    const { checked, onChange, disabled } = this.props;

    return !disabled && onChange(!checked);
  };

  handleHoverChange = (isHover) => () => this.setState({ isHover });

  handleFocusChange = (isFocus) => () => this.setState({ isFocus });

  render() {
    const {
      checked,
      label,
      style: overrides,
      disabled,
      children,
      ...proxyProps
    } = this.props;
    const { isHover, isFocus } = this.state;
    const isActive = isHover || isFocus;

    const backgroundColor = (() => {
      if (checked) {
        return colors.primary;
      }

      return disabled ? colors.gray5 : 'rgb(250, 250, 250)';
    })();

    const borderColor = (() => {
      if (checked) {
        return colors.primary;
      }

      return isActive ? colors.gray20 : colors.gray10;
    })();

    const containerStyle = {
      alignItems: 'center',
      background: 'inherit',
      border: 0,
      cursor: 'pointer',
      display: 'inline-flex',
      ...overrides,
    };

    const checkboxStyle = {
      alignItems: 'center',
      backgroundColor,
      border: `1px solid ${borderColor}`,
      display: 'flex',
      height: '16px',
      justifyContent: 'center',
      opacity: disabled ? 0.5 : 1,
      width: '16px',
      transition: 'all 0.15s ease',
    };

    const checkStyle = {
      fill: colors.gray5,
      opacity: checked ? 1 : 0,
      transition: 'all 0.15s ease',
    };

    return (
      <button
        style={containerStyle}
        onClick={this.handleClick}
        onMouseEnter={this.handleHoverChange(true)}
        onMouseLeave={this.handleHoverChange(false)}
        onFocus={this.handleFocusChange(true)}
        onBlur={this.handleFocusChange(false)}
        {...proxyProps}
      >
        <div style={checkboxStyle}>
          <Check style={checkStyle} />
        </div>

        {label && (
          <Spacing size="small" left inline>
            <Text size="iota" color="gray80" inline>
              {label}
            </Text>
          </Spacing>
        )}

        {children}
      </button>
    );
  }
}

export default Checkbox;
