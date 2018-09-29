import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  Form, Modal, Card, Spin, Alert,
} from 'antd';
import { SUCCESS_NEWEVENTRSVP } from '../../../actions/message';
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
import {
  getEventData,
  postNewRSVP,
} from '../../../reducers/eventmgmt/eventmgmt-data';

class EventRegistration extends Component {
  componentDidMount() {
    const {
      computedMatch: {
        params: { id },
      },
      performGetEventData,
    } = this.props;
    if (id) performGetEventData({ id });
  }

  componentWillUpdate(nextProps) {
    const {
      eventmgmtData: { isGetApiLoading },
    } = this.props;
    this.isApiCalled = !nextProps.eventmgmtData.isGetApiLoading && isGetApiLoading;
  }

  componentDidUpdate(prevProps) {
    const {
      eventmgmtData: { isPostApiLoading, postErrMsg },
    } = this.props;

    const isApiPost = prevProps.eventmgmtData.isPostApiLoading && !isPostApiLoading;
    if (!isApiPost) return;

    if (postErrMsg) {
      Modal.error({ title: 'Error!', content: postErrMsg });
    } else {
      Modal.success({ title: 'Success!', content: SUCCESS_NEWEVENTRSVP });
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
      eventmgmtData: { isGetApiLoading, getErrMsg },
    } = this.props;
    return (
      <Spin spinning={isGetApiLoading} size="large" delay={1000}>
        {this.isApiCalled && getErrMsg ? (
          <Alert
            message="Error"
            description={getErrMsg}
            type="error"
            showIcon
          />
        ) : (
          <div>
            <Card style={{ borderRadius: 15, margin: '0 auto 8px auto' }}>
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
            </Card>
          </div>
        )}
      </Spin>
    );
  }
}

EventRegistration.propTypes = {
  form: PropTypes.shape({}).isRequired,
  computedMatch: PropTypes.shape({}).isRequired,
  performGetEventData: PropTypes.func.isRequired,
  performNewRSVP: PropTypes.func.isRequired,

  eventmgmtData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  eventmgmtData: state.eventmgmt.data,
});

const mapDispatchToProps = {
  performGetEventData: getEventData,
  performNewRSVP: postNewRSVP,
};

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

const mapPropsToFields = ({ eventmgmtData: { eventData } }) => {
  const event = eventData || {};
  // const eventData = eventsData ? eventsData.find(item => item.id === '2') : {};
  console.log('event data', eventData);
  return {
    id: Form.createFormField({ value: event.id }),
    photoLink: Form.createFormField({ value: event.photoLink }),
    name: Form.createFormField({ value: event.name }),
    description: Form.createFormField({ value: event.description }),
    location: Form.createFormField({
      value: `${event.locationLine1} ${event.locationLine2}`,
    }),
    locationPostalCode: Form.createFormField({
      value: event.locationPostalCode,
    }),
    ticketFee: Form.createFormField({ value: event.ticketFee }),
    noOfPax: Form.createFormField({ value: event.noOfPax }),
    isRefreshmentProvided: Form.createFormField({
      value: event.isRefreshmentProvided === '1' ? 'Yes' : 'No',
    }),
    contactPerson: Form.createFormField({ value: event.contactPerson }),
    emailAddress: Form.createFormField({ value: event.emailAddress }),
    mobilePhone: Form.createFormField({ value: event.mobilePhone }),
    startDate: Form.createFormField({
      value: formatDate(event.startDate),
    }),
    endDate: Form.createFormField({
      value: formatDate(event.endDate),
    }),
  };
};

const FormEventRegistrationPage = Form.create({ mapPropsToFields })(
  EventRegistration,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormEventRegistrationPage);
