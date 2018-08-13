import React from 'react';
import {
  Tabs,
  Form,
  Row,
  Col,
  Radio,
  Select,
  Transfer,
  Input,
  DatePicker,
} from 'antd';
import {
  TabIcon,
  BoldText,
  FullButton,
  ExtraInfoText,
  BoldUnderlineText,
  MMText,
} from '../shared-styled';
import { DATE_FORMAT } from '../../../actions/constants';

const { TabPane } = Tabs;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Option } = Select;
const { TextArea } = Input;

export const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 8 },
    xl: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 16 },
    xl: { span: 16 },
  },
};
const inputLayout1 = {
  xs: { span: 8 },
  sm: { span: 8 },
  md: { span: 8 },
  lg: { span: 10 },
  xl: { span: 10 },
};
const inputLayout2 = {
  xs: { span: 16 },
  sm: { span: 16 },
  md: { span: 16 },
  lg: { span: 12 },
  xl: { span: 12 },
};

/* eslint react/prop-types: 0 */
export const ProfileTabs = ({ onChange, tabContents, props }) => {
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

  const MemberEditPage = tabContents[0];
  // const MemberRenewPage = tabContents[1];
  console.log(' passed props', props);
  return (
    <Tabs onChange={onChange} type="card">
      <TabPane tab={tabTitles.tab1} key="tab1">
        <MemberEditPage {...props} />
      </TabPane>
      <TabPane tab={tabTitles.tab2} key="tab2">
        LALALALA
      </TabPane>
    </Tabs>
  );
};

export const SaveUpdateButton = () => (
  <FullButton type="primary" htmlType="submit">
    Save Update
  </FullButton>
);

export const RenewButton = () => (
  <FullButton type="primary" htmlType="submit">
    Save Update
  </FullButton>
);

// BackButton
export const BackButton = () => <FullButton>Go Back</FullButton>;

// Member form data
const initialValue = { initialValue: '' };
const customInput = { style: { width: '200px' } };

// id
export const IdReadOnly = ({ decorator }) => (
  <FormItem {...layout} label="Member Id">
    {decorator('id')(<Input {...customInput} readOnly />)}
  </FormItem>
);

