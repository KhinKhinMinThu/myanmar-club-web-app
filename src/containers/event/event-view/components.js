import React from 'react';
import { FacebookShareButton } from 'react-share';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import {
  Tabs, Button, Form, Input, Popconfirm, Tooltip, Row, Col,
} from 'antd';
import { EVENT_EDIT } from '../../../actions/location';
import {
  TabIcon,
  BoldText,
  FullWidthTable,
  FullButton,
  TableActionButton,
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
        <TabIcon type="calendar" theme="filled" />
        Event
      </BoldText>
    ),
    tab2: (
      <BoldText>
        <TabIcon type="calendar" theme="filled" />
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
export const EventData1 = ({ decorator }) => (
  <div>
    <FormItem {...layout} style={{ marginBottom: 0 }} label="Event Id">
      {decorator('id')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem {...layout} style={{ marginBottom: 0 }} label="Event Name">
      {decorator('name')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem {...layout} style={{ marginBottom: 0 }} label="Event Description">
      {decorator('description')(<Input {...readOnlyInput} />)}
    </FormItem>
  </div>
);
export const EventData2 = ({ decorator }) => (
  <div>
    {' '}
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
  </div>
);
export const EventData3 = ({ decorator }) => (
  <div>
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
    <FormItem {...layout} style={{ marginBottom: 0 }} label="Direct Payment (PayPal)">
      {decorator('directPayment')(<Input {...readOnlyInput} />)}
    </FormItem>
  </div>
);
export const EventData4 = ({ decorator }) => (
  <div>
    <FormItem {...layout} style={{ marginBottom: 0, marginTop: 8 }} label="Contact Person">
      {decorator('contactPerson')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem {...layout} style={{ marginBottom: 0 }} label="Email Address">
      {decorator('emailAddress')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem {...layout} style={{ marginBottom: 1 }} label="Mobile No">
      {decorator('mobilePhone')(<Input {...readOnlyInput} />)}
    </FormItem>
  </div>
);
export const EventData5 = ({ decorator }) => (
  <div>
    <FormItem {...layout} style={{ marginBottom: 0 }} label="Created By">
      {decorator('createdBy')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem {...layout} style={{ marginBottom: 7 }} label="Created Date">
      {decorator('createdDate')(<Input {...readOnlyInput} />)}
    </FormItem>
  </div>
);
export const EventPhoto = ({ decorator }) => (
  <div>
    <FormItem style={{ marginBottom: 0 }}>
      {decorator('photoLink', { valuePropName: 'src' })(
        <img
          alt="example"
          style={{
            width: 'auto',
            height: '265px',
            margin: '0 auto 0 auto',
            display: 'block',
          }}
        />,
      )}
    </FormItem>
  </div>
);

export const EditEventButton = ({ eventId }) => (
  <Link to={EVENT_EDIT.concat('/').concat(eventId)}>
    <FullButton type="primary">Edit Event</FullButton>
  </Link>
);

export const ShareFacebookButton = ({ url, quote }) => (
  <FacebookShareButton url={url} quote={quote}>
    <Button icon="facebook" shape="circle" type="primary" /> Share on facebook
  </FacebookShareButton>
);

export const NotifyMsgButton = ({ onClickNotify, loading }) => (
  <Button
    icon="message"
    shape="circle"
    type="primary"
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
  header,
  deleteRegistration,
  exportList,
  exportFileName,
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
      sorter: (a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      },
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      width: '16%',
    },
    {
      title: 'Email Address',
      dataIndex: 'emailAddress',
      key: 'emailAddress',
      sorter: (a, b) => {
        if (a.emailAddress < b.emailAddress) return -1;
        if (a.emailAddress > b.emailAddress) return 1;
        return 0;
      },
      sortOrder: sortedInfo.columnKey === 'emailAddress' && sortedInfo.order,
      width: '26%',
    },
    {
      title: 'Mobile No',
      dataIndex: 'mobilePhone',
      key: 'mobilePhone',
      width: '10%',
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
      sorter: (a, b) => {
        if (a.paymentType < b.paymentType) return -1;
        if (a.paymentType > b.paymentType) return 1;
        return 0;
      },
      sortOrder: sortedInfo.columnKey === 'paymentType' && sortedInfo.order,
      width: '15%',
    },
    {
      title: 'Paid?',
      dataIndex: 'isPaid',
      key: 'isPaid',
      sorter: (a, b) => {
        if (a.isPaid < b.isPaid) return -1;
        if (a.isPaid > b.isPaid) return 1;
        return 0;
      },
      sortOrder: sortedInfo.columnKey === 'isPaid' && sortedInfo.order,
      width: '7%',
    },
    {
      title: '',
      key: '',
      width: '7%',
      // render: (text, record) => ()
      render: record => (
        <div>
          <DeleteButton record={record} action={deleteRegistration} />
        </div>
      ),
    },
  ];

  return (
    <FullWidthTable
      title={() => (
        <Row>
          <Col span={12} style={{ textAlign: 'left' }}>
            {header}
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <CSVLink
              data={exportList}
              filename={exportFileName}
              // onClick={() => {
              //   console.log('You click the link'); // 👍🏻 Your click handling logic
              // }}
            >
              <Button icon="download" type="primary">
                Download Registration List
              </Button>
            </CSVLink>
          </Col>
        </Row>
      )}
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

// DeleteButton for RegistrationTable
export const DeleteButton = ({ record, action }) => (
  <Popconfirm
    title="Confirm to remove this registration?"
    onConfirm={() => action(record.id)}
  >
    <Tooltip title="Delete Registraiton">
      <TableActionButton icon="delete" />
    </Tooltip>
  </Popconfirm>
);
