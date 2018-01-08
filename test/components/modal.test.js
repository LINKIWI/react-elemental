import React from 'react';
import { mount, shallow } from 'enzyme';
import Modal from 'components/modal';
import Clear from 'icons/clear';
import { colors } from 'styles/color';

describe('Modal', () => {
  test('Rendering hierarchy', () => {
    const modal = mount(
      <Modal>
        children
      </Modal>,
    );

    expect(modal.find(Clear).length).toBe(1);
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
    expect(modal.find(Clear).length).toBe(0);
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

  test('Exiting out of modal via close button', () => {
    const onHide = jest.fn();
    const modal = mount(
      <Modal onHide={onHide}>
        children
      </Modal>,
    );

    modal.find(Clear).simulate('click');
    expect(onHide).toBeCalled();

    modal.unmount();
  });

  test('Hover and active style on close button', () => {
    const modal = mount(
      <Modal>
        children
      </Modal>,
    );

    expect(modal.find('button').props().style.fill).toBe(colors.gray20);
    modal.find(Clear).simulate('mouseover');
    expect(modal.find('button').props().style.fill).toBe(colors.gray15);
    modal.find(Clear).simulate('mousedown');
    expect(modal.find('button').props().style.fill).toBe(colors.gray30);
    modal.find(Clear).simulate('mouseup');
    expect(modal.find('button').props().style.fill).toBe(colors.gray15);
    modal.find(Clear).simulate('mouseout');
    expect(modal.find('button').props().style.fill).toBe(colors.gray20);
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

    modal.dive().at(0).dive().setState({ modal: mockRef });

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
    const wrappedModal = modal.dive().at(0).dive();

    wrappedModal.setState({ modal: mockRef, windowWidth: 0, windowHeight: 0 });

    // Backdrop container
    expect(wrappedModal.at(0).props().style.width).toBe('100%');
    expect(wrappedModal.at(0).props().style.height).toBe('100%');
    // Modal itself
    expect(wrappedModal.childAt(0).props().style.width).toBe('100%');

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
    const wrappedModal = modal.dive().at(0).dive();

    wrappedModal.setState({ modal: mockRef, windowWidth: 1000, windowHeight: 1000 });

    expect(wrappedModal.childAt(0).props().style.width).toBe('600px');
  });
});
