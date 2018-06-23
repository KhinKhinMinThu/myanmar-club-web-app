import React from "react";
import "antd/dist/antd.css";
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
  feesTbl
} from "./components-pages";
import {
  PaymentTypeRdo,
  CardNumInput,
  CardSecInput,
  PaymentBtn
} from "./components-pages";
import { Form, Card, Row, Col } from "antd";
const FormItem = Form.Item;

class Page3 extends React.Component {
  state = { showDirectPayment: true };

  handleCardNumOnBlur = e => {
    const value = e.target.value.trim();
    /* 2 lines below are needed due to validator not being triggered for imported component.
    work for normal <Input> tag without those lines.
    */
    this.props.form.setFieldsValue({ cardNumInput: value });
    this.props.form.validateFields(["cardNumInput"], { force: true });
  };
  validateCardNum = (rule, value, callback) => {
    if ((isNaN(value) || value.length !== 16) && value !== undefined) {
      callback("The input is not a 16-digits card number!");
    } else {
      callback();
    }
  };
  handleCardSecOnBlur = e => {
    const value = e.target.value.trim();
    /* 2 lines below are needed due to validator not being triggered for imported component.
    work for normal <Input> tag without those lines.
    */
    this.props.form.setFieldsValue({ cardSecInput: value });
    this.props.form.validateFields(["cardSecInput"], { force: true });
  };
  validateCardSec = (rule, value, callback) => {
    if (
      (isNaN(value) || (value.length > 0 && value.length < 3)) &&
      value !== undefined
    ) {
      callback("The input is not a 3-4-digits security code!");
    } else {
      callback();
    }
  };
  handleCreditCardForm = () => {
    console.log("handleCreditCardForm");

    const form = this.props.form;
    form.validateFields(
      ["cardNameInput", "cardNumInput", "cardExpInput", "cardSecInput"],
      { force: true }
    );
  };
  toggleDirectPayment = e => {
    const doesShow = this.state.showDirectPayment;
    if (e.target.value === "DP" && !doesShow) {
      this.setState({ showDirectPayment: true });
    }
    if (e.target.value !== "DP" && doesShow) {
      this.setState({ showDirectPayment: false });
    }
  };

  membershipTypeRdoOpts = {
    rules: [
      {
        required: true,
        message: "Please select your membership type!"
      }
    ]
  };
  cardNameInputOpts = {
    rules: [
      {
        required: true,
        message: "Please enter cardholder name!"
      }
    ]
  };
  cardNumInputOpts = {
    rules: [
      {
        required: true,
        message: "Please enter card number!"
      },
      {
        validator: this.validateCardNum
      }
    ]
  };
  cardExpInputOpts = {
    rules: [
      {
        required: true,
        message: "Please enter card expiry month and year!"
      }
    ]
  };
  cardSecInputOpts = {
    rules: [
      {
        required: true,
        message: "Please enter card security code!"
      },
      { validator: this.validateCardSec }
    ]
  };
  declarationChkOpts = {
    rules: [
      {
        type: "array",
        required: true,
        message: "Please tick both chechboxes!",
        len: 2
      }
    ]
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let creditCardForm = null;
    if (this.state.showDirectPayment) {
      creditCardForm = (
        <FormItem>
          <Row>
            <Col offset={8}>
              <Card>
                <FormItem {...formItemLayout} label="Name on Card">
                  {getFieldDecorator("cardNameInput", this.cardNameInputOpts)(
                    otherInput
                  )}
                </FormItem>

                <FormItem {...formItemLayout} label="Card Number">
                  {getFieldDecorator("cardNumInput", this.cardNumInputOpts)(
                    <CardNumInput blurred={this.handleCardNumOnBlur} />
                  )}
                  {cardNumInfo}
                </FormItem>

                <FormItem {...formItemLayout} label="Expiry Date">
                  {getFieldDecorator("cardExpInput", this.cardExpInputOpts)(
                    cardExpInput
                  )}
                  {cardExpInfo}
                </FormItem>

                <FormItem {...formItemLayout} label="Security Code">
                  {getFieldDecorator("cardSecInput", this.cardSecInputOpts)(
                    <CardSecInput blurred={this.handleCardSecOnBlur} />
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
              <FormItem>{feesTbl}</FormItem>
            </Col>
          </Row>

          {/* Membership Fee */}
          <FormItem {...formItemLayout} label="Membership Fees">
            {getFieldDecorator("membershipTypeRdo", this.membershipTypeRdoOpts)(
              membershipTypeRdo
            )}
          </FormItem>
          {/* Payment Method*/}
          <FormItem {...formItemLayout} label="Payment Method">
            {getFieldDecorator("paymentTypeRdo")(
              <PaymentTypeRdo changed={this.toggleDirectPayment} />
            )}
          </FormItem>
          {creditCardForm}
          {/* Declaration */}
          <Row>
            <Col offset={3}>
              {declarationInfo}
              <FormItem>
                {getFieldDecorator("declarationChk", this.declarationChkOpts)(
                  declarationChk
                )}
              </FormItem>
            </Col>
          </Row>
          {/* Contact Info */}
          <Row>
            <Col offset={3}>
              <FormItem>{contactInfo}</FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  }
}
export default Form.create()(Page3);
