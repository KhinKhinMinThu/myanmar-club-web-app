import React from "react";
import "antd/dist/antd.css";
import {
  fieldWidth,
  cardStyles,
  formItemLayout,
  addr1Input,
  addr2Input,
  zipCodeInput,
  emailInput
} from "./components";
import { Form, Card, Row, Col, Collapse, Input } from "antd";
const FormItem = Form.Item;
const Panel = Collapse.Panel;

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
  passwordInputOpts = {
    rules: [
      {
        required: true,
        message: "Please input your password!"
      },
      {
        validator: this.validateToNextPassword
      }
    ]
  };
  cfrmPwInputOpts = {
    rules: [
      {
        required: true,
        message: "Please confirm your password!"
      },
      {
        validator: this.compareToFirstPassword
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

          {/*Not able to export/import as onChange/onBlur method not working for Component props*/}
          <Row>
            <Col offset={8}>
              {/* width: 606 <2 addr input width + rowGutter: 6> */}
              <Collapse style={{ maxWidth: 606 }}>
                <Panel header="Create a Myanmar Club Account...">
                  <FormItem {...formItemLayout} label="Password">
                    {getFieldDecorator("passwordInput", this.passwordInputOpts)(
                      <Input type="password" />
                    )}
                  </FormItem>
                  <FormItem {...formItemLayout} label="Confirm Password">
                    {getFieldDecorator("cfrmPwInput", this.cfrmPwInputOpts)(
                      <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                  </FormItem>
                </Panel>
              </Collapse>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  }
}
export default Form.create()(Page2);
