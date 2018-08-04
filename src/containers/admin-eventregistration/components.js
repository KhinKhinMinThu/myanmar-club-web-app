import React from 'react';
import { Form } from 'antd';
import { HalfWidthButton, FullWidthTable, TableActionIcon } from './styled-components';
// import { CustomIcon } from '../shared-components/common';
import { eventData } from '../../reducers/eventmgmt/eventmgmt-data';

const FormItem = Form.Item;

const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
};

/* eslint react/prop-types: 0 */
// ALL FORM ITEM MUST PASS IN decorator!

// Event Name
export const EventName = ({ decorator }) => (
  <FormItem {...layout} label="Event Name">
    {decorator('eventName')(<text> {`${eventData.name}`} </text>)}
  </FormItem>
);

// Event Description
export const EventDescription = ({ decorator }) => (
  <FormItem {...layout} label="Description">
    {decorator('eventDescription')(<text> {`${eventData.description}`} </text>)}
  </FormItem>
);

// Location Address
export const Address = ({ decorator }) => (
  <FormItem {...layout} label="Location">
    {decorator('eventLocation')(
      <text>
        {' '}
        {`${`${eventData.locationLine1} ${eventData.locationLine2} ${
          eventData.locationPostalCode
        }`}`}{' '}
      </text>,
    )}
  </FormItem>
);

// Refreshment
export const Refreshment = ({ decorator }) => (
  <FormItem {...layout} label="Refreshment Provided">
    {decorator('refreshment')(<text> {`${eventData.isRefreshmentProvided}`} </text>)}
  </FormItem>
);

// Ticket fee
export const TicketFee = ({ decorator }) => (
  <FormItem {...layout} label="Ticket Fee (SGD)">
    {decorator('ticketFee')(<text> {`${eventData.ticketFee}`} </text>)}
  </FormItem>
);

// No of Pax
export const NumPax = ({ decorator }) => (
  <FormItem {...layout} label="No of Pax">
    {decorator('numPax')(<text> {`${eventData.noOfPax}`} </text>)}
  </FormItem>
);

// Email address
export const EmailAddress = ({ decorator }) => (
  <FormItem {...layout} label="Email Address">
    {decorator('emailAddress')(<text> {`${eventData.emailAddress}`} </text>)}
  </FormItem>
);

// Contact Person
export const ContactPerson = ({ decorator }) => (
  <FormItem {...layout} label="Contact Person">
    {decorator('contactPerson')(<text> {`${eventData.contactPerson}`} </text>)}
  </FormItem>
);

// Mobiel Number
export const MobileNo = ({ decorator }) => (
  <FormItem {...layout} label="Mobile No.">
    {decorator('contactPerson')(<text> {`${eventData.mobilePhone}`} </text>)}
  </FormItem>
);

// Event Status
export const EventStatus = ({ decorator }) => (
  <FormItem {...layout} label="Event Status">
    {decorator('contactPerson')(<text> {`${eventData.eventStatus}`} </text>)}
  </FormItem>
);

// Event Start Date/Time
export const StartDateTime = ({ decorator }) => (
  <FormItem {...layout} label="Start Date/Time">
    {decorator('contactPerson')(<text> {`${eventData.startDateTime}`} </text>)}
  </FormItem>
);

// Event End Date/Time
export const EndDateTime = ({ decorator }) => (
  <FormItem {...layout} label="End Date/Time">
    {decorator('contactPerson')(<text> {`${eventData.endDateTime}`} </text>)}
  </FormItem>
);

// Event Photo
export const EventPhoto = ({ decorator }) => (
  <FormItem {...layout}>
    {decorator('eventPhoto')(
      <img style={{ width: '820px', height: '500px' }} alt="example" src={eventData.photoLink} />,
    )}
  </FormItem>
);

export const BackButton = ({ isValidating, onClick }) => (
  <HalfWidthButton type="primary" htmlType="submit" loading={isValidating} onClick={onClick}>
    Back
  </HalfWidthButton>
);

export const EcMembersTable = ({ ecMembersList, onChange, sortedInfo }) => {
  const columns = [
    // dataIndex = databases column names
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => Number.parseInt(a.id, 10) - Number.parseInt(b.id, 10),
      sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    },
    {
      title: 'Email Address',
      dataIndex: 'email_address',
      key: 'email_address',
      sorter: (a, b) => a.email_address.length - b.email_address.length,
      sortOrder: sortedInfo.columnKey === 'email_address' && sortedInfo.order,
    },
    {
      title: 'Mobile No',
      dataIndex: 'mobile_phone',
      key: 'mobile_phone',
      sorter: (a, b) => a.mobile_phone.length - b.mobile_phone.length,
      sortOrder: sortedInfo.columnKey === 'mobile_phone' && sortedInfo.order,
    },
    {
      title: 'No. of Ticket(s)',
      dataIndex: 'no_of_pax',
      key: 'no_of_pax',
      sorter: (a, b) => a.no_of_pax.length - b.no_of_pax.length,
      sortOrder: sortedInfo.columnKey === 'no_of_pax' && sortedInfo.order,
    },
    {
      title: 'Payment',
      dataIndex: 'payment_type',
      key: 'payment_type',
      sorter: (a, b) => a.payment_type.length - b.payment_type.length,
      sortOrder: sortedInfo.columnKey === 'payment_type' && sortedInfo.order,
    },
    {
      title: 'Action',
      key: 'action',
      render: () => <TableActionIcon type="delete" />,
    },
  ];

  return (
    <FullWidthTable columns={columns} dataSource={ecMembersList} onChange={onChange} bordered />
  );
};
