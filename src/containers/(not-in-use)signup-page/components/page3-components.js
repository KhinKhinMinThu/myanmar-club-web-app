import React from 'react';
import { Form, Radio, Checkbox } from 'antd';
import {
  FormInput,
  ExtraInfoText,
  FormMonthPicker,
  FullButton,
} from '../styled-components';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const unicode = { fontFamily: 'Myanmar3', fontSize: 14 };
export const layout = {
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

// Card Num input
export const CardNumInput = ({ decorator }) => (
  <FormItem {...layout} label="Card Number">
    {decorator('cardNumber', {
      rules: [
        {
          pattern: '^([0-9]{16})$',
          message: 'The input is not a 16-digits card number!',
        },
        {
          required: true,
          message: 'Please enter card number!',
        },
      ],
    })(<FormInput maxLength="16" type="text" />)}
    <br />
    <ExtraInfoText style={{ marginTop: '0px' }}>
      {' '}
      {'Do not include space or dashes "-".'}
    </ExtraInfoText>
  </FormItem>
);

// Card Security input
export const CardSecurityCodeInput = ({ decorator }) => (
  <FormItem {...layout} label="Security Code">
    {decorator('cardSecurityCode', {
      rules: [
        {
          pattern: '^([0-9]{3,})$',
          message: 'The input is not a 16-digits card number!',
        },
        {
          required: true,
          message: 'Please enter card security code!',
        },
      ],
    })(<FormInput maxLength="4" type="text" />)}
  </FormItem>
);

// Name on card input
export const NameOnCardInput = ({ decorator }) => (
  <FormItem {...layout} label="Name on Card">
    {decorator('nameOnCard', {
      rules: [
        {
          required: true,
          message: 'Please enter cardholder name!',
        },
      ],
    })(<FormInput type="text" />)}
  </FormItem>
);

// Card expiry
export const CardExpiryPicker = ({ decorator }) => (
  <FormItem {...layout} label="Expiry Date">
    {decorator('cardExpiry', {
      rules: [
        {
          required: true,
          message: 'Please enter card expiry month and year!',
        },
      ],
    })(
      <FormMonthPicker placeholder="Select month and year" format="MM-YYYY" />,
    )}
    <ExtraInfoText>MM-YYYY</ExtraInfoText>
  </FormItem>
);

// Payment Button
export const PaymentButton = ({ clicked }) => (
  <FullButton type="primary" htmlType="submit" onClick={clicked}>
    Make Payment Now
  </FullButton>
);

// Membership fees
export const MembershipTypeRadio = ({ decorator }) => (
  <FormItem {...layout} label="Membership Fees">
    {decorator('membershipType', {
      rules: [
        {
          required: true,
          message: 'Please select your membership type!',
        },
      ],
    })(
      <RadioGroup
        style={{
          display: 'block',
          'padding-top': '6px',
          'line-height': '2',
        }}
        name="membershipTypeRdo"
      >
        <Radio value="TYP1">
          {'Life '}
          <span style={unicode}>(ရာသက်ပန်) </span>
          {'SGD 350'}
        </Radio>
        <Radio value="TYP2">
          {'Singaporean/ PR/ EP Ordinary SGD 74 '}
          {'+ Member Card SGD 5 (1st time) = SGD 79'}
        </Radio>
        <Radio value="TYP3">
          {'Other Passes SGD 24 '}
          {'+ Member Card SGD 5 (1st time) = SGD 29'}
        </Radio>
        <Radio value="TYP4">
          {'Yearly Renewal Fees SGD 24 '}
          {'+ New Member Card SGD 5 = SGD 29'}
        </Radio>
        <Radio value="TYP5">
          {'6 month Fees SGD 12 '}
          {'(not entitled for Member Card / '}
          <span style={unicode}>အသင်းဝင်ကဒ်ရမည် မဟုတ်ပါ)</span>
        </Radio>
      </RadioGroup>,
    )}
  </FormItem>
);

// Payment Radio
export const PaymentTypeRadio = ({ decorator, changed }) => (
  <FormItem {...layout} label="Payment Method">
    {decorator('paymentType', {
      initialValue: 'DP',
    })(
      <RadioGroup name="paymentTypeRdo" defaultValue="DP" onChange={changed}>
        <RadioButton value="DP">Direct Online Payment</RadioButton>
        <RadioButton value="BT">Bank Transfer</RadioButton>
        <RadioButton value="CT">Cash Payment</RadioButton>
      </RadioGroup>,
    )}
  </FormItem>
);

// Declaration Info
export const DeclarationInfo = ({ decorator }) => (
  <FormItem>
    {decorator('declarationInfo')(
      <p style={{ lineHeight: 1.5 }}>
        <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
          {'Declaration by applicant '}
          <span style={unicode}>(လျှောက်ထားသူမှ ခံဝန်ချက်)</span>
        </span>
        <br />
        {
          'I declare that the above particulars given by me are true and correct and '
        }
        {'I agree to abide by the Constitution of the society.'}
        <br />
        <span style={unicode}>
          {'အထက်ဖော်ပြပါ မိမိ၏ ကိုယ်ရေးအချက်အလက်များသည် မှန်ကန်ပါသည်။'}
          {
            'မိမိသည် မြန်မာကလပ်(စင်္ကာပူ) အသင်း၏ ဖွဲ့စည်းပုံစည်းမျဉ်းများကို လိုက်နာပါမည်။'
          }
        </span>
      </p>,
    )}
  </FormItem>
);

// Declaration Check List
export const DeclarationCheckBox = ({ decorator }) => {
  const declarationCheckList = [
    {
      label: (
        <span>
          {'True and Correct '}
          <span style={unicode}>
            {'(ပေးပို့ထားသော ကိုယ်ရေးအချက်အလက်များမှာ မှန်ကန်ပါသည်)'}
          </span>
        </span>
      ),
      value: '1',
    },
    {
      label: (
        <span>
          {'I will abide by the Constitution of the Society '}
          <span style={unicode}>(အသင်း၏ စည်းမျဉ်းများကိုလိုက်နာပါမည်)</span>
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

// Contact Info
export const ContactInfo = ({ decorator }) => (
  <FormItem>
    {decorator('contactInfo')(
      <p style={{ lineHeight: 1.5 }}>
        {'If you have any difficulties with online membership application, '}
        {'you are invited to come to Myanmar Club Office '}
        {
          'at Peninsula Plaza #05-42 from 13:00 to 19:00 hour on every Saturday.'
        }
        <br />
        <span style={unicode}>
          {
            'အကယ်၍ အွန်လိုင်းအသင်းဝင်ခွင့် လျှောက်ထားခြင်းနှင့် ပါတ်သက်၍ အခက်အခဲရှိပါက'
          }
          {'မြန်မာကလပ် ရုံးခန်း (ပင်နီဆူလာပလာဇာ၊ ၅ထပ် အခန်းအမှတ် ၄၁) သို့ '}
          {
            'စနေနေ့များတွင် နေ့လည် ၁နာရီမှ ညနေ ရနာရီအထိ ကိုယ်တိုင်လာရောက် ဆောင်ရွက်နိုင်ပါသည်။'
          }
        </span>
      </p>,
    )}
  </FormItem>
);
