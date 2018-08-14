import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { Form, message, Card } from 'antd';

import { SUCCESS_NOTIFYEVENT, SHOWFOR } from '../../../actions/message';
import {
  TIME_FORMAT_DB,
  DATE_FORMAT,
  DEFAULT_DATE,
  DEFAULT_TIME,
  BASE_URL,
} from '../../../actions/constants';
import { PUBLIC_EVENT_VIEW } from '../../../actions/location';
import {
  EventData,
  NameOnCardInput,
  CardNumInput,
  CardExpiryPicker,
  CardSecurityCodeInput,
  PaymentButton,
  PaymentTypeRadio,
} from './components';
import { EventCard, EventCardSmall } from '../shared-styled';
import { BackButton } from '../shared-components';
import { postNotifyEvent } from '../../../reducers/eventmgmt/eventmgmt-data';

const { FormItem } = Form.Item;
class EventPage extends Component {
  state = { showDirectPayment: true };

  componentDidUpdate(prevProps) {
    const {
      eventmgmtData: { isPostApiLoading, postErrMsg },
    } = this.props;

    const isApiPost = prevProps.eventmgmtData.isPostApiLoading && !isPostApiLoading;
    if (!isApiPost) return;

    if (postErrMsg) {
      message.error(postErrMsg, SHOWFOR);
    } else {
      message.success(SUCCESS_NOTIFYEVENT, SHOWFOR);
    }
  }

  onClickNotify = () => {
    const {
      form: { getFieldValue },
      performNotifyEvent,
    } = this.props;
    const id = getFieldValue('id');
    const url = BASE_URL.concat(PUBLIC_EVENT_VIEW, '/', id);
    performNotifyEvent({ id, url });
  };

  toggleDirectPayment = (e) => {
    // console.log('toggleDirectPayment');
    const { showDirectPayment } = this.state;
    const { form } = this.props;

    if (e.target.value === 'DP' && !showDirectPayment) {
      this.setState({ showDirectPayment: true });
      // unhide and reset the fields with validator
      form.getFieldDecorator('cardNumInput', { hidden: false });
      form.getFieldDecorator('cardSecInput', { hidden: false });
      form.resetFields(['cardNumInput', 'cardSecInput']);
    }
    if (e.target.value !== 'DP' && showDirectPayment) {
      this.setState({ showDirectPayment: false });
      // hide the fields with validator
      form.getFieldDecorator('cardNumInput', { hidden: true });
      form.getFieldDecorator('cardSecInput', { hidden: true });
    }
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { showDirectPayment } = this.state;

    let creditCardForm = null;
    if (showDirectPayment) {
      creditCardForm = (
        <FormItem label=" " colon={false}>
          <Card>
            <NameOnCardInput decorator={getFieldDecorator} />
            <CardNumInput decorator={getFieldDecorator} />
            <CardExpiryPicker decorator={getFieldDecorator} />
            <CardSecurityCodeInput decorator={getFieldDecorator} />
            <PaymentButton onClick={this.handleCreditCardForm} />
          </Card>
        </FormItem>
      );
    }
    return (
      <div>
        <EventCard style={{ borderRadius: 15, margin: '0 auto 0 auto' }}>
          <EventData decorator={getFieldDecorator} />
          <br />
          <EventCardSmall title="Event Registration">
            {creditCardForm}
            <PaymentTypeRadio
              decorator={getFieldDecorator}
              changed={this.toggleDirectPayment}
            />
            <BackButton />
          </EventCardSmall>
        </EventCard>
      </div>
    );
  }
}

EventPage.propTypes = {
  form: PropTypes.shape({}).isRequired,
  performNotifyEvent: PropTypes.func.isRequired,
  eventmgmtData: PropTypes.shape({}).isRequired,
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
    startDate: Form.createFormField({
      value: formatDate(eventData.startDate),
    }),
    endDate: Form.createFormField({
      value: formatDate(eventData.endDate),
    }),
  };
};

const mapDispatchToProps = {
  performNotifyEvent: postNotifyEvent,
};

const FormEventPagePage = Form.create({ mapPropsToFields })(EventPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormEventPagePage);
