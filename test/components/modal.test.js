import React from 'react';
import { mount } from 'enzyme';
import Close from 'react-icons/lib/md/close';
import Modal from 'components/modal';
import Spacing from 'components/spacing';

describe('Modal', () => {
  test('Rendering hierarchy', () => {
    const modal = mount(
      <Modal>
        children
      </Modal>,
    );

    expect(modal.find(Spacing).length).toBe(1);
    expect(modal.find(Close).length).toBe(1);
    expect(modal.find(Spacing).at(0).text()).toBe('children');
  });

  test('Accepts proxy props', () => {
    const onClick = jest.fn();
    const modal = mount(
      <Modal onClick={onClick}>
        children
      </Modal>,
    );

    modal.childAt(0).childAt(0).simulate('click');

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
    expect(modal.find(Close).length).toBe(0);
  });

  test('Exiting out of modal via backdrop click', () => {
    const onHide = jest.fn();
    const modal = mount(
      <Modal onHide={onHide}>
        children
      </Modal>,
    );

    // Clicking within modal container
    const container = modal.find(Spacing).getDOMNode();
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

    modal.childAt(0).childAt(0).simulate('keydown', { keyCode: 80 });
    modal.childAt(0).childAt(0).simulate('keydown', { keyCode: 27 });
    expect(onHide).toBeCalled();
  });

  test('Exiting out of modal via close button', () => {
    const onHide = jest.fn();
    const modal = mount(
      <Modal onHide={onHide}>
        children
      </Modal>,
    );

    modal.find(Close).simulate('click');
    expect(onHide).toBeCalled();
  });

  test('Focus after setting ref', () => {
    const mockRef = {
      focus: jest.fn(),
    };
    const modal = mount(
      <Modal>
        children
      </Modal>,
    );

    modal.setState({ modal: mockRef });
    modal.instance().componentDidUpdate({}, {});

    expect(mockRef.focus).toBeCalled();
  });

  test('Fully expanded width and height', () => {
    const mockRef = {
      scrollHeight: 100,
    };
    const modal = mount(
      <Modal>
        children
      </Modal>,
    );

    modal.setState({ modal: mockRef, windowWidth: 0, windowHeight: 0 });

    expect(modal.childAt(0).props().style.width).toBe('100%');
    expect(modal.childAt(0).props().style.height).toBe('100%');
  });
});
