import React from 'react';
import { Input } from 'antd';
import { toClass } from 'recompose';
import { FormInputIcon, FullWidthButton } from '../shared-components/common';

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

export const NewPwInput = (
  <Input prefix={<FormInputIcon type="lock" />} type="password" placeholder="New password..." />
);

export const ConfirmPwInput = toClass((props) => {
  const { blurred } = props;
  return (
    <Input
      prefix={<FormInputIcon type="lock" />}
      type="password"
      placeholder="Confirm new password..."
      onBlur={blurred}
    />
  );
});

export const ResetpwdButton = (
  <FullWidthButton type="primary" htmlType="submit" style={{ float: 'left' }}>
    Reset My Password
  </FullWidthButton>
);
