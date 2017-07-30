import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spacing from 'components/spacing';
import Text from 'components/text';
import { colors } from 'styles/color';

/**
 * Dropdown menu in an expanded SelectList.
 */
export default class SelectListItem extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  state = {
    isHover: false,
  };

  handleHoverStateChange = (isHover) => () => this.setState({ isHover });

  render() {
    const { label, width, onClick } = this.props;
    const { isHover } = this.state;

    const style = {
      backgroundColor: isHover ? colors.primaryLight : 'white',
      border: `1px solid ${colors.gray10}`,
      borderTop: 'none',
      cursor: 'pointer',
      display: 'flex',
      padding: '8px 10px',
      transition: 'all 0.15s ease',
      width,
    };

    return (
      <div
        style={style}
        onClick={onClick}
        onMouseEnter={this.handleHoverStateChange(true)}
        onMouseLeave={this.handleHoverStateChange(false)}
      >
        <Spacing size="small" padding right>
          <Text size="iota" inline>
            {label}
          </Text>
        </Spacing>
      </div>
    );
  }
}
