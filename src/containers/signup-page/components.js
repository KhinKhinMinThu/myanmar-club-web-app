import React from "react";
import { Input, Steps, Button, Radio, DatePicker, Select } from "antd";
import { dateFormat, extraInfoStyles } from "../shared-components/common";

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const Step = Steps.Step;
const Option = Select.Option;

export const cardStyles = {
  borderRadius: 10,
  textAlign: "left"
};

// ******************************* signup-form components
// *******************************
const stepsContentStyles = {
  marginTop: "20px",
  //border: "1px solid #e9e9e9",
  borderRadius: 10,
  backgroundColor: "#fafafa",
  //minHeight: "200px",
  textAlign: "center",
  padding: "18px"
};
const stepActionStyles = {
  marginTop: "24px",
  textAlign: "right"
};

export const PageSteps = props => (
  <Steps current={props.current}>
    {props.steps.map(item => <Step key={item.title} title={item.title} />)}
  </Steps>
);

export const StepContent = props => (
  <div style={stepsContentStyles}>{props.steps[props.current].content}</div>
);

export const StepAction = props => (
  <div style={stepActionStyles}>
    {props.current > 0 && (
      <Button style={{ marginRight: 8 }} onClick={props.prevClicked}>
        Previous
      </Button>
    )}
    {props.current < props.steps.length - 1 && (
      <Button type="primary" htmlType="submit" onClick={props.nxtClicked}>
        Next
      </Button>
    )}
    {props.current === props.steps.length - 1 && (
      <Button type="primary" onClick={props.completedClicked}>
        Done
      </Button>
    )}
  </div>
);
// end

// ******************************* page1 components
// *******************************
const fieldWidth = { width: 200 };
export const firstNameInput = (
  <Input style={fieldWidth} type="text" placeholder="First Name" />
);
export const middleNameInput = (
  <Input style={fieldWidth} type="text" placeholder="Middle Name" />
);
export const lastNameInput = (
  <Input style={fieldWidth} type="text" placeholder="Last Name" />
);
export const genderRdo = (
  <RadioGroup name="genderRdo">
    <RadioButton value="M">Male</RadioButton>
    <RadioButton value="F">Female</RadioButton>
  </RadioGroup>
);
export const dobInput = <DatePicker style={fieldWidth} format={dateFormat} />;

export class NationalityDdl extends React.Component {
  render() {
    return (
      <Select
        style={fieldWidth}
        placeholder="Select nationality"
        onChange={this.props.changed}
      >
        <Option value="MM">Myanmar</Option>
        <Option value="SG">Singaporean</Option>
        <Option value="OT">Others</Option>
      </Select>
    );
  }
}
export class ReligionDdl extends React.Component {
  render() {
    return (
      <Select
        style={fieldWidth}
        placeholder="Select religion"
        onChange={this.props.changed}
      >
        <Option value="BU">Buddhism</Option>
        <Option value="IS">Islam</Option>
        <Option value="HI">Hinduism</Option>
        <Option value="CH">Christianity</Option>
        <Option value="OT">Others</Option>
      </Select>
    );
  }
}
export const otherInput = <Input style={fieldWidth} type="text" />;

export const mStatusDdl = (
  <Select style={fieldWidth} placeholder="Select marital status">
    <Option value="SI">Single</Option>
    <Option value="MA">Married</Option>
    <Option value="DI">Divorced</Option>
    <Option value="WI">Widowed</Option>
  </Select>
);

export const eduLvlInput = (
  <Input style={fieldWidth} type="text" placeholder="Education Level" />
);
export const eduLvlInfo = (
  <span style={extraInfoStyles}>
    GCE A Level, Bachelor, Master, Doctoral (PhD) etc.
  </span>
);
export const occupationInput = (
  <Input style={fieldWidth} type="text" placeholder="Job Title" />
);

export const sgPassDdl = (
  <Select style={fieldWidth} placeholder="Select pass type">
    <Option value="SP">S Pass</Option>
    <Option value="EP">Employment Pass</Option>
    <Option value="ST">Student Pass</Option>
    <Option value="CI">Citizen</Option>
    <Option value="PR">Permanent Resident</Option>
    <Option value="WP">Work Permit</Option>
  </Select>
);
export const passNumInput = (
  <Input style={fieldWidth} type="text" placeholder="NRIC/ FIN No." />
);
export const passNumInfo = (
  <span style={extraInfoStyles}>S1234567Z, G1234567Z etc.</span>
);
//end

// export const PasswordInput = (
//   <Input
//     prefix={<FormInputIcon type="lock" />}
//     type="password"
//     placeholder="Password"
//   />
// );

// export const ForgotPasswordLink = (
//   <a href="" style={{ float: "right" }}>
//     Forgot password{" "}
//   </a>
// );

// export const SignUpLink = (
//   <a href="" style={{ float: "right" }}>
//     Sign up now!
//   </a>
// );

// export const RememberCheckbox = (
//   <Checkbox style={{ float: "left" }}>Remember me</Checkbox>
// );

// export const LoginButton = (
//   <FullWidthButton type="primary" htmlType="submit">
//     Log in
//   </FullWidthButton>
// );
