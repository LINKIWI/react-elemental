import { mount } from 'enzyme';
import React from 'react';
import SelectListItem from 'components/select-list/select-list-item';
import Text from 'components/text';

describe('Select list item', () => {
  const defaultProps = {
    label: 'label',
    width: 400,
    onClick: () => {},
  };

  test('Basic rendering', () => {
    const selectListItem = mount(
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

    const selectListItem = mount(
      <SelectListItem {...props} />,
    );

    expect(onClick.mock.calls.length).toBe(0);
    selectListItem.find('SelectListItem').at(0).simulate('click');
    expect(onClick).toBeCalled();
  });

  test('Hover state change', () => {
    const selectListItem = mount(
      <SelectListItem {...defaultProps} />,
    );

    expect(selectListItem.find('SelectListItem').props().isHover).toBe(false);
    selectListItem.find('SelectListItem').at(0).simulate('mouseenter');
    expect(selectListItem.find('SelectListItem').props().isHover).toBe(true);
    selectListItem.find('SelectListItem').at(0).simulate('mouseleave');
    expect(selectListItem.find('SelectListItem').props().isHover).toBe(false);
  });
});
