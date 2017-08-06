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
      selectedOption: {
        label: placeholder,
        value: PLACEHOLDER_VALUE,
      },
    };
  }

  onChange = (selectedOption) => () => {
    this.props.onChange(selectedOption.value);
    this.setState({ selectedOption });
    this.toggleExpand();
  };

  toggleExpand = () => this.setState(({ isExpanded }) => ({ isExpanded: !isExpanded }));

  render() {
    const { label, sublabel, options, width, height, error, style: overrides } = this.props;
    const { isExpanded, selectedOption } = this.state;

    const dropdownElementsStyle = {
      position: 'absolute',
      zIndex: 2,
      ...height && {
        height,
        overflowY: 'auto',
        overflowX: 'hidden',
      },
    };

    const dropdownElements = options.map((option) => (
      <SelectListItem
        key={option.value}
        label={option.label}
        width={width}
        onClick={this.onChange(option)}
      />
    ));

    return (
      <div style={overrides}>
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
          arrowDirection={isExpanded ? 'up' : 'down'}
          width={width}
          error={error}
          onClick={this.onChange(selectedOption)}
          {...isExpanded && { color: colors.primary }}
        />

        {
          isExpanded && (
            <div style={dropdownElementsStyle}>
              {dropdownElements}
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
