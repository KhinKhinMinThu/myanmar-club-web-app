import React from "react";
import "antd/dist/antd.css";
import {
  fieldWidth,
  cardStyles,
  formItemLayout,
  firstNameInput,
  middleNameInput,
  lastNameInput,
  genderRdo,
  dobInput,
  otherInput,
  mStatusDdl,
  eduLvlInput,
  eduLvlInfo,
  occupationInput,
  sgPassDdl,
  passNumInput,
  passNumInfo
} from "./components-pages";
import { Form, Card, Row, Col, Select } from "antd";
const FormItem = Form.Item;
const Option = Select.Option;

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
        message: "Please enter your name!"
      }
    ]
  };
  genderRdoOpts = { initialValue: "M" };
  dobInputOpts = {
    rules: [
      {
        required: true,
        message: "Please enter your date of birth!"
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
        required: true,
        message: "Please enter your ID Number!"
      }
    ]
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
    const rowGutter = 6;

    let showOtherNatInput = null;
    let showOtherRelInput = null;
    if (this.state.showOtherNat) {
      showOtherNatInput = getFieldDecorator("otherNatInput", this.natInputOpts)(
        otherInput
      );
    }
    if (this.state.showOtherRel) {
      showOtherRelInput = getFieldDecorator("otherRelInput", this.relInputOpts)(
        otherInput
      );
    }

    return (
      <Card style={cardStyles}>
        <Form>
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

          {/*Not able to export/import as onChange method not working for Component props*/}
          <FormItem {...formItemLayout} label="Nationality">
            <Row gutter={rowGutter} type="flex">
              <Col>
                <Select
                  style={fieldWidth}
                  defaultValue="MM"
                  onChange={this.nationalityDdlChanged}
                >
                  <Option value="MM">Myanmar</Option>
                  <Option value="SG">Singaporean</Option>
                  <Option value="OT">Others</Option>
                </Select>
              </Col>
              <Col>{showOtherNatInput}</Col>
            </Row>
          </FormItem>

          {/*Not able to export/import as onChange method not working for Component props*/}
          <FormItem {...formItemLayout} label="Religion">
            <Row gutter={rowGutter} type="flex">
              <Col>
                <Select
                  style={fieldWidth}
                  defaultValue="BU"
                  onChange={this.religionDdlChanged}
                >
                  <Option value="BU">Buddhism</Option>
                  <Option value="IS">Islam</Option>
                  <Option value="HI">Hinduism</Option>
                  <Option value="CH">Christianity</Option>
                  <Option value="OT">Others</Option>
                </Select>
              </Col>
              <Col>{showOtherRelInput}</Col>
            </Row>
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
