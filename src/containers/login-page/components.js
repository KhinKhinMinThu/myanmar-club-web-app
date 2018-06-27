import React from 'react';
import { Input, Checkbox } from 'antd';
import { FormInputIcon, FullWidthButton } from '../shared-components/common';

export const UsernameInput = (
  <Input prefix={<FormInputIcon type="user" />} placeholder="Username" />
);

export const PasswordInput = (
  <Input prefix={<FormInputIcon type="lock" />} type="password" placeholder="Password" />
);

export const ForgotPasswordLink = (
  <a href="./forgotPassword.do" style={{ float: 'right' }}>
    {'Forgot password'}
  </a>
);

export const SignUpLink = (
  <a href="./singup.do" style={{ float: 'right' }}>
    {'Sign up now!'}
  </a>
);

export const RememberCheckbox = (
  <Checkbox style={{ float: 'left' }}>
    {'Remember me'}
  </Checkbox>
);

export const LoginButton = (
  <FullWidthButton type="primary" htmlType="submit">
    {'Log in'}
  </FullWidthButton>
);
