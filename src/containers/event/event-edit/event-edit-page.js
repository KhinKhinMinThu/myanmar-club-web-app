import React, { Component } from 'react';
import { withRouter } from 'react-router-dom/es';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  Form, Modal, Row, Col, Spin, Card, Tooltip, BackTop,
} from 'antd';
import {
  SUCCESS_UPDATEEVENT,
  CONFIRM_DELETEEVENT,
  CONFIRM_CLOSEEVENT,
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
import StartDateTimePicker from '../startDateTimePicker';
import EndDateTimePicker from '../endDateTimePicker';
import EventDescriptionInput from '../eventDescriptionInput';
import {
  DeleteEventSwitch,
  EventStatusSwitch,
  DirectPaymentSwitch,
  SaveUpdateButton,
} from './components';
import {
  getEventData,
  setEventData,
  postDeleteEvent,
  postUpdateEvent,
  postPendingClaims,
} from '../../../reducers/eventmgmt/eventmgmt-data';

class EventEdit extends Component {
  state = {
    fileList: [],
  };

  componentWillMount() {
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
      history,
      eventmgmtData: {
        isPostApiLoading, postErrMsg, hasClaims, eventData,
      },
      performUpdateEvent,
    } = this.props;

    const isApiPost = prevProps.eventmgmtData.isPostApiLoading && !isPostApiLoading;
    if (!isApiPost) return;

    if (postErrMsg) Modal.error({ title: 'Error!', content: postErrMsg });
    if (!postErrMsg && this.actionType === 'update') {
      Modal.success({
        title: 'Success!',
        content: SUCCESS_UPDATEEVENT,
        onOk() {
          history.go(-1);
        },
      });
    }
    if (!postErrMsg && this.actionType === 'close') {
      if (hasClaims === '1') {
        Modal.confirm({
          title: 'Confirmation!',
          content: CONFIRM_CLOSEEVENT,
          onOk() {
            performUpdateEvent(eventData);
          },
        });
      } else performUpdateEvent(eventData);
    }
    this.actionType = 'update';
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      form: { getFieldValue },
      computedMatch: {
        params: { id },
      },
      performDeleteEvent,
      performUpdateEvent,
      performPendingClaims,
    } = this.props;

    // if user selects to delete event, it will be deleted without
    // updating the rest of the data even if the user changed anything else.
    this.actionType = 'update';
    if (getFieldValue('deleteEvent')) {
      Modal.confirm({
        title: 'Confirmation!',
        content: CONFIRM_DELETEEVENT,
        onOk() {
          performDeleteEvent({ eventsToDelete: [id] });
        },
      });
    } else {
      const eventToUpdate = this.saveFormData();
      if (eventToUpdate) {
        if (eventToUpdate.eventStatus === '1') performUpdateEvent(eventToUpdate);
        else {
          this.actionType = 'close';
          performPendingClaims(id);
        }
      }
    }
  };

  saveFormData = () => {
    let eventToUpdate = null;
    const {
      form: { getFieldValue, validateFieldsAndScroll },
      computedMatch: {
        params: { id },
      },
      performEventData,
    } = this.props;
    const { fileList } = this.state;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        const formValues = values;
        const startDate = this.formatDateTime(
          formValues.startDate,
          formValues.startTime,
        );
        const endDate = this.formatDateTime(
          formValues.endDate ? formValues.endDate : formValues.startDate,
          formValues.endTime ? formValues.endTime : formValues.startTime,
        );
        const mobilePhone = formValues.mobilePhone
          ? formValues.areaCode + formValues.mobilePhone
          : formValues.mobilePhone;

        // remove time value from the object
        delete formValues.startTime;
        delete formValues.endTime;

        eventToUpdate = {
          ...formValues,
          id,
          startDate,
          endDate,
          mobilePhone,
          eventStatus: formValues.eventStatus ? '1' : '0',
          directPayment: formValues.directPayment ? '1' : '0',
          uploadBtn: fileList,
          photoLink: getFieldValue('photoLink'),
        };
        performEventData(eventToUpdate);
      }
    });
    return eventToUpdate;
  };

  checkClaims = (value) => {
    if (!value) {
      const {
        computedMatch: {
          params: { id },
        },
        performPendingClaims,
      } = this.props;
      const eventToUpdate = this.saveFormData();
      if (eventToUpdate) performPendingClaims(id);
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
    // unnecessary since end date will be the same as start date if left blank
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
      history,
      form: { getFieldDecorator, getFieldValue, setFields },
      eventmgmtData: { isPostApiLoading },
    } = this.props;
    const layout = {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 12 },
      xl: { span: 12 },
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
      <Spin spinning={isPostApiLoading} size="large" delay={1000}>
        <div className="pageHeaderContainer">
          <h2>Update Event Page</h2>
        </div>

        <Form onSubmit={this.onSubmit} style={{ marginTop: 50 }}>
          <Tooltip title="Click to go back to the top">
            <BackTop />
          </Tooltip>
          <Row gutter={8} justify="start">
            <Col span={24}>
              <Card style={{ borderRadius: 15, margin: '0 auto 8px auto' }}>
                <EventNameInput decorator={getFieldDecorator} />
                <EventDescriptionInput decorator={getFieldDecorator} />
                <EventPhoto
                  decorator={getFieldDecorator}
                  beforeUpload={this.beforeUpload}
                  removeFile={this.removeFile}
                />
              </Card>
            </Col>
          </Row>
          <Row gutter={8} justify="start">
            <Col {...layout}>
              <Card style={{ borderRadius: 15, margin: '0 auto 8px auto' }}>
                <StartDateTimePicker
                  decorator={getFieldDecorator}
                  getFieldValue={getFieldValue}
                  setFields={setFields}
                />
                <EndDateTimePicker
                  decorator={getFieldDecorator}
                  getFieldValue={getFieldValue}
                  setFields={setFields}
                />
                <AddressInput decorator={getFieldDecorator} />
                <PostalCodeInput decorator={getFieldDecorator} />
              </Card>
            </Col>
            <Col {...layout}>
              <Card style={{ borderRadius: 15, margin: '0 auto 8px auto' }}>
                <br />
                <br />
                <TicketFeeInput decorator={getFieldDecorator} />
                <NumPaxInput decorator={getFieldDecorator} />
                <RefreshmentRadio decorator={getFieldDecorator} />
                <br />
              </Card>
            </Col>
          </Row>
          <Row gutter={8} justify="start">
            <Col span={24}>
              <Card style={{ borderRadius: 15, margin: '0 auto 8px auto' }}>
                <ContactPersonInput decorator={getFieldDecorator} />
                <EmailAddressInput decorator={getFieldDecorator} />
                <MobileNoInput decorator={getFieldDecorator} />
              </Card>
              <Card style={{ borderRadius: 15, margin: '0 auto 8px auto' }}>
                <EventStatusSwitch decorator={getFieldDecorator} />
                <DirectPaymentSwitch decorator={getFieldDecorator} />
                <DeleteEventSwitch decorator={getFieldDecorator} />
                <br />
                <Row gutter={8}>
                  <Col {...actionColLayout}>
                    <SaveUpdateButton />
                  </Col>
                  <Col {...actionColLayout}>
                    <BackButton history={history} />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Form>
      </Spin>
    );
  }
}

