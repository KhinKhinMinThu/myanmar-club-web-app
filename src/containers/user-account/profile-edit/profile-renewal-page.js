import React, { Component } from 'react';
import { withRouter } from 'react-router-dom/es';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form, Row, Col, Spin, Modal, Card, BackTop, Tooltip,
} from 'antd';
import {
  SUCCESS_RENEWMEMBER,
  CONFIRM_RENEWMEMBER,
  ERROR_PAYMENT,
  CANCEL_PAYMENT,
} from '../../../actions/message';
import {
  DEFAULT_DATE,
  DATE_FORMAT,
  DATETIME_FORMAT,
  MEMBERSHIP_FEES,
  MEMBERSHIP_TYPES,
} from '../../../actions/constants';
import {
  MembershipTypeReadOnly,
  MembershipStatusReadOnly,
  CreatedDate,
  MembershipExpiryDate,
  LastPaymentDate,
  LastPaymentType,
  MembershipTypeRadio,
} from '../../shared-profile-components/shared-components';
import {
  Payment,
  PaymentModal,
} from '../../shared-profile-components/payment';
import {
  SaveUpdateButton,
  BackButton,
  TotalAmountInput,
  feesTbl,
} from '../shared-components';
import {
  postUpdateMembershipMember,
  setMemberData,
} from '../../../reducers/membermgmt/membermgmt-data';

class MemberRenewal extends Component {
  state = {
    isModalVisible: false,
    showDirectPayment: false,
    paymentOption: 'Bank',
  };

  componentDidUpdate(prevProps) {
    const {
      membermgmtData: { isPostApiLoading, postErrMsg },
      membermgmtUI: { currentTab },
    } = this.props;
    if (currentTab !== 'tab2') return;

    const isApiPost = prevProps.membermgmtData.isPostApiLoading && !isPostApiLoading;
    if (!isApiPost) return;

    if (postErrMsg) {
      Modal.error({ title: 'Error!', content: postErrMsg });
    } else {
      Modal.success({ title: 'Success!', content: SUCCESS_RENEWMEMBER });
    }
  }

