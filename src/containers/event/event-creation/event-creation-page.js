import React, { Component } from 'react';
import { withRouter } from 'react-router-dom/es';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  Form, Modal, Row, Col, Spin, Card, Tooltip, BackTop,
} from 'antd';
import { SUCCESS_NEWEVENT } from '../../../actions/message';
import {
  DATETIME_FORMAT_DB,
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
  CreateButton,
  BackButton,
  DirectPaymentSwitch,
} from '../shared-components';
import StartDateTimePicker from '../startDateTimePicker';
import EndDateTimePicker from '../endDateTimePicker';
import EventDescriptionInput from '../eventDescriptionInput';
import { postNewEvent } from '../../../reducers/eventmgmt/eventmgmt-data';

class EventCreation extends Component {
  state = {
    fileList: [],
  };

  componentDidUpdate(prevProps) {
    const {
      history,
      eventmgmtData: { isPostApiLoading, postErrMsg },
    } = this.props;

    const isApiPost = prevProps.eventmgmtData.isPostApiLoading && !isPostApiLoading;
    if (!isApiPost) return;

    if (postErrMsg) {
      Modal.error({ title: 'Error!', content: postErrMsg });
    } else {
      Modal.success({ title: 'Success!', content: SUCCESS_NEWEVENT });
      history.go(-1);
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      form: { validateFieldsAndScroll },
      performNewEvent,
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

        performNewEvent({
          ...formValues,
          startDate,
          endDate,
          mobilePhone,
          directPayment: formValues.directPayment ? '1' : '0',
          eventStatus: '1',
          uploadBtn: fileList,
        });
      }
    });
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
          <h2>Add New Event Page</h2>
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
                <TicketFeeInput decorator={getFieldDecorator} />
                <NumPaxInput decorator={getFieldDecorator} />
                <RefreshmentRadio decorator={getFieldDecorator} />
                <DirectPaymentSwitch decorator={getFieldDecorator} />
              </Card>
            </Col>
          </Row>
          <Row gutter={8} justify="start">
            <Col span={24}>
              <Card style={{ borderRadius: 15, margin: '0 auto 8px auto' }}>
                <ContactPersonInput decorator={getFieldDecorator} />
                <EmailAddressInput decorator={getFieldDecorator} />
                <MobileNoInput decorator={getFieldDecorator} />
                <br />
                <Row gutter={8}>
                  <Col {...actionColLayout}>
                    <CreateButton />
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

EventCreation.propTypes = {
  history: PropTypes.shape({}).isRequired,
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
)(withRouter(FormEventCreation));
