import React from 'react';
import {
  Tabs, Button, Form, Input, DatePicker, Radio,
} from 'antd';
import { EVENT_EDIT } from '../../../actions/location';
import {
  TabIcon,
  BoldText,
  FullWidthTable,
  FullButton,
  ExtraInfoText,
} from '../shared-styled';
import { layout } from '../shared-components';

const FormItem = Form.Item;
const { TabPane } = Tabs;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const MonthPicker = DatePicker;
const readOnlyInput = {
  style: {
    border: 0,
    outline: 0,
    borderRadius: 0,
    padding: 0,
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
  },
  readOnly: true,
  size: 'small',
};

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
    })(<Input maxLength="16" type="text" />)}
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
    })(<Input maxLength="4" type="text" />)}
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
    })(<Input type="text" />)}
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
    })(<MonthPicker placeholder="Select month and year" format="MM-YYYY" />)}
    <ExtraInfoText>MM-YYYY</ExtraInfoText>
  </FormItem>
);

// Payment Button
export const PaymentButton = ({ clicked }) => (
  <FullButton type="primary" htmlType="submit" onClick={clicked}>
    Make Payment Now
  </FullButton>
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

/* eslint react/prop-types: 0 */
// ALL FORM ITEM MUST PASS IN decorator!
export const EventViewTabs = ({ onChange, tabContents, props }) => {
  const tabTitles = {
    tab1: (
      <BoldText>
        <TabIcon type="calendar" />
        Event
      </BoldText>
    ),
    tab2: (
      <BoldText>
        <TabIcon type="calendar" />
        Registration List
      </BoldText>
    ),
  };

  const EventPage = tabContents[0];
  const RegistrationListPage = tabContents[1];

  return (
    <Tabs onChange={onChange} type="card">
      <TabPane tab={tabTitles.tab1} key="tab1">
        <EventPage {...props} />
      </TabPane>
      <TabPane tab={tabTitles.tab2} key="tab2">
        <RegistrationListPage {...props} />
      </TabPane>
    </Tabs>
  );
};

export const EventData = ({ decorator }) => (
  <Form>
    <FormItem>
      {decorator('photoLink', { valuePropName: 'src' })(
        <img
          alt="example"
          style={{
            width: 'auto',
            height: '200px',
            margin: '0 auto 0 auto',
            display: 'block',
          }}
        />,
      )}
    </FormItem>

    <FormItem {...layout} style={{ marginBottom: 0 }} label="Event Name">
      {decorator('name')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem {...layout} style={{ marginBottom: 0 }} label="Event Description">
      {decorator('description')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem {...layout} style={{ marginBottom: 0 }} label="Start Date/Time">
      {decorator('startDate')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem {...layout} style={{ marginBottom: 0 }} label="End Date/Time">
      {decorator('endDate')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem {...layout} style={{ marginBottom: 0 }} label="Location">
      {decorator('location')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem {...layout} style={{ marginBottom: 0 }} label="Postal Code">
      {decorator('locationPostalCode')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem {...layout} style={{ marginBottom: 0 }} label="Ticket Fee (SGD)">
      {decorator('ticketFee')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem {...layout} style={{ marginBottom: 0 }} label="No of Pax">
      {decorator('noOfPax')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem
      {...layout}
      style={{ marginBottom: 0 }}
      label="Refreshment Provided"
    >
      {decorator('isRefreshmentProvided')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem {...layout} style={{ marginBottom: 0 }} label="Contact Person">
      {decorator('contactPerson')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem {...layout} style={{ marginBottom: 0 }} label="Email Address">
      {decorator('emailAddress')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem {...layout} style={{ marginBottom: 0 }} label="Mobile No">
      {decorator('mobilePhone')(<Input {...readOnlyInput} />)}
    </FormItem>
  </Form>
);

export const EditEventButton = ({ eventId }) => (
  <FullButton type="primary" href={EVENT_EDIT.concat('/').concat(eventId)}>
    Edit Event
  </FullButton>
);

export const ShareFacebookButton = () => (
  <Button icon="facebook" shape="circle" type="primary" ghost />
);

export const NotifyMsgButton = ({ onClickNotify, loading }) => (
  <Button
    icon="message"
    shape="circle"
    type="primary"
    ghost
    onClick={onClickNotify}
    loading={loading}
  />
);

export const RegistrationTable = ({
  registrationList,
  rowSelection,
  onChange,
  sortedInfo,
  filteredInfo,
}) => {
  const columns = [
    // dataIndex = databases column names
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      width: '4%',
      render: (text, record, index) => <span>{`${index + 1}`}</span>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.toLowerCase().includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      width: '19%',
    },
    {
      title: 'Email Address',
      dataIndex: 'emailAddress',
      key: 'emailAddress',
      sorter: (a, b) => a.emailAddress.length - b.emailAddress.length,
      sortOrder: sortedInfo.columnKey === 'emailAddress' && sortedInfo.order,
      width: '28%',
    },
    {
      title: 'Mobile No',
      dataIndex: 'mobilePhone',
      key: 'mobilePhone',
      width: '19%',
    },
    {
      title: 'No. of Ticket(s)',
      dataIndex: 'noOfPax',
      key: 'noOfPax',
      sorter: (a, b) => Number.parseInt(a.noOfPax, 10) - Number.parseInt(b.noOfPax, 10),
      sortOrder: sortedInfo.columnKey === 'noOfPax' && sortedInfo.order,
      width: '14%',
    },
    {
      title: 'Payment',
      dataIndex: 'paymentType',
      key: 'paymentType',
      sorter: (a, b) => a.paymentType.length - b.paymentType.length,
      sortOrder: sortedInfo.columnKey === 'paymentType' && sortedInfo.order,
      width: '15%',
    },
  ];

  return (
    <FullWidthTable
      columns={columns}
      dataSource={registrationList}
      rowSelection={rowSelection}
      onChange={onChange}
      bordered
      size="small"
      pagination={{ position: 'top' }}
    />
  );
};
