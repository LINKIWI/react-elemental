import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import SelectList from 'components/select-list';
import SelectListItem from 'components/select-list/select-list-item';
import SelectListPlaceholder from 'components/select-list/select-list-placeholder';
import Text from 'components/text';
import { colors } from 'styles/color';

describe('Select list', () => {
  const defaultProps = {
    label: null,
    sublabel: null,
    placeholder: 'Select an item...',
    options: [],
    width: '100%',
    height: 300,
    error: null,
    onChange: () => {},
  };

  test('Accepts proxy props', () => {
    const onClick = jest.fn();
    const selectList = shallow(
      <SelectList
        onClick={onClick}
        {...defaultProps}
      />,
    );

    expect(selectList.at(0).props().onClick).toBe(onClick);
  });

  test('SelectListPlaceholder rendering', () => {
    const selectList = shallow(
      <SelectList {...defaultProps} />,
    );

    expect(selectList.find(SelectListPlaceholder).length).toBe(1);
  });

  test('SelectListItem rendering for each option', () => {
    const props = {
      ...defaultProps,
      options: [
        { label: 'one', value: 'one' },
        { label: 'two', value: 'two' },
      ],
    };

    const selectList = shallow(
      <SelectList {...props} />,
    );

    expect(selectList.state().isExpanded).toBe(false);
    selectList.setState({ isExpanded: true });
    expect(selectList.find(SelectListItem).length).toBe(2);
  });

  test('Label and sublabel rendering', () => {
    const props = {
      ...defaultProps,
      label: 'label',
      sublabel: 'sublabel',
    };

    const selectList = shallow(
      <SelectList {...props} />,
    );

    expect(selectList.find(Text).length).toBe(2);
    expect(selectList.find(Text).at(0).children().text()).toBe('label');
    expect(selectList.find(Text).at(1).children().text()).toBe('sublabel');
  });

  test('Error rendering', () => {
    const props = {
      ...defaultProps,
      error: 'error',
    };

    const selectList = shallow(
      <SelectList {...props} />,
    );

    expect(selectList.find(Text).length).toBe(1);
    expect(selectList.find(Text).children().text()).toBe('error');

    expect(selectList.find(SelectListPlaceholder).props().color).toBe(colors.redLight);
    selectList.setState({ isFocused: true });
    expect(selectList.find(SelectListPlaceholder).props().color).toBe(colors.red);
    selectList.setState({ isFocused: false, isExpanded: true });
    expect(selectList.find(SelectListPlaceholder).props().color).toBe(colors.red);
  });

  test('Hover state change', () => {
    const selectList = mount(
      <SelectList {...defaultProps} />,
    );

    expect(selectList.state().isHovered).toBe(false);
    selectList.find(SelectListPlaceholder).simulate('mouseenter');
    expect(selectList.state().isHovered).toBe(true);
    selectList.find(SelectListPlaceholder).simulate('mouseleave');
    expect(selectList.state().isHovered).toBe(false);
  });

  test('Focus state change', () => {
    const clock = sinon.useFakeTimers();
    const selectList = shallow(
      <SelectList {...defaultProps} />,
    );

    expect(selectList.state().isFocused).toBe(false);
    selectList.at(0).simulate('focus');
    expect(selectList.state().isFocused).toBe(true);
    selectList.at(0).simulate('blur');
    expect(selectList.state().isFocused).toBe(true);
    clock.tick(100);
    expect(selectList.state().isFocused).toBe(false);

    clock.restore();
  });

  test('Toggling expansion state', () => {
    const selectList = shallow(
      <SelectList {...defaultProps} />,
    );

    expect(selectList.state().isExpanded).toBe(false);
    selectList.find(SelectListPlaceholder).simulate('click');
    expect(selectList.state().isExpanded).toBe(true);
    selectList.find(SelectListPlaceholder).simulate('click');
    expect(selectList.state().isExpanded).toBe(false);
  });

  test('Keyboard handler: space', () => {
    const onChange = jest.fn();
    const preventDefault = jest.fn();
    const props = {
      ...defaultProps,
      onChange,
      options: [
        { label: 'one', value: 'one' },
        { label: 'two', value: 'two' },
      ],
    };

    const selectList = shallow(
      <SelectList {...props} />,
    );

    selectList.at(0).simulate('keydown', { keyCode: 32, preventDefault });
    expect(preventDefault).toBeCalled();
    expect(selectList.state().isExpanded).toBe(true);
  });

  test('Keyboard handler: enter', () => {
    const onChange = jest.fn();
    const preventDefault = jest.fn();
    const props = {
      ...defaultProps,
      onChange,
      options: [
        { label: 'one', value: 'one' },
        { label: 'two', value: 'two' },
      ],
    };

    const selectList = shallow(
      <SelectList {...props} />,
    );

    selectList.at(0).simulate('keydown', { keyCode: 13, preventDefault });
    expect(preventDefault).toBeCalled();
    expect(selectList.state().isExpanded).toBe(true);
  });

  test('Keyboard handler: esc', () => {
    const clock = sinon.useFakeTimers();
    const onChange = jest.fn();
    const preventDefault = jest.fn();
    const props = {
      ...defaultProps,
      onChange,
      options: [
        { label: 'one', value: 'one' },
        { label: 'two', value: 'two' },
      ],
    };

    const selectList = shallow(
      <SelectList {...props} />,
    );

    selectList.at(0).simulate('keydown', { keyCode: 13, preventDefault });
    expect(preventDefault).toBeCalled();
    expect(selectList.state().isExpanded).toBe(true);
    selectList.at(0).simulate('keydown', { keyCode: 27, preventDefault });
    clock.tick(100);
    expect(selectList.state().isExpanded).toBe(false);
    expect(selectList.state().isFocused).toBe(false);
    expect(selectList.state().highlightedIdx).toBe(null);

    clock.restore();
  });

  test('Keyboard handler: up', () => {
    const onChange = jest.fn();
    const preventDefault = jest.fn();
    const props = {
      ...defaultProps,
      onChange,
      options: [
        { label: 'one', value: 'one' },
        { label: 'two', value: 'two' },
      ],
    };

    const selectList = shallow(
      <SelectList {...props} />,
    );

    selectList.at(0).simulate('keydown', { keyCode: 38, preventDefault });
    expect(preventDefault).toBeCalled();
    expect(selectList.state().isExpanded).toBe(true);
    expect(selectList.state().highlightedIdx).toBe(-1);
    selectList.at(0).simulate('keydown', { keyCode: 38, preventDefault });
    expect(selectList.state().highlightedIdx).toBe(-2);
    selectList.at(0).simulate('keydown', { keyCode: 13, preventDefault });
    expect(onChange).toBeCalledWith('one');
  });

  test('Keyboard handler: down', () => {
    const onChange = jest.fn();
    const preventDefault = jest.fn();
    const props = {
      ...defaultProps,
      onChange,
      options: [
        { label: 'one', value: 'one' },
        { label: 'two', value: 'two' },
      ],
    };

    const selectList = shallow(
      <SelectList {...props} />,
    );

    selectList.at(0).simulate('keydown', { keyCode: 40, preventDefault });
    expect(preventDefault).toBeCalled();
    expect(selectList.state().isExpanded).toBe(true);
    expect(selectList.state().highlightedIdx).toBe(0);
    selectList.at(0).simulate('keydown', { keyCode: 40, preventDefault });
    expect(selectList.state().highlightedIdx).toBe(1);
    selectList.at(0).simulate('keydown', { keyCode: 13, preventDefault });
    expect(onChange).toBeCalledWith('two');
  });

  test('Keyboard handler: character search for non-control character', () => {
    const onChange = jest.fn();
    const preventDefault = jest.fn();
    const props = {
      ...defaultProps,
      onChange,
      options: [
        { label: 'one', value: 'one' },
        { label: 'two', value: 'two' },
      ],
    };

    const selectList = shallow(
      <SelectList {...props} />,
    );

    selectList.at(0).simulate('keydown', { keyCode: 75, preventDefault });
    expect(selectList.state().highlightedIdx).toBe(null);
    selectList.at(0).simulate('keydown', { keyCode: 79, preventDefault });
    expect(selectList.state().isExpanded).toBe(true);
    expect(selectList.state().highlightedIdx).toBe(0);
    selectList.at(0).simulate('keydown', { keyCode: 13, preventDefault });
    expect(onChange).toBeCalledWith('one');
  });

  test('Keyboard handler: character search for control character', () => {
    const onChange = jest.fn();
    const preventDefault = jest.fn();
    const props = {
      ...defaultProps,
      onChange,
      options: [
        { label: 'one', value: 'one' },
        { label: 'two', value: 'two' },
      ],
    };

    const selectList = shallow(
      <SelectList {...props} />,
    );

    selectList.at(0).simulate('keydown', { keyCode: 59, preventDefault });
    expect(selectList.state().isExpanded).toBe(false);
    expect(selectList.state().highlightedIdx).toBe(null);
  });
});
