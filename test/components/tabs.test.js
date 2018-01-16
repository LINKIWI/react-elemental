import React from 'react';
import { mount } from 'enzyme';
import Tabs from 'components/tabs';

describe('Tabs', () => {
  test('Props proxy', () => {
    const mockOnClick = jest.fn();
    const tabs = mount(
      <Tabs onClick={mockOnClick} />,
    );

    tabs.simulate('click');
    expect(mockOnClick).toBeCalled();
  });

  test('Rendering of all options', () => {
    const tabs = mount(
      <Tabs
        options={[
          { value: 'one', label: 'one' },
          { value: 'two', label: 'two' },
          { value: 'three', label: 'three' },
        ]}
      />,
    );

    expect(tabs.find('button').length).toBe(3);
  });

  test('Click handler for each tab segment', () => {
    const mockOnChange = jest.fn();
    const tabs = mount(
      <Tabs
        options={[
          { value: 'one', label: 'one' },
          { value: 'two', label: 'two' },
          { value: 'three', label: 'three' },
        ]}
        onChange={mockOnChange}
        value="two"
      />,
    );

    tabs.find('button').first().simulate('click');
    expect(mockOnChange).toBeCalled();
  });
});
