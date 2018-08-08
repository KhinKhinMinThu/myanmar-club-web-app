import React from 'react';
import {
  Form, Alert, Row, Col,
} from 'antd';
import {
  FormInputIcon,
  CustomInput,
  FullWidthButton,
  BlockContainer,
  BoldText,
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

export const ResetButton = ({ loading }) => (
  <FullWidthButton type="primary" htmlType="submit" loading={loading}>
    Reset Password
  </FullWidthButton>
);

export const BackButton = () => <FullWidthButton>Back</FullWidthButton>;

export const GoToLoginButton = () => (
  <FullWidthButton type="primary">Go To Login Page</FullWidthButton>
);

export const CloseButton = () => <FullWidthButton>Close</FullWidthButton>;

export const ErrorMessage = ({ postErrMsg }) => (
  <Row gutter={8}>
    <Col span={24}>
      <BlockContainer>
        <Alert message="Error" description={postErrMsg} type="error" showIcon />
      </BlockContainer>
    </Col>
    <Col span={24}>
      <BackButton />
    </Col>
  </Row>
);

export const SuccessMessage = ({ email }) => (
  <Row gutter={8}>
    <Col span={24}>
      <BlockContainer>
        Password reset link has been sent to
        <BoldText>{` "${email}".`}</BoldText>
      </BlockContainer>
      <BlockContainer>
        <BoldText>
          Please check the email and follow the instrution to reset your
          password.
        </BoldText>
      </BlockContainer>
    </Col>
    <Col span={12}>
      <GoToLoginButton />
    </Col>
    <Col span={12}>
      <CloseButton />
    </Col>
  </Row>
);
