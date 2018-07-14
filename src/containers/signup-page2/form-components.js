import React, { Component } from 'react';
import {
  Form, Col, Radio, Select,
} from 'antd';
import {
  FormInput, FormDatePicker, FormSelect, ExtraInfoText,
} from './styled-components';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Option } = Select;

const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

/* eslint react/prop-types: 0 */
// ALL FORM ITEM MUST PASS IN decorator!

// full name
export const FullNameTextInput = ({ decorator }) => (
  <FormItem {...layout} label="Name" colon required>
    <Col span={7}>
      <FirstNameTextInput decorator={decorator} />
    </Col>
    <Col span={7}>
      <MiddleNameTextInput decorator={decorator} />
    </Col>
    <Col span={10}>
      <LastNameTextInput decorator={decorator} />
    </Col>
  </FormItem>
);

// first name
export const FirstNameTextInput = ({ decorator }) => (
  <FormItem>
    {decorator('firstName', {
      rules: [
        {
          required: true,
          message: 'Please input your username!',
        },
      ],
    })(<FormInput type="text" placeholder="First Name" />)}
  </FormItem>
);

// middle name
export const MiddleNameTextInput = ({ decorator }) => (
  <FormItem>
    {decorator('middleName')(<FormInput type="text" placeholder="Middle Name" />)}
  </FormItem>
);

// last name
export const LastNameTextInput = ({ decorator }) => (
  <FormItem>{decorator('lastName')(<FormInput type="text" placeholder="Last Name" />)}</FormItem>
);

// gender
export const GenderRadio = ({ decorator }) => (
  <FormItem {...layout} label="Gender">
    {decorator('gender')(
      <RadioGroup name="gender">
        <RadioButton value="M">Male</RadioButton>
        <RadioButton value="F">Female</RadioButton>
      </RadioGroup>,
    )}
  </FormItem>
);

// dob format={{"DD-MM-YYYY"}}
export const DobDatePicker = ({ decorator }) => (
  <FormItem {...layout} label="Date of Birth">
    {decorator('dob', {
      rules: [
        {
          required: true,
          message: 'Please enter your date of birth!',
        },
      ],
    })(<FormDatePicker format="DD-MM-YYYY" />)}
  </FormItem>
);

// nationality
export class NationalitySelect extends Component {
  state = { showFormInput: true };

  onSelect = (value) => {
    if (value === 'OT') {
      this.setState({ showFormInput: true });
    } else {
      this.setState({ showFormInput: false });
    }
  };

  render() {
    const { decorator } = this.props;
    const { showFormInput } = this.state;
    return (
      <FormItem {...layout} label="Nationality" colon required>
        <Col span={7}>
          <FormItem>
            {decorator('nationality')(
              <FormSelect onChange={value => this.onSelect(value)}>
                <Option value="MM">Myanmar</Option>
                <Option value="SG">Singaporean</Option>
                <Option value="OT">Others</Option>
              </FormSelect>,
            )}
          </FormItem>
        </Col>
        {/* show text input if nationality is others */}
        {showFormInput && (
          <Col span={17}>
            <FormItem>
              {decorator('otherNationality', {
                rules: [
                  {
                    required: true,
                    message: 'Please specify your nationality!',
                  },
                ],
              })(<FormInput type="text" />)}
            </FormItem>
          </Col>
        )}
      </FormItem>
    );
  }
}

// religion
// later test with HOC!!

// marital status
export const MaritalStatusSelect = ({ decorator }) => (
  <FormItem {...layout} label="Marital Status">
    {decorator('maritalStatus')(
      <FormSelect placeholder="Select marital status">
        <Option value="SI">Single</Option>
        <Option value="MA">Married</Option>
        <Option value="DI">Divorced</Option>
        <Option value="WI">Widowed</Option>
      </FormSelect>,
    )}
  </FormItem>
);

// education level
export const EducationLevelTextInput = ({ decorator }) => (
  <FormItem {...layout} label="Education Level">
    {decorator('education', {
      rules: [
        {
          required: true,
          message: 'Please ender your education level!',
        },
      ],
    })(<FormInput text="Education Level" />)}
    <ExtraInfoText>GCE A Level, Bachelor, Master, Doctoral (PhD) etc.</ExtraInfoText>
  </FormItem>
);

// occupation
export const OccupationTextInput = ({ decorator }) => (
  <FormItem {...layout} label="Occupation">
    {decorator('occupation', {
      rules: [
        {
          required: true,
          message: 'Please ender your education level!',
        },
      ],
    })(<FormInput text="Job Title" />)}
  </FormItem>
);

// stay pass
export const StayPassSelect = ({ decorator }) => (
  <FormItem {...layout} label="Singapore Pass">
    {decorator('stayPass')(
      <FormSelect placeholder="Select pass type">
        <Option value="SP">S Pass</Option>
        <Option value="EP">Employment Pass</Option>
        <Option value="ST">Student Pass</Option>
        <Option value="CI">Citizen</Option>
        <Option value="PR">Permanent Resident</Option>
        <Option value="WP">Work Permit</Option>
      </FormSelect>,
    )}
  </FormItem>
);

// id number
export const IDTextInput = ({ decorator }) => (
  <FormItem {...layout} label="Identification Number">
    {decorator('id', {
      rules: [
        {
          pattern: '^([A-Z]|[a-z])([0-9]{7})([A-Z]|[a-z])$',
          message: 'The input is not a valid ID Number!',
        },
        {
          required: true,
          message: 'Please enter your ID Number!',
        },
      ],
    })(<FormInput maxLength="9" type="text" placeholder="NRIC/ FIN No." />)}
    <ExtraInfoText>S1234567Z, G1234567Z etc.</ExtraInfoText>
  </FormItem>
);

// address
