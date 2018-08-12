import React, { Component } from 'react';
import {
  Tabs, Form, Col, Radio, Select, Transfer,
} from 'antd';
import {
  TabIcon,
  BoldText,
  HalfWidthButton,
  FormInput,
  FormDatePicker,
  FormSelect,
  ExtraInfoText,
  BoldUnderlineText,
  FlexContainer,
  FormRadio,
  MMText,
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
  const MemberRenewPage = tabContents[1];
  return (
    <Tabs onChange={onChange} type="card">
      <TabPane tab={tabTitles.tab1} key="tab1">
        <MemberProfilePage />
      </TabPane>
      <TabPane tab={tabTitles.tab2} key="tab2">
        <MemberRenewPage />
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

export const RenewButton = ({ isValidating, onClick }) => (
  <HalfWidthButton
    type="primary"
    htmlType="submit"
    loading={isValidating}
    onClick={onClick}
    style={{ marginRight: 8 }}
  >
    Renew Membership
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

// ********************************************************************************************
// ********************************************************************************************
// ********************************************************************************************

export const SubCommitteeRadio = ({ decorator }) => (
  <FormItem {...layout} label="Sub-Committee Member?">
    {decorator('subcommittee')(
      <RadioGroup name="subcommittee">
        <RadioButton value="YES">Yes</RadioButton>
        <RadioButton value="NO">No</RadioButton>
      </RadioGroup>,
    )}
  </FormItem>
);

export const RoleAssignTransfer = ({
  dataSource, onChange, decorator, targetKeys,
}) => {
  const titles = [
    <BoldUnderlineText>Available Role(s):</BoldUnderlineText>,
    <BoldUnderlineText>Member&#39;s Role(s):</BoldUnderlineText>,
  ];
  return (
    <FlexContainer>
      <FormItem>
        {decorator('roleTransfer', {
          initialValue: targetKeys,
          valuePropName: 'targetKeys',
        })(
          <Transfer
            dataSource={dataSource}
            titles={titles}
            onChange={onChange}
            listStyle={{
              width: 350,
              height: 300,
            }}
            render={item => item.description}
          />,
        )}
      </FormItem>
    </FlexContainer>
  );
};

export const MemberTypeText = ({ value }) => (
  <FormItem {...layout} label="Member Type">
    <BoldText>{value}</BoldText>
  </FormItem>
);
export const StatusText = ({ value }) => (
  <FormItem {...layout} label="Status">
    <BoldText>{value}</BoldText>
  </FormItem>
);
export const JoinDateText = ({ value }) => (
  <FormItem {...layout} label="Joined Date">
    <BoldText>{value}</BoldText>
  </FormItem>
);
export const ExpiryDateText = ({ value }) => (
  <FormItem {...layout} label="Expiry Date">
    <BoldText>{value}</BoldText>
  </FormItem>
);
export const LastPaymentDateText = ({ value }) => (
  <FormItem {...layout} label="Last Payment Date">
    <BoldText>{value}</BoldText>
  </FormItem>
);
export const LastPaymentTypeText = ({ value }) => (
  <FormItem {...layout} label="Last Payment Type">
    <BoldText>{value}</BoldText>
  </FormItem>
);
export const MemberTypeRadio = ({ decorator }) => (
  <FormItem {...layout} label="Membership Type">
    {decorator('memberTypeRadio', {
      rules: [
        {
          required: true,
          message: 'Please choose a membership type.',
        },
      ],
    })(
      <RadioGroup name="memberTypeRadio">
        <FormRadio value="TYP1">
          {'Life '}
          <MMText>(ရာသက်ပန်) </MMText>
          {'SGD 350'}
        </FormRadio>
        <br />
        <FormRadio value="TYP2">
          {'Singaporean/ PR/ EP Ordinary SGD 74 '}
          {'+ Member Card SGD 5 (1st time) = SGD 79'}
        </FormRadio>
        <br />
        <FormRadio value="TYP3">
          {'Other Passes SGD 24 '}
          {'+ Member Card SGD 5 (1st time) = SGD 29'}
        </FormRadio>
        <br />
        <FormRadio value="TYP4">
          {'Yearly Renewal Fees SGD 24 '}
          {'+ New Member Card SGD 5 = SGD 29'}
        </FormRadio>
        <br />
        <FormRadio value="TYP5">
          {'6 month Fees SGD 12 '}
          {'(not entitled for Member Card / '}
          <MMText>အသင်းဝင်ကဒ်ရမည် မဟုတ်ပါ)</MMText>
        </FormRadio>
      </RadioGroup>,
    )}
  </FormItem>
);
export const PaymentTypeSelect = ({ decorator }) => (
  <FormItem {...layout} label="Payment Type">
    {decorator('newPaymentType', {
      rules: [
        {
          required: true,
          message: 'Please select payment type.',
        },
      ],
    })(
      <FormSelect placeholder="Select payment type" style={{ width: '300px' }}>
        <Option value="CASH">Cash</Option>
        <Option value="BANK">Bank Transfer</Option>
      </FormSelect>,
    )}
  </FormItem>
);
