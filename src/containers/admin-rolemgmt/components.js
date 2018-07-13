import React from 'react';
import { Form, Select, Transfer } from 'antd';
import {
  HalfWidthButton, RoleSelect, BoldUnderlineText, FlexContainer,
} from './styled-components';

const FormItem = Form.Item;
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
export const RoleNameSelect = ({ onChange, roleNameList, decorator }) => (
  <FormItem {...layout} label="Select Role Name" colon>
    {decorator('roleId', {
      rules: [
        {
          required: true,
          message: 'Please select role name.',
        },
      ],
    })(
      <RoleSelect onChange={onChange} placeholder="Select a role" style={{ width: '300px' }}>
        {roleNameList.map(item => (
          <Option key={item.id.toString} value={item.id}>
            {item.name}
          </Option>
        ))}
      </RoleSelect>,
    )}
  </FormItem>
);

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

export const GoBackButton = ({ onClick }) => (
  <HalfWidthButton onClick={onClick}>Go Back</HalfWidthButton>
);

export const RoleAssignTransfer = ({ dataSource, onChange, decorator }) => {
  const titles = [
    <BoldUnderlineText>Member(s):</BoldUnderlineText>,
    <BoldUnderlineText>Selected Role:</BoldUnderlineText>,
  ];
  return (
    <FlexContainer>
      <FormItem>
        {decorator('roleTransfer', { valuePropName: 'targetKeys' })(
          <Transfer
            dataSource={dataSource}
            titles={titles}
            onChange={onChange}
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
    </FlexContainer>
  );
};
