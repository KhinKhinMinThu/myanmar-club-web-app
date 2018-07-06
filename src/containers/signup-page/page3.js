import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import {
  Form, Card, Row, Col,
} from 'antd';
import {
  cardStyles,
  formItemLayout,
  membershipTypeRdo,
  otherInput,
  cardNumInfo,
  cardExpInfo,
  cardExpInput,
  declarationInfo,
  declarationChk,
  contactInfo,
  feesTbl,
  PaymentTypeRdo,
  CardNumInput,
  CardSecInput,
  PaymentBtn,
} from './components-pages';

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
        required: true,
        message: 'Please enter card number!',
      },
      {
        validator: (rule, value, callback) => {
          if (value !== undefined && value.length !== 0) {
            if (Number.isNaN(Number(value)) || value.length < 16) {
              callback('The input is not a 16-digits card number!');
            } else {
              callback();
            }
          } else {
            callback();
          }
        },
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
        required: true,
        message: 'Please enter card security code!',
      },
      {
        validator: (rule, value, callback) => {
          if (value !== undefined && value.length !== 0) {
            if (Number.isNaN(Number(value)) || value.length < 3) {
              callback('The input is not a 3-4-digits security code!');
            } else {
              callback();
            }
          } else {
            callback();
          }
        },
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
        <FormItem>
          <Row>
            <Col offset={8}>
              <Card>
                <FormItem {...formItemLayout} label="Name on Card">
                  {getFieldDecorator('cardNameInput', this.cardNameInputOpts)(otherInput)}
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
                <PaymentBtn clicked={this.handleCreditCardForm} />
              </Card>
            </Col>
          </Row>
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

          {/* Declaration */}
          <Row>
            <Col offset={3}>
              {declarationInfo}
              <FormItem>
                {getFieldDecorator('declarationChk', this.declarationChkOpts)(declarationChk)}
              </FormItem>
            </Col>
          </Row>

          {/* Contact Info */}
          <Row>
            <Col offset={3}>
              <FormItem>
                {contactInfo}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  }
}
export default Form.create()(Page3);
