import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectListItem from 'components/select-list/select-list-item';
import SelectListPlaceholder from 'components/select-list/select-list-placeholder';
import Spacing from 'components/spacing';
import Text from 'components/text';
import { colors } from 'styles/color';

const noop = () => {};

// Generic, (hopefully) unique key reserved for the placeholder item in the select list.
const PLACEHOLDER_VALUE = 'select-list-placeholder-item-value';

// Mapping of keys to event key codes.
const KEY_CODES = {
  SPACE: 32,
  ENTER: 13,
  ESC: 27,
  UP: 38,
  DOWN: 40,
};

/**
 * Some cleverness is required to make Javascript's modulo operator return a nonnegative number for
 * modulo operations on negative integers.
 *
 * @param {number} num Number for which a modulo operation should be performed.
 * @param {number} modulus Modulus integer.
 */
const modulo = (num, modulus) => ((num % modulus) + modulus) % modulus;

/**
 * Dropdown menu component.
 */
export default class SelectList extends Component {
  static propTypes = {
    label: PropTypes.string,
    sublabel: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })),
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    height: PropTypes.number,
    error: PropTypes.string,
    style: PropTypes.object,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    label: null,
    sublabel: null,
    placeholder: 'Select an item...',
    options: [],
    width: '100%',
    height: null,
    error: null,
    style: {},
    onChange: noop,
  };

  constructor(props) {
    super(props);

    const { placeholder } = this.props;

    this.state = {
      isExpanded: false,
      isFocused: false,
      selectedOption: {
        label: placeholder,
        value: PLACEHOLDER_VALUE,
      },
      highlightedIdx: null,
    };
  }

  onChange = (selectedOption) => () => {
    this.props.onChange(selectedOption.value);
    this.setState({ selectedOption });
    this.toggleExpand();
  };

  handleFocus = () => this.setState({ isFocused: true });

  // The dropdown will be blurred on any mouse event that isn't on the select item placeholder.
  // In order to allow the onClick event of the dropdown items to fire before triggering normal
  // onBlur behavior, we will delay the standard blur behavior.
  handleBlur = () => setTimeout(() => {
    this.setState({
      isExpanded: false,
      isFocused: false,
      highlightedIdx: null,
    });
  }, 50);

  handleKeyDown = (evt) => {
    const { keyCode } = evt;
    const { options } = this.props;

    const selectHandler = () => {
      const { highlightedIdx } = this.state;

      if (highlightedIdx !== null) {
        return this.onChange(options[modulo(highlightedIdx, options.length)])();
      }

      return this.toggleExpand();
    };

    const escapeHandler = () => this.handleBlur();

    const upHandler = () => this.setState(({ highlightedIdx }) => ({
      isExpanded: true,
      highlightedIdx: highlightedIdx === null ? -1 : highlightedIdx - 1,
    }));

    const downHandler = () => this.setState(({ highlightedIdx }) => ({
      isExpanded: true,
      highlightedIdx: highlightedIdx === null ? 0 : highlightedIdx + 1,
    }));

    const characterSearchHandler = () => {
      const char = String.fromCharCode(keyCode);
      const isNonControlCharacter =
        // Number keys
        (keyCode > 47 && keyCode < 58) ||
        // Alphabetic keys
        (keyCode > 64 && keyCode < 91);
      const matchingOptionIdx = options
        .findIndex((option) => option.label.toLowerCase().startsWith(char.toLowerCase()));

      // Don't attempt to perform a character search on pressed control characters
      if (!isNonControlCharacter) {
        return null;
      }

      return this.setState(({ highlightedIdx }) => ({
        isExpanded: true,
        highlightedIdx: (matchingOptionIdx >= 0) ? matchingOptionIdx : highlightedIdx,
      }));
    };

    const keyHandlers = {
      [KEY_CODES.SPACE]: selectHandler,
      [KEY_CODES.ENTER]: selectHandler,
      [KEY_CODES.ESC]: escapeHandler,
      [KEY_CODES.UP]: upHandler,
      [KEY_CODES.DOWN]: downHandler,
    };

    return (keyHandlers[keyCode] || characterSearchHandler)();
  };

  toggleExpand = () => this.setState(({ isExpanded }) => ({ isExpanded: !isExpanded }));

  render() {
    const { label, sublabel, options, width, height, error, style: overrides } = this.props;
    const { isExpanded, isFocused, selectedOption, highlightedIdx } = this.state;

    const dropdownElementsStyle = {
      position: 'absolute',
      zIndex: 2,
      ...height && {
        height,
        overflowY: 'auto',
        overflowX: 'hidden',
      },
    };

    const outlineColor = (() => {
      if (isExpanded) {
        return colors.primary;
      }
      if (isFocused) {
        return colors.gray35;
      }
      return colors.gray10;
    })();

    return (
      <div
        onKeyDown={this.handleKeyDown}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        tabIndex={0}
        style={overrides}
      >
        {
          (label || sublabel) && (
            <Spacing size="tiny" bottom>
              {
                label && (
                  <Text size="kilo" color="gray50" uppercase bold>
                    {label}
                  </Text>
                )
              }
              {
                label && (
                  <Text size="lambda" color="gray25">
                    {sublabel}
                  </Text>
                )
              }
            </Spacing>
          )
        }

        <SelectListPlaceholder
          label={selectedOption.label}
          color={outlineColor}
          arrowDirection={isExpanded ? 'up' : 'down'}
          width={width}
          error={error}
          onClick={this.onChange(selectedOption)}
        />

        {
          isExpanded && (
            <div style={dropdownElementsStyle}>
              {options.map((option, idx) => (
                <SelectListItem
                  key={option.value}
                  label={option.label}
                  width={width}
                  isSelected={
                    (highlightedIdx !== null) && modulo(highlightedIdx, options.length) === idx
                  }
                  onClick={this.onChange(option)}
                />
              ))}
            </div>
          )
        }

        {
          error && (
            <Spacing size="micro" top>
              <Text color="red" size="lambda" bold>
                {error}
              </Text>
            </Spacing>
          )
        }
      </div>
    );
  }
}
