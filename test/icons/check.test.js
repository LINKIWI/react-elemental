import React from 'react';
import { shallow } from 'enzyme';
import Check from 'icons/check';

describe('Check icon', () => {
  test('Renders svg', () => {
    const check = shallow(
      <Check />,
    );

    expect(check.find('svg').length).toBe(1);
  });

  test('Props proxy', () => {
    const check = shallow(
      <Check style={{ fill: 'black' }} />,
    );

    expect(check.find('svg').props().style.fill).toBe('black');
  });
});
