import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import {
  Form, Card, Row, Col,
} from 'antd';
import { BtnWithOnClick, blankInput } from '../shared-components/common';
import {
  cardStyles,
  formItemLayout,
  membershipTypeRdo,
  declarationInfo,
  declarationChk,
  contactInfo,
  feesTbl,
  PaymentTypeRdo,
} from '../shared-components/member-info-components';
import {
  CardNumInput,
  CardSecInput,
  cardNumInfo,
  cardExpInfo,
  cardExpInput,
} from '../shared-components/creditcard-info-components';

const FormItem = Form.Item;

class Page3 extends React.Component {
  membershipTypeRdoOpts = {
    rules: [
      {
        required: true,
        message: 'Please select your membership type!',
      },
    ],
  };

  cardNameInputOpts = {
    rules: [
      {
        required: true,
        message: 'Please enter cardholder name!',
      },
    ],
  };

  cardNumInputOpts = {
    rules: [
      {
        pattern: '^([0-9]{16})$',
        message: 'The input is not a 16-digits card number!',
      },
      {
        required: true,
        message: 'Please enter card number!',
      },
    ],
  };

  cardExpInputOpts = {
    rules: [
      {
        required: true,
        message: 'Please enter card expiry month and year!',
      },
    ],
  };

  cardSecInputOpts = {
    rules: [
      {
        pattern: '^([0-9]{3,})$',
        message: 'The input is not a 16-digits card number!',
      },
      {
        required: true,
        message: 'Please enter card security code!',
      },
    ],
  };

  declarationChkOpts = {
    rules: [
      {
        type: 'array',
        required: true,
        message: 'Please tick both chechboxes!',
        len: 2,
      },
    ],
  };

  static propTypes = {
    form: PropTypes.shape({}).isRequired,
  };

  state = { showDirectPayment: true };

  handleCardNumOnBlur = (e) => {
    // console.log('handleCardNumOnBlur');
    const value = e.target.value.trim();
    const { form } = this.props;

    form.setFieldsValue({ cardNumInput: value });
    form.validateFields(['cardNumInput'], { force: true });
  };

  handleCardSecOnBlur = (e) => {
    const value = e.target.value.trim();
    const { form } = this.props;
    form.setFieldsValue({ cardSecInput: value });
    form.validateFields(['cardSecInput'], { force: true });
  };

  handleCreditCardForm = () => {
    /* eslint-disable no-console */
    // console.log('handleCreditCardForm');
    const { form } = this.props;
    form.validateFields(['cardNameInput', 'cardNumInput', 'cardExpInput', 'cardSecInput'], {
      force: true,
    });
  };

  toggleDirectPayment = (e) => {
    // console.log('toggleDirectPayment');
    const { showDirectPayment } = this.state;
    const { form } = this.props;

    if (e.target.value === 'DP' && !showDirectPayment) {
      this.setState({ showDirectPayment: true });
      // unhide and reset the fields with validator
      form.getFieldDecorator('cardNumInput', { hidden: false });
      form.getFieldDecorator('cardSecInput', { hidden: false });
      form.resetFields(['cardNumInput', 'cardSecInput']);
    }
    if (e.target.value !== 'DP' && showDirectPayment) {
      this.setState({ showDirectPayment: false });
      // hide the fields with validator
      form.getFieldDecorator('cardNumInput', { hidden: true });
      form.getFieldDecorator('cardSecInput', { hidden: true });
    }
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { showDirectPayment } = this.state;

    let creditCardForm = null;
    if (showDirectPayment) {
      creditCardForm = (
        <FormItem {...formItemLayout} label=" " colon={false}>
          <Card>
            <FormItem {...formItemLayout} label="Name on Card">
              {getFieldDecorator('cardNameInput', this.cardNameInputOpts)(blankInput)}
            </FormItem>

            <FormItem {...formItemLayout} label="Card Number">
              {getFieldDecorator('cardNumInput', this.cardNumInputOpts)(
                <CardNumInput blurred={this.handleCardNumOnBlur} />,
              )}
              {cardNumInfo}
            </FormItem>

            <FormItem {...formItemLayout} label="Expiry Date">
              {getFieldDecorator('cardExpInput', this.cardExpInputOpts)(cardExpInput)}
              {cardExpInfo}
            </FormItem>

            <FormItem {...formItemLayout} label="Security Code">
              {getFieldDecorator('cardSecInput', this.cardSecInputOpts)(
                <CardSecInput blurred={this.handleCardSecOnBlur} />,
              )}
            </FormItem>
            <BtnWithOnClick clicked={this.handleCreditCardForm} text="Make Payment Now" />
          </Card>
        </FormItem>
      );
    }

    return (
      <Card style={cardStyles}>
        <Form>
          <Row>
            <Col offset={6} span={12}>
              <FormItem>
                {feesTbl}
              </FormItem>
            </Col>
          </Row>

          {/* Membership Fee */}
          <FormItem {...formItemLayout} label="Membership Fees">
            {getFieldDecorator('membershipTypeRdo', this.membershipTypeRdoOpts)(membershipTypeRdo)}
          </FormItem>

          {/* Payment Method */}
          <FormItem {...formItemLayout} label="Payment Method">
            {getFieldDecorator('paymentTypeRdo')(
              <PaymentTypeRdo changed={this.toggleDirectPayment} />,
            )}
          </FormItem>

          {creditCardForm}

          <FormItem
            {...{
              labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
              },
              wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
              },
            }}
            label=" "
            colon={false}
          >
            {/* Declaration */}
            {declarationInfo}
            <FormItem>
              {getFieldDecorator('declarationChk', this.declarationChkOpts)(declarationChk)}
            </FormItem>

            {/* Contact Info */}
            {contactInfo}
          </FormItem>
        </Form>
      </Card>
    );
  }
}
export default Form.create()(Page3);
