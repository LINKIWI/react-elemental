import { shallow } from 'enzyme';
import React from 'react';
import SelectListPlaceholder from 'components/select-list/select-list-placeholder';
import Text from 'components/text';

describe('Select list placeholder', () => {
  const defaultProps = {
    label: 'label',
    width: 400,
    arrowDirection: 'up',
    onClick: () => {},
    onHoverStateChange: () => () => {},
  };

  test('Basic rendering', () => {
    const selectListPlaceholder = shallow(
      <SelectListPlaceholder {...defaultProps} />,
    );

    expect(selectListPlaceholder.find(Text).length).toBe(2);
    expect(selectListPlaceholder.find(Text).at(0).children().text()).toBe('label');
    expect(selectListPlaceholder.find(Text).at(1).children().text()).toBe('▾');
  });

  test('Click handler', () => {
    const onClick = jest.fn();
    const props = {
      ...defaultProps,
      onClick,
    };

    const selectListPlaceholder = shallow(
      <SelectListPlaceholder {...props} />,
    );

    expect(onClick.mock.calls.length).toBe(0);
    selectListPlaceholder.at(0).simulate('click');
    expect(onClick).toBeCalled();
  });

  test('Hover state handler', () => {
    const cb = jest.fn();
    const onHoverStateChange = (isHovered) => () => cb(isHovered);
    const props = {
      ...defaultProps,
      onHoverStateChange,
    };

    const selectListPlaceholder = shallow(
      <SelectListPlaceholder {...props} />,
    );

    expect(cb.mock.calls.length).toBe(0);
    selectListPlaceholder.at(0).simulate('mouseenter');
    expect(cb).toBeCalledWith(true);
    selectListPlaceholder.at(0).simulate('mouseleave');
    expect(cb).toBeCalledWith(false);
  });

  test('Expanded placeholder style', () => {
    const props = {
      ...defaultProps,
      arrowDirection: 'down',
    };

    const selectListPlaceholder = shallow(
      <SelectListPlaceholder {...props} />,
    );

    expect(selectListPlaceholder.find(Text).at(1).props().style.transform).toBe('rotate(0deg)');
  });
});
