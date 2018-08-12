import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  Form, message, Row, Col, Spin, Modal,
} from 'antd';
import {
  SUCCESS_UPDATEEVENT,
  CONFIRM_DELETEEVENT,
  SHOWFOR,
} from '../../../actions/message';
import {
  DATE_FORMAT,
  TIME_FORMAT,
  DATETIME_FORMAT_DB,
  DATETIME_FORMAT,
  DEFAULT_DATE,
  DEFAULT_TIME,
  DEFAULT_DATETIME,
} from '../../../actions/constants';
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
  BackButton,
} from '../shared-components';
import {
  DeleteEventSwitch,
  EventStatusSwitch,
  SaveUpdateButton,
} from './components';
import { EventCard } from '../shared-styled';
import {
  getEventsData,
  postDeleteEvent,
  postUpdateEvent,
} from '../../../reducers/eventmgmt/eventmgmt-data';

const { confirm } = Modal;

class EventEdit extends Component {
  state = {
    fileList: [],
  };

  componentDidMount() {
    const { performGetEventsData } = this.props;
    performGetEventsData();
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
      message.error(postErrMsg, SHOWFOR);
    } else {
      message.success(SUCCESS_UPDATEEVENT, SHOWFOR);
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      form: { validateFieldsAndScroll, getFieldValue },
      computedMatch: {
        params: { id },
      },
      performUpdateEvent,
      performDeleteEvent,
    } = this.props;

    const { fileList } = this.state;

    // if user selects to delete event, it will be deleted without
    // updating the rest of the data even if the user changed anything else.
    if (getFieldValue('deleteEvent')) {
      confirm({
        title: CONFIRM_DELETEEVENT,
        onOk() {
          performDeleteEvent({ eventsToDelete: [id] });
        },
        // onCancel() {
        //   console.log('Cancel');
        // },
      });
    } else {
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

          performUpdateEvent({
            ...formValues,
            id,
            startDate,
            endDate,
            mobilePhone,
            eventStatus: formValues.eventStatus ? '1' : '0',
            uploadBtn: fileList,
          });
        }
      });
    }
  };

  beforeUpload = (file) => {
    // one file only
    if (file) {
      this.setState({ fileList: [file] });
    }
  };

  removeFile = (file) => {
    // one file only
    if (file) {
      this.setState({ fileList: [] });
    }
  };

  // convert string date to Date object and combine date and time.
  formatDateTime = (strDate, strTime) => {
    // to set the default date and time for end date/time
    const defaultDT = new Date(DEFAULT_DATETIME);
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
          <h2>Update Event Page</h2>
        </div>

        <Form onSubmit={this.onSubmit} style={{ marginTop: 50 }}>
          <EventCard style={{ borderRadius: 15, margin: '0 auto 0 auto' }}>
            <EventNameInput decorator={getFieldDecorator} />
            <EventDescriptionInput decorator={getFieldDecorator} />
            <StartDateTimePicker decorator={getFieldDecorator} />
            <EndDateTimePicker decorator={getFieldDecorator} />
            <AddressInput decorator={getFieldDecorator} />
            <PostalCodeInput decorator={getFieldDecorator} />
            <EventPhoto
              decorator={getFieldDecorator}
              beforeUpload={this.beforeUpload}
              removeFile={this.removeFile}
            />
          </EventCard>
          <EventCard style={{ borderRadius: 15, margin: '0 auto 0 auto' }}>
            <TicketFeeInput decorator={getFieldDecorator} />
            <NumPaxInput decorator={getFieldDecorator} />
            <RefreshmentRadio decorator={getFieldDecorator} />
          </EventCard>
          <EventCard style={{ borderRadius: 15, margin: '0 auto 0 auto' }}>
            <ContactPersonInput decorator={getFieldDecorator} />
            <EmailAddressInput decorator={getFieldDecorator} />
            <MobileNoInput decorator={getFieldDecorator} />
          </EventCard>
          <EventCard style={{ borderRadius: 15, margin: '0 auto 0 auto' }}>
            <EventStatusSwitch decorator={getFieldDecorator} />
            <DeleteEventSwitch decorator={getFieldDecorator} />
            <br />
            <Row gutter={8}>
              <Col {...actionColLayout}>
                <SaveUpdateButton />
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

EventEdit.propTypes = {
  computedMatch: PropTypes.shape({}).isRequired,
  form: PropTypes.shape({}).isRequired,

  performGetEventsData: PropTypes.func.isRequired,
  performUpdateEvent: PropTypes.func.isRequired,
  performDeleteEvent: PropTypes.func.isRequired,

  eventmgmtData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  eventmgmtData: state.eventmgmt.data,
});

const mapDispatchToProps = {
  performGetEventsData: getEventsData,
  performUpdateEvent: postUpdateEvent,
  performDeleteEvent: postDeleteEvent,
};

// convert string date to moment object for date/time picker
const formatDate = (strDate) => {
  if (strDate) {
    return moment(new Date(strDate)).format(DATE_FORMAT) === DEFAULT_DATE
      ? null
      : moment(strDate, DATETIME_FORMAT);
  }
  return null;
};

const formatTime = (strTime) => {
  if (strTime) {
    return moment(new Date(strTime)).format(TIME_FORMAT) === DEFAULT_TIME
      ? null
      : moment(strTime, DATETIME_FORMAT);
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
    uploadBtn: Form.createFormField({
      value: eventData.photoLink
        ? [{ uid: eventData.id, url: eventData.photoLink }]
        : [],
    }),
    name: Form.createFormField({ value: eventData.name }),
    description: Form.createFormField({ value: eventData.description }),
    locationLine1: Form.createFormField({ value: eventData.locationLine1 }),
    locationLine2: Form.createFormField({ value: eventData.locationLine2 }),
    locationPostalCode: Form.createFormField({
      value: eventData.locationPostalCode,
    }),
    ticketFee: Form.createFormField({ value: eventData.ticketFee }),
    noOfPax: Form.createFormField({ value: eventData.noOfPax }),
    isRefreshmentProvided: Form.createFormField({
      value: eventData.isRefreshmentProvided,
    }),
    contactPerson: Form.createFormField({ value: eventData.contactPerson }),
    emailAddress: Form.createFormField({ value: eventData.emailAddress }),
    areaCode: Form.createFormField({
      value: eventData.mobilePhone
        ? eventData.mobilePhone.substr(0, 2)
        : eventData.mobilePhone,
    }),
    mobilePhone: Form.createFormField({
      value: eventData.mobilePhone
        ? eventData.mobilePhone.substr(2)
        : eventData.mobilePhone,
    }),
    eventStatus: Form.createFormField({
      value: eventData.eventStatus === '1',
    }),
    startDate: Form.createFormField({
      value: formatDate(eventData.startDate),
    }),
    startTime: Form.createFormField({
      value: formatTime(eventData.startDate),
    }),
    endDate: Form.createFormField({
      value: formatDate(eventData.endDate),
    }),
    endTime: Form.createFormField({
      value: formatTime(eventData.endDate),
    }),
  };
};
const FormEventEditPage = Form.create({ mapPropsToFields })(EventEdit);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormEventEditPage);
