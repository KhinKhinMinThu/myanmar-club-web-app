import React from "react";
import "antd/dist/antd.css";
import {
  cardStyles,
  formItemLayout,
  name1Input,
  name2Input,
  name3Input,
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
import { NationalityDdl, ReligionDdl } from "./components-pages";
import { Form, Card, Row, Col } from "antd";
const FormItem = Form.Item;

class Page1 extends React.Component {
  state = {
    showOtherNat: false,
    showOtherRel: false
  };

  nationalityDdlChanged = value => {
    //console.log("nationalityDdlChanged", value);
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
        pattern: "^([A-Z]|[a-z])([0-9]{7})([A-Z]|[a-z])$",
        message: "The input is not a valid ID Number!"
      },
      {
        required: true,
        message: "Please enter your ID Number!"
      }
    ]
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const labelSpace = 8;
    const itemSpace = { marginLeft: 8 };

    let showOtherNatInput = null;
    let showOtherRelInput = null;
    if (this.state.showOtherNat) {
      showOtherNatInput = getFieldDecorator("otherNatInput", this.natInputOpts)(
        otherInput
      );
    }
    if (this.state.showOtherRel) {
      showOtherRelInput = getFieldDecorator("otherRelInput")(otherInput);
    }

    return (
      <Card style={cardStyles}>
        <Form>
          <Row type="flex">
            {/* Name */}
            <Col span={labelSpace} style={{ textAlign: "right" }}>
              <FormItem label="Name" colon={true} required={true} />
            </Col>
            <Col>
              <FormItem>
                {getFieldDecorator("name1Input", this.nameInputOpts)(
                  name1Input
                )}
              </FormItem>
            </Col>
            <Col>
              <FormItem style={itemSpace}>
                {getFieldDecorator("name2Input")(name2Input)}
              </FormItem>
            </Col>
            <Col style={itemSpace}>
              <FormItem>{getFieldDecorator("name3Input")(name3Input)}</FormItem>
            </Col>
          </Row>

          {/* Gender */}
          <FormItem {...formItemLayout} label="Gender">
            {getFieldDecorator("genderRdo", this.genderRdoOpts)(genderRdo)}
          </FormItem>

          {/* Date of Birth */}
          <FormItem {...formItemLayout} label="Date of Birth">
            {getFieldDecorator("dobInput", this.dobInputOpts)(dobInput)}
          </FormItem>

          {/* Nationality */}
          <Row type="flex">
            <Col span={labelSpace} style={{ textAlign: "right" }}>
              <FormItem label="Nationality" colon={true} required={true} />
            </Col>
            <Col>
              <FormItem>
                {getFieldDecorator("nationalityDdl")(
                  <NationalityDdl changed={this.nationalityDdlChanged} />
                )}
              </FormItem>
            </Col>
            <Col>
              <FormItem style={itemSpace}>{showOtherNatInput}</FormItem>
            </Col>
          </Row>

          {/* Religion */}
          <Row type="flex">
            <Col span={labelSpace} style={{ textAlign: "right" }}>
              <FormItem label="Religion" colon={true} />
            </Col>
            <Col>
              <FormItem>
                {getFieldDecorator("religionDdl")(
                  <ReligionDdl changed={this.religionDdlChanged} />
                )}
              </FormItem>
            </Col>
            <Col>
              <FormItem style={itemSpace}>{showOtherRelInput}</FormItem>
            </Col>
          </Row>

          {/* Marital Status */}
          <FormItem {...formItemLayout} label="Marital Status">
            {getFieldDecorator("mStatusDdl", this.mStatusDdlOpts)(mStatusDdl)}
          </FormItem>

          {/* Education Level */}
          <FormItem {...formItemLayout} label="Education Level">
            {getFieldDecorator("eduLvlInput", this.eduLvlInputOpts)(
              eduLvlInput
            )}
            {eduLvlInfo}
          </FormItem>

          {/* Occupation */}
          <FormItem {...formItemLayout} label="Occupation">
            {getFieldDecorator("occupationInput", this.occupationInputOpts)(
              occupationInput
            )}
          </FormItem>

          {/* Pass */}
          <FormItem {...formItemLayout} label="Singapore Pass">
            {getFieldDecorator("sgPassDdl", this.sgPassDdlOpts)(sgPassDdl)}
          </FormItem>

          {/* ID Number*/}
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
