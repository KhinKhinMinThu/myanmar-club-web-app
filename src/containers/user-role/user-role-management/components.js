import React from 'react';
import { Form, Select, Transfer } from 'antd';
import { FullButton, BoldUnderlineText } from '../shared-styled';

const FormItem = Form.Item;
const { Option } = Select;

export const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 5 },
    xl: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 19 },
    xl: { span: 19 },
  },
};

/* eslint react/prop-types: 0 */
export const RoleNameSelect = ({ onChange, roleNameList, decorator }) => (
  <FormItem {...layout} label="Select Role Name" colon>
    {decorator('roleId', {
      rules: [
        {
          required: true,
          message: 'Please select role name!',
        },
      ],
    })(
      <Select
        onChange={onChange}
        placeholder="Select a role"
        style={{ width: 600 }}
      >
        {roleNameList.map(item => (
          <Option key={item.id.toString} value={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>,
    )}
  </FormItem>
);

export const SaveButton = ({ isPostApiLoading }) => (
  <FullButton type="primary" htmlType="submit" loading={isPostApiLoading}>
    Save
  </FullButton>
);

export const GoBackButton = ({ history }) => (
  <FullButton onClick={() => history.go(-1)}>Go Back</FullButton>
);

export const RoleAssignTransfer = ({ decorator, dataSource, selectedRole }) => {
  const titles = [
    <BoldUnderlineText>Member(s):</BoldUnderlineText>,
    <BoldUnderlineText>{selectedRole}</BoldUnderlineText>,
  ];
  return (
    <FormItem>
      {decorator('roleTransfer', { valuePropName: 'targetKeys' })(
        <Transfer
          dataSource={dataSource}
          titles={titles}
          showSearch
          searchPlaceholder="Search member"
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
