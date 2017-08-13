import React from 'react';
import { shallow } from 'enzyme';
import SelectListItem from 'components/select-list/select-list-item';
import Text from 'components/text';

describe('Select list item', () => {
  const defaultProps = {
    label: 'label',
    width: 400,
    onClick: () => {},
  };

  test('Basic rendering', () => {
    const selectListItem = shallow(
      <SelectListItem {...defaultProps} />,
    );

    expect(selectListItem.find(Text).children().text()).toBe('label');
  });

  test('Click handler', () => {
    const onClick = jest.fn();
    const props = {
      ...defaultProps,
      onClick,
    };

    const selectListItem = shallow(
      <SelectListItem {...props} />,
    );

    expect(onClick.mock.calls.length).toBe(0);
    selectListItem.at(0).simulate('click');
    expect(onClick).toBeCalled();
  });

  test('Hover state change', () => {
    const selectListItem = shallow(
      <SelectListItem {...defaultProps} />,
    );

    expect(selectListItem.state().isHover).toBe(false);
    selectListItem.at(0).simulate('mouseenter');
    expect(selectListItem.state().isHover).toBe(true);
    selectListItem.at(0).simulate('mouseleave');
    expect(selectListItem.state().isHover).toBe(false);
  });
});
