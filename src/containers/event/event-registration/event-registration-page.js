import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { Form, message, Card } from 'antd';
import { SUCCESS_NEWEVENTRSVP, SHOWFOR } from '../../../actions/message';
import {
  TIME_FORMAT_DB,
  DATE_FORMAT,
  DEFAULT_DATE,
  DEFAULT_TIME,
} from '../../../actions/constants';
import {
  EventData,
  NameInput,
  EmailAddressInput,
  MobileNoInput,
  TicketNumInput,
  Payment,
  EventRegisterButton,
} from './components';
import { EventCard } from '../shared-styled';
import {
  getEventsData,
  postNewRSVP,
} from '../../../reducers/eventmgmt/eventmgmt-data';

class EventRegistration extends Component {
  componentDidMount() {
    const { performGetEventsData } = this.props;
    performGetEventsData();
  }

  componentDidUpdate(prevProps) {
    const {
      eventmgmtData: { isPostApiLoading, postErrMsg },
    } = this.props;

    const isApiPost = prevProps.eventmgmtData.isPostApiLoading && !isPostApiLoading;
    if (!isApiPost) return;

    if (postErrMsg) {
      message.error(postErrMsg, SHOWFOR);
    } else {
      message.success(SUCCESS_NEWEVENTRSVP, SHOWFOR);
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      form: { validateFieldsAndScroll },
      performNewRSVP,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      console.log('form values', values);
      if (!error) {
        const formValues = values;
        const memberMobilePhone = formValues.memberMobilePhone
          ? formValues.memberAreaCode + formValues.memberMobilePhone
          : formValues.memberMobilePhone;
        performNewRSVP({
          ...formValues,
          memberMobilePhone,
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div>
        <EventCard style={{ borderRadius: 15, margin: '0 auto 0 auto' }}>
          <EventData decorator={getFieldDecorator} />
          <br />
          <Form onSubmit={this.onSubmit}>
            <Card type="inner" title="Event Registration">
              <NameInput decorator={getFieldDecorator} />
              <EmailAddressInput decorator={getFieldDecorator} />
              <MobileNoInput decorator={getFieldDecorator} />
              <TicketNumInput decorator={getFieldDecorator} />
              <Payment decorator={getFieldDecorator} />
              <br />
              <EventRegisterButton />
            </Card>
          </Form>
        </EventCard>
      </div>
    );
  }
}

EventRegistration.propTypes = {
  form: PropTypes.shape({}).isRequired,
  performGetEventsData: PropTypes.func.isRequired,
  eventmgmtData: PropTypes.shape({}).isRequired,
  performNewRSVP: PropTypes.func.isRequired,
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
  // computedMatch: { params },
  eventmgmtData: { eventsData },
}) => {
  // const { id } = params;
  const eventData = eventsData ? eventsData.find(item => item.id === '2') : {};
  console.log('event data', eventData);
  return {
    id: Form.createFormField({ value: eventData.id }),
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
    startDate: Form.createFormField({
      value: formatDate(eventData.startDate),
    }),
    endDate: Form.createFormField({
      value: formatDate(eventData.endDate),
    }),
  };
};

const mapDispatchToProps = {
  performGetEventsData: getEventsData,
  performNewRSVP: postNewRSVP,
};

const FormEventRegistrationPage = Form.create({ mapPropsToFields })(
  EventRegistration,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormEventRegistrationPage);
