import React from 'react';
import PropTypes from 'prop-types';
import { Input, Checkbox } from 'antd';
import { FormInputIcon, FullWidthButton } from '../shared-components/common';

export const UsernameInput = (
  <Input prefix={<FormInputIcon type="user" />} placeholder="Username" />
);

export const PasswordInput = (
  <Input prefix={<FormInputIcon type="lock" />} type="password" placeholder="Password" />
);

export const RememberCheckbox = (
  <Checkbox style={{ float: 'left' }}>
    {'Remember me'}
  </Checkbox>
);

export const ForgotPasswordLink = () => (
  <a href="./forgotPassword.do" style={{ float: 'right' }} type="primary">
    {'Forgot password'}
  </a>
);

export const SignUpLink = () => (
  <a href="./singup.do" style={{ float: 'right' }}>
    {'Sign up now!'}
  </a>
);

export const LoginButton = ({ isPending }) => (
  <FullWidthButton type="primary" htmlType="submit" loading={isPending}>
    {'Log in'}
  </FullWidthButton>
);

LoginButton.propTypes = {
  isPending: PropTypes.bool.isRequired,
};
