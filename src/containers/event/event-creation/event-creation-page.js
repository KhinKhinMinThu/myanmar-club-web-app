import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  Form, message, Row, Col, Spin,
} from 'antd';
import { SUCCESS_NEWEVENT, SHOWFOR } from '../../../actions/message';
import { DATETIME_FORMAT_DB } from '../../../actions/constants';
import {
  EventNameInput,
  EventDescriptionInput,
  StartDateTimePicker,
  EndDateTimePicker,
  AddressInput,
  PostalCodeInput,
  EventPhoto,
  TicketFeeInput,
  NumPaxInput,
  RefreshmentRadio,
  ContactPersonInput,
  EmailAddressInput,
  MobileNoInput,
  CreateButton,
  BackButton,
} from '../shared-components';
import { EventCard } from '../shared-styled';
import { postNewEvent } from '../../../reducers/eventmgmt/eventmgmt-data';

class EventCreation extends Component {
  componentDidUpdate(prevProps) {
    const {
      eventmgmtData: { isPostApiLoading, postErrMsg },
    } = this.props;

    const isApiPost = prevProps.eventmgmtData.isPostApiLoading && !isPostApiLoading;
    if (!isApiPost) return;

    if (postErrMsg) {
      message.error(postErrMsg, SHOWFOR);
    } else {
      message.success(SUCCESS_NEWEVENT, SHOWFOR);
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      form: { validateFieldsAndScroll },
      performNewEvent,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        const formValues = values;
        const startDate = this.formatDateTime(
          formValues.startDate,
          formValues.startTime,
        );
        const endDate = this.formatDateTime(
          formValues.endDate,
          formValues.endTime,
        );
        const mobilePhone = formValues.mobilePhone
          ? formValues.areaCode + formValues.mobilePhone
          : formValues.mobilePhone;

        // remove time value from the object
        delete formValues.startTime;
        delete formValues.endTime;

        performNewEvent({
          ...formValues,
          startDate,
          endDate,
          mobilePhone,
          eventStatus: '1',
        });
      }
    });
  };

  // convert string date to Date object and combine date and time.
  formatDateTime = (strDate, strTime) => {
    // to set the default date and time for end date/time
    const defaultDT = new Date('01-01-1900 00:00');
    const date = strDate ? new Date(strDate) : defaultDT;
    const time = strTime ? new Date(strTime) : defaultDT;

    return moment(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes(),
        0,
      ),
    ).format(DATETIME_FORMAT_DB);
  };

  render() {
    const {
      form: { getFieldDecorator },
      eventmgmtData: { isPostApiLoading },
    } = this.props;
    const actionColLayout = {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 12 },
      xl: { span: 12 },
      style: { marginBottom: 14 },
    };

    return (
      <Spin spinning={isPostApiLoading} size="large">
        <div className="pageHeaderContainer">
          <h2>Add New Event Page</h2>
        </div>

        <Form onSubmit={this.onSubmit} style={{ marginTop: 50 }}>
          <EventCard>
            <EventNameInput decorator={getFieldDecorator} />
            <EventDescriptionInput decorator={getFieldDecorator} />
            <StartDateTimePicker decorator={getFieldDecorator} />
            <EndDateTimePicker decorator={getFieldDecorator} />
            <AddressInput decorator={getFieldDecorator} />
            <PostalCodeInput decorator={getFieldDecorator} />
            <EventPhoto decorator={getFieldDecorator} />
          </EventCard>
          <EventCard>
            <TicketFeeInput decorator={getFieldDecorator} />
            <NumPaxInput decorator={getFieldDecorator} />
            <RefreshmentRadio decorator={getFieldDecorator} />
          </EventCard>
          <EventCard>
            <ContactPersonInput decorator={getFieldDecorator} />
            <EmailAddressInput decorator={getFieldDecorator} />
            <MobileNoInput decorator={getFieldDecorator} />
            <br />
            <Row gutter={8}>
              <Col {...actionColLayout}>
                <CreateButton />
              </Col>
              <Col {...actionColLayout}>
                <BackButton />
              </Col>
            </Row>
          </EventCard>
        </Form>
      </Spin>
    );
  }
}

EventCreation.propTypes = {
  form: PropTypes.shape({
    validateFieldsAndScroll: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
    setFieldsValue: PropTypes.func.isRequired,
  }).isRequired,

  performNewEvent: PropTypes.func.isRequired,
  eventmgmtData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  eventmgmtData: state.eventmgmt.data,
});
const mapDispatchToProps = {
  performNewEvent: postNewEvent,
};

const FormEventCreation = Form.create()(EventCreation);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormEventCreation);
