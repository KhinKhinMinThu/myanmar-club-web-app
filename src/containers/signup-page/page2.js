import React from "react";
import "antd/dist/antd.css";
import {
  cardStyles,
  formItemLayout,
  addr1Input,
  addr2Input,
  zipCodeInput,
  emailInput,
  pwInfo,
  homeNoInput,
  mobileNoInput,
  hobbiesInput,
  uploadBtn,
  subComListChk
} from "./components-pages";
import { Form, Card, Row, Col, Collapse, Input } from "antd";
const FormItem = Form.Item;
const Panel = Collapse.Panel;

class Page2 extends React.Component {
  state = {
    confirmDirty: false,
    showPw: false
  };
  addrInputOpts = {
    rules: [
      {
        required: true,
        message: "Please enter your address!"
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
        message: "Please enter your postal/zip code!"
      }
    ]
  };
  emailInputOpts = {
    rules: [
      {
        type: "email",
        message: "The enter is not valid email address! "
      },
      {
        required: true,
        message: "Please enter your email address!"
      }
    ]
  };
  pwInputOpts = {
    rules: [
      {
        required: true,
        message: "Please enter your password!"
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
        required: true,
        message: "Please enter your password!"
      }
      // this validator is not called
      // must place manually within return formItem tag

      // {
      //   validator: this.compareToFirstPassword
      // }
    ]
  };
  homeNoInputOpts = {
    rules: [
      {
        type: "number",
        message: "The input is not valid phone number! "
      }
    ]
  };
  mobileNoInputOpts = {
    rules: [
      {
        required: true,
        message: "Please enter your mobile phone number!"
      },
      {
        type: "number",
        message: "The input is not valid phone number! "
      }
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
  checkExpand = () => {
    const doesShow = this.state.showPw;
    this.setState({ showPw: !doesShow });
  };
  normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const rowGutter = 6;
    let showPwInput = null;
    let showCfmPwInput = null;
    if (this.state.showPw) {
      showPwInput = (
        <FormItem {...formItemLayout} label="Password">
          {getFieldDecorator("pwInput", {
            ...this.pwInputOpts,
            rules: [
              ...this.pwInputOpts.rules,
              { validator: this.validateToNextPassword }
            ]
          })(<Input type="password" />)}
        </FormItem>
      );
      showCfmPwInput = (
        <FormItem {...formItemLayout} label="Confirm Password">
          {getFieldDecorator("cfrmPwInput", {
            ...this.cfrmPwInputOpts,
            rules: [
              ...this.cfrmPwInputOpts.rules,
              { validator: this.compareToFirstPassword }
            ]
          })(<Input type="password" onChange={this.handleConfirmOnChange} />)}
        </FormItem>
      );
    }
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
          <FormItem>
            <Row>
              <Col offset={8}>
                {/* width: 606 <2 addr input width + rowGutter: 6> */}
                <Collapse style={{ maxWidth: 606 }} onChange={this.checkExpand}>
                  <Panel header="Create a Myanmar Club Account...">
                    {/* calling validator in "cfrmPwInputOpts/pwInputOpts" doesnt work. 
                      Somehow the line "validator: this.compareToFirstPassword" must be
                      written exactly here */}
                    {showPwInput}
                    {showCfmPwInput}
                    {pwInfo}
                  </Panel>
                </Collapse>
              </Col>
            </Row>
          </FormItem>

          <FormItem {...formItemLayout} label="Home Phone Number">
            {getFieldDecorator("homeNoInput", this.homeNoInputOpts)(
              homeNoInput
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="Mobile Number">
            {getFieldDecorator("mobileNoInput", this.mobileNoInputOpts)(
              mobileNoInput
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="Hobbies">
            {getFieldDecorator("hobbiesInput")(hobbiesInput)}
          </FormItem>
        </Form>
        {/* calling this.norFile doesn't work if the code is separated in another
        variable (e.g., uploadBtnOtps) 
        getValueFromEvent only works when insert exactly here */}
        <FormItem {...formItemLayout} label="Passport Size Photo">
          {getFieldDecorator("uploadBtn", {
            rules: [
              {
                required: true,
                message: "Please upload your passport size photo!"
              }
            ],
            valuePropName: "fileList",
            getValueFromEvent: this.normFile
          })(uploadBtn)}
        </FormItem>

        <FormItem {...formItemLayout} label="Interested Sub-Committee(s)">
          {getFieldDecorator("subComListChk")(subComListChk)}
        </FormItem>
      </Card>
    );
  }
}
export default Form.create()(Page2);
