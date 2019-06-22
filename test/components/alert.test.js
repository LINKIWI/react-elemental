import { mount, shallow } from 'enzyme';
import React from 'react';
import Alert from 'components/alert';
import Text from 'components/text';
import { colors } from 'styles/color';

describe('Alert', () => {
  test('Accepts proxy props', () => {
    const onClick = jest.fn();
    const alert = mount(
      <Alert
        type="info"
        title="title"
        message="message"
        onClick={onClick}
      />,
    );

    expect(alert.at(0).props().onClick).toBe(onClick);
  });

  test('Standard alert rendering', () => {
    const alert = shallow(
      <Alert
        type="info"
        title="title"
        message="message"
      />,
    );

    expect(alert.find(Text).length).toBe(2);
  });

  test('Smaller alert size variant', () => {
    const alert = shallow(
      <Alert
        type="info"
        size="beta"
        title="title"
        message="message"
      />,
    );

    expect(alert.find({ size: 'kilo' }).length).toBe(2);
    expect(alert.find({ style: { padding: '10px 15px' } }).length).toBe(1);
  });

  test('Dismissible alert', () => {
    const onDismiss = jest.fn();
    const alert = shallow(
      <Alert
        type="info"
        title="title"
        message="message"
        onDismiss={onDismiss}
        dismissible
      />,
    );

    const dismissIcon = alert.find('button').at(0);
    expect(dismissIcon.props().onClick).toBeTruthy();
    expect(alert.find(dismissIcon.props()).length).toBe(1);

    dismissIcon.simulate('click');

    expect(onDismiss).toBeCalled();
  });

  test('Info, success, warn, and error variants', () => {
    const variants = {
      info: colors.blueLight,
      success: colors.greenLight,
      warn: colors.yellowLight,
      error: colors.redLight,
    };

    Object.keys(variants).forEach((variant) => {
      const alert = shallow(
        <Alert
          type={variant}
          title="title"
          message="message"
        />,
      );

      expect(alert.at(0).props().style.backgroundColor).toBe(variants[variant]);
    });
  });
});
