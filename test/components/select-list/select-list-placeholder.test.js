import React from 'react';
import { shallow } from 'enzyme';
import SelectListPlaceholder from 'components/select-list/select-list-placeholder';
import Text from 'components/text';

describe('Select list placeholder', () => {
  const defaultProps = {
    label: 'label',
    width: 400,
    arrowDirection: 'up',
    onClick: () => {},
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
