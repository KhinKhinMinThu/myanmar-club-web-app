import React from "react";
import "antd/dist/antd.css";
import {
  cardStyles,
  firstNameInput,
  middleNameInput,
  lastNameInput,
  genderRdo,
  dobInput,
  NationalityDdl,
  ReligionDdl,
  otherInput,
  mStatusDdl,
  eduLvlInput,
  eduLvlInfo,
  occupationInput,
  sgPassDdl,
  passNumInput,
  passNumInfo
} from "./components";
import { Form, Card, Row, Col, Button } from "antd";
const FormItem = Form.Item;

class Page1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOtherNat: false,
      showOtherRel: false
    };
  }

  nameInputOpts = {
    rules: [
      {
        required: true,
        message: "Please input your name!"
      }
    ]
  };
  genderRdoOpts = { initialValue: "M" };
  dobInputOpts = {
    rules: [
      {
        required: true,
        message: "Please input your date of birth!"
      }
    ]
  };
  natInputOpts = {
    rules: [
      {
        required: true,
        message: "Please specify your nationality!"
      }
    ]
  };
  relInputOpts = {
    rules: [
      {
        required: true,
        message: "Please specify your religion!"
      }
    ]
  };
  mStatusDdlOpts = { initialValue: "SI" };
  eduLvlInputOpts = {
    rules: [
      {
        required: true,
        message: "Please ender your education level!"
      }
    ]
  };
  occupationInputOpts = {
    rules: [
      {
        required: true,
        message: "Please ender your education level!"
      }
    ]
  };
  sgPassDdlOpts = { initialValue: "SP" };
  passNumInputOpts = {
    rules: [
      {
        type: "email",
        message: "The input is not valid E-mail!"
      },
      {
        required: true,
        message: "Please enter your ID Number!"
      }
    ]
  };
  emailInputOpts = {
    rules: [
      {
        type: "email",
        message: "The input is not valid E-mail!"
      },
      {
        required: true,
        message: "Please input your E-mail!"
      }
    ]
  };
  validateFields = () => {
    console.log("validate");
    this.props.form.validateFields((err, values) => {
      console.log("comonnnn");
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        //this.props.next;
      }
    });
  };
  nationalityDdlChanged = value => {
    const doesShow = this.state.showOtherNat;
    if (value === "OT" && !doesShow) {
      this.setState({ showOtherNat: true });
    }
    if (value !== "OT" && doesShow) {
      this.setState({ showOtherNat: false });
    }
  };
  religionDdlChanged = value => {
    const doesShow = this.state.showOtherRel;
    if (value === "OT" && !doesShow) {
      this.setState({ showOtherRel: true });
    }
    if (value !== "OT" && doesShow) {
      this.setState({ showOtherRel: false });
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const rowGutter = 6;

    let showOtherNatInput = null;
    let showOtherRelInput = null;
    if (this.state.showOtherNat) {
      showOtherNatInput = getFieldDecorator(
        "otherNatInput",
        this.otherNatInputOpts
      )(otherInput);
    }
    if (this.state.showOtherRel) {
      showOtherRelInput = getFieldDecorator(
        "otherRelInput",
        this.otherRelInputOpts
      )(otherInput);
    }

    return (
      <Card style={cardStyles}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="Name">
            <Row gutter={rowGutter} type="flex">
              <Col>
                {getFieldDecorator("firstName", this.nameInputOpts)(
                  firstNameInput
                )}
              </Col>
              <Col>{middleNameInput}</Col>
              <Col>{lastNameInput}</Col>
            </Row>
          </FormItem>

          <FormItem {...formItemLayout} label="Gender">
            {getFieldDecorator("genderRdo", this.genderRdoOpts)(genderRdo)}
          </FormItem>

          <FormItem {...formItemLayout} label="Date of Birth">
            {getFieldDecorator("dobInput", this.dobInputOpts)(dobInput)}
          </FormItem>

          <FormItem {...formItemLayout} label="Nationality">
            {getFieldDecorator("nationalityDdl", this.natInputOpts)(
              <Row gutter={rowGutter} type="flex">
                <Col>
                  <NationalityDdl changed={this.nationalityDdlChanged} />
                </Col>
                <Col>{showOtherNatInput}</Col>
              </Row>
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="Religion">
            {getFieldDecorator("religtionDdl", this.relInputOpts)(
              <Row gutter={rowGutter} type="flex">
                <Col>
                  <ReligionDdl changed={this.religionDdlChanged} />
                </Col>
                <Col>{showOtherRelInput}</Col>
              </Row>
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="Marital Status">
            {getFieldDecorator("mStatusDdl", this.mStatusDdlOpts)(mStatusDdl)}
          </FormItem>

          <FormItem {...formItemLayout} label="Education Level">
            {getFieldDecorator("eduLvlInput", this.eduLvlInputOpts)(
              eduLvlInput
            )}
            {eduLvlInfo}
          </FormItem>

          <FormItem {...formItemLayout} label="Occupation">
            {getFieldDecorator("occupationInput", this.occupationInputOpts)(
              occupationInput
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="Singapore Pass">
            {getFieldDecorator("sgPassDdl", this.sgPassDdlOpts)(sgPassDdl)}
          </FormItem>

          <FormItem {...formItemLayout} label="Identification Number">
            {getFieldDecorator("passNumInput", this.passNumInputOpts)(
              passNumInput
            )}
            {passNumInfo}
          </FormItem>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(Page1);
