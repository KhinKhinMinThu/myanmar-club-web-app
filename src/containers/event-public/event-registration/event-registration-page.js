import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  Form,
  Card,
  Spin,
  Alert,
  BackTop,
  Tooltip,
  Row,
  Col,
  Modal,
} from 'antd';
import {
  SUCCESS_NEWEVENTRSVP,
  SUCCESS_PAYMENT,
  ERROR_PAYMENT,
  CANCEL_PAYMENT,
} from '../../../actions/message';
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
  PaymentModal,
} from './components';
import {
  getEventData,
  postNewRSVP,
} from '../../../reducers/eventmgmt/eventmgmt-data';

class EventRegistration extends Component {
  state = {
    total: 0.01,
    isModalVisible: false,
    showDirectPayment: false,
    paymentOption: 'Bank',
  };

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
    const { showDirectPayment } = this.state;
    const isApiPost = prevProps.eventmgmtData.isPostApiLoading && !isPostApiLoading;
    if (!isApiPost) return;

    if (postErrMsg) {
      Modal.error({ title: 'Error!', content: postErrMsg });
    } else if (showDirectPayment) {
      Modal.success({ title: 'Success!', content: SUCCESS_NEWEVENTRSVP });
    } else {
      Modal.success({ title: 'Success!', content: SUCCESS_PAYMENT });
    }
  }

  onCloseModal = () => {
    const {
      form: { setFieldsValue, getFieldValue },
    } = this.props;
    // console.log('toggleDirectPayment', showDirectPayment);
    const ticketNum = getFieldValue('memberNoOfPax');
    const ticketPrice = getFieldValue('ticketFee');
    let totalAmt = ticketNum * ticketPrice;
    if (ticketNum === undefined) {
      totalAmt = 0;
    }
    this.setState({ total: totalAmt });
    setFieldsValue({ totalAmount: totalAmt, ticketNum, ticketPrice });
    this.setState({
      isModalVisible: false,
    });
  };

  onChange = (event) => {
    const {
      form: { setFieldsValue, getFieldValue },
    } = this.props;
    // console.log('num', total);
    const tixNum = event.target.value;
    if (!Number.isNaN(Number(tixNum))) {
      const totalAmt = tixNum * getFieldValue('ticketFee');
      this.setState({ total: totalAmt });
      setFieldsValue({
        totalAmount: totalAmt,
        ticketNum: tixNum,
        ticketPrice: getFieldValue('ticketFee'),
      });
    }
  };

  onSelect = (e) => {
    const {
      form: { setFieldsValue, getFieldValue },
    } = this.props;
    const { showDirectPayment, paymentOption } = this.state;
    const ticketNum = getFieldValue('memberNoOfPax');
    const ticketPrice = getFieldValue('ticketFee');
    let totalAmt = ticketNum * ticketPrice;
    if (ticketNum === undefined) {
      totalAmt = 0;
    }
    this.setState({ total: totalAmt });
    setFieldsValue({ totalAmount: totalAmt, ticketNum, ticketPrice });
    if (e.target.value === 'Direct Online Payment' && !showDirectPayment) {
      this.setState({ showDirectPayment: true });
      // unhide and reset the fields with validator
    }
    if (e.target.value !== 'Direct Online Payment') {
      this.setState({ showDirectPayment: false });
      if (e.target.value === 'Bank Transfer') {
        this.setState({ paymentOption: 'Bank' });
      } else {
        this.setState({ paymentOption: 'Cash' });
      }
      console.log('payment Type', paymentOption);
      // hide the fields with validator
    }
  };

  onSuccess = (payment) => {
    const {
      form: { getFieldsValue },
      performNewRSVP,
    } = this.props;
    console.log('Successful payment!', payment);
    this.setState({ isModalVisible: false });
    const formValues = getFieldsValue();
    const memberMobilePhone = formValues.memberMobilePhone
      ? formValues.memberAreaCode + formValues.memberMobilePhone
      : formValues.memberMobilePhone;
    performNewRSVP({
      ...formValues,
      memberMobilePhone,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      form: { validateFieldsAndScroll, getFieldValue, setFieldsValue },
      performNewRSVP,
    } = this.props;
    const paymentType = getFieldValue('paymentType');
    validateFieldsAndScroll((error, values) => {
      console.log('form values', values);
      if (!error && paymentType === 'Direct Online Payment') {
        // console.log('toggleDirectPayment', showDirectPayment);
        const ticketNum = getFieldValue('memberNoOfPax');
        const ticketPrice = getFieldValue('ticketFee');
        const totalAmt = ticketNum * ticketPrice;
        this.setState({ total: totalAmt });
        setFieldsValue({ totalAmount: totalAmt, ticketNum, ticketPrice });
        this.setState({
          isModalVisible: true,
        });
      }
      if (!error && paymentType !== 'Direct Online Payment') {
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
    const {
      total,
      isModalVisible,
      showDirectPayment,
      paymentOption,
    } = this.state;
    console.log('total', total);
    const onError = (error) => {
      console.log('Erroneous payment OR failed to load script!', error);
      Modal.error({ title: 'Error!', content: ERROR_PAYMENT });
    };

    const onCancel = (data) => {
      console.log('Cancelled payment!', data);
      Modal.warning({
        title: 'Payment Cancellation!',
        content: CANCEL_PAYMENT,
      });
    };

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
            <h2>Event Registeration</h2>
            <Form onSubmit={this.onSubmit}>
              <Row gutter={8}>
                <Col span={10}>
                  <Card
                    style={{
                      borderRadius: 15,
                      margin: '0 auto 8px auto',
                    }}
                  >
                    <EventData decorator={getFieldDecorator} />
                    <Tooltip title="Click to go back to the top">
                      <BackTop />
                    </Tooltip>
                  </Card>
                </Col>
                <Col span={14}>
                  <Card
                    title="Register for event"
                    style={{ borderRadius: 15, margin: '0 auto 8px auto' }}
                  >
                    <NameInput decorator={getFieldDecorator} />
                    <EmailAddressInput decorator={getFieldDecorator} />
                    <MobileNoInput decorator={getFieldDecorator} />
                    <TicketNumInput
                      decorator={getFieldDecorator}
                      onChange={this.onChange}
                    />
                    <Payment
                      decorator={getFieldDecorator}
                      showDirectPayment={showDirectPayment}
                      paymentOption={paymentOption}
                      onSelect={this.onSelect}
                    />
                    <br />
                    <EventRegisterButton />
                    <PaymentModal
                      isModalVisible={isModalVisible}
                      onCloseModal={this.onCloseModal}
                      decorator={getFieldDecorator}
                      onSuccess={this.onSuccess}
                      onError={onError}
                      onCancel={onCancel}
                      total={total}
                    />
                  </Card>
                </Col>
              </Row>
            </Form>
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
  // const eventDataFilter = eventData ? eventData.find(item => moment(item.endDate).isBefore(now)) : {};
  const event = eventData || {};
  // console.log('event data', eventData);
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
    ticketPrice: Form.createFormField({ value: event.ticketFee }),
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
