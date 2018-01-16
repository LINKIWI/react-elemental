import React from 'react';
import { shallow, mount } from 'enzyme';
import injectCSS from 'util/inject-css';
import withCSS from 'util/with-css';

jest.mock('util/inject-css', () => jest.fn());

const WrappedComponent = () => (
  <div>
    children
  </div>
);

describe('With CSS HOC', () => {
  beforeEach(() => {
    injectCSS.mockClear();
  });

  test('Injection of CSS into document head', () => {
    const WithCSSHOC = withCSS({ key: 'key-0', css: 'css' })(WrappedComponent);

    const instance = shallow(
      <WithCSSHOC />,
    );

    expect(injectCSS).toBeCalledWith('css');
    instance.unmount();
  });

  test('Idempotent CSS injection', () => {
    const WithCSSHOC = withCSS({ key: 'key-1', css: 'css' })(WrappedComponent);

    const instance = mount(
      <WithCSSHOC />,
    );

    instance.unmount();
    instance.mount();
    instance.unmount();
    instance.mount();

    expect(injectCSS.mock.calls.length).toBe(1);
  });

  test('Rendering and props proxy of wrapped component', () => {
    const WithCSSHOC = withCSS({ key: 'key-2', css: 'css' })(WrappedComponent);
    const mockOnClick = jest.fn();

    const instance = shallow(
      <WithCSSHOC onClick={mockOnClick} />,
    );

    expect(instance.find(WrappedComponent).length).toBe(1);
    expect(instance.find(WrappedComponent).props().onClick).toBe(mockOnClick);
  });
});
