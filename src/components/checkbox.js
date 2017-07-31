import React, { Component } from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';
import Check from 'react-icons/lib/md/check';
import Spacing from 'components/spacing';
import Text from 'components/text';
import { colors } from 'styles/color';

const KEY_CODE_SPACE = 32;
const KEY_CODE_ENTER = 13;
const KEY_CODE_ESCAPE = 27;

const noop = () => {};

/**
 * Styled checkbox element.
 */
class Checkbox extends Component {
  static propTypes = {
    isChecked: PropTypes.bool,
    label: PropTypes.string,
    style: PropTypes.object,
    disabled: PropTypes.bool,
    onCheck: PropTypes.func,
    onUncheck: PropTypes.func,
  };

  static defaultProps = {
    isChecked: false,
    label: null,
    disabled: false,
    style: {},
    onCheck: noop,
    onUncheck: noop,
  };

  constructor(props) {
    super(props);

    this.state = {
      isChecked: props.isChecked,
      ref: null,
    };
  }

  /**
   * Set a ref to checkbox container in component state.
   *
   * @param {HTMLElement} ref Node for the check container.
   */
  setRef = (ref) => {
    if (!this.state.ref) {
      this.setState({ ref });
    }
  };

  /**
   * For accessibility compatibility: by default, after clicking on the checkbox, the DOM element
   * will still remain in focus. This workaround forces the DOM to un-focus the element after
   * mousing out, so that the focus style does not clash with the hover style.
   */
  handleMouseOut = () => {
    const { ref } = this.state;

    if (ref) {
      ref.blur();
    }
  };

  /**
   * For accessibility compatibility: while the checkbox is in focus, pressing the space and enter
   * keys should toggle the checkbox while pressing the escape key should always uncheck it.
   *
   * @param {Object} evt The keyboard DOM event.
   * @returns {*} Return value is unused.
   */
  handleKeyDown = (evt) => {
    const { onUncheck } = this.props;

    switch (evt.keyCode) {
      case KEY_CODE_SPACE:
      case KEY_CODE_ENTER:
        return this.toggleCheckState();
      case KEY_CODE_ESCAPE:
        this.setState({ isChecked: false });
        return onUncheck();
      default:
        return null;
    }
  };

  /**
   * Clicking the checkbox should toggle the current check state.
   */
  handleClick = () => this.toggleCheckState();

  /**
   * Toggle the current check state of the checkbox. This will also trigger the check/uncheck
   * callbacks as appropriate.
   */
  toggleCheckState = () => {
    const { isChecked } = this.state;
    const { disabled, onCheck, onUncheck } = this.props;

    if (disabled) {
      return;
    }

    this.setState({ isChecked: !isChecked });

    (isChecked ? onUncheck : onCheck)();
  };

  /**
   * Return whether the checkbox is currently checked.
   *
   * @returns {Boolean} True if the checkbox is currently checked; false otherwise.
   */
  isChecked = () => this.state.isChecked;

  render() {
    const { label, disabled, style: overrides } = this.props;
    const { isChecked } = this.state;

    const containerStyle = {
      cursor: 'pointer',
      display: 'flex',
      opacity: disabled ? 0.6 : 1,
      userSelect: 'none',
      ':hover': !disabled && {
        opacity: 0.85,
      },
      ':focus': !disabled && {
        opacity: 0.85,
      },
      transition: 'all 0.2s ease',
      ...overrides,
    };

    const checkboxStyle = {
      backgroundColor: colors.gray5,
      color: isChecked ? colors.primary : colors.primaryLight,
      display: 'flex',
      height: '18px',
      margin: 'auto',
      padding: '1px',
      width: '18px',
      transition: 'all 0.15s ease-out',
    };

    const checkStyle = {
      margin: 'auto',
    };

    return (
      <div style={containerStyle} key="elemental-checkbox">
        <span
          style={containerStyle}
          onClick={this.handleClick}
          draggable="false"
        >
          <span
            ref={this.setRef}
            style={checkboxStyle}
            onMouseOut={this.handleMouseOut}
            onKeyDown={this.handleKeyDown}
            tabIndex={0}
          >
            <Check style={checkStyle} />
          </span>

          {
            label && (
              <Spacing size="small" left inline>
                <Text size="iota" color="gray60" inline>
                  {label}
                </Text>
              </Spacing>
            )
          }
        </span>
      </div>
    );
  }
}

export default Radium(Checkbox);