// name
export const NameInput = ({ decorator }) => (
  <FormItem {...layout} label="Name">
    {decorator('name', {
      rules: [
        {
          required: true,
          message: 'Please input member name!',
        },
      ],
    })(<Input {...customInput} placeholder="Member Name" />)}
  </FormItem>
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

// dateOfBirth
export const DateOfBirthInput = ({ decorator }) => (
  <FormItem {...layout} label="Date of Birth">
    {decorator('dateOfBirth', {
      rules: [
        {
          required: true,
          message: 'Please enter date of birth!',
        },
      ],
    })(<DatePicker format={DATE_FORMAT} />)}
  </FormItem>
);

// nationality
// religion

// maritalStatus
export const MaritalStatusSelect = ({ decorator }) => (
  <FormItem {...layout} label="Marital Status">
    {decorator('maritalStatus', { initialValue: 'Single' })(
      <Select {...customInput} placeholder="Select marital status">
        <Option value="Single">Single</Option>
        <Option value="Married">Married</Option>
        <Option value="Divorced">Divorced</Option>
        <Option value="Widowed">Widowed</Option>
      </Select>,
    )}
  </FormItem>
);

// educationLevel
export const EducationLevelInput = ({ decorator }) => (
  <FormItem {...layout} label="Education Level" colon>
    <Row gutter={8} type="flex" justify="start">
      <Col {...inputLayout1}>
        <FormItem>
          {decorator('educationLevel', {
            rules: [
              {
                required: true,
                message: 'Please ender education level!',
              },
            ],
          })(<Input {...customInput} placeholder="Education Level" />)}
        </FormItem>
      </Col>
      <Col {...inputLayout2}>
        <ExtraInfoText>GCE A Level/Bachelor/Master/(PhD) etc.</ExtraInfoText>
      </Col>
    </Row>
  </FormItem>
);

// occupation
export const OccupationInput = ({ decorator }) => (
  <FormItem {...layout} label="Occupation">
    {decorator('occupation', {
      rules: [
        {
          required: true,
          message: 'Please ender occupation!',
        },
      ],
    })(<Input {...customInput} placeholder="Job Title" />)}
  </FormItem>
);

// passType
export const PassTypeSelect = ({ decorator }) => (
  <FormItem {...layout} label="Singapore Pass">
    {decorator('passType', initialValue)(
      <Select {...customInput} placeholder="Select pass type">
        <Option value="S Pass">S Pass</Option>
        <Option value="Employment Pass">Employment Pass</Option>
        <Option value="Student Pass">Student Pass</Option>
        <Option value="Citizen">Citizen</Option>
        <Option value="Permanent Resident">Permanent Resident</Option>
        <Option value="Work Permit">Work Permit</Option>
      </Select>,
    )}
  </FormItem>
);

// idNumber
export const IdNumberInput = ({ decorator }) => (
  <FormItem {...layout} label="Identification Number">
    <Row gutter={8} type="flex" justify="start">
      <Col {...inputLayout1}>
        <FormItem>
          {decorator('idNumber', {
            rules: [
              {
                pattern: '^([A-Z]|[a-z])([0-9]{7})([A-Z]|[a-z])$',
                message: 'The input is not a valid ID Number!',
              },
              {
                required: true,
                message: 'Please enter ID Number!',
              },
            ],
          })(
            <Input
              {...customInput}
              maxLength="9"
              placeholder="NRIC/ FIN No."
            />,
          )}
        </FormItem>
      </Col>
      <Col {...inputLayout2}>
        <ExtraInfoText>S1234567Z, G1234567Z etc.</ExtraInfoText>
      </Col>
    </Row>
  </FormItem>
);

// AddressInput
export const AddressInput = ({ decorator }) => (
  <FormItem {...layout} label="Address" colon required>
    <Row gutter={8} type="flex" justify="start">
      <Col {...inputLayout1}>
        <FormItem>
          {decorator('addressLine1', {
            rules: [
              {
                required: true,
                message: 'Please input address!',
              },
            ],
          })(<Input {...customInput} placeholder="Street Address Line 1..." />)}
        </FormItem>
      </Col>
      <Col {...inputLayout2}>
        <FormItem>
          {decorator('addressLine2', initialValue)(
            <Input {...customInput} placeholder="Street Address Line 2..." />,
          )}
        </FormItem>
      </Col>
    </Row>
  </FormItem>
);

// postalCode
export const PostalCodeInput = ({ decorator }) => (
  <FormItem {...layout} label=" " colon={false} required={false}>
    {decorator('postalCode', {
      rules: [
        {
          pattern: '^([0-9]{6})$',
          message: 'The input is not a valid postal/zip code!',
        },
        {
          required: true,
          message: 'Please enter postal/zip code!',
        },
      ],
    })(<Input {...customInput} maxLength="6" placeholder="Postal/Zip Code" />)}
  </FormItem>
);

// emailAddress
export const EmailAddressInput = ({ decorator }) => (
  <FormItem {...layout} label="Email Address">
    {decorator('emailAddress', {
      rules: [
        {
          required: true,
          message: 'Please enter email address!',
        },
        {
          type: 'email',
          message: 'The input is not valid E-mail!',
        },
      ],
    })(<Input placeholder="Email Address" />)}
  </FormItem>
);

// facebookAccount
export const FacebookAccountInput = ({ decorator }) => (
  <FormItem {...layout} label="Facebook Account">
    {decorator('facebookAccount', initialValue)(
      <Input placeholder="Facebook Account" />,
    )}
  </FormItem>
);

// homePhone
export const HomePhoneInput = ({ decorator }) => {
  const areaCodeHomePhone = decorator('areaCodeHomePhone', {
    initialValue: '65',
  })(
    <Select>
      <Option value="65">+65</Option>
      <Option value="95">+95</Option>
    </Select>,
  );
  return (
    <FormItem {...layout} label="Home Phone">
      {decorator('homePhone', {
        initialValue: '',
        rules: [
          {
            pattern: '^([0-9]{6,})$',
            message: 'The input is not a valid phone number!',
          },
        ],
      })(
        <Input
          {...customInput}
          addonBefore={areaCodeHomePhone}
          placeholder="Home Phone"
        />,
      )}
    </FormItem>
  );
};

// mobilePhone
export const MobilePhoneInput = ({ decorator }) => {
  const areaCodeMobilePhone = decorator('areaCodeMobilePhone', {
    initialValue: '65',
  })(
    <Select>
      <Option value="65">+65</Option>
      <Option value="95">+95</Option>
    </Select>,
  );
  return (
    <FormItem {...layout} label="Mobile No">
      {decorator('mobilePhone', {
        rules: [
          {
            required: true,
            message: 'Please enter mobile number!',
          },
          {
            pattern: '^([0-9]{6,})$',
            message: 'The input is not a valid phone number!',
          },
        ],
      })(
        <Input
          {...customInput}
          addonBefore={areaCodeMobilePhone}
          placeholder="Mobile Phone"
        />,
      )}
    </FormItem>
  );
};

// photoLink

// hobbies
export const HobbiesInput = ({ decorator }) => (
  <FormItem {...layout} label="Hobbies">
    {decorator('hobbies', initialValue)(
      <TextArea {...customInput} rows={2} placeholder="Hobbies" />,
    )}
  </FormItem>
);

// roleNames
// subComInterest

// isEcMember
export const IsEcMemberRadio = ({ decorator }) => (
  <FormItem {...layout} label="Committee Member?">
    {decorator('isEcMember', { initialValue: '0' })(
      <RadioGroup name="isEcMember">
        <RadioButton value="1">Yes</RadioButton>
        <RadioButton value="0">No</RadioButton>
      </RadioGroup>,
    )}
  </FormItem>
);

// ********************************************************************************************
// ********************************************************************************************
// ********************************************************************************************

export const RoleAssignTransfer = ({
  dataSource,
  onChange,
  decorator,
  targetKeys,
}) => {
  const titles = [
    <BoldUnderlineText>Available Role(s):</BoldUnderlineText>,
    <BoldUnderlineText>Member&#39;s Role(s):</BoldUnderlineText>,
  ];
  return (
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
        <Radio value="TYP1">
          {'Life '}
          <MMText>(ရာသက်ပန်) </MMText>
          {'SGD 350'}
        </Radio>
        <br />
        <Radio value="TYP2">
          {'Singaporean/ PR/ EP Ordinary SGD 74 '}
          {'+ Member Card SGD 5 (1st time) = SGD 79'}
        </Radio>
        <br />
        <Radio value="TYP3">
          {'Other Passes SGD 24 '}
          {'+ Member Card SGD 5 (1st time) = SGD 29'}
        </Radio>
        <br />
        <Radio value="TYP4">
          {'Yearly Renewal Fees SGD 24 '}
          {'+ New Member Card SGD 5 = SGD 29'}
        </Radio>
        <br />
        <Radio value="TYP5">
          {'6 month Fees SGD 12 '}
          {'(not entitled for Member Card / '}
          <MMText>အသင်းဝင်ကဒ်ရမည် မဟုတ်ပါ)</MMText>
        </Radio>
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
      <Select
        {...customInput}
        placeholder="Select payment type"
        style={{ width: '300px' }}
      >
        <Option value="CASH">Cash</Option>
        <Option value="BANK">Bank Transfer</Option>
      </Select>,
    )}
  </FormItem>
);
