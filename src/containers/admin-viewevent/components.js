import React from 'react';
import { Form } from 'antd';
import { HalfWidthButton } from './styled-components';
import { eventData } from '../../reducers/eventmgmt/eventmgmt-data';
// import { CustomIcon } from '../shared-components/common';

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

export const EditEventButton = ({ isValidating, onClick }) => (
  <HalfWidthButton type="primary" htmlType="submit" loading={isValidating} onClick={onClick}>
    Edit Event
  </HalfWidthButton>
);

export const ViewRSVPButton = ({ isValidating, onClick }) => (
  <HalfWidthButton type="primary" htmlType="submit" loading={isValidating} onClick={onClick}>
    View RSVP
  </HalfWidthButton>
);

export const CloseButton = ({ isValidating, onClick }) => (
  <HalfWidthButton type="primary" htmlType="submit" loading={isValidating} onClick={onClick}>
    Close
  </HalfWidthButton>
);

export const ShareFacebookButton = ({ isValidating, onClick, decorator }) => (
  <FormItem {...layout} label="Share on facebook >" colon={false}>
    {decorator('eventStatus')(
      <HalfWidthButton
        type="primary"
        icon="facebook large"
        htmlType="submit"
        size="large"
        shape="circle"
        loading={isValidating}
        onClick={onClick}
      />,
    )}
  </FormItem>
);

export const NotifyMsgButton = ({ isValidating, onClick, decorator }) => (
  <FormItem {...layout} label="Notify Club Members >" colon={false}>
    {decorator('eventStatus')(
      <HalfWidthButton
        type="primary"
        icon="message"
        htmlType="submit"
        size="large"
        shape="circle"
        loading={isValidating}
        onClick={onClick}
      />,
    )}
  </FormItem>
);
