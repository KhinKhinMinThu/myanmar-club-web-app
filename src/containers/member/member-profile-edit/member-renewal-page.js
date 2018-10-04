import React, { Component } from 'react';
import { withRouter } from 'react-router-dom/es';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form, Row, Col, Spin, Modal, Card, Tooltip, BackTop,
} from 'antd';
import {
  SUCCESS_RENEWMEMBER,
  CONFIRM_RENEWMEMBER,
} from '../../../actions/message';
import {
  DEFAULT_DATE,
  DEFAULT_DATETIME,
  DATETIME_FORMAT_DB,
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
  SaveUpdateButton,
  BackButton,
  PaymentTypeRadio,
  TotalAmountInput,
} from './components';
import {
  getMemberData,
  postUpdateMembershipAdmin,
  setMemberData,
} from '../../../reducers/membermgmt/membermgmt-data';

class MemberRenewal extends Component {
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

  onSubmit = (e) => {
    e.preventDefault();
    const {
      form: { validateFieldsAndScroll },
      membermgmtData: { memberData },
      computedMatch: {
        params: { id },
      },
      dispatchMemberData,
      performUpdateMembership,
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        const formValues = values;
        const membershipType = MEMBERSHIP_TYPES[formValues.membershipType];
        const membershipExpiryDate = this.getExipryDate(
          formValues.membershipType,
          formValues.membershipExpiryDate,
        );
        // console.log('membershipExpiryDate', membershipExpiryDate);

        const membershipToUpdate = {
          ...formValues,
          id,
          membershipType,
          lastPaymentType: formValues.paymentType,
          lastPaymentDate: moment(new Date()).format(DATETIME_FORMAT),
          totalAmount: formValues.totalAmount.toString(),
          membershipStatus: 'Active',
          membershipExpiryDate,
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
    setFieldsValue({ totalAmount: MEMBERSHIP_FEES[value] });
  };

  getExipryDate = (type, expiryDate) => {
    // expiryDate is from form field, '-' or date string
    let newExDate;
    const currentExDate = expiryDate === '-' ? moment(new Date()) : moment(new Date(expiryDate));
    if (type === 'TYP2' || type === 'TYP3' || type === 'TYP4') {
      newExDate = currentExDate.add(12, 'M');
    } else if (type === 'TYP5') {
      newExDate = currentExDate.add(6, 'M');
    } else {
      newExDate = moment(new Date(DEFAULT_DATETIME));
    }
    return newExDate.format(DATETIME_FORMAT_DB);
  };

  render() {
    const {
      history,
      form: { getFieldDecorator },
      membermgmtData: { isPostApiLoading },
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
      <Spin spinning={isPostApiLoading} size="large" delay={1000}>
        <Form onSubmit={this.onSubmit}>
          <Tooltip title="Click to go back to the top">
            <BackTop />
          </Tooltip>
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
                <PaymentTypeRadio decorator={getFieldDecorator} />
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
  performGetMemberData: PropTypes.func.isRequired,
  dispatchMemberData: PropTypes.func.isRequired,

  membermgmtUI: PropTypes.shape({}).isRequired,
  membermgmtData: PropTypes.shape({}).isRequired,
};
const mapStateToProps = state => ({
  membermgmtUI: state.membermgmt.ui,
  membermgmtData: state.membermgmt.data,
});

const mapDispatchToProps = {
  performUpdateMembership: postUpdateMembershipAdmin,
  performGetMemberData: getMemberData,
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
