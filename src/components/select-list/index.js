import Color from 'color';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SelectListItem from 'components/select-list/select-list-item';
import SelectListPlaceholder from 'components/select-list/select-list-placeholder';
import Spacing from 'components/spacing';
import Text from 'components/text';
import { colors } from 'styles/color';
import noop from 'util/noop';
import {
  KEY_CODE_ENTER,
  KEY_CODE_ESC,
  KEY_CODE_SPACE,
  KEY_CODE_UP,
  KEY_CODE_DOWN,
} from 'util/constants';
import { modulo } from 'util/number';

// Generic, (hopefully) unique key reserved for the placeholder item in the select list.
const PLACEHOLDER_VALUE = 'select-list-placeholder-item-value';

/**
 * Dropdown menu component.
 */
export default class SelectList extends Component {
  static propTypes = {
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
    inverted: PropTypes.bool,
    style: PropTypes.object,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    placeholder: 'Select an item...',
    options: [],
    width: '100%',
    height: null,
    error: null,
    inverted: false,
    style: {},
    onChange: noop,
  };

  constructor(props) {
    super(props);

    const { placeholder } = this.props;

    this.state = {
      isExpanded: false,
      isFocused: false,
      isHovered: false,
      selectedOption: {
        label: placeholder,
        value: PLACEHOLDER_VALUE,
      },
      highlightedIdx: null,
    };
  }

  setDropdownRef = (ref) => {
    this.dropdown = ref;
  };

  setContainerRef = (ref) => {
    this.container = ref;
  };

  handleChange = (selectedOption) => () => {
    this.props.onChange(selectedOption.value);
    this.setState({ selectedOption, isExpanded: false });
    this.container.focus();
  };

  handleHoverStateChange = (isHovered) => () => this.setState({ isHovered });

  handleFocus = () => this.setState({ isFocused: true });

  // The dropdown will be blurred on any mouse event that isn't on the select item placeholder.
  // In order to allow the onClick event of the dropdown items to fire instead of triggering the
  // normal onBlur behavior, only hide the dropdown items if the click target is outside of the
  // dropdown's containing DOM node.
  handleBlur = (evt) => {
    if (evt && this.dropdown.contains(evt.relatedTarget)) {
      return;
    }

    this.setState({
      isExpanded: false,
      isFocused: false,
      highlightedIdx: null,
    });
  };

  handleKeyDown = (evt) => {
    const { keyCode } = evt;
    const { options } = this.props;

    const withDefaultPrevented = (func) => () => {
      evt.preventDefault();
      return func();
    };

    const selectHandler = () => {
      const { highlightedIdx, isExpanded } = this.state;

      if (highlightedIdx === null || !isExpanded) {
        return this.toggleExpand();
      }

      return this.handleChange(options[modulo(highlightedIdx, options.length)])();
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
      [KEY_CODE_SPACE]: withDefaultPrevented(selectHandler),
      [KEY_CODE_ENTER]: withDefaultPrevented(selectHandler),
      [KEY_CODE_ESC]: withDefaultPrevented(escapeHandler),
      [KEY_CODE_UP]: withDefaultPrevented(upHandler),
      [KEY_CODE_DOWN]: withDefaultPrevented(downHandler),
    };

    return (keyHandlers[keyCode] || characterSearchHandler)();
  };

  toggleExpand = () => this.setState(({ isExpanded }) => ({ isExpanded: !isExpanded }));

  render() {
    const {
      options,
      width,
      height,
      error,
      inverted,
      style: overrides,
      ...proxyProps
    } = this.props;
    const { isExpanded, isFocused, isHovered, selectedOption, highlightedIdx } = this.state;

    const style = {
      display: 'inline-block',
      width,
      ...overrides,
    };

    const dropdownContainerStyle = {
      position: 'relative',
      width: '100%',
    };

    const dropdownElementsStyle = {
      position: 'absolute',
      width: '100%',
      zIndex: 2,
      ...height && {
        height,
        overflowY: 'auto',
        overflowX: 'hidden',
      },
      ...inverted && {
        bottom: 0,
      },
    };

    const outlineColor = (() => {
      if (isExpanded) {
        return error ? colors.red : colors.primary;
      }
      if (isFocused) {
        return error ? colors.red : colors.gray35;
      }
      if (isHovered) {
        return error ? new Color(colors.red).lighten(0.7).string() : colors.gray20;
      }
      return error ? colors.redLight : colors.gray10;
    })();

    const arrowDirection = (() => {
      if (inverted) {
        return isExpanded ? 'down' : 'up';
      }

      return isExpanded ? 'up' : 'down';
    })();

    const placeholder = (
      <SelectListPlaceholder
        label={selectedOption.label}
        color={outlineColor}
        arrowDirection={arrowDirection}
        error={error}
        onClick={this.toggleExpand}
        onHoverStateChange={this.handleHoverStateChange}
      />
    );

    return (
      <div
        ref={this.setContainerRef}
        onKeyDown={this.handleKeyDown}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        tabIndex={0}
        style={style}
        {...proxyProps}
      >
        {!inverted && placeholder}

        <div ref={this.setDropdownRef} style={dropdownContainerStyle}>
          {isExpanded && (
            <div style={dropdownElementsStyle} tabIndex={-1}>
              {options.map((option, idx) => (
                <SelectListItem
                  key={option.value}
                  label={option.label}
                  isSelected={
                    (highlightedIdx !== null) && modulo(highlightedIdx, options.length) === idx
                  }
                  onClick={this.handleChange(option)}
                  style={inverted ? { borderBottom: 'none' } : { borderTop: 'none' }}
                />
              ))}
            </div>
          )}
        </div>

        {inverted && placeholder}

        {error && (
          <Spacing size="micro" top>
            <Text color="red" size="lambda" bold>
              {error}
            </Text>
          </Spacing>
        )}
      </div>
    );
  }
}
