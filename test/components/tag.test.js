import React from 'react';
import { shallow } from 'enzyme';
import Clear from 'react-icons/lib/md/clear';
import Text from 'components/text';
import Tag from 'components/tag';

describe('Tag', () => {
  test('Basic rendering', () => {
    const tag = shallow(
      <Tag text="text" />,
    );

    expect(tag.find(Text).children().text()).toBe('text');
    expect(tag.find(Clear).length).toBe(0);
  });

  test('Dismissable tag', () => {
    const tag = shallow(
      <Tag text="text" dismissable />,
    );

    expect(tag.state().isVisible).toBe(true);
    expect(tag.find(Text).length).toBe(1);
    tag.find(Clear).simulate('click');
    expect(tag.state().isVisible).toBe(false);
    expect(tag.find(Text).length).toBe(0);
  });
});
