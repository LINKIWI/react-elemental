import { mount } from 'enzyme';
import React from 'react';
import PrimaryTabOption from 'components/tabs/primary-tab-option';
import { colors } from 'styles/color';

describe('Primary tab option', () => {
  const defaultProps = {
    baseStyle: {},
    isIntermediate: false,
    isSelected: false,
    onClick: () => {},
    children: 'children',
  };

  test('Idle style', () => {
    const tab = mount(
      <PrimaryTabOption
        {...defaultProps}
        isHover={false}
        isIntermediate={false}
      />,
    );

    expect(tab.find('button').props().style.backgroundColor).toBe('inherit');
  });

  test('Active style', () => {
    const tab = mount(
      <PrimaryTabOption
        {...defaultProps}
        isSelected
      />,
    );

    expect(tab.find('button').props().style.backgroundColor).toBe(colors.gray10);
  });

  test('Hover style', () => {
    const tab = mount(
      <PrimaryTabOption
        {...defaultProps}
        isHover
      />,
    );

    tab.find('button').simulate('mouseenter');
    expect(tab.find('button').props().style.backgroundColor).toBe('rgba(253, 253, 253)');
    tab.find('button').simulate('mouseleave');
    expect(tab.find('button').props().style.backgroundColor).toBe('inherit');
  });

  test('Click handler', () => {
    const mockOnClick = jest.fn();
    const tab = mount(
      <PrimaryTabOption
        {...defaultProps}
        onClick={mockOnClick}
      />,
    );

    expect(mockOnClick).not.toBeCalled();
    tab.find('button').simulate('click');
    expect(mockOnClick).toBeCalled();
  });

  test('Rendering of children', () => {
    const tab = mount(
      <PrimaryTabOption {...defaultProps}>
        children
      </PrimaryTabOption>,
    );

    expect(tab.text()).toBe('children');
  });
});
