import React, { Component } from 'react';
import {
  Form, Col, Radio, Select,
} from 'antd';
import {
  FormInput,
  FormDatePicker,
  FormSelect,
  ExtraInfoText,
} from '../styled-components';

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

// Name Input
export const NameInput = ({ decorator }) => (
  <FormItem {...layout} label="Name" colon required>
    <Col span="8">
      <FormItem>
        {decorator('firstName', {
          rules: [
            {
              required: true,
              message: 'Please input your name!',
            },
          ],
        })(<FormInput type="text" placeholder="First Name" />)}
      </FormItem>
    </Col>
    <Col span="8">
      <FormItem>
        {decorator('middleName')(<FormInput placeholder="Middle Name" />)}
      </FormItem>
    </Col>
    <Col span="7">
      <FormItem>
        {decorator('lastName')(<FormInput placeholder="Last Name" />)}
      </FormItem>
    </Col>
  </FormItem>
);

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
    {decorator('middleName')(
      <FormInput type="text" placeholder="Middle Name" />,
    )}
  </FormItem>
);

// last name
export const LastNameTextInput = ({ decorator }) => (
  <FormItem>
    {decorator('lastName')(<FormInput type="text" placeholder="Last Name" />)}
  </FormItem>
);

// gender
export const GenderRadio = ({ decorator }) => (
  <FormItem {...layout} label="Gender">
    {decorator('gender', {
      initialValue: 'M',
    })(
      <RadioGroup name="gender" style={{ float: 'left' }}>
        <RadioButton value="M">Male</RadioButton>
        <RadioButton value="F">Female</RadioButton>
      </RadioGroup>,
    )}
  </FormItem>
);

// Date of birth
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

class SelectOtherToggler extends Component {
  state = { showTextInput: false };

  onSelect = (value) => {
    if (value === 'OT') {
      this.setState({ showTextInput: true });
    } else {
      this.setState({ showTextInput: false });
    }
  };

  render() {
    const { render } = this.props;
    const { showTextInput } = this.state;
    return render(showTextInput, this.onSelect);
  }
}

// nationality
export const NationalitySelect = ({ decorator }) => (
  <SelectOtherToggler
    render={(showTextInput, onSelect) => (
      <FormItem {...layout} label="Nationality" colon required>
        <Col span={7}>
          <FormItem>
            {decorator('nationality', {
              rules: [
                {
                  required: true,
                  message: 'Please select your nationality!',
                },
              ],
            })(
              <FormSelect
                style={{ width: '200px' }}
                onChange={value => onSelect(value)}
              >
                <Option value="MM">Myanmar</Option>
                <Option value="SG">Singaporean</Option>
                <Option value="OT">Others</Option>
              </FormSelect>,
            )}
          </FormItem>
        </Col>
        {/* show text input if nationality is others */}
        {showTextInput && (
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
    )}
  />
);

// religion
export const ReligionSelect = ({ decorator }) => (
  <SelectOtherToggler
    render={(showTextInput, onSelect) => (
      <FormItem {...layout} label="Religion">
        <Col span={7}>
          <FormItem>
            {decorator('religion')(
              <FormSelect
                style={{ width: '200px' }}
                onChange={value => onSelect(value)}
              >
                <Option value="BU">Buddhism</Option>
                <Option value="IS">Islam</Option>
                <Option value="HI">Hinduism</Option>
                <Option value="CH">Christianity</Option>
                <Option value="OT">Others</Option>
              </FormSelect>,
            )}
          </FormItem>
        </Col>
        {/* show text input if religion is others */}
        {showTextInput && (
          <Col span={17}>
            <FormItem>
              {decorator('otherReligion', {
                rules: [
                  {
                    required: true,
                    message: 'Please specify your religion!',
                  },
                ],
              })(<FormInput type="text" />)}
            </FormItem>
          </Col>
        )}
      </FormItem>
    )}
  />
);

// marital status
export const MaritalStatusSelect = ({ decorator }) => (
  <FormItem {...layout} label="Marital Status">
    {decorator('maritalStatus', {
      rules: [
        {
          required: true,
          message: 'Please select your marital status!',
        },
      ],
    })(
      <FormSelect
        style={{ width: '200px' }}
        placeholder="Select marital status"
      >
        <Option value="SI">Single</Option>
        <Option value="MA">Married</Option>
        <Option value="DI">Divorced</Option>
        <Option value="WI">Widowed</Option>
      </FormSelect>,
    )}
  </FormItem>
);

// education level
export const EducationLevelInput = ({ decorator }) => (
  <FormItem {...layout} label="Education Level">
    {decorator('education', {
      rules: [
        {
          required: true,
          message: 'Please enter your education level!',
        },
      ],
    })(<FormInput placeholder="Education Level" />)}
    <ExtraInfoText>
      GCE A Level, Bachelor, Master, Doctoral (PhD) etc.
    </ExtraInfoText>
  </FormItem>
);

// occupation
export const OccupationInput = ({ decorator }) => (
  <FormItem {...layout} label="Occupation">
    {decorator('occupation', {
      rules: [
        {
          required: true,
          message: 'Please enter your education level!',
        },
      ],
    })(<FormInput placeholder="Job Title" />)}
  </FormItem>
);

// stay pass
export const StayPassSelect = ({ decorator }) => (
  <FormItem {...layout} label="Singapore Pass">
    {decorator('stayPass', {
      rules: [
        {
          required: true,
          message: 'Please select your pass type!',
        },
      ],
    })(
      <FormSelect style={{ width: '200px' }} placeholder="Select pass type">
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
export const IDInput = ({ decorator }) => (
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
    })(<FormInput type="text" placeholder="NRIC/ FIN No." />)}
    <ExtraInfoText>S1234567Z, G1234567Z etc.</ExtraInfoText>
  </FormItem>
);
