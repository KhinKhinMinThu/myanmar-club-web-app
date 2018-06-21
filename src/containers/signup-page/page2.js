import React from "react";
import "antd/dist/antd.css";
import {
  cardStyles,
  formItemLayout,
  addr1Input,
  addr2Input,
  zipCodeInput,
  emailInput,
  pwInfo
} from "./components";
import { Form, Card, Row, Col, Collapse, Input } from "antd";
const FormItem = Form.Item;
const Panel = Collapse.Panel;

class Page2 extends React.Component {
  state = {
    confirmDirty: false,
    expand: false
  };
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
  pwInputOpts = {
    rules: [
      {
        required: false,
        message: "Please input your password!"
      }

      // this validator is not called
      // must place manually within return formItem tag

      // {
      //   validator: this.validateToNextPassword
      // }
    ]
  };
  cfrmPwInputOpts = {
    rules: [
      {
        required: false,
        message: "Please confirm your password!"
      }
      // this validator is not called
      // must place manually within return formItem tag

      // {
      //   validator: this.compareToFirstPassword
      // }
    ]
  };
  handleConfirmOnChange = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  compareToFirstPassword = (rule, value, callback) => {
    //console.log("compareToFirstPassword");
    const form = this.props.form;
    if (value && value !== form.getFieldValue("pwInput")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };
  validateToNextPassword = (rule, value, callback) => {
    //console.log("validateToNextPassword");
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["cfrmPwInput"], { force: true });
    }
    callback();
  };
  checkExpand = value => {
    // to clear the input value every time expand/collapse
    this.props.form.setFields({
      pwInput: {
        value: null
      },
      cfrmPwInput: {
        value: null
      }
    });
    // changes must be within setState or it won't work due to setState being asychronous
    this.setState({ expand: !this.state.expand }, () => {
      // to reset the required value of both password inputs
      this.pwInputOpts.rules[0].required = this.state.expand;
      this.cfrmPwInputOpts.rules[0].required = this.state.expand;
      console.log(this.state.expand);
    });
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

              <Collapse style={{ maxWidth: 606 }} onChange={this.checkExpand}>
                <Panel header="Create a Myanmar Club Account...">
                  {/* calling validator in "cfrmPwInputOpts/pwInputOpts" doesnt work. 
                      Somehow the line "validator: this.compareToFirstPassword" must be
                      written exactly here */}

                  <FormItem {...formItemLayout} label="Password">
                    {getFieldDecorator("pwInput", {
                      ...this.pwInputOpts,
                      rules: [
                        ...this.pwInputOpts.rules,
                        { validator: this.validateToNextPassword }
                      ]
                    })(<Input type="password" />)}
                  </FormItem>
                  <FormItem {...formItemLayout} label="Confirm Password">
                    {getFieldDecorator("cfrmPwInput", {
                      ...this.cfrmPwInputOpts,
                      rules: [
                        ...this.cfrmPwInputOpts.rules,
                        { validator: this.compareToFirstPassword }
                      ]
                    })(
                      <Input
                        type="password"
                        onChange={this.handleConfirmOnChange}
                      />
                    )}
                  </FormItem>
                  {pwInfo}
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
