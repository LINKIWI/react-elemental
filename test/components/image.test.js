import { mount } from 'enzyme';
import React, { createRef } from 'react';
import Image, {
  LOAD_STATE_IDLE,
  LOAD_STATE_FETCH,
  LOAD_STATE_DONE,
  LOAD_STATE_ERROR,
} from 'components/image';
import Text from 'components/text';

// Java intensifies
const mockIntersectionObserverFactory = (mockObserve, mockUnobserve) =>
  class MockIntersectionObserver {
    observe = mockObserve;

    unobserve = mockUnobserve;

    constructor(cb) {
      this.cb = cb;
    }
  };

describe('Image', () => {
  const defaultProps = {
    alt: 'alt',
  };

  test('Props proxy', () => {
    const mockOnClick = jest.fn();
    const image = mount(
      <Image
        {...defaultProps}
        onClick={mockOnClick}
        style={{ maxWidth: '100px' }}
        imgStyle={{ objectFit: 'cover' }}
      />,
    );

    expect(mockOnClick).not.toBeCalled();
    image.find('img').simulate('click');
    expect(mockOnClick).toBeCalled();
    expect(image.find('Image').childAt(0).props().style.maxWidth).toBe('100px');
    expect(image.find('img').props().style.objectFit).toBe('cover');
  });

  test('Alt text and image element rendering', () => {
    const image = mount(
      <Image {...defaultProps} />,
    );

    expect(image.find('img').length).toBe(1);
    expect(image.childAt(0).text()).toBe(defaultProps.alt);
  });

  test('Alt text is hidden after image load', () => {
    const image = mount(
      <Image {...defaultProps} />,
    );

    expect(image.find('img').length).toBe(1);
    expect(image.find('Text').length).toBe(1);
    expect(image.childAt(0).text()).toBe(defaultProps.alt);
    image.find('img').simulate('load');
    expect(image.find('Text').length).toBe(0);
  });

  test('Non-lazy fetch to done state transition', () => {
    const image = mount(
      <Image {...defaultProps} />,
    );

    expect(image.find('Image').state().load).toBe(LOAD_STATE_FETCH);
    expect(image.find('img').props().style.opacity).toBe(0);
    image.find('img').simulate('load');
    expect(image.find('Image').state().load).toBe(LOAD_STATE_DONE);
    expect(image.find('img').props().style.opacity).toBe(1);
  });

  test('Non-lazy fetch to error state transition', () => {
    const image = mount(
      <Image {...defaultProps} />,
    );

    expect(image.find('Image').state('load')).toBe(LOAD_STATE_FETCH);
    image.find('img').simulate('error');
    expect(image.find('Image').state('load')).toBe(LOAD_STATE_ERROR);
    // Annotation should be visible
    expect(image.find('Image').childAt(0).childAt(0).props().style.opacity).toBe(1);
  });

  test('Lazy idle to fetch state transition with intersection observer', () => {
    const mockObserve = jest.fn();
    const mockUnobserve = jest.fn();

    window.IntersectionObserver = mockIntersectionObserverFactory(mockObserve, mockUnobserve);
    const image = mount(
      <Image
        {...defaultProps}
        lazy
      />,
    );

    expect(mockObserve).toBeCalled();
    expect(mockUnobserve).not.toBeCalled();
    expect(image.find('Image').state('load')).toBe(LOAD_STATE_IDLE);
    image.find('Image').instance().observer.cb([{ isIntersecting: false }]);
    expect(image.find('Image').state('load')).toBe(LOAD_STATE_IDLE);
    image.find('Image').instance().observer.cb([{ isIntersecting: true }]);
    expect(image.find('Image').state('load')).toBe(LOAD_STATE_FETCH);

    image.unmount();
    expect(mockUnobserve).toBeCalled();

    delete window.IntersectionObserver;
  });

  test('Lazy idle to fetch state transition without intersection observer', () => {
    const image = mount(
      <Image
        {...defaultProps}
        lazy
      />,
    );

    // Lazy load without an intersection observer should be equivalent to a non-lazy load
    expect(image.find('Image').state('load')).toBe(LOAD_STATE_FETCH);

    image.unmount();
  });

  test('Intermediate style', () => {
    const image = mount(
      <Image
        {...defaultProps}
        showIntermediate
      />,
    );

    // Image should always be visible regardless of load state
    expect(image.find('Image').state('load')).toBe(LOAD_STATE_FETCH);
    expect(image.find('img').props().style.opacity).toBe(1);
  });

  test('Hover style', () => {
    const image = mount(
      <Image {...defaultProps} />,
    );

    expect(image.find('Image').childAt(0).childAt(0).props().style.opacity).toBe(0);
    image.simulate('mouseenter');
    expect(image.find('Image').childAt(0).childAt(0).props().style.opacity).toBe(1);
    image.simulate('mouseleave');
    expect(image.find('Image').childAt(0).childAt(0).props().style.opacity).toBe(0);
  });

  test('Dynamic selection of white alt text color', () => {
    const image = mount(
      <Image
        {...defaultProps}
        color="black"
      />,
    );

    expect(image.find(Text).props().color).toBe('rgba(255, 255, 255, 0.3)');
  });

  test('Dynamic selection of black alt text color', () => {
    const image = mount(
      <Image
        {...defaultProps}
        color="white"
      />,
    );

    expect(image.find(Text).props().color).toBe('rgba(0, 0, 0, 0.3)');
  });

  test('Ref forwarding to underlying img', () => {
    const ref = createRef();
    const image = mount(
      <Image
        {...defaultProps}
        ref={ref}
      />,
    );

    expect(image.find('img').length).toBe(1);
    expect(ref.current).toBeDefined();
  });
});
