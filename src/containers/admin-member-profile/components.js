import React, { Component } from 'react';
import {
  Tabs, Form, Col, Radio, Select,
} from 'antd';
import {
  TabIcon,
  BoldText,
  HalfWidthButton,
  FormInput,
  FormDatePicker,
  FormSelect,
  ExtraInfoText,
} from './styled-components';

const { TabPane } = Tabs;
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
export const ProfileTabs = ({ onChange, tabContents }) => {
  const tabTitles = {
    tab1: (
      <BoldText>
        <TabIcon type="user" />
        Member Profile
      </BoldText>
    ),
    tab2: (
      <BoldText>
        <TabIcon type="user" />
        Membership Information
      </BoldText>
    ),
  };

  const MemberProfilePage = tabContents[0];
  // const MembershipPage = tabContents[1];
  return (
    <Tabs onChange={onChange} type="card">
      <TabPane tab={tabTitles.tab1} key="tab1">
        <MemberProfilePage />
      </TabPane>
      <TabPane tab={tabTitles.tab2} key="tab2">
        content 2
      </TabPane>
    </Tabs>
  );
};

export const SaveButton = ({ isValidating, onClick }) => (
  <HalfWidthButton
    type="primary"
    htmlType="submit"
    loading={isValidating}
    onClick={onClick}
    style={{ marginRight: 8 }}
  >
    Save
  </HalfWidthButton>
);

export const GoBackButton = ({ onClick }) => (
  <HalfWidthButton onClick={onClick}>Go Back</HalfWidthButton>
);

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
    console.log('invoked onchage');
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
            {decorator('nationality')(
              <FormSelect onChange={value => onSelect(value)}>
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
      <FormItem {...layout} label="Religion" colon required>
        <Col span={7}>
          <FormItem>
            {decorator('religion')(
              <FormSelect onChange={value => onSelect(value)}>
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
