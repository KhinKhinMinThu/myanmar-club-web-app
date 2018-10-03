import React from 'react';
import {
  Form, Radio, Modal, Col, Card, Input,
} from 'antd';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { CLIENT_ACC } from '../../actions/constants';
import {
  PaymentInfoText,
  HighlightText,
  // BoldUnderlineText,
} from './shared-styled';
import { layout } from './shared-components';

const ENV = 'sandbox';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const paymentDisplay = {
  style: {
    border: 0,
    outline: 0,
    borderRadius: 0,
    padding: 0,
    fontWeight: 'bold',
    width: '100px',
    textAlign: 'right',
    marginRight: '10px',
  },
  readOnly: true,
  size: 'small',
};
/* eslint react/prop-types: 0 */

// Payment Radio
export const Payment = ({
  decorator,
  onSelect,
  showDirectPayment,
  paymentOption,
}) => (
  <FormItem {...layout} label="Payment Method">
    <FormItem>
      {decorator('paymentType', {
        initialValue: 'Bank Transfer',
        rules: [{ required: true, message: 'Please select payment type!' }],
      })(
        <RadioGroup name="paymentTypeRdo" onChange={onSelect}>
          <RadioButton value="Direct Online Payment">
            Direct Online Payment
          </RadioButton>
          <RadioButton value="Bank Transfer">Bank Transfer</RadioButton>
          <RadioButton value="Cash">Cash Payment</RadioButton>
        </RadioGroup>,
      )}
    </FormItem>
    {/* show text input if nationality is others */}
    {showDirectPayment && (
      <Col span={1}>
        <Card style={{ width: '400px', textAlign: 'left' }}>
          <FormItem style={{ marginBottom: 0 }}>
            <img
              src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg"
              border="0"
              alt="PayPal Logo"
              style={{ marginRight: '10px' }}
            />
            <span>
              <PaymentInfoText>Pay directly with PayPal...</PaymentInfoText>
            </span>
          </FormItem>
        </Card>
      </Col>
    )}
    {!showDirectPayment
      && paymentOption === 'Bank' && (
        <Col span={1}>
          <Card style={{ width: '450px', textAlign: 'left' }}>
            <PaymentInfoText>Note:</PaymentInfoText>
            <br />
            <PaymentInfoText>
              By choosing this payment option, purchase confirmation will only
              be upon the approval of Executive Committe Member.
            </PaymentInfoText>
            <br />
            <PaymentInfoText>
              To make payment, please kindly transfer to Myanmar Club bank
              account:
            </PaymentInfoText>
            <span>
              <HighlightText> DBS Savings 001-123-456 </HighlightText>
            </span>
            <br />
            <PaymentInfoText>
              For other enquries, contact U Ye Myint at
            </PaymentInfoText>
            <span>
              <HighlightText> 93807095</HighlightText>
            </span>
          </Card>
        </Col>
    )}
    {!showDirectPayment
      && paymentOption === 'Cash' && (
        <Col span={1}>
          <Card style={{ width: '450px', textAlign: 'left' }}>
            <PaymentInfoText>Note:</PaymentInfoText>
            <br />
            <PaymentInfoText>
              By choosing this payment option, purchase confirmation will only
              be upon the approval of Executive Committe Member.
            </PaymentInfoText>
            <br />
            <PaymentInfoText>
              To make payment, please kindly proceed to Myanmar Club office at
            </PaymentInfoText>
            <span>
              <HighlightText>
                {' '}
                111 North Bridge Road #05-42 Peninsula Plaza{' '}
              </HighlightText>
            </span>
            <br />
            <PaymentInfoText>
              For other enquries, contact U Ye Myint at
            </PaymentInfoText>
            <span>
              <HighlightText> 93807095</HighlightText>
            </span>
          </Card>
        </Col>
    )}
  </FormItem>
);

// Payment Modal
export const PaymentModal = ({
  decorator,
  isModalVisible,
  onCloseModal,
  total,
  onSuccess,
  onError,
  onCancel,
  membership,
}) => (
  <Modal
    title="Check out with PayPal"
    visible={isModalVisible}
    onCancel={onCloseModal}
    width={385}
    style={{ top: 10 }}
    footer={[
      <PaypalExpressBtn
        style={{ size: 'large', tagline: 'true' }}
        client={CLIENT_ACC}
        env={ENV}
        commit
        currency="SGD"
        total={total}
        onSuccess={onSuccess}
        onError={onError}
        onCancel={onCancel}
      />,
    ]}
  >
    <PaymentInfoText>Your requested membership type: </PaymentInfoText>
    <FormItem>
      <HighlightText>
        {membership.substr(membership.indexOf(':') + 1)}
      </HighlightText>
    </FormItem>
    <FormItem
      {...layout}
      style={{ marginBottom: 0, fontWeight: 'bold' }}
      label="Total Amount"
      colon
    >
      {decorator('totalAmt', { initialValue: '0' })(
        <Input {...paymentDisplay} />,
      )}
      <span>
        <HighlightText>SGD</HighlightText>{' '}
      </span>
    </FormItem>
  </Modal>
);