  onSuccess = (payment) => {
    const {
      form: { getFieldsValue },
      loginData: { id },
      performUpdateMembership,
    } = this.props;
    console.log('Successful payment!', payment);
    Modal.success({ title: 'Success!', content: SUCCESS_RENEWMEMBER });
    const formValues = getFieldsValue();
    const membershipType = MEMBERSHIP_TYPES[formValues.membershipType];
    const membershipToUpdate = {
      ...formValues,
      id,
      membershipType,
      totalAmount: formValues.totalAmount.toString(),
    };
    performUpdateMembership(membershipToUpdate);
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      form: { validateFieldsAndScroll, getFieldValue },
      loginData: { id },
      membermgmtData: { memberData },
      performUpdateMembership,
      dispatchMemberData,
    } = this.props;
    const paymentType = getFieldValue('paymentType');
    validateFieldsAndScroll((error, values) => {
      if (!error && paymentType === 'Direct Online Payment') {
        Modal.confirm({
          title: 'Confirmation!',
          content: CONFIRM_RENEWMEMBER,
          onOk: () => {
            this.setState({ isModalVisible: true });
          },
        });
      }
      if (!error && paymentType !== 'Direct Online Payment') {
        const formValues = values;
        const membershipType = MEMBERSHIP_TYPES[formValues.membershipType];
        const membershipToUpdate = {
          ...formValues,
          id,
          membershipType,
          lastPaymentType: formValues.paymentType,
          lastPaymentDate: moment(new Date()).format(DATETIME_FORMAT),
          totalAmount: formValues.totalAmount.toString(),
          membershipStatus: 'Requested',
        };
        Modal.confirm({
          title: 'Confirmation!',
          content: CONFIRM_RENEWMEMBER,
          onOk() {
            dispatchMemberData({ ...memberData, ...membershipToUpdate });
            performUpdateMembership(membershipToUpdate);
          },
        });
      }
    });
  };

  onChange = (e) => {
    const { value } = e.target;
    const {
      form: { setFieldsValue },
    } = this.props;
    setFieldsValue({ totalAmount: MEMBERSHIP_FEES[value], totalAmt: MEMBERSHIP_FEES[value] });
  };

  onCloseModal = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  onSelect = (e) => {
    const { showDirectPayment, paymentOption } = this.state;
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

  render() {
    const {
      history,
      form: { getFieldDecorator, getFieldValue },
      membermgmtData: { isPostApiLoading },
    } = this.props;
    const {
      showDirectPayment, paymentOption, isModalVisible,
    } = this.state;
    let membership = MEMBERSHIP_TYPES[getFieldValue('membershipType')];
    if (membership === undefined) {
      membership = MEMBERSHIP_TYPES.TYP1;
    }
    const onError = (error) => {
      console.log('Erroneous payment OR failed to load script!', error);
      Modal.error({ title: 'Error!', content: ERROR_PAYMENT });
    };
    const onCancel = (data) => {
      console.log('Cancelled payment!', data);
      Modal.warning({ title: 'Payment Cancellation!', content: CANCEL_PAYMENT });
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
        <Form onSubmit={this.onSubmit}>
          <Tooltip title="Click to go back to the top">
            <BackTop />
          </Tooltip>
          <Card style={{ borderRadius: 15, margin: '0 auto 8px auto' }}>
            <Row gutter={8} type="flex" justify="center">
              <Col span={12}>{feesTbl}</Col>
            </Row>
          </Card>
          <Row gutter={8} justify="start">
            <Col span={24}>
              <Card style={{ borderRadius: 15, margin: '0 auto 8px auto' }}>
                <MembershipTypeReadOnly decorator={getFieldDecorator} />
                <MembershipStatusReadOnly decorator={getFieldDecorator} />
                <CreatedDate decorator={getFieldDecorator} />
                <MembershipExpiryDate decorator={getFieldDecorator} />
                <LastPaymentDate decorator={getFieldDecorator} />
                <LastPaymentType decorator={getFieldDecorator} />
              </Card>
            </Col>
            <Col span={24}>
              <Card style={{ borderRadius: 15, margin: '0 auto 8px auto' }}>
                <MembershipTypeRadio
                  decorator={getFieldDecorator}
                  onChange={this.onChange}
                />
                <Payment
                  decorator={getFieldDecorator}
                  showDirectPayment={showDirectPayment}
                  paymentOption={paymentOption}
                  onSelect={this.onSelect}
                />
                <PaymentModal
                  isModalVisible={isModalVisible}
                  onCloseModal={this.onCloseModal}
                  decorator={getFieldDecorator}
                  onSuccess={this.onSuccess}
                  onError={onError}
                  onCancel={onCancel}
                  total={getFieldValue('totalAmount')}
                  membership={membership}
                />
                <TotalAmountInput decorator={getFieldDecorator} />
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

MemberRenewal.propTypes = {
  history: PropTypes.shape({}).isRequired,
  computedMatch: PropTypes.shape({}).isRequired,
  form: PropTypes.shape({}).isRequired,

  performUpdateMembership: PropTypes.func.isRequired,
  dispatchMemberData: PropTypes.func.isRequired,

  membermgmtUI: PropTypes.shape({}).isRequired,
  membermgmtData: PropTypes.shape({}).isRequired,
  loginData: PropTypes.shape({}).isRequired,
};
const mapStateToProps = state => ({
  membermgmtUI: state.membermgmt.ui,
  membermgmtData: state.membermgmt.data,
  loginData: state.login.data,
});

const mapDispatchToProps = {
  performUpdateMembership: postUpdateMembershipMember,
  dispatchMemberData: setMemberData,
};

const mapPropsToFields = ({ membermgmtData: { memberData } }) => {
  const member = memberData || {};
  // return the fields
  return {
    membershipTypeReadOnly: Form.createFormField({
      value: member.membershipType
        ? member.membershipType.substr(member.membershipType.indexOf(':') + 1)
        : '-',
    }),
    membershipStatus: Form.createFormField({ value: member.membershipStatus }),
    createdDate: Form.createFormField({
      value: member.createdDate ? member.createdDate : '-',
    }),
    membershipExpiryDate: Form.createFormField({
      value:
        moment(member.membershipExpiryDate).format(DATE_FORMAT) === DEFAULT_DATE
          ? '-'
          : member.membershipExpiryDate,
    }),
    lastPaymentDate: Form.createFormField({
      value: member.lastPaymentDate ? member.lastPaymentDate : '-',
    }),
    lastPaymentType: Form.createFormField({
      value: member.lastPaymentType ? member.lastPaymentType : '-',
    }),
  };
};

const FormMemberRenewalPage = Form.create({ mapPropsToFields })(MemberRenewal);
// const FormMemberEditPage = Form.create()(MemberEdit);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(FormMemberRenewalPage));
