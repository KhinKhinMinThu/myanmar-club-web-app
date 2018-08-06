import React from 'react';
import { Button } from 'antd';
import { EVENT_EDIT } from '../../actions/location';
import {
  FullWidthButton,
  FormItemNoMargin,
  ReadOnlyInput,
} from '../event-creation/styled-components';

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

/* eslint react/prop-types: 0 */
// ALL FORM ITEM MUST PASS IN decorator!

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
