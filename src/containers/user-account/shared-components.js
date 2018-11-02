import React from 'react';
import {
  Form, Tabs, Radio, InputNumber, Table, Checkbox,
} from 'antd';
import { MMText } from '../shared-profile-components/shared-styled';
import {
  TabIcon,
  BoldText,
  FullButton,
  // BoldUnderlineText,
} from './shared-styled';
import { layout } from '../shared-profile-components/shared-components';

const { TabPane } = Tabs;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const paymentDisplay = {
  style: {
    border: 0,
    outline: 0,
    borderRadius: 0,
    padding: 0,
    fontWeight: 'bold',
    width: '100px',
    textAlign: 'right',
    marginRight: '10px',
  },
  readOnly: true,
  size: 'small',
};

/* eslint react/prop-types: 0 */
export const ProfileTabs = ({ onChange, tabContents, props }) => {
  const tabTitles = {
    tab1: (
      <BoldText>
        <TabIcon type="user" />
        Profile
      </BoldText>
    ),
    tab2: (
      <BoldText>
        <TabIcon type="user" />
        Membership Information
      </BoldText>
    ),
  };

  const ProfileEditPage = tabContents[0];
  const ProfileRenewalPage = tabContents[1];
  return (
    <Tabs onChange={onChange} type="card">
      <TabPane tab={tabTitles.tab1} key="tab1">
        <ProfileEditPage {...props} />
      </TabPane>
      <TabPane tab={tabTitles.tab2} key="tab2">
        <ProfileRenewalPage {...props} />
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

// PaymentTypeRadio
export const PaymentTypeRadio = ({ decorator }) => (
  <FormItem {...layout} label="Payment Method">
    {decorator('paymentType', {
      initialValue: 'Bank Transfer',
      rules: [{ required: true, message: 'Please select payment type!' }],
    })(
      <RadioGroup name="paymentType">
        <RadioButton value="Direct Payment" disabled>
          Direct Payment
        </RadioButton>
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
        {...paymentDisplay}
        formatter={value => `SGD ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }
        parser={value => value.replace(/[SGD]\s?|(,*)/g, '')}
        placeholder="Please input total amount"
      />,
    )}
  </FormItem>
);

// feestable

const columns = [
  { title: '', dataIndex: 'NA', align: 'right' },
  {
    title: 'Life',
    dataIndex: 'LI',
    align: 'right',
    width: '20%',
  },
  {
    title: 'Ordinary',
    dataIndex: 'OR',
    align: 'right',
    width: '20%',
  },
  {
    title: 'Student/ Worker',
    dataIndex: 'SW',
    align: 'right',
    width: '30%',
  },
];

const data = [
  {
    key: '1',
    NA: 'Entrance Fee',
    LI: 'SGD 50',
    OR: 'SGD 50',
    SW: 'Waive',
  },
  {
    key: '2',
    NA: 'Annual Fee',
    LI: 'NA',
    OR: 'SGD 24',
    SW: 'SGD 24',
  },
  {
    key: '3',
    NA: 'The Member',
    LI: 'SGD 300',
    OR: 'NA',
    SW: 'NA',
  },
  {
    key: '4',
    NA: 'Total',
    LI: 'SGD 350',
    OR: 'SGD 74',
    SW: 'SGD 24',
  },
];

export const feesTbl = (
  <Table
    style={{ border: '1px solid black' }}
    columns={columns}
    dataSource={data}
    pagination={false}
    size="small"
    bordered
  />
);

// DeclarationCheckBox
export const DeclarationCheckBox = ({ decorator }) => {
  const declarationCheckList = [
    {
      label: (
        <span>
          True and Correct{' '}
          <MMText>(ပေးပို့ထားသော ကိုယ်ရေးအချက်အလက်များမှာ မှန်ကန်ပါသည်)</MMText>
        </span>
      ),
      value: '1',
    },
    {
      label: (
        <span>
          I will abide by the Constitution of the Society{' '}
          <MMText>(အသင်း၏ စည်းမျဉ်းများကိုလိုက်နာပါမည်)</MMText>
        </span>
      ),
      value: '2',
    },
  ];
  return (
    <FormItem>
      {decorator('declarationCheck', {
        rules: [
          {
            type: 'array',
            required: true,
            message: 'Please tick both chechboxes!',
            len: 2,
          },
        ],
      })(<CheckboxGroup options={declarationCheckList} />)}
    </FormItem>
  );
};