EventEdit.propTypes = {
  computedMatch: PropTypes.shape({}).isRequired,
  form: PropTypes.shape({}).isRequired,

  performGetEventData: PropTypes.func.isRequired,
  performEventData: PropTypes.func.isRequired,
  performUpdateEvent: PropTypes.func.isRequired,
  performDeleteEvent: PropTypes.func.isRequired,
  performPendingClaims: PropTypes.func.isRequired,

  eventmgmtData: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  eventmgmtData: state.eventmgmt.data,
});

const mapDispatchToProps = {
  performGetEventData: getEventData,
  performEventData: setEventData,
  performUpdateEvent: postUpdateEvent,
  performDeleteEvent: postDeleteEvent,
  performPendingClaims: postPendingClaims,
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

const mapPropsToFields = ({ eventmgmtData: { eventData } }) => {
  const event = eventData || {};
  return {
    uploadBtn: Form.createFormField({
      value: event.photoLink
        ? [{ type: 'image/jpeg', uid: event.id, url: event.photoLink }]
        : [],
    }),
    photoLink: Form.createFormField({ value: event.photoLink }),
    name: Form.createFormField({ value: event.name }),
    description: Form.createFormField({ value: event.description }),
    locationLine1: Form.createFormField({ value: event.locationLine1 }),
    locationLine2: Form.createFormField({ value: event.locationLine2 }),
    locationPostalCode: Form.createFormField({
      value: event.locationPostalCode,
    }),
    ticketFee: Form.createFormField({ value: event.ticketFee }),
    noOfPax: Form.createFormField({ value: event.noOfPax }),
    isRefreshmentProvided: Form.createFormField({
      value: event.isRefreshmentProvided,
    }),
    contactPerson: Form.createFormField({ value: event.contactPerson }),
    emailAddress: Form.createFormField({ value: event.emailAddress }),
    areaCode: Form.createFormField({
      value: event.mobilePhone ? event.mobilePhone.substr(0, 2) : '65',
    }),
    mobilePhone: Form.createFormField({
      value: event.mobilePhone
        ? event.mobilePhone.substr(2)
        : event.mobilePhone,
    }),
    eventStatus: Form.createFormField({
      value: event.eventStatus === '1',
    }),
    directPayment: Form.createFormField({
      value: event.directPayment === '1',
    }),
    startDate: Form.createFormField({
      value: formatDate(event.startDate),
    }),
    startTime: Form.createFormField({
      value: formatTime(event.startDate),
    }),
    endDate: Form.createFormField({
      value: formatDate(event.endDate),
    }),
    endTime: Form.createFormField({
      value: formatTime(event.endDate),
    }),
  };
};
const FormEventEditPage = Form.create({ mapPropsToFields })(EventEdit);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(FormEventEditPage));
