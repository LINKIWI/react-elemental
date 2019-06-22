import { mount } from 'enzyme';
import React from 'react';
import Tabs from 'components/tabs';
import PrimaryTabOption from 'components/tabs/primary-tab-option';
import SecondaryTabOption from 'components/tabs/secondary-tab-option';

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

  test('Secondary style', () => {
    const tabs = mount(
      <Tabs
        options={[
          { value: 'one', label: 'one' },
        ]}
        secondary
      />,
    );

    expect(tabs.find(PrimaryTabOption).length).toBe(0);
    expect(tabs.find(SecondaryTabOption).length).toBe(1);
  });

  test('Rendering of string as tab option children', () => {
    const tabs = mount(
      <Tabs
        options={[
          { value: 'one', label: 'one' },
        ]}
        value="one"
      />,
    );

    expect(tabs.find(PrimaryTabOption).find('Text').length).toBe(1);
  });

  test('Rendering of React elements as tab option children', () => {
    const tabs = mount(
      <Tabs
        options={[
          { value: 'one', label: <a>tag</a> },
        ]}
        value="one"
      />,
    );

    expect(tabs.find(PrimaryTabOption).find('a').length).toBe(1);
    expect(tabs.find(PrimaryTabOption).find('Text').length).toBe(0);
  });

  test('Tab options fit', () => {
    const tabs = mount(
      <Tabs
        options={[
          { value: 'one', label: <a>tag</a> },
        ]}
        value="one"
        fit
      />,
    );

    expect(tabs.childAt(0).props().style.justifyContent).toBe('inherit');
  });
});
