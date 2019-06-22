import { mount, shallow } from 'enzyme';
import React from 'react';
import Modal from 'components/modal';

describe('Modal', () => {
  test('Rendering hierarchy', () => {
    const modal = mount(
      <Modal>
        children
      </Modal>,
    );

    expect(modal.at(0).at(0).text()).toBe('children');
  });

  test('Accepts proxy props', () => {
    const onClick = jest.fn();
    const modal = mount(
      <Modal onClick={onClick}>
        children
      </Modal>,
    );

    modal.find('div').first().childAt(0).simulate('click');

    expect(onClick).toBeCalled();
  });

  test('Persistent modal', () => {
    const onHide = jest.fn();
    const modal = mount(
      <Modal onHide={onHide} persistent>
        children
      </Modal>,
    );

    modal.at(0).simulate('click');
    modal.childAt(0).simulate('keydown', { keyCode: 27 });

    expect(onHide.mock.calls.length).toBe(0);
  });

  test('Exiting out of modal via backdrop click', () => {
    const onHide = jest.fn();
    const modal = mount(
      <Modal onHide={onHide}>
        <p>text</p>
      </Modal>,
    );

    // Clicking within modal container
    const container = modal.find('p').getDOMNode();
    modal.at(0).simulate('click', { target: container });
    expect(onHide.mock.calls.length).toBe(0);

    // Clicking outside of modal container
    modal.at(0).simulate('click');
    expect(onHide).toBeCalled();
  });

  test('Exiting out of modal via escape key', () => {
    const onHide = jest.fn();
    const modal = mount(
      <Modal onHide={onHide}>
        children
      </Modal>,
    );

    modal.find('div').first().childAt(0).simulate('keydown', { keyCode: 80 });
    modal.find('div').first().childAt(0).simulate('keydown', { keyCode: 27 });
    expect(onHide).toBeCalled();
  });

  test('Idempotent ref', () => {
    const mockRef = {
      focus: jest.fn(),
    };
    const modal = shallow(
      <Modal>
        children
      </Modal>,
    );

    modal.setState({ modal: mockRef });
    expect(modal.state('modal')).toBe(mockRef);
    modal.instance().setRef('ignore');
    expect(modal.state('modal')).toBe(mockRef);
  });

  test('Focus after setting ref', () => {
    const mockRef = {
      focus: jest.fn(),
    };
    const modal = shallow(
      <Modal>
        children
      </Modal>,
    );

    modal.setState({ modal: mockRef });

    expect(mockRef.focus).toBeCalled();
  });

  test('Fully expanded width and height when viewport is small', () => {
    const mockRef = {
      focus: jest.fn(),
      scrollHeight: 100,
    };
    const modal = shallow(
      <Modal>
        children
      </Modal>,
    );

    modal.setState({ modal: mockRef, windowWidth: 0, windowHeight: 0 });

    // Backdrop container
    expect(modal.at(0).props().style.width).toBe('100%');
    expect(modal.at(0).props().style.height).toBe('100%');
    // Modal itself
    expect(modal.childAt(0).props().style.width).toBe('100%');

    modal.unmount();
  });

  test('Unexpanded size', () => {
    const mockRef = {
      focus: jest.fn(),
      scrollHeight: 100,
    };
    const modal = shallow(
      <Modal size="beta">
        children
      </Modal>,
    );

    modal.setState({ modal: mockRef, windowWidth: 1000, windowHeight: 1000 });

    expect(modal.childAt(0).props().style.width).toBe('600px');
  });
});
