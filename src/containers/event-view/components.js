import React from 'react';
import { Tabs, Button, Form } from 'antd';
import { EVENT_EDIT } from '../../actions/location';
import {
  FullWidthButton,
  FormItemNoMargin,
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

export const EventData = ({ decorator }) => (
  <div>
    <FormItemNoMargin>
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
    </FormItemNoMargin>

    <FormItemNoMargin {...layout} label="Event Name">
      {decorator('name')(<ReadOnlyInput readOnly />)}
    </FormItemNoMargin>
    <FormItemNoMargin {...layout} label="Event Description">
      {decorator('description')(<ReadOnlyInput readOnly />)}
    </FormItemNoMargin>
    <FormItemNoMargin {...layout} label="Start Date/Time">
      {decorator('startDate')(<ReadOnlyInput readOnly />)}
    </FormItemNoMargin>
    <FormItemNoMargin {...layout} label="End Date/Time">
      {decorator('endDate')(<ReadOnlyInput readOnly />)}
    </FormItemNoMargin>
    <FormItemNoMargin {...layout} label="Location">
      {decorator('location')(<ReadOnlyInput readOnly />)}
    </FormItemNoMargin>
    <FormItemNoMargin {...layout} label="Postal Code">
      {decorator('locationPostalCode')(<ReadOnlyInput readOnly />)}
    </FormItemNoMargin>
    <FormItemNoMargin {...layout} label="Event Status">
      {decorator('eventStatus')(<ReadOnlyInput readOnly />)}
    </FormItemNoMargin>
    <FormItemNoMargin {...layout} label="Ticket Fee (SGD)">
      {decorator('ticketFee')(<ReadOnlyInput readOnly />)}
    </FormItemNoMargin>
    <FormItemNoMargin {...layout} label="No of Pax">
      {decorator('noOfPax')(<ReadOnlyInput readOnly />)}
    </FormItemNoMargin>
    <FormItemNoMargin {...layout} label="Refreshment Provided">
      {decorator('isRefreshmentProvided')(<ReadOnlyInput readOnly />)}
    </FormItemNoMargin>
    <FormItemNoMargin {...layout} label="Contact Person">
      {decorator('contactPerson')(<ReadOnlyInput readOnly />)}
    </FormItemNoMargin>
    <FormItemNoMargin {...layout} label="Email Address">
      {decorator('emailAddress')(<ReadOnlyInput readOnly />)}
    </FormItemNoMargin>
    <FormItemNoMargin {...layout} label="Mobile No">
      {decorator('mobilePhone')(<ReadOnlyInput readOnly />)}
    </FormItemNoMargin>
    <FormItemNoMargin {...layout} label="Created By">
      {decorator('createdBy')(<ReadOnlyInput readOnly />)}
    </FormItemNoMargin>
    <FormItemNoMargin {...layout} label="Created Date">
      {decorator('createdDate')(<ReadOnlyInput readOnly />)}
    </FormItemNoMargin>
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
  <FormItemNoMargin {...layout} label="Share on facebook >" colon={false}>
    {decorator('shareFaceBook')(
      <Button icon="facebook" shape="circle" type="primary" ghost />,
    )}
  </FormItemNoMargin>
);

export const NotifyMsgButton = ({ decorator }) => (
  <FormItemNoMargin {...layout} label="Notify Club Members >" colon={false}>
    {decorator('notifyMsg')(
      <Button icon="message" shape="circle" type="primary" ghost />,
    )}
  </FormItemNoMargin>
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
