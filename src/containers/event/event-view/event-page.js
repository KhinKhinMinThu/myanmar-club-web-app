import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { Form, Row, Col } from 'antd';
import {
  TIME_FORMAT_DB,
  DATE_FORMAT,
  DEFAULT_DATE,
  DEFAULT_TIME,
} from '../../../actions/constants';

import {
  EventData,
  EditEventButton,
  ShareFacebookButton,
  NotifyMsgButton,
} from './components';
import { EventCard } from '../shared-styled';
import { BackButton } from '../shared-components';

class EventPage extends Component {
  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const shareColLayout = {
      xs: { span: 24, offset: 0 },
      sm: { span: 24, offset: 0 },
      md: { span: 24, offset: 0 },
      lg: { span: 12, offset: 0 },
      xl: { span: 12, offset: 0 },
      style: { marginBottom: 14 },
    };
    const actionColLayout = {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 12 },
      xl: { span: 12 },
      style: { marginBottom: 14 },
    };

    return (
      <div>
        <EventCard>
          <EventData decorator={getFieldDecorator} />
          <br />
          <Row gutter={8}>
            <Col
              {...shareColLayout}
              {...{
                lg: { span: 6, offset: 6 },
                xl: { span: 6, offset: 6 },
              }}
            >
              <ShareFacebookButton /> Share on facebook
            </Col>
            <Col {...shareColLayout}>
              <NotifyMsgButton /> Notify Club Members
            </Col>
          </Row>
          <Row gutter={8}>
            <Col {...actionColLayout}>
              <EditEventButton eventId={this.eventId} />
            </Col>
            <Col {...actionColLayout}>
              <BackButton />
            </Col>
          </Row>
        </EventCard>
      </div>
    );
  }
}

EventPage.propTypes = {
  form: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  eventmgmtData: state.eventmgmt.data,
});

const formatDate = (strDate) => {
  if (strDate) {
    const date = moment(new Date(strDate)).format(DATE_FORMAT) === DEFAULT_DATE
      ? '/'
      : moment(new Date(strDate))
        .format(DATE_FORMAT)
        .toString();
    const time = moment(new Date(strDate)).format(TIME_FORMAT_DB) === DEFAULT_TIME
      ? '/'
      : moment(new Date(strDate))
        .format(TIME_FORMAT_DB)
        .toString();
    return date.concat(' ', time);
  }
  return null;
};

const mapPropsToFields = ({
  computedMatch: { params },
  eventmgmtData: { eventsData },
}) => {
  const { id } = params;
  const eventData = eventsData ? eventsData.find(item => item.id === id) : {};

  return {
    photoLink: Form.createFormField({ value: eventData.photoLink }),
    name: Form.createFormField({ value: eventData.name }),
    description: Form.createFormField({ value: eventData.description }),
    location: Form.createFormField({
      value: `${eventData.locationLine1} ${eventData.locationLine2}`,
    }),
    locationPostalCode: Form.createFormField({
      value: eventData.locationPostalCode,
    }),
    ticketFee: Form.createFormField({ value: eventData.ticketFee }),
    noOfPax: Form.createFormField({ value: eventData.noOfPax }),
    isRefreshmentProvided: Form.createFormField({
      value: eventData.isRefreshmentProvided === '1' ? 'Yes' : 'No',
    }),
    contactPerson: Form.createFormField({ value: eventData.contactPerson }),
    emailAddress: Form.createFormField({ value: eventData.emailAddress }),
    mobilePhone: Form.createFormField({ value: eventData.mobilePhone }),
    eventStatus: Form.createFormField({
      value: eventData.eventStatus === '1' ? 'Open' : 'Closed',
    }),
    startDate: Form.createFormField({
      value: formatDate(eventData.startDate),
    }),
    endDate: Form.createFormField({
      value: formatDate(eventData.endDate),
    }),
    createdBy: Form.createFormField({ value: eventData.createdBy }),
    createdDate: Form.createFormField({ value: eventData.createdDate }),
  };
};

const FormEventPagePage = Form.create({ mapPropsToFields })(EventPage);

export default connect(mapStateToProps)(FormEventPagePage);
