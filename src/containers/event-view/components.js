import React from 'react';
import { Tabs, Button, Form } from 'antd';
import { EVENT_EDIT } from '../../actions/location';
import {
  FullWidthButton,
  ReadOnlyInput,
  TabIcon,
  BoldText,
  FullWidthTable,
  SelectedText,
  MarginLeftButton,
  SearchInput,
} from '../event-creation/styled-components';

const FormItem = Form.Item;
const { TabPane } = Tabs;

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

const noMargin = { margin: 0 };
export const EventData = ({ decorator }) => (
  <div>
    <FormItem>
      {decorator('photoLink', { valuePropName: 'src' })(
        <img
          alt="example"
          style={{
            width: 'auto',
            height: '500px',
            margin: '0 auto 0 auto',
            display: 'block',
          }}
        />,
      )}
    </FormItem>

    <FormItem {...layout} label="Event Name" style={noMargin}>
      {decorator('name')(<ReadOnlyInput readOnly />)}
    </FormItem>
    <FormItem {...layout} label="Event Description" style={noMargin}>
      {decorator('description')(<ReadOnlyInput readOnly />)}
    </FormItem>
    <FormItem {...layout} label="Start Date/Time" style={noMargin}>
      {decorator('startDate')(<ReadOnlyInput readOnly />)}
    </FormItem>
    <FormItem {...layout} label="End Date/Time" style={noMargin}>
      {decorator('endDate')(<ReadOnlyInput readOnly />)}
    </FormItem>
    <FormItem {...layout} label="Location" style={noMargin}>
      {decorator('location')(<ReadOnlyInput readOnly />)}
    </FormItem>
    <FormItem {...layout} label="Postal Code" style={noMargin}>
      {decorator('locationPostalCode')(<ReadOnlyInput readOnly />)}
    </FormItem>
    <FormItem {...layout} label="Event Status" style={noMargin}>
      {decorator('eventStatus')(<ReadOnlyInput readOnly />)}
    </FormItem>
    <FormItem {...layout} label="Ticket Fee (SGD)" style={noMargin}>
      {decorator('ticketFee')(<ReadOnlyInput readOnly />)}
    </FormItem>
    <FormItem {...layout} label="No of Pax" style={noMargin}>
      {decorator('noOfPax')(<ReadOnlyInput readOnly />)}
    </FormItem>
    <FormItem {...layout} label="Refreshment Provided" style={noMargin}>
      {decorator('isRefreshmentProvided')(<ReadOnlyInput readOnly />)}
    </FormItem>
    <FormItem {...layout} label="Contact Person" style={noMargin}>
      {decorator('contactPerson')(<ReadOnlyInput readOnly />)}
    </FormItem>
    <FormItem {...layout} label="Email Address" style={noMargin}>
      {decorator('emailAddress')(<ReadOnlyInput readOnly />)}
    </FormItem>
    <FormItem {...layout} label="Mobile No" style={noMargin}>
      {decorator('mobilePhone')(<ReadOnlyInput readOnly />)}
    </FormItem>
    <FormItem {...layout} label="Created By" style={noMargin}>
      {decorator('createdBy')(<ReadOnlyInput readOnly />)}
    </FormItem>
    <FormItem {...layout} label="Created Date" style={noMargin}>
      {decorator('createdDate')(<ReadOnlyInput readOnly />)}
    </FormItem>
  </div>
);

export const EditEventButton = ({ eventId }) => (
  <FullWidthButton type="primary" href={EVENT_EDIT.concat('/').concat(eventId)}>
    Edit Event
  </FullWidthButton>
);

export const ViewRSVPButton = ({ eventId }) => (
  // change to RSVP Link
  <FullWidthButton type="primary" href={EVENT_EDIT.concat('/').concat(eventId)}>
    View RSVP
  </FullWidthButton>
);

export const CloseButton = <FullWidthButton>Close</FullWidthButton>;

export const ShareFacebookButton = ({ decorator }) => (
  <FormItem {...layout} label="Share on facebook >" colon={false} style={noMargin}>
    {decorator('shareFaceBook')(
      <Button icon="facebook" shape="circle" type="primary" ghost />,
    )}
  </FormItem>
);

export const NotifyMsgButton = ({ decorator }) => (
  <FormItem {...layout} label="Notify Club Members >" colon={false} style={noMargin}>
    {decorator('notifyMsg')(
      <Button icon="message" shape="circle" type="primary" ghost />,
    )}
  </FormItem>
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
      render: (text, record, index) => <span>{`${index + 1}`}</span>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    },
    {
      title: 'Email Address',
      dataIndex: 'emailAddress',
      key: 'emailAddress',
      sorter: (a, b) => a.emailAddress.length - b.emailAddress.length,
      sortOrder: sortedInfo.columnKey === 'emailAddress' && sortedInfo.order,
    },
    {
      title: 'Mobile No',
      dataIndex: 'mobilePhone',
      key: 'mobilePhone',
    },
    {
      title: 'No. of Ticket(s)',
      dataIndex: 'noOfPax',
      key: 'noOfPax',
      sorter: (a, b) => Number.parseInt(a.noOfPax, 10) - Number.parseInt(b.noOfPax, 10),
      sortOrder: sortedInfo.columnKey === 'noOfPax' && sortedInfo.order,
    },
    {
      title: 'Payment',
      dataIndex: 'paymentType',
      key: 'paymentType',
      sorter: (a, b) => a.paymentType.length - b.paymentType.length,
      sortOrder: sortedInfo.columnKey === 'paymentType' && sortedInfo.order,
    },
  ];

  return (
    <FullWidthTable
      columns={columns}
      dataSource={registrationList}
      rowSelection={rowSelection}
      onChange={onChange}
      bordered
    />
  );
};

export const DeSeletAllButton = ({ onClick, hasSelected, loading }) => (
  <MarginLeftButton
    type="primary"
    onClick={onClick}
    disabled={!hasSelected}
    loading={loading}
    ghost
  >
    Deselect All
  </MarginLeftButton>
);

export const SeletAllButton = ({ onClick, loading }) => (
  <Button type="primary" onClick={onClick} loading={loading} ghost>
    Select All
  </Button>
);

export const SelectedRegistrations = ({ selectedNum }) => (
  <SelectedText>Selected {selectedNum} registration(s)</SelectedText>
);

export const DeleteSeletedButton = ({ onClick, hasSelected }) => (
  <MarginLeftButton type="primary" onClick={onClick} disabled={!hasSelected}>
    Delete Selected Registration(s)
  </MarginLeftButton>
);

export const SearchNamePanel = ({
  onChange,
  onPressEnter,
  decorator,
  onClickSearch,
  onClickReset,
}) => (
  <FormItem
    {...{
      labelCol: {
        xs: { span: 0 },
        sm: { span: 0 },
      },
      wrapperCol: {
        xs: { span: 8 },
        sm: { span: 8 },
      },
    }}
  >
    {decorator('searchName', { initialValue: null })(
      <SearchInput
        placeholder="Search name"
        onChange={onChange}
        onPressEnter={onPressEnter}
      />,
    )}
    <SearchNameButton onClick={onClickSearch} />
    <ResetButton onClick={onClickReset} />
  </FormItem>
);

export const SearchNameButton = ({ onClick }) => (
  <MarginLeftButton type="primary" onClick={onClick}>
    Search
  </MarginLeftButton>
);

export const ResetButton = ({ onClick }) => (
  <MarginLeftButton type="primary" onClick={onClick} ghost>
    Clear Search
  </MarginLeftButton>
);
