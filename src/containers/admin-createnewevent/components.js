import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Col, Radio, Select, Input, Modal, Upload,
} from 'antd';
import {
  FormInput,
  FormDatePicker,
  FormTimePicker,
  HalfWidthButton,
} from './styled-components';
import { CustomIcon } from '../shared-components/common';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Option } = Select;
const { TextArea } = Input;

const state = {
  confirmDirty: false,
  showPw: false,
  previewVisible: false,
  previewImage: '',
  fileList: [
    {
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ],
};
const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

/* eslint react/prop-types: 0 */
// ALL FORM ITEM MUST PASS IN decorator!

// Event Name
export const EventNameInput = ({ decorator }) => (
  <FormItem {...layout} label="Event Name">
    {decorator('eventName', {
      rules: [
        {
          required: true,
          message: 'Please input event name!',
        },
      ],
    })(<FormInput type="text" />)}
  </FormItem>
);

// Event Description
export const EventDescriptionInput = ({ decorator }) => (
  <FormItem {...layout} label="Description">
    {decorator('eventDescription', {
      rules: [
        {
          required: true,
          message: 'Please input event description!',
        },
      ],
    })(<TextArea style={{ width: '230px' }} rows={2} />)}
  </FormItem>
);

// Location Address
export const AddressInput = ({ decorator, onBlurred }) => (
  <FormItem {...layout} label="Location" colon required>
    <Col span={10}>
      <FormItem>
        {decorator('addr1Input', {
          rules: [
            {
              required: true,
              message: 'Please input event address!',
            },
          ],
        })(
          <FormInput
            type="text"
            style={{ width: '230px' }}
            onBlur={onBlurred}
            placeholder="Street Address Line 1..."
          />,
        )}
      </FormItem>
    </Col>
    <Col span={14}>
      <FormItem>
        {decorator('addr2Input')(
          <FormInput
            type="text"
            style={{ width: '250px' }}
            placeholder="Street Address Line 2..."
          />,
        )}
      </FormItem>
    </Col>
  </FormItem>
);

// Postal Code
export const PostalCodeInput = ({ decorator }) => (
  <FormItem {...layout} label=" " colon={false}>
    {decorator('postalCode', {
      rules: [
        {
          required: true,
          message: 'Please input event postal code!',
        },
      ],
    })(<FormInput type="text" placeholder="Postal/Zip Code" />)}
  </FormItem>
);

// Refreshment
export const RefreshmentRadio = ({ decorator }) => (
  <FormItem {...layout} label="Refreshment Provided">
    {decorator('refreshment')(
      <RadioGroup name="refreshment">
        <RadioButton value="yes">YES</RadioButton>
        <RadioButton value="no">No</RadioButton>
      </RadioGroup>,
    )}
  </FormItem>
);

// Ticket fee
export const TicketFeeInput = ({ decorator }) => (
  <FormItem {...layout} label="Ticket Fee (SGD)">
    {decorator('ticketFee')(<FormInput type="text" />)}
  </FormItem>
);

// No of Pax
export const NumPaxInput = ({ decorator }) => (
  <FormItem {...layout} label="No of Pax">
    {decorator('numPax')(<FormInput type="text" />)}
  </FormItem>
);

// Email address
export const EmailAddressInput = ({ decorator }) => (
  <FormItem {...layout} label="Email Address">
    {decorator('emailAddress')(<FormInput type="text" />)}
  </FormItem>
);

// Contact Person
export const ContactPersonInput = ({ decorator }) => (
  <FormItem {...layout} label="Contact Person">
    {decorator('contactPerson')(<FormInput type="text" />)}
  </FormItem>
);

const handleMobileNoOnBlur = (e) => {
  const value = e.target.value.trim();
  const { form } = this.props;
  form.setFieldsValue({ mobileNoInput: value });
  form.validateFields(['mobileNoInput'], { force: true });
};

export const areaCodeDdl = (
  <Select style={{ width: 70 }}>
    <Option value="65">
      {'+65'}
    </Option>
    <Option value="95">
      {'+95'}
    </Option>
  </Select>
);

// Mobiel Number
export const MobileNoInput = ({ decorator }) => (
  <FormItem {...layout} label="Mobile No">
    {decorator('mobileNo', {
      rules: [
        {
          pattern: '^([0-9]{6,})$',
          message: 'The input is not a valid phone number!',
        }],
    })(<FormInput
      type="text"
      placeholder="Mobile Phone Number"
      addonBefore={areaCodeDdl}
      blurred={handleMobileNoOnBlur}
    />)}
  </FormItem>
);

MobileNoInput.propTypes = {
  blurred: PropTypes.func.isRequired,
  areadCodeBef: PropTypes.shape({}).isRequired,
};

// Event Start Date/Time
export const StartDateTimePicker = ({ decorator }) => (
  <FormItem {...layout} label="Start Date/Time" colon is required>
    <Col span={8}>
      <FormItem>
        {decorator('eventStartDate', {
          rules: [
            {
              required: true,
              message: 'Please enter event start date!',
            },
          ],
        })(<FormDatePicker format="DD-MM-YYYY" />)}
      </FormItem>
    </Col>
    <Col span={8}>
      <FormItem>
        {decorator('eventStartTime', {
          rules: [
            {
              required: true,
              message: 'Please enter event start time!',
            },
          ],
        })(<FormTimePicker format="HH:mm" />)}
      </FormItem>
    </Col>
  </FormItem>
);

// Event End Date/Time
export const EndDateTimePicker = ({ decorator }) => (
  <FormItem {...layout} label="End Date/Time">
    <Col span={8}>
      <FormItem>{decorator('eventEndDate')(<FormDatePicker format="DD-MM-YYYY" />)}</FormItem>
    </Col>
    <Col span={8}>
      <FormItem>{decorator('eventEndTime')(<FormTimePicker format="HH:mm" />)}</FormItem>
    </Col>
  </FormItem>
);

const handleImgOnPreview = (file) => {
  this.setState({
    previewImage: file.url || file.thumbUrl,
    previewVisible: true,
  });
};

const handleImgOnChange = ({ fileList }) => {
  if (fileList.length > 1) {
    const newFile = fileList.slice(1);
    this.setState({ fileList: newFile });
  }
};

const handleImgPreviewOnCancel = () => this.setState({ previewVisible: false });

const uploadButton = (
  <div>
    <CustomIcon type="plus" />
    <div className="ant-upload-text">
      {'Upload New Photo'}
    </div>
  </div>
);

export const viewImage = (
  <Modal visible={state.previewVisible} footer={null} onCancel={this.handleImgPreviewOnCancel}>
    <img alt="example" style={{ width: '100%' }} src={state.previewImage} />
  </Modal>
);

// Event Photo
export const EventPhoto = ({ decorator }) => (
  <FormItem {...layout} label="Event Photo">
    {decorator('uploadBtn', {
      rules: [
        {
          required: false,
          message: 'Please upload your passport size photo!',
        },
      ],
    })(
      <Upload
        name="userpic"
        action=""
        listType="picture-card"
        previewed={handleImgOnPreview}
        changed={handleImgOnChange}
        fileList={state.fileList}
      > {state.fileList.length >= 2 ? null : uploadButton}
      </Upload>,
      <Modal visible={state.previewVisible} footer={null} onCancel={handleImgPreviewOnCancel}>
        <img alt="example" style={{ width: '100%' }} src={state.previewImage} />,
      </Modal>,
    )}
  </FormItem>
);

EventPhoto.propTypes = {
  previewed: PropTypes.func.isRequired,
  changed: PropTypes.func.isRequired,
  fileList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export const CreateButton = ({ isValidating, onClick }) => (
  <HalfWidthButton type="primary" htmlType="submit" loading={isValidating} onClick={onClick}>
    Create
  </HalfWidthButton>
);
