import React from "react";
import "antd/dist/antd.css";
import {
  fieldWidth,
  cardStyles,
  formItemLayout,
  addr1Input,
  addr2Input,
  zipCodeInput,
  emailInput,
  createAccCollapse
} from "./components";
import { Form, Card, Row, Col } from "antd";
const FormItem = Form.Item;

class Page2 extends React.Component {
  addrInputOpts = {
    rules: [
      {
        required: true,
        message: "Please input your address!"
      }
    ]
  };
  zipCodeInputOpts = {
    rules: [
      {
        type: "number",
        message: "The input is not valid postal/zip code! "
      },
      {
        required: true,
        message: "Please input your postal/zip code!"
      }
    ]
  };
  emailInputOpts = {
    rules: [
      {
        type: "email",
        message: "The input is not valid email address! "
      },
      {
        required: true,
        message: "Please input your email address!"
      }
    ]
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const rowGutter = 6;

    return (
      <Card style={cardStyles}>
        <Form>
          <FormItem {...formItemLayout} label="Address">
            <Row gutter={rowGutter} type="flex">
              <Col>
                {getFieldDecorator("addr1Input", this.addrInputOpts)(
                  addr1Input
                )}
              </Col>
              <Col>{addr2Input}</Col>
            </Row>
          </FormItem>

          <FormItem {...formItemLayout} label="Postal Code">
            {getFieldDecorator("zipCodeInput", this.zipCodeInputOpts)(
              zipCodeInput
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="Email Address">
            {getFieldDecorator("emailInput", this.emailInputOpts)(emailInput)}
          </FormItem>
          <FormItem {...formItemLayout} label=" " colon={false}>
            {createAccCollapse}
          </FormItem>
        </Form>
      </Card>
    );
  }
}
export default Form.create()(Page2);
