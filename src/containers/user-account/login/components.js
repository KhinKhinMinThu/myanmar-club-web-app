import React from 'react';
import { Form } from 'antd';
import { SIGNUP, FORGOTPASSWORD } from '../../../actions/location';
import {
  FormInputIcon,
  CustomInput,
  CustomLinkRight,
  CustomLinkLeft,
  FullButton,
} from '../shared-styled';

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

export const LoginButton = ({ loading }) => (
  <FullButton type="primary" htmlType="submit" loading={loading}>
    Login
  </FullButton>
);

// export const Footer = ({ decorator, loading }) => (
//   <FormItem>
//     {decorator('isRemembered', {
//       valuePropName: 'checked',
//       initialValue: false,
//     })(<CustomCheckbox>Remember me</CustomCheckbox>)}
//     <LoginButton loading={loading} />
//     <CustomLinkRight href={FORGOTPASSWORD}>Forgot password</CustomLinkRight>
//     <CustomLinkLeft href={SIGNUP}>Signup now!</CustomLinkLeft>
//   </FormItem>
// );

export const Footer = ({ loading }) => (
  <div>
    <LoginButton loading={loading} />
    <br />
    <br />
    <CustomLinkRight href={FORGOTPASSWORD}>Forgot password</CustomLinkRight>
    <CustomLinkLeft href={SIGNUP}>Signup now!</CustomLinkLeft>
  </div>
);
