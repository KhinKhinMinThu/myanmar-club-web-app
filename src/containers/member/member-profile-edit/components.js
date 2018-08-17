import React from 'react';
import {
  Form, Tabs, Select, Radio, InputNumber,
} from 'antd';
import {
  TabIcon,
  BoldText,
  FullButton,
  // BoldUnderlineText,
} from '../shared-styled';
import {
  layout,
  customInput,
} from '../../shared-profile-components/shared-components';
import { ExtraInfoText } from '../../shared-profile-components/shared-styled';

const { TabPane } = Tabs;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Option } = Select;

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
  const MemberRenewalPage = tabContents[1];
  return (
    <Tabs onChange={onChange} type="card">
      <TabPane tab={tabTitles.tab1} key="tab1">
        <MemberEditPage {...props} />
      </TabPane>
      <TabPane tab={tabTitles.tab2} key="tab2">
        <MemberRenewalPage {...props} />
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
export const BackButton = ({ history }) => (
  <FullButton onClick={() => history.go(-1)}>Go Back</FullButton>
);

export const RoleInput = ({ decorator, allRoles, form }) => {
  // const { decorator, allRoles } = this.props;

  const children = [];
  const description = [];
  allRoles.forEach((item) => {
    description.push(`${item.name}: ${item.description}`);
    children.push(<Option key={item.id}>{item.name}</Option>);
  });

  return (
    <FormItem {...layout} label="Roles" colon>
      {decorator('roleNames', {
        getValueFromEvent: (value) => {
          const { getFieldValue } = form;
          if (getFieldValue('isEcMember') === '0') return [];
          if (value.includes('1')) return ['1'];
          return value;
        },
      })(
        <Select
          mode="multiple"
          placeholder="Please select member role"
          style={{ width: '100%' }}
        >
          {children}
        </Select>,
      )}
      {description.map(item => (
        <ExtraInfoText key={item}>
          {item}
          <br />
        </ExtraInfoText>
      ))}
    </FormItem>
  );
};

// PaymentTypeRadio
export const PaymentTypeRadio = ({ decorator }) => (
  <FormItem {...layout} label="Payment Method">
    {decorator('paymentType', {
      initialValue: 'Bank Transfer',
      rules: [{ required: true, message: 'Please select payment type!' }],
    })(
      <RadioGroup name="paymentType">
        <RadioButton value="Bank Transfer">Bank Transfer</RadioButton>
        <RadioButton value="Cash Payment">Cash Payment</RadioButton>
      </RadioGroup>,
    )}
  </FormItem>
);

// TotalAmount
export const TotalAmountInput = ({ decorator }) => (
  <FormItem {...layout} label="Total Amount">
    {decorator('totalAmount', {
      rules: [
        {
          // pattern: '^-?(0|[1-9][0-9]*)(.[0-9]*)?$',
          required: true,
          message: 'Please input total amount!',
        },
      ],
    })(
      <InputNumber
        {...customInput}
        formatter={value => `SGD ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }
        parser={value => value.replace(/[SGD]\s?|(,*)/g, '')}
        placeholder="Please input total amount"
      />,
    )}
  </FormItem>
);
