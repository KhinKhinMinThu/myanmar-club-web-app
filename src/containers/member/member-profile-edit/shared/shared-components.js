import React, { Component } from 'react';
import {
  Form,
  Row,
  Col,
  Radio,
  Select,
  Modal,
  Upload,
  Input,
  DatePicker,
  Checkbox,
  Switch,
  Icon,
} from 'antd';
import { ExtraInfoText, MMText } from './shared-styled';
import { DATE_FORMAT, MEMBERSHIP_TYPES } from '../../../../actions/constants';

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
export const layoutHalf = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 7 },
    xl: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 17 },
    xl: { span: 17 },
  },
};

const readOnlyInput = {
  style: {
    border: 0,
    outline: 0,
    borderRadius: 0,
    padding: 0,
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
  },
  readOnly: true,
};

/* eslint react/prop-types: 0 */
// Member form data
const initialValue = { initialValue: '' };
export const customInput = { style: { width: '200px' } };

// id
export const IdReadOnly = ({ decorator }) => (
  <FormItem
    {...{
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 3 },
        xl: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 21 },
        xl: { span: 21 },
      },
    }}
    label="Member Id"
    style={{ margin: 0 }}
  >
    {decorator('id')(<Input {...readOnlyInput} />)}
  </FormItem>
);

// name
export const NameInput = ({ decorator }) => (
  <FormItem {...layoutHalf} label="Name">
    {decorator('name', {
      rules: [{ required: true, message: 'Please input member name!' }],
    })(<Input {...customInput} placeholder="Member Name" />)}
  </FormItem>
);

// gender
export const GenderRadio = ({ decorator }) => (
  <FormItem {...layoutHalf} label="Gender">
    {decorator('gender', { initialValue: 'Male' })(
      <RadioGroup name="gender">
        <RadioButton value="Male">Male</RadioButton>
        <RadioButton value="Female">Female</RadioButton>
      </RadioGroup>,
    )}
  </FormItem>
);

// dateOfBirth
export const DateOfBirthInput = ({ decorator }) => (
  <FormItem {...layoutHalf} label="Date of Birth">
    {decorator('dateOfBirth', {
      rules: [{ required: true, message: 'Please enter date of birth!' }],
    })(<DatePicker format={DATE_FORMAT} />)}
  </FormItem>
);

// maritalStatus
export const MaritalStatusSelect = ({ decorator }) => (
  <FormItem {...layoutHalf} label="Marital Status">
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
  <FormItem {...layoutHalf} label="Education Level">
    {decorator('educationLevel', {
      rules: [{ required: true, message: 'Please ender education level!' }],
    })(<Input {...customInput} placeholder="Education Level" />)}
    <ExtraInfoText> GCE A Level/Bachelor/Master/(PhD)</ExtraInfoText>
  </FormItem>
);

// occupation
export const OccupationInput = ({ decorator }) => (
  <FormItem {...layoutHalf} label="Occupation">
    {decorator('occupation', {
      rules: [{ required: true, message: 'Please ender occupation!' }],
    })(<Input {...customInput} placeholder="Job Title" />)}
  </FormItem>
);

// passType
export const PassTypeSelect = ({ decorator }) => (
  <FormItem {...layoutHalf} label="Singapore Pass">
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
  <FormItem {...layoutHalf} label="Identification Number">
    {decorator('idNumber', {
      rules: [
        {
          pattern: '^([A-Z]|[a-z])([0-9]{7})([A-Z]|[a-z])$',
          message: 'The input is not a valid ID Number!',
        },
        { required: true, message: 'Please enter ID Number!' },
      ],
    })(<Input {...customInput} maxLength="9" placeholder="NRIC/ FIN No." />)}
    <ExtraInfoText> S1234567Z, G1234567Z etc.</ExtraInfoText>
  </FormItem>
);

