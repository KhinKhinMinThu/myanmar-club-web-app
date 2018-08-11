import React from 'react';
import {
  Tabs, Button, Form, Input,
} from 'antd';
import { EVENT_EDIT } from '../../../actions/location';
import {
  TabIcon,
  BoldText,
  FullWidthTable,
  FullButton,
} from '../shared-styled';
import { layout } from '../shared-components';

const FormItem = Form.Item;
const { TabPane } = Tabs;
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

    <FormItem {...layout} style={{ marginBottom: 0 }} label="Event Id">
      {decorator('id')(<Input {...readOnlyInput} />)}
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
    <FormItem {...layout} style={{ marginBottom: 0 }} label="Event Status">
      {decorator('eventStatus')(<Input {...readOnlyInput} />)}
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
    <FormItem {...layout} style={{ marginBottom: 0 }} label="Created By">
      {decorator('createdBy')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem {...layout} style={{ marginBottom: 0 }} label="Created Date">
      {decorator('createdDate')(<Input {...readOnlyInput} />)}
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

export const NotifyMsgButton = ({ onClickNotify }) => (
  <Button
    icon="message"
    shape="circle"
    type="primary"
    ghost
    onClick={onClickNotify}
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
