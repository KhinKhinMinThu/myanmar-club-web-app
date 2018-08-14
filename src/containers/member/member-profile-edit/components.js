import React from 'react';
import {
  Tabs, Form, Radio, Select, Transfer,
} from 'antd';
import {
  TabIcon,
  BoldText,
  FullButton,
  BoldUnderlineText,
} from '../shared-styled';

const { TabPane } = Tabs;
// const FormItem = Form.Item;
// const RadioGroup = Radio.Group;
// const { Option } = Select;

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
  // const MemberRenewPage = tabContents[1];
  return (
    <Tabs onChange={onChange} type="card">
      <TabPane tab={tabTitles.tab1} key="tab1">
        <MemberEditPage {...props} />
      </TabPane>
      <TabPane tab={tabTitles.tab2} key="tab2">
        LALALALA
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
export const BackButton = () => <FullButton>Go Back</FullButton>;

// ********************************************************************************************
// ********************************************************************************************
// ********************************************************************************************

// export const RoleAssignTransfer = ({
//   dataSource,
//   onChange,
//   decorator,
//   targetKeys,
// }) => {
//   const titles = [
//     <BoldUnderlineText>Available Role(s):</BoldUnderlineText>,
//     <BoldUnderlineText>Member&#39;s Role(s):</BoldUnderlineText>,
//   ];
//   return (
//     <FormItem>
//       {decorator('roleTransfer', {
//         initialValue: targetKeys,
//         valuePropName: 'targetKeys',
//       })(
//         <Transfer
//           dataSource={dataSource}
//           titles={titles}
//           onChange={onChange}
//           listStyle={{
//             width: 350,
//             height: 300,
//           }}
//           render={item => item.description}
//         />,
//       )}
//     </FormItem>
//   );
// };

// export const MemberTypeText = ({ value }) => (
//   <FormItem {...layout} label="Member Type">
//     <BoldText>{value}</BoldText>
//   </FormItem>
// );
// export const StatusText = ({ value }) => (
//   <FormItem {...layout} label="Status">
//     <BoldText>{value}</BoldText>
//   </FormItem>
// );
// export const JoinDateText = ({ value }) => (
//   <FormItem {...layout} label="Joined Date">
//     <BoldText>{value}</BoldText>
//   </FormItem>
// );
// export const ExpiryDateText = ({ value }) => (
//   <FormItem {...layout} label="Expiry Date">
//     <BoldText>{value}</BoldText>
//   </FormItem>
// );
// export const LastPaymentDateText = ({ value }) => (
//   <FormItem {...layout} label="Last Payment Date">
//     <BoldText>{value}</BoldText>
//   </FormItem>
// );
// export const LastPaymentTypeText = ({ value }) => (
//   <FormItem {...layout} label="Last Payment Type">
//     <BoldText>{value}</BoldText>
//   </FormItem>
// );
// export const MemberTypeRadio = ({ decorator }) => (
//   <FormItem {...layout} label="Membership Type">
//     {decorator('memberTypeRadio', {
//       rules: [
//         {
//           required: true,
//           message: 'Please choose a membership type.',
//         },
//       ],
//     })(
//       <RadioGroup name="memberTypeRadio">
//         <Radio value="TYP1">
//           {'Life '}
//           <MMText>(ရာသက်ပန်) </MMText>
//           {'SGD 350'}
//         </Radio>
//         <br />
//         <Radio value="TYP2">
//           {'Singaporean/ PR/ EP Ordinary SGD 74 '}
//           {'+ Member Card SGD 5 (1st time) = SGD 79'}
//         </Radio>
//         <br />
//         <Radio value="TYP3">
//           {'Other Passes SGD 24 '}
//           {'+ Member Card SGD 5 (1st time) = SGD 29'}
//         </Radio>
//         <br />
//         <Radio value="TYP4">
//           {'Yearly Renewal Fees SGD 24 '}
//           {'+ New Member Card SGD 5 = SGD 29'}
//         </Radio>
//         <br />
//         <Radio value="TYP5">
//           {'6 month Fees SGD 12 '}
//           {'(not entitled for Member Card / '}
//           <MMText>အသင်းဝင်ကဒ်ရမည် မဟုတ်ပါ)</MMText>
//         </Radio>
//       </RadioGroup>,
//     )}
//   </FormItem>
// );
// export const PaymentTypeSelect = ({ decorator }) => (
//   <FormItem {...layout} label="Payment Type">
//     {decorator('newPaymentType', {
//       rules: [
//         {
//           required: true,
//           message: 'Please select payment type.',
//         },
//       ],
//     })(
//       <Select
//         {...customInput}
//         placeholder="Select payment type"
//         style={{ width: '300px' }}
//       >
//         <Option value="CASH">Cash</Option>
//         <Option value="BANK">Bank Transfer</Option>
//       </Select>,
//     )}
//   </FormItem>
// );
