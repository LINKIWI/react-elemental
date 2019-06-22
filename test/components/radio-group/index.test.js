import { shallow, mount } from 'enzyme';
import React from 'react';
import RadioGroup from 'components/radio-group';
import RadioButton from 'components/radio-group/radio-button';
import {
  KEY_CODE_UP,
  KEY_CODE_DOWN,
  KEY_CODE_LEFT,
  KEY_CODE_RIGHT,
  KEY_CODE_ENTER,
} from 'util/constants';

describe('Radio group', () => {
  test('Props proxy', () => {
    const mockOnClick = jest.fn();
    const group = shallow(
      <RadioGroup onClick={mockOnClick} />,
    );

    expect(mockOnClick).not.toBeCalled();
    group.simulate('click');
    expect(mockOnClick).toBeCalled();
  });

  test('First element is tab selectable when no value is selected', () => {
    const group = mount(
      <RadioGroup
        options={[
          { value: 'one', label: 'one' },
          { value: 'two', label: 'two' },
          { value: 'three', label: 'three' },
        ]}
      />,
    );

    expect(group.find(RadioButton).length).toBe(3);
    expect(group.find(RadioButton).at(0).props().tabIndex).toBe(0);
    expect(group.find(RadioButton).at(1).props().tabIndex).toBe(-1);
    expect(group.find(RadioButton).at(2).props().tabIndex).toBe(-1);
  });

  test('Selected element is tab selectable when a value is selected', () => {
    const group = mount(
      <RadioGroup
        options={[
          { value: 'one', label: 'one' },
          { value: 'two', label: 'two' },
          { value: 'three', label: 'three' },
        ]}
        value="two"
      />,
    );

    expect(group.find(RadioButton).length).toBe(3);
    expect(group.find(RadioButton).at(0).props().tabIndex).toBe(-1);
    expect(group.find(RadioButton).at(1).props().tabIndex).toBe(0);
    expect(group.find(RadioButton).at(2).props().tabIndex).toBe(-1);
  });

  test('Cycling through options with keyboard events', () => {
    const mockOnChange = jest.fn();
    const group = mount(
      <RadioGroup
        options={[
          { value: 'one', label: 'one' },
          { value: 'two', label: 'two', disabled: true },
          { value: 'three', label: 'three' },
        ]}
        onChange={mockOnChange}
      />,
    );

    group.find(RadioButton).at(0).simulate('keydown', { keyCode: KEY_CODE_DOWN });
    expect(mockOnChange).toBeCalledWith('three');
    mockOnChange.mockClear();
    group.find(RadioButton).at(0).simulate('keydown', { keyCode: KEY_CODE_RIGHT });
    expect(mockOnChange).toBeCalledWith('three');
    mockOnChange.mockClear();
    group.find(RadioButton).at(0).simulate('keydown', { keyCode: KEY_CODE_LEFT });
    expect(mockOnChange).toBeCalledWith('three');
    mockOnChange.mockClear();
    group.find(RadioButton).at(0).simulate('keydown', { keyCode: KEY_CODE_UP });
    expect(mockOnChange).toBeCalledWith('three');
    mockOnChange.mockClear();
    group.find(RadioButton).at(0).simulate('keydown', { keyCode: KEY_CODE_ENTER });
    expect(mockOnChange).not.toBeCalled();
  });

  test('Selecting option with mouse event', () => {
    const mockOnChange = jest.fn();
    const group = mount(
      <RadioGroup
        options={[
          { value: 'one', label: 'one' },
          { value: 'two', label: 'two', disabled: true },
          { value: 'three', label: 'three' },
        ]}
        onChange={mockOnChange}
      />,
    );

    expect(mockOnChange).not.toBeCalled();
    group.find(RadioButton).at(2).simulate('click');
    expect(mockOnChange).toBeCalledWith('three');
  });

  test('Re-selecting option with mouse event does not trigger change', () => {
    const mockOnChange = jest.fn();
    const group = mount(
      <RadioGroup
        options={[
          { value: 'one', label: 'one' },
          { value: 'two', label: 'two', disabled: true },
          { value: 'three', label: 'three' },
        ]}
        value="three"
        onChange={mockOnChange}
      />,
    );

    group.find(RadioButton).at(2).simulate('click');
    expect(mockOnChange).not.toBeCalled();
  });

  test('Custom radio renderer', () => {
    const group = mount(
      <RadioGroup
        options={[
          { value: 'one', label: 'one' },
          { value: 'two', label: 'two' },
        ]}
        radioRenderer={(option) => (
          <span key={option.props.value} className="radio-render">
            {option}
          </span>
        )}
      />,
    );

    expect(group.find('.radio-render').length).toBe(2);
    expect(group.find(RadioButton).length).toBe(2);
  });
});
