import React from 'react';
import { shallow } from 'enzyme';
import Clear from 'icons/clear';

describe('Clear icon', () => {
  test('Renders svg', () => {
    const clear = shallow(
      <Clear />,
    );

    expect(clear.find('svg').length).toBe(1);
  });

  test('Props proxy', () => {
    const clear = shallow(
      <Clear style={{ fill: 'black' }} />,
    );

    expect(clear.find('svg').props().style.fill).toBe('black');
  });
});
