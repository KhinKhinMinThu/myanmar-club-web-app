import React from 'react';
import {
  Form, Select, Transfer, Button,
} from 'antd';
import { FullButton, BoldUnderlineText } from '../shared-styled';
import { ROLE_MANAGEMENT } from '../../../actions/location';

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
      <Select onChange={onChange} placeholder="Select a role">
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
            textAlign: 'left',
          }}
          render={item => item.description}
        />,
      )}
    </FormItem>
  );
};

// Manage Role Button
export const ManageRoleButton = () => (
  <Button type="primary" icon="form" href={ROLE_MANAGEMENT}>
    Manage Role(s)
  </Button>
);
