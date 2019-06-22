import PropTypes from 'prop-types';
import React, { Component } from 'react';
import RadioButton from 'components/radio-group/radio-button';
import Spacing from 'components/spacing';
import { colors } from 'styles/color';
import { KEY_CODE_UP, KEY_CODE_DOWN, KEY_CODE_LEFT, KEY_CODE_RIGHT } from 'util/constants';
import noop from 'util/noop';
import { modulo } from 'util/number';

/**
 * Group of individually selectable radio buttons.
 */
class RadioGroup extends Component {
  static propTypes = {
    // Array of radio button options in the group.
    options: PropTypes.arrayOf(PropTypes.shape({
      // String ID used to uniquely identify this option entry.
      value: PropTypes.string.isRequired,
      // Element to display as the label of the radio button.
      label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
      ]).isRequired,
      // Whether the option should be disabled (e.g., unselectable).
      disabled: PropTypes.bool,
    })),
    // The currently selected radio option.
    value: PropTypes.string,
    // Accent color to use for an active or focused radio button.
    accentColor: PropTypes.string,
    // Idle color to use for an inactive radio button.
    idleColor: PropTypes.string,
    // Function that describes how individual radio buttons should be rendered.
    radioRenderer: PropTypes.func,
    // Callback to invoke when the currently selected radio option is changed.
    onChange: PropTypes.func,
  };

  static defaultProps = {
    options: [],
    value: null,
    accentColor: undefined,
    idleColor: colors.gray10,
    radioRenderer: (option, idx, options) => (
      <Spacing key={option.props.value} size="tiny" bottom={idx < options.length - 1}>
        {option}
      </Spacing>
    ),
    onChange: noop,
  };

  /**
   * Determine the option index corresponding to the currently selected value.
   *
   * @returns {number} Index of the currently selected option if valid; -1 if no option is currently
   *                   selected or the value is invalid.
   */
  currentSelectedIdx = () => {
    const { options, value: selected } = this.props;

    return options.map(({ value }) => value).indexOf(selected);
  };

  /**
   * Advance the selection index by an offset, ensuring to skip disabled options.
   *
   * @param {number} startIdx Starting index from which to offset.
   * @param {number} offset Integral offset from the index.
   * @returns {number} Index of the option (with proper wrapping) corresponding to the specified
   *                   offset. Note that this function properly normalizes for disabled options.
   */
  advanceIdx = (startIdx, offset) => {
    const { options } = this.props;

    const nextIdx = modulo(startIdx + offset, options.length);

    // If the option is disabled, use the same offset (in the same direction) to find the next
    // option that isn't disabled. This effectively "skips" all disabled entries.
    return options[nextIdx].disabled ? this.advanceIdx(nextIdx, offset) : nextIdx;
  };

  /**
   * Event handler for keydown events when any radio button is currently in focus.
   *
   * @param {Object} evt Keyboard event.
   */
  handleKeyDown = (evt) => {
    const { options, onChange } = this.props;

    // For purposes of keyboard navigation, move radio focus relative to the first element in the
    // event that no radio button is currently selected.
    const currentIdx = Math.max(this.currentSelectedIdx(), 0);

    switch (evt.keyCode) {
      case KEY_CODE_UP:
      case KEY_CODE_LEFT:
        evt.preventDefault();
        return onChange(options[this.advanceIdx(currentIdx, -1)].value);

      case KEY_CODE_DOWN:
      case KEY_CODE_RIGHT:
        evt.preventDefault();
        return onChange(options[this.advanceIdx(currentIdx, 1)].value);

      default:
        return null;
    }
  };

  render() {
    const {
      options,
      value: selected,
      onChange,
      accentColor = colors.primary,
      idleColor,
      radioRenderer,
      ...props
    } = this.props;

    const radioButtons = options.map(({ value, label, disabled = false }, idx) => {
      const isTabSelectable =
        // Tab selection should jump to the currently selected option, if available.
        value === selected ||
        // Otherwise, if no option is selected, it should jump to the first option.
        (this.currentSelectedIdx() === -1 && idx === 0);

      const handleClick = () => {
        // Don't invoke the change handler if the radio selection has not actually changed
        if (value !== selected) {
          onChange(value);
        }
      };

      return (
        <RadioButton
          accentColor={accentColor}
          idleColor={idleColor}
          label={label}
          value={value}
          active={value === selected}
          tabIndex={isTabSelectable ? 0 : -1}
          disabled={disabled}
          onClick={handleClick}
          onKeyDown={this.handleKeyDown}
        />
      );
    });

    return (
      <div role="radiogroup" {...props}>
        {radioButtons.map(radioRenderer)}
      </div>
    );
  }
}

export default RadioGroup;
