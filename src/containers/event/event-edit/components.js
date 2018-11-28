import React from 'react';
import { Form, Switch } from 'antd';
import { FullButton } from '../shared-styled';

const FormItem = Form.Item;

export const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 8 },
    xl: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 16 },
    xl: { span: 16 },
  },
  style: { margin: 0 },
};

/* eslint react/prop-types: 0 */

// for edit
export const DeleteEventSwitch = ({ decorator }) => (
  <FormItem {...layout} label="Delete Event?">
    {decorator('deleteEvent', { initialValue: false })(
      <Switch checkedChildren="Yes" unCheckedChildren="No" />,
    )}
  </FormItem>
);

export const EventStatusSwitch = ({ decorator }) => (
  <FormItem {...layout} label="Event Status">
    {decorator('eventStatus', { valuePropName: 'checked', initialValue: true })(
      <Switch checkedChildren="Open" unCheckedChildren="Closed" />,
    )}
  </FormItem>
);

export const DirectPaymentSwitch = ({ decorator }) => (
  <FormItem {...layout} label="Direct Payment (PayPal)">
    {decorator('directPayment', {
      valuePropName: 'checked',
      initialValue: true,
    })(<Switch checkedChildren="Unabled" unCheckedChildren="Disabled" />)}
  </FormItem>
);

export const SaveUpdateButton = () => (
  <FullButton type="primary" htmlType="submit">
    Save Update
  </FullButton>
);
// end for edit
