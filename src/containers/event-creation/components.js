import React from 'react';
import {
  Form, Col, Radio, Select, Modal, Upload, Switch,
} from 'antd';
import {
  FormInput,
  FormTextArea,
  FormDatePicker,
  FormTimePicker,
  FullWidthButton,
} from './styled-components';
import { CustomIcon } from '../shared-components/common';

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

// Event Name
export const EventNameInput = ({ decorator }) => (
  <FormItem {...layout} label="Event Name">
    {decorator('name', {
      rules: [
        {
          required: true,
          message: 'Please input event name!',
        },
      ],
    })(<FormInput placeholder="Event Name" />)}
  </FormItem>
);

// Event Description
export const EventDescriptionInput = ({ decorator }) => (
  <FormItem {...layout} label="Description">
    {decorator('description', {
      rules: [
        {
          required: true,
          message: 'Please input event description!',
        },
      ],
    })(<FormTextArea rows={2} placeholder="Event Description" />)}
  </FormItem>
);

// Event Start Date/Time
export const StartDateTimePicker = ({ decorator }) => (
  <FormItem {...layout} label="Start Date/Time" colon required>
    <Col span={10}>
      <FormItem>
        {decorator('startDate', {
          rules: [
            {
              required: true,
              message: 'Please enter event start date!',
            },
          ],
        })(<FormDatePicker format="DD-MM-YYYY" disabled={false} />)}
      </FormItem>
    </Col>
    <Col span={14}>
      <FormItem>
        {decorator('startTime', {
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
    <Col span={10}>
      <FormItem>
        {decorator('endDate')(<FormDatePicker format="DD-MM-YYYY" />)}
      </FormItem>
    </Col>
    <Col span={14}>
      <FormItem>
        {decorator('endTime')(<FormTimePicker format="HH:mm" />)}
      </FormItem>
    </Col>
  </FormItem>
);

// Location Address
export const AddressInput = ({ decorator }) => (
  <FormItem {...layout} label="Location" colon required>
    <Col span={10}>
      <FormItem>
        {decorator('locationLine1', {
          rules: [
            {
              required: true,
              message: 'Please input event address!',
            },
          ],
        })(<FormInput placeholder="Street Address Line 1..." />)}
      </FormItem>
    </Col>
    <Col span={14}>
      <FormItem style={{ margin: 0 }}>
        {decorator('locationLine2')(
          <FormInput placeholder="Street Address Line 2..." />,
        )}
      </FormItem>
    </Col>
  </FormItem>
);

// Postal Code
export const PostalCodeInput = ({ decorator }) => (
  <FormItem {...layout} label=" " colon={false} required={false}>
    {decorator('locationPostalCode', {
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
    })(<FormInput maxLength="6" placeholder="Postal/Zip Code" />)}
  </FormItem>
);

// Refreshment
export const RefreshmentRadio = ({ decorator }) => (
  <FormItem {...layout} label="Refreshment Provided" style={{ margin: 0 }}>
    {decorator('isRefreshmentProvided')(
      <RadioGroup name="refreshment">
        <RadioButton value="1">Yes</RadioButton>
        <RadioButton value="0">No</RadioButton>
      </RadioGroup>,
    )}
  </FormItem>
);

const validateNumber = (rule, value, callback) => {
  if (value && Number.isNaN(Number(value))) {
    callback('Please enter a number!');
  } else {
    callback();
  }
};
// Ticket fee
export const TicketFeeInput = ({ decorator }) => (
  <FormItem {...layout} label="Ticket Fee (SGD)">
    {decorator('ticketFee', {
      rules: [
        {
          validator: validateNumber,
        },
      ],
    })(<FormInput />)}
  </FormItem>
);

// No of Pax
export const NumPaxInput = ({ decorator }) => (
  <FormItem {...layout} label="No of Pax">
    {decorator('noOfPax', {
      rules: [
        {
          validator: validateNumber,
        },
      ],
    })(<FormInput />)}
  </FormItem>
);

// Email address
export const EmailAddressInput = ({ decorator }) => (
  <FormItem {...layout} label="Email Address">
    {decorator('emailAddress', {
      rules: [
        {
          type: 'email',
          message: 'The input is not valid E-mail!',
        },
      ],
    })(<FormInput placeholder="Email Address" />)}
  </FormItem>
);

// Contact Person
export const ContactPersonInput = ({ decorator }) => (
  <FormItem {...layout} label="Contact Person">
    {decorator('contactPerson')(
      <FormInput placeholder="Contact Person Name" />,
    )}
  </FormItem>
);

// Mobiel Number
export const MobileNoInput = ({ decorator }) => {
  const areaCodeDdl = decorator('areaCode', {
    initialValue: '65',
  })(
    <Select>
      <Option value="65">+65</Option>
      <Option value="95">+95</Option>
    </Select>,
  );
  return (
    <FormItem {...layout} label="Mobile No" style={{ margin: 0 }}>
      {decorator('mobilePhone', {
        rules: [
          {
            pattern: '^([0-9]{6,})$',
            message: 'The input is not a valid phone number!',
          },
        ],
      })(
        <FormInput
          addonBefore={areaCodeDdl}
          placeholder="Mobile Phone"
          style={{ width: 200 }}
        />,
      )}
    </FormItem>
  );
};

// Event Photo
export const EventPhoto = ({
  decorator, onPreview, onChange, fileList,
}) => (
  <FormItem {...layout} label="Event Photo" style={{ margin: 0 }}>
    {decorator('uploadBtn')(
      <Upload
        name="eventpic"
        action=""
        listType="picture-card"
        onPreview={onPreview}
        onChange={onChange}
        fileList={fileList}
      >
        {fileList.length >= 2 ? null : (
          <div>
            <CustomIcon type="plus" />
            <div className="ant-upload-text">Upload New Photo</div>
          </div>
        )}
      </Upload>,
    )}
  </FormItem>
);

export const EventPhotoModal = ({
  onCloseModal,
  isModalVisible,
  photoLink,
}) => (
  <Modal visible={isModalVisible} onCancel={onCloseModal} footer={null}>
    <img alt="example" style={{ width: '100%' }} src={photoLink} />
  </Modal>
);

export const DeleteEventSwitch = ({ decorator }) => (
  <FormItem {...layout} label="Delete Event?">
    {decorator('deleteEvent')(
      <Switch checkedChildren="Yes" unCheckedChildren="No" />,
    )}
  </FormItem>
);

export const EventStatusSwitch = ({ decorator }) => (
  <FormItem {...layout} label="Event Status">
    {decorator('eventStatus')(
      <Switch
        checkedChildren="Open"
        unCheckedChildren="Closed"
        defaultChecked
      />,
    )}
  </FormItem>
);

export const SaveUpdateButton = (
  <FullWidthButton type="primary" htmlType="submit">
    Save Update
  </FullWidthButton>
);

export const BackButton = <FullWidthButton>Back</FullWidthButton>;

export const CreateButton = (
  <FullWidthButton type="primary" htmlType="submit">
    Create
  </FullWidthButton>
);
