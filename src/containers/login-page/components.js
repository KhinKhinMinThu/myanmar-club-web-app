import React from 'react';
import { Form } from 'antd';
import { SIGNUP, FORGOTPASSWORD } from '../../actions/location';
import {
  FormInputIcon,
  CustomInput,
  CustomCheckbox,
  CustomLinkRight,
  CustomLinkLeft,
  FullWidthButton,
} from './styled-components';

const FormItem = Form.Item;
/* eslint react/prop-types: 0 */
export const UsernameInput = ({ decorator }) => (
  <FormItem>
    {decorator('username', {
      rules: [
        {
          required: true,
          message: 'Please enter username!',
        },
      ],
    })(
      <CustomInput
        prefix={<FormInputIcon type="user" />}
        placeholder="Username"
      />,
    )}
  </FormItem>
);

export const PasswordInput = ({ decorator }) => (
  <FormItem>
    {decorator('password', {
      rules: [
        {
          required: true,
          message: 'Please enter password!',
        },
      ],
    })(
      <CustomInput
        prefix={<FormInputIcon type="lock" />}
        type="password"
        placeholder="Password"
      />,
    )}
  </FormItem>
);

export const LoginButton = ({ isPending }) => (
  <FullWidthButton type="primary" htmlType="submit" loading={isPending}>
    Login
  </FullWidthButton>
);

export const Footer = ({ decorator, isPending }) => (
  <FormItem>
    {decorator('isRemembered', {
      valuePropName: 'checked',
      initialValue: false,
    })(<CustomCheckbox>Remember me</CustomCheckbox>)}
    <LoginButton isPending={isPending} />
    <CustomLinkRight href={FORGOTPASSWORD}>Forgot password</CustomLinkRight>
    <CustomLinkLeft href={SIGNUP}>Signup now!</CustomLinkLeft>
  </FormItem>
);
