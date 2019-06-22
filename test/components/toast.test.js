import { mount, shallow } from 'enzyme';
import React from 'react';
import Spacing from 'components/spacing';
import Toast from 'components/toast';

describe('Toast', () => {
  test('Accepts proxy props', () => {
    const onClick = jest.fn();
    const toast = mount(
      <Toast onClick={onClick} />,
    );

    expect(toast.at(0).props().onClick).toBe(onClick);
  });

  test('Basic rendering', () => {
    const toast = shallow(
      <Toast>
        children
      </Toast>,
    );

    expect(toast.find(Spacing).last().children().text()).toBe('children');
  });
});
