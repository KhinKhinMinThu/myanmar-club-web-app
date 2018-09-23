import React from 'react';
import {
  Form, Input, Select, Switch,
} from 'antd';
import { FullButton } from './shared-styled';
import { AGE_RANGE } from '../../actions/constants';

const FormItem = Form.Item;
const { Option } = Select;

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

const readOnlyInput = {
  style: {
    border: 0,
    outline: 0,
    borderRadius: 0,
    padding: 0,
    // borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
  },
  readOnly: true,
};

/* eslint react/prop-types: 0 */
// search incident form data
// const initialValue = { initialValue: '' };
export const customInput = { style: { width: '200px' } };

// incident type
export const IncidentTypeSearchSelect = ({ decorator, incidentTypes }) => (
  <FormItem {...layout} label="Incident Type">
    {decorator('incidentType', { initialValue: '0' })(
      <Select {...customInput}>
        <Option value="0">Select</Option>
        {incidentTypes.map(item => (
          <Option key={item.id} value={item.id}>
            {item.name}
          </Option>
        ))}
        <Option value="-1">Others</Option>
      </Select>,
    )}
  </FormItem>
);

// submitted by
export const SubmittedBySelect = ({ decorator, submittedBy }) => (
  <FormItem {...layout} label="Submitted By">
    {decorator('submittedBy', { initialValue: '0' })(
      <Select {...customInput}>
        <Option value="0">Select</Option>
        {submittedBy.map(item => (
          <Option key={item.id} value={item.id.toString()}>
            {item.name}
          </Option>
        ))}
      </Select>,
    )}
  </FormItem>
);

// BackButton
export const BackButton = ({ history }) => (
  <FullButton onClick={() => history.go(-1)}>Go Back</FullButton>
);

// SearchButton
export const SearchButton = () => (
  <FullButton type="primary" htmlType="submit">
    Search
  </FullButton>
);

// CreateIncident
export const CreateIncidentButton = ({ loading }) => (
  <FullButton type="primary" htmlType="submit" loading={loading}>
    Create Incident
  </FullButton>
);

// SaveUpdate
export const SaveUpdateButton = ({ loading }) => (
  <FullButton type="primary" htmlType="submit" loading={loading}>
    Save Update
  </FullButton>
);
// end

// edit incident form data
// Incident Id
export const IdReadOnly = ({ decorator }) => (
  <FormItem {...layout} label="Incident Id" style={{ margin: 0 }}>
    {decorator('id')(<Input {...readOnlyInput} />)}
  </FormItem>
);

// Incident Name
export const IncidentNameInput = ({ decorator }) => (
  <FormItem {...layout} label="Incident Name">
    {decorator('name', {
      rules: [
        {
          required: true,
          message: 'Please input incident name!',
        },
      ],
    })(<Input {...customInput} placeholder="Incident Name" />)}
  </FormItem>
);

// Requester Name
export const RequesterNameInput = ({ decorator }) => (
  <FormItem {...layout} label="Requester Name">
    {decorator('requesterName', {
      rules: [
        {
          required: true,
          message: 'Please input requester name!',
        },
      ],
    })(<Input {...customInput} placeholder="Requester Name" />)}
  </FormItem>
);

// Requester Age
export const RequesterAgeSelect = ({ decorator }) => (
  <FormItem {...layout} label="Requester Age">
    {decorator('requesterAge', { initialValue: AGE_RANGE[0] })(
      <Select {...customInput}>
        {AGE_RANGE.map((item, index) => (
          <Option key={index.toString()} value={item}>
            {item}
          </Option>
        ))}
      </Select>,
    )}
  </FormItem>
);

// end

// for edit
export const DeleteIncidentSwitch = ({ decorator }) => (
  <FormItem {...layout} label="Delete Incident?" style={{ marginBottom: 0 }}>
    {decorator('deleteIncident', { initialValue: false })(
      <Switch checkedChildren="Yes" unCheckedChildren="No" />,
    )}
  </FormItem>
);
