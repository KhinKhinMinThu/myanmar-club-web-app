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
import { DATE_FORMAT } from '../../../../actions/constants';

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
export const inputLayout1 = {
  xs: { span: 8 },
  sm: { span: 8 },
  md: { span: 8 },
  lg: { span: 10 },
  xl: { span: 10 },
};
export const inputLayout2 = {
  xs: { span: 16 },
  sm: { span: 16 },
  md: { span: 16 },
  lg: { span: 12 },
  xl: { span: 12 },
};

/* eslint react/prop-types: 0 */
// Member form data
const initialValue = { initialValue: '' };
export const customInput = { style: { width: '200px' } };

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
      rules: [{ required: true, message: 'Please input member name!' }],
    })(<Input {...customInput} placeholder="Member Name" />)}
  </FormItem>
);

// gender
export const GenderRadio = ({ decorator }) => (
  <FormItem {...layout} label="Gender">
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
  <FormItem {...layout} label="Date of Birth">
    {decorator('dateOfBirth', {
      rules: [{ required: true, message: 'Please enter date of birth!' }],
    })(<DatePicker format={DATE_FORMAT} />)}
  </FormItem>
);

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
  <FormItem {...layout} label="Education Level" colon required>
    <Row gutter={8} type="flex" justify="start">
      <Col {...inputLayout1}>
        <FormItem>
          {decorator('educationLevel', {
            rules: [
              { required: true, message: 'Please ender education level!' },
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
      rules: [{ required: true, message: 'Please ender occupation!' }],
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
  <FormItem {...layout} label="Identification Number" colon required>
    <Row gutter={8} type="flex" justify="start">
      <Col {...inputLayout1}>
        <FormItem>
          {decorator('idNumber', {
            rules: [
              {
                pattern: '^([A-Z]|[a-z])([0-9]{7})([A-Z]|[a-z])$',
                message: 'The input is not a valid ID Number!',
              },
              { required: true, message: 'Please enter ID Number!' },
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
            rules: [{ required: true, message: 'Please input address!' }],
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
