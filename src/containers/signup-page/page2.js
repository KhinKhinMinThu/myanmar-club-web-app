import React from "react";
import "antd/dist/antd.css";
import {
  cardStyles,
  formItemLayout,
  addr1Input,
  addr2Input,
  emailInput,
  pwInput,
  pwInfo,
  fbAccInput,
  areaCodeDdl,
  hobbiesInput,
  uploadBtn,
  subComChk_CUTRL,
  subComChk_KNWLG,
  subComChk_COMTY,
  subComChk_SPORT,
  subComChk_SPOSR,
  subComChk_OUTRH
} from "./components-pages";
import {
  ConfirmPwInput,
  ZipCodeInput,
  HomeNoInput,
  MobileNoInput
} from "./components-pages";
import { Form, Card, Row, Col, Collapse } from "antd";
const FormItem = Form.Item;
const Panel = Collapse.Panel;

class Page2 extends React.Component {
  state = {
    confirmDirty: false,
    showPw: false
  };

  handleZipCodeOnBlur = e => {
    //console.log("Testtt", this.props.form.getFieldValue("subComChk_CUTRL"));
    const value = e.target.value.trim();
    /* 2 lines below are needed due to validator not being triggered for imported component.
    work for normal <Input> tag without those lines.
    */
    this.props.form.setFieldsValue({ zipCodeInput: value });
    this.props.form.validateFields(["zipCodeInput"], { force: true });
  };
  validateZipCode = (rule, value, callback) => {
    if ((isNaN(value) || value.length !== 6) && value !== undefined) {
      callback("The input is not a valid postal/zip code!");
    } else {
      callback();
    }
  };
  handleConfirmOnChange = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    /* 2 lines below are needed due to validator not being triggered for imported component.
    work for normal <Input> tag without those lines.
    */
    this.props.form.setFieldsValue({ confirmPwInput: value });
    this.props.form.validateFields(["confirmPwInput"], { force: true });
  };
  validateToNxtPassword = (rule, value, callback) => {
    //console.log("validateToNxtPassword => ", value);
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirmPwInput"], { force: true });
    }
    callback();
  };
  validatetoFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    //console.log("validatetoFirstPassword =>", value);
    if (value && value !== form.getFieldValue("pwInput")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };
  checkExpand = () => {
    const doesShow = this.state.showPw;
    this.setState({ showPw: !doesShow });
  };
  handleHomeNoOnBlur = e => {
    const value = e.target.value.trim();
    /* 2 lines below are needed due to validator not being triggered for imported component.
    work for normal <Input> tag without those lines.
    */
    this.props.form.setFieldsValue({ homeNoInput: value });
    this.props.form.validateFields(["homeNoInput"], { force: true });
  };
  validatePhoneNo = (rule, value, callback) => {
    if (isNaN(value) && value !== undefined) {
      callback("The input is not a valid phone number!");
    } else {
      callback();
    }
  };
  handleMobileNoOnBlur = e => {
    const value = e.target.value.trim();
    /* 2 lines below are needed due to validator not being triggered for imported component.
    work for normal <Input> tag without those lines.
    */
    this.props.form.setFieldsValue({ mobileNoInput: value });
    this.props.form.validateFields(["mobileNoInput"], { force: true });
  };
  normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
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
        required: true,
        message: "Please enter your postal/zip code!"
      },
      {
        validator: this.validateZipCode
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
        message: "Please enter your email address!"
      }
    ]
  };
  pwInputOpts = {
    rules: [
      {
        required: true,
        message: "Please enter your password!"
      },
      {
        validator: this.validateToNxtPassword
      }
    ]
  };
  confirmPwInputOpts = {
    rules: [
      {
        required: true,
        message: "Please enter your password!"
      },
      {
        validator: this.validatetoFirstPassword
      }
    ]
  };
  homeNoInputOpts = {
    rules: [
      {
        validator: this.validatePhoneNo
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
        validator: this.validatePhoneNo
      }
    ]
  };
  uploadBtnOpts = {
    rules: [
      {
        required: true,
        message: "Please upload your passport size photo!"
      }
    ],
    valuePropName: "fileList",
    getValueFromEvent: this.normFile
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const labelSpace = 8;
    const itemSpace = { marginLeft: 8 };

    let showPwInput = null;
    let showCfmPwInput = null;
    if (this.state.showPw) {
      showPwInput = getFieldDecorator("pwInput", this.pwInputOpts)(pwInput);

      showCfmPwInput = getFieldDecorator(
        "confirmPwInput",
        this.confirmPwInputOpts
      )(<ConfirmPwInput changed={this.handleConfirmOnChange} />);
    }
    const prefixAreaCode = getFieldDecorator("areadCodeDdl", {
      initialValue: "65"
    })(areaCodeDdl);

    return (
      <Card style={cardStyles}>
        <Form>
          {/* Address */}
          <Row type="flex">
            <Col span={labelSpace} style={{ textAlign: "right" }}>
              <FormItem label="Address" colon={true} required={true} />
            </Col>
            <Col>
              <FormItem>
                {getFieldDecorator("addr1Input", this.addrInputOpts)(
                  addr1Input
                )}
              </FormItem>
            </Col>
            <Col style={itemSpace}>
              <FormItem>{getFieldDecorator("addr2Input")(addr2Input)}</FormItem>
            </Col>
          </Row>

          {/* Postal Code */}
          <FormItem {...formItemLayout} label="Postal Code">
            {getFieldDecorator("zipCodeInput", this.zipCodeInputOpts)(
              <ZipCodeInput blurred={this.handleZipCodeOnBlur} />
            )}
          </FormItem>

          {/* Email Address */}
          <FormItem {...formItemLayout} label="Email Address">
            {getFieldDecorator("emailInput", this.emailInputOpts)(emailInput)}
          </FormItem>

          {/* Passwords */}
          <FormItem>
            <Row>
              <Col offset={8}>
                {/* width: to be in alignment with address inputs */}
                <Collapse style={{ maxWidth: 608 }} onChange={this.checkExpand}>
                  <Panel header="Create a Myanmar Club Account...">
                    <FormItem {...formItemLayout} label="Password">
                      {showPwInput}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Confirm Password">
                      {showCfmPwInput}
                    </FormItem>
                    {pwInfo}
                  </Panel>
                </Collapse>
              </Col>
            </Row>
          </FormItem>

          {/* Facebook Account */}
          <FormItem {...formItemLayout} label="Facebook Account">
            {getFieldDecorator("fbAccInput")(fbAccInput)}
          </FormItem>

          {/* Home Phone Number */}
          <FormItem {...formItemLayout} label="Home Phone Number">
            {getFieldDecorator("homeNoInput", this.homeNoInputOpts)(
              <HomeNoInput blurred={this.handleHomeNoOnBlur} />
            )}
          </FormItem>

          {/* Mobiel Number */}
          <FormItem {...formItemLayout} label="Mobile Number">
            {getFieldDecorator("mobileNoInput", this.mobileNoInputOpts)(
              <MobileNoInput
                areadCodeBef={prefixAreaCode}
                blurred={this.handleMobileNoOnBlur}
              />
            )}
          </FormItem>

          {/* Hobbies */}
          <FormItem {...formItemLayout} label="Hobbies">
            {getFieldDecorator("hobbiesInput")(hobbiesInput)}
          </FormItem>

          {/* Passport Size Photo*/}
          <FormItem {...formItemLayout} label="Passport Size Photo">
            {getFieldDecorator("uploadBtn", this.uploadBtnOpts)(uploadBtn)}
          </FormItem>

          {/* Sub-Com Interests */}
          <Row type="flex">
            <Col span={labelSpace} style={{ textAlign: "right" }}>
              <FormItem label="Interested Sub-Committee(s)" colon={true} />
            </Col>
            <Col span={16} style={{ paddingTop: 10 }}>
              {getFieldDecorator("subComChk_CUTRL")(subComChk_CUTRL)}
              <br />
              {getFieldDecorator("subComChk_KNWLG")(subComChk_KNWLG)}
              <br />
              {getFieldDecorator("subComChk_COMTY")(subComChk_COMTY)}
              <br />
              {getFieldDecorator("subComChk_SPORT")(subComChk_SPORT)}
              <br />
              {getFieldDecorator("subComChk_SPOSR")(subComChk_SPOSR)}
              <br />
              {getFieldDecorator("subComChk_OUTRH")(subComChk_OUTRH)}
            </Col>
          </Row>
        </Form>
      </Card>
    );
  }
}
export default Form.create()(Page2);
