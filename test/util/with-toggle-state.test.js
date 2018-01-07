import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import withToggleState from 'util/with-toggle-state';

const WrappedComponent = ({ isToggled, enable, disable }) => (
  <div>
    <button id="enable" onClick={enable} />
    <button id="disable" onClick={disable} />
    <p>
      {isToggled ? 'enabled' : 'disabled'}
    </p>
  </div>
);

WrappedComponent.propTypes = {
  isToggled: PropTypes.bool.isRequired,
  enable: PropTypes.func.isRequired,
  disable: PropTypes.func.isRequired,
};

const ToggleStateHOC = withToggleState({
  key: 'isToggled',
  enable: 'enable',
  disable: 'disable',
})(WrappedComponent);

describe('With toggle state HOC', () => {
  test('Toggling with enable/disable function', () => {
    const instance = mount(
      <ToggleStateHOC />,
    );

    expect(instance.find('p').text()).toBe('disabled');
    instance.find('#enable').simulate('click');
    expect(instance.find('p').text()).toBe('enabled');
    instance.find('#disable').simulate('click');
    expect(instance.find('p').text()).toBe('disabled');
  });
});
