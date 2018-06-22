import React from "react";
import "antd/dist/antd.css";
import {
  cardStyles,
  formItemLayout,
  membershipTypeRdo,
  PaymentTypeRdo,
  otherInput,
  cardNumInput,
  cardExpInfo,
  cardExpInput,
  cardSecInput,
  PaymentBtn,
  declarationInfo,
  declarationChk
} from "./components-pages";
import { Form, Card, Row, Col } from "antd";
const FormItem = Form.Item;

class Page3 extends React.Component {
  state = { showDirectPayment: true };

  handleConfirmOnChange = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
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
      }
    ]
  };
  declarationChkOpts = {
    rules: [
      {
        type: "array",
        required: true,
        message: "Please check all!",
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
                    cardNumInput
                  )}
                </FormItem>

                <FormItem {...formItemLayout} label="Expiry Date">
                  {getFieldDecorator("cardExpInput", this.cardExpInputOpts)(
                    cardExpInput
                  )}
                  {cardExpInfo}
                </FormItem>

                <FormItem {...formItemLayout} label="Security Code">
                  {getFieldDecorator("cardSecInput", this.cardSecInputOpts)(
                    cardSecInput
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
          <FormItem {...formItemLayout} label="Membership Fees">
            {getFieldDecorator("membershipTypeRdo", this.membershipTypeRdoOpts)(
              membershipTypeRdo
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="Payment Method">
            {getFieldDecorator("paymentTypeRdo")(
              <PaymentTypeRdo changed={this.toggleDirectPayment} />
            )}
          </FormItem>

          {creditCardForm}

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
        </Form>
      </Card>
    );
  }
}
export default Form.create()(Page3);
