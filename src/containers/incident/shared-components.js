import React from 'react';
import { Form, Input, Select } from 'antd';
import { FullButton } from './shared-styled';

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
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
  },
  readOnly: true,
};

/* eslint react/prop-types: 0 */
// search incident form data
// const initialValue = { initialValue: '' };
export const customInput = { style: { width: '200px' } };

// incident type
export const IncidentTypeSearchSelect = ({ decorator, incidentTypes }) => {
  console.log(incidentTypes);
  return (
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
};

// submitted by
export const SubmittedBySelect = ({ decorator, submittedBy }) => {
  console.log(submittedBy);
  return (
    <FormItem {...layout} label="Submitted By">
      {decorator('submittedBy', { initialValue: '0' })(
        <Select {...customInput}>
          <Option value="0">Select</Option>
          {submittedBy.map(item => (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>,
      )}
    </FormItem>
  );
};

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
// end

// edit incident form data
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

// end
