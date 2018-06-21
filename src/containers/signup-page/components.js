import React from "react";
import {
  Input,
  Steps,
  Button,
  Radio,
  DatePicker,
  Select,
  InputNumber
} from "antd";
import {
  dateFormat,
  extraInfoStyles,
  InfoListIcon
} from "../shared-components/common";
import Page1 from "./page1";
import Page2 from "./page2";

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const Step = Steps.Step;
const Option = Select.Option;

export const cardStyles = {
  borderRadius: 10,
  textAlign: "left"
};
export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};
export const fieldWidth = { width: 200 };
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

export class StepContent extends React.Component {
  validatePage = e => {
    let result = false;
    if (this.currentStep !== 1) {
      this.currentPage.validateFields((err, values) => {
        if (!err) {
          result = true;
        }
      });
    } else {
      result = true; // to skip page1 validation
    }
    return result;
  };
  render() {
    const { steps, current } = this.props;
    this.currentStep = steps[current].content;
    // ***********************

    console.log("currentStep", this.currentStep);

    let page = null;
    if (this.currentStep === 1) {
      page = (
        <Page1
          ref={node => {
            this.currentPage = node;
          }}
        />
      );
    } else if (this.currentStep === 2) {
      page = (
        <Page2
          ref={node => {
            this.currentPage = node;
          }}
        />
      );
    }
    // ***********************
    return <div style={stepsContentStyles}>{page}</div>;
  }
}

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

// ******************************* page2 components
// *******************************
export const addr1Input = (
  <Input
    style={{ width: 300 }}
    type="text"
    placeholder="Street Address Line 1"
  />
);
export const addr2Input = (
  <Input
    style={{ width: 300 }}
    type="text"
    placeholder="Street Address Line 2"
  />
);
export const zipCodeInput = (
  <InputNumber
    style={fieldWidth}
    min={1}
    max={999999}
    placeholder="Postal/ Zip Code"
  />
);
export const emailInput = (
  <Input style={fieldWidth} type="text" placeholder="Email Address" />
);

export const pwInfo = (
  <div>
    <InfoListIcon type="exclamation-circle-o" />
    <span style={extraInfoStyles}>
      The password must be at least 6 characters.
    </span>
    <br />
    <InfoListIcon type="exclamation-circle-o" />
    <span style={extraInfoStyles}>
      It must contain at least one letter and one number.
    </span>
    <br />
    <InfoListIcon type="exclamation-circle-o" />
    <span style={extraInfoStyles}>Passwords are case sensitive.</span>
  </div>
);
//end
