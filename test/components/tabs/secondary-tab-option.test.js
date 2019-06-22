import { shallow } from 'enzyme';
import React from 'react';
import SecondaryTabOption from 'components/tabs/secondary-tab-option';
import { colors } from 'styles/color';

describe('Secondary tab option', () => {
  const defaultProps = {
    baseStyle: {},
    isSelected: false,
    isInvert: false,
    onClick: () => {},
    children: 'children',
  };

  test('Idle style', () => {
    const tab = shallow(
      <SecondaryTabOption
        {...defaultProps}
        isSelected={false}
        isInvert={false}
      />,
    );

    expect(tab.find('button').props().style.borderBottom).toBe('2.5px solid rgba(0, 0, 0, 0)');
    expect(tab.find('button').props().style.borderTop).toBe('2.5px solid rgba(0, 0, 0, 0)');
  });

  test('Active, non-inverted style', () => {
    const tab = shallow(
      <SecondaryTabOption
        {...defaultProps}
        isInvert={false}
        isSelected
      />,
    );

    expect(tab.find('button').props().style.borderBottom).toBe(`2.5px solid ${colors.primary}`);
    expect(tab.find('button').props().style.borderTop).toBe('2.5px solid rgba(0, 0, 0, 0)');
  });

  test('Active, non-inverted style', () => {
    const tab = shallow(
      <SecondaryTabOption
        {...defaultProps}
        isInvert
        isSelected
      />,
    );

    expect(tab.find('button').props().style.borderBottom).toBe('2.5px solid rgba(0, 0, 0, 0)');
    expect(tab.find('button').props().style.borderTop).toBe(`2.5px solid ${colors.primary}`);
  });

  test('Click handler', () => {
    const mockOnClick = jest.fn();
    const tab = shallow(
      <SecondaryTabOption
        {...defaultProps}
        onClick={mockOnClick}
      />,
    );

    expect(mockOnClick).not.toBeCalled();
    tab.find('button').simulate('click');
    expect(mockOnClick).toBeCalled();
  });

  test('Rendering of children', () => {
    const tab = shallow(
      <SecondaryTabOption {...defaultProps}>
        children
      </SecondaryTabOption>,
    );

    expect(tab.text()).toBe('children');
  });
});
