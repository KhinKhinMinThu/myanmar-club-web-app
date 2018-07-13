import React from 'react';
import { Input, Button } from 'antd';
import { toClass } from 'recompose';
import { FormInputIcon } from '../shared-components/common';

export const EmailInput = toClass((props) => {
  const { blurred } = props;
  return (
    <Input
      prefix={<FormInputIcon type="mail" />}
      type="text"
      placeholder="Email Address"
      onBlur={blurred}
    />
  );
});

export const ResetpwdButton = (
  <Button type="primary" htmlType="submit" style={{ float: 'left' }}>
    Reset Password
  </Button>
);

export const BackButton = (
  <Button type="default" htmlType="submit" style={{ float: 'right' }}>
    Back
  </Button>
);

export const GoToLoginButton = (
  <Button type="primary" htmlType="submit" style={{ float: 'left' }}>
    Go To Login Page
  </Button>
);

export const CloseButton = (
  <Button type="default" htmlType="submit" style={{ float: 'right' }}>
    Close
  </Button>
);
