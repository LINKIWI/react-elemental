import React from 'react';
import { shallow, mount } from 'enzyme';
import bootstrap from 'bootstrap';
import Elemental from 'elemental';

jest.mock('bootstrap', () => jest.fn());

describe('Elemental bootstrapping component', () => {
  beforeEach(() => {
    // Reset the global initialization state
    // eslint-disable-next-line no-underscore-dangle
    window.__REACT_ELEMENTAL_BOOTSTRAPPED__ = undefined;

    // Reset the bootstrapping mock function
    bootstrap.mockClear();
  });

  test('Bootstrapping with default options', () => {
    const elemental = shallow(
      <Elemental>
        children
      </Elemental>,
    );

    expect(elemental.text()).toBe('children');
    expect(bootstrap).toBeCalledWith({}, {});
  });

  test('Bootstrapping with overridden options', () => {
    const fontOpts = {
      primary: {
        regular: 'regular',
        bold: 'bold',
      },
      secondary: {
        regular: 'regular',
        bold: 'bold',
      },
    };
    const colorOpts = {
      primary: 'red',
      primaryLight: 'red',
      primaryDark: 'red',
    };

    const elemental = shallow(
      <Elemental fontOpts={fontOpts} colorOpts={colorOpts}>
        children
      </Elemental>,
    );

    expect(elemental.text()).toBe('children');
    expect(bootstrap).toBeCalledWith(fontOpts, colorOpts);
  });

  test('Idempotent bootstrapping', () => {
    const elemental = mount(
      <Elemental>
        children
      </Elemental>,
    );

    elemental.unmount();
    elemental.mount();

    expect(bootstrap.mock.calls.length).toBe(1);
  });
});
