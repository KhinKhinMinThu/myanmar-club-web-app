import React from 'react';
import { Form } from 'antd';
import {
  FormInputIcon,
  CustomInput,
  FullWidthButton,
} from './styled-components';

const FormItem = Form.Item;

/* eslint react/prop-types: 0 */
export const EmailInput = ({ decorator }) => (
  <FormItem>
    {decorator('email', {
      rules: [
        {
          type: 'email',
          message: 'The input is not valid E-mail!',
        },
        {
          required: true,
          message: 'Please enter email address!',
        },
      ],
    })(
      <CustomInput
        prefix={<FormInputIcon type="mail" />}
        placeholder="Email Address"
      />,
    )}
  </FormItem>
);

export const ResetButton = (
  <FullWidthButton type="primary" htmlType="submit">
    Reset Password
  </FullWidthButton>
);

export const BackButton = <FullWidthButton>Back</FullWidthButton>;

export const GoToLoginButton = (
  <FullWidthButton type="primary">Go To Login Page</FullWidthButton>
);

export const CloseButton = <FullWidthButton>Close</FullWidthButton>;