// AddressInput
export const AddressInput = ({ decorator }) => (
  <FormItem {...layout} label="Address" colon required>
    <Row gutter={8} type="flex" justify="start">
      <Col span={12}>
        <FormItem>
          {decorator('addressLine1', {
            rules: [{ required: true, message: 'Please input address!' }],
          })(<Input placeholder="Street Address Line 1..." />)}
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem>
          {decorator('addressLine2', initialValue)(
            <Input placeholder="Street Address Line 2..." />,
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
        { required: true, message: 'Please enter postal/zip code!' },
      ],
    })(<Input {...customInput} maxLength="6" placeholder="Postal/Zip Code" />)}
  </FormItem>
);

// emailAddress
export const EmailAddressInput = ({ decorator }) => (
  <FormItem {...layout} label="Email Address">
    {decorator('emailAddress', {
      rules: [
        { required: true, message: 'Please enter email address!' },
        { type: 'email', message: 'The input is not valid E-mail!' },
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
          { required: true, message: 'Please enter mobile number!' },
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
export class ProfilePhoto extends Component {
  state = {
    isModalVisible: false,
  };

  onCloseModal = () => {
    this.setState({
      isModalVisible: false,
      photoLink: '',
    });
  };

  showModal = (file) => {
    this.setState({
      isModalVisible: true,
      photoLink: file.url || file.thumbUrl,
    });
  };

  render() {
    const { decorator, beforeUpload, removeFile } = this.props;
    const { isModalVisible, photoLink } = this.state;
    this.newFile = [];
    return (
      // must use inline style due to layout
      <FormItem {...layout} label="Profile Photo" style={{ marginBottom: 0 }}>
        {decorator('uploadBtn', {
          valuePropName: 'fileList',
          initialValue: [],
          getValueFromEvent: (e) => {
            const { fileList } = e;
            this.newFile = fileList.length > 1 ? fileList.slice(1) : fileList;
            return this.newFile;
          },
        })(
          <Upload
            name="profilepic"
            listType="picture-card"
            onPreview={this.showModal}
            onRemove={file => removeFile(file)}
            beforeUpload={file => beforeUpload(file)}
            // Hook function which will be executed before uploading.
            // Uploading will be stopped with false or a rejected Promise returned.
            // Warning：this function is not supported in IE9。
          >
            {this.newFile.length >= 2 ? null : (
              <div>
                <Icon type="plus" />
                <div>Upload New Photo</div>
              </div>
            )}
          </Upload>,
        )}
        <Modal
          visible={isModalVisible}
          onCancel={this.onCloseModal}
          footer={null}
        >
          <img alt="example" width="100%" src={photoLink} />
        </Modal>
      </FormItem>
    );
  }
}

// hobbies
export const HobbiesInput = ({ decorator }) => (
  <FormItem {...layout} label="Hobbies">
    {decorator('hobbies', initialValue)(
      <TextArea {...customInput} rows={2} placeholder="Hobbies" />,
    )}
  </FormItem>
);

// isEcMember
export const IsEcMemberRadio = ({ decorator, onChange }) => (
  <FormItem {...layout} label="Committee Member?">
    {decorator('isEcMember', { initialValue: '0' })(
      <RadioGroup name="isEcMember" onChange={onChange}>
        <RadioButton value="1">Yes</RadioButton>
        <RadioButton value="0">No</RadioButton>
      </RadioGroup>,
    )}
  </FormItem>
);

// roleNames

// subComInterest
export const SubComInterest = ({ decorator, allSubComInterest }) => {
  const checkBoxList = allSubComInterest.map(item => (
    <FormItem style={{ marginBottom: 0 }} key={item.id}>
      {decorator(`${item.id}`, {
        valuePropName: 'checked',
      })(
        <Checkbox style={{ float: 'left' }}>
          <MMText>{item.description}</MMText>
        </Checkbox>,
      )}
    </FormItem>
  ));
  return (
    <FormItem {...layout} label="Interested Sub-Committee(s)">
      <Col>{checkBoxList}</Col>
    </FormItem>
  );
};

// DeleteProfileSwitch
export const DeleteProfileSwitch = ({ decorator }) => (
  <FormItem {...layout} label="Delete Profile?">
    {decorator('deleteProfile', { initialValue: false })(
      <Switch checkedChildren="Yes" unCheckedChildren="No" />,
    )}
  </FormItem>
);

// Membership Information
// MembershipTypeReadOnly
export const MembershipTypeReadOnly = ({ decorator }) => (
  <FormItem {...layout} label="Membership Type" style={{ margin: 0 }}>
    {decorator('membershipTypeReadOnly')(<Input {...readOnlyInput} />)}
  </FormItem>
);

// MembershipTypeReadOnly
export const MembershipStatusReadOnly = ({ decorator }) => (
  <FormItem {...layout} label="Membership Status" style={{ margin: 0 }}>
    {decorator('membershipStatus')(<Input {...readOnlyInput} />)}
  </FormItem>
);

// JoinedDate
export const CreatedDate = ({ decorator }) => (
  <FormItem {...layout} label="Joined Date" style={{ margin: 0 }}>
    {decorator('createdDate')(<Input {...readOnlyInput} />)}
  </FormItem>
);

// membershipExpiryDate
export const MembershipExpiryDate = ({ decorator }) => (
  <FormItem {...layout} label="Expiry Date" style={{ margin: 0 }}>
    {decorator('membershipExpiryDate')(<Input {...readOnlyInput} />)}
  </FormItem>
);

// lastPaymentDate
export const LastPaymentDate = ({ decorator }) => (
  <FormItem {...layout} label="Last Payment Date" style={{ margin: 0 }}>
    {decorator('lastPaymentDate')(<Input {...readOnlyInput} />)}
  </FormItem>
);

// lastPaymentType
export const LastPaymentType = ({ decorator }) => (
  <FormItem {...layout} label="Last Payment Type" style={{ margin: 0 }}>
    {decorator('lastPaymentType')(<Input {...readOnlyInput} />)}
  </FormItem>
);

// Membership fees
export const MembershipTypeRadio = ({ decorator, onChange }) => (
  <FormItem {...layout} label="Membership Fees">
    {decorator('membershipType', {
      rules: [
        {
          required: true,
          message: 'Please select the membership type!',
        },
      ],
    })(
      <RadioGroup
        style={{
          display: 'block',
          paddingTop: '6px',
          lineHeight: 2,
        }}
        name="membershipTypeRdo"
        onChange={onChange}
      >
        <Col span={24}>
          <Radio value="TYP1">
            <MMText>
              {MEMBERSHIP_TYPES.TYP1.substr(
                MEMBERSHIP_TYPES.TYP1.indexOf(':') + 1,
              )}
            </MMText>
          </Radio>
        </Col>
        <Col span={24}>
          <Radio value="TYP2">
            <MMText>
              {MEMBERSHIP_TYPES.TYP2.substr(
                MEMBERSHIP_TYPES.TYP2.indexOf(':') + 1,
              )}
            </MMText>
          </Radio>
        </Col>
        <Col span={24}>
          <Radio value="TYP3">
            <MMText>
              {MEMBERSHIP_TYPES.TYP3.substr(
                MEMBERSHIP_TYPES.TYP3.indexOf(':') + 1,
              )}
            </MMText>
          </Radio>
        </Col>
        <Col span={24}>
          <Radio value="TYP4">
            <MMText>
              {MEMBERSHIP_TYPES.TYP4.substr(
                MEMBERSHIP_TYPES.TYP4.indexOf(':') + 1,
              )}
            </MMText>
          </Radio>
        </Col>
        <Col span={24}>
          <Radio value="TYP5">
            <MMText>
              {MEMBERSHIP_TYPES.TYP5.substr(
                MEMBERSHIP_TYPES.TYP5.indexOf(':') + 1,
              )}
            </MMText>
          </Radio>
        </Col>
      </RadioGroup>,
    )}
  </FormItem>
);
