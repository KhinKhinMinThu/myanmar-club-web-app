import React from 'react';
import { Form, Col, Icon } from 'antd';
import {
  FormInput,
  ExtraInfoText,
  FullButton,
  HalfWidthButton,
} from './styled-components';

export const unicode = { fontFamily: 'Myanmar3', fontSize: 14 };
const FormItem = Form.Item;

const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

/* eslint react/prop-types: 0 */
// ALL FORM ITEM MUST PASS IN decorator!

// Pw Input
export const PwInput = ({ decorator, validateToNxtPwd }) => (
  <FormItem {...layout} label="Password">
    {decorator('pwInput', {
      rules: [
        {
          required: true,
          message: 'Please enter the password!',
        },
        {
          validator: validateToNxtPwd,
        },
      ],
    })(<FormInput type="password" />)}
  </FormItem>
);

// Pw Input
export const ConfirmPwInput = ({ decorator, validatetoFirstPwd }) => (
  <FormItem {...layout} label="Confirm Password">
    {decorator('confirmPwInput', {
      rules: [
        {
          required: true,
          message: 'Please enter to confirm password!',
        },
        {
          validator: validatetoFirstPwd,
        },
      ],
    })(<FormInput type="password" />)}
    <Col xs={{ offset: 0 }} sm={{ offset: 0 }}>
      <Icon type="exclamation-circle-o" />
      <ExtraInfoText>
        {'The password must be at least 6 characters.'}
      </ExtraInfoText>
      <br />
      <Icon type="exclamation-circle-o" />
      <ExtraInfoText>
        {'It must contain at least one letter and one number.'}
      </ExtraInfoText>
      <br />
      <Icon type="exclamation-circle-o" />
      <ExtraInfoText> {'Passwords are case sensitive.'} </ExtraInfoText>
    </Col>
  </FormItem>
);

// Save Button
export const SaveUpdateButton = ({ clicked }) => (
  <FullButton type="primary" htmlType="submit" onClick={clicked}>
    Save Update
  </FullButton>
);

// Membership Renew Button
export const RenewMembershipButton = ({ clicked }) => (
  <FullButton type="primary" htmlType="submit" onClick={clicked}>
    Request Membership Renewal
  </FullButton>
);

// Delete Button
export const DeleteAccButton = ({ clicked }) => (
  <FullButton type="primary" htmlType="submit" onClick={clicked}>
    Delete Account
  </FullButton>
);

// Request Renewal Button
export const RequestRenewalButton = ({ clicked }) => (
  <HalfWidthButton type="primary" htmlType="submit" onClick={clicked}>
    Request Renewal
  </HalfWidthButton>
);

// Request Renewal Button
export const BackButton = ({ clicked }) => (
  <HalfWidthButton
    style={{ marginLeft: '10px' }}
    type="default"
    htmlType="submit"
    onClick={clicked}
  >
    Back
  </HalfWidthButton>
);
