import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form, Row, Col, Card, Modal,
} from 'antd';
import FormStepAction from './form-step-action';
import { MEMBERSHIP_FEES, MEMBERSHIP_TYPES } from '../../../actions/constants';
import { CONFIRM_CREATEACC } from '../../../actions/message';
import { MembershipTypeRadio } from '../../shared-profile-components/shared-components';
import {
  PaymentTypeRadio,
  TotalAmountInput,
  feesTbl,
} from '../shared-components';
import { next } from '../../../reducers/membermgmt/membermgmt-ui';
import { setMemberData } from '../../../reducers/membermgmt/membermgmt-data';

const { confirm } = Modal;

class Page2 extends Component {
  componentDidUpdate(prevProps) {
    const {
      membermgmtUI: { isValidating, currentStep },
    } = this.props;
    if (currentStep !== 2) return;
    console.log(
      ' PREV:',
      prevProps.membermgmtUI.isValidating,
      'CURR:',
      isValidating,
    );
    console.log(
      ' PREV:',
      prevProps.membermgmtUI.currentStep,
      'CURR:',
      currentStep,
    );
    // const isPropChange = isValidating !== prevProps.membermgmtUI.isValidating;
    const isPropChange = isValidating && !prevProps.membermgmtUI.isValidating;

    if (!isValidating || !isPropChange) return;
    this.validatePage();
  }

  onChange = (e) => {
    const { value } = e.target;
    const {
      form: { setFieldsValue },
    } = this.props;
    setFieldsValue({ totalAmount: MEMBERSHIP_FEES[value] });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      form: { validateFieldsAndScroll },
      membermgmtData: { memberData },
      dispatchMemberData,
      dispatchNext,
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        const formValues = values;
        const membershipType = MEMBERSHIP_TYPES[formValues.membershipType];
        const memberToAdd = {
          ...memberData,
          ...formValues,
          membershipType,
          totalAmount: formValues.totalAmount.toString(),
        };
        dispatchMemberData(memberToAdd);
        confirm({
          title: CONFIRM_CREATEACC,
          onOk() {
            // perform backend post
            // dispatchMemberData(memberToAdd);
            dispatchNext();
          },
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.onSubmit}>
        <Card style={{ borderRadius: 15, margin: '0 auto 8px auto' }}>
          <Row gutter={8} type="flex" justify="center">
            <Col span={12}>{feesTbl}</Col>
          </Row>
        </Card>
        <Row gutter={8} justify="start">
          <Col span={24}>
            <Card style={{ borderRadius: 15, margin: '0 auto 8px auto' }}>
              <MembershipTypeRadio
                decorator={getFieldDecorator}
                onChange={this.onChange}
              />
              <PaymentTypeRadio decorator={getFieldDecorator} />
              <TotalAmountInput decorator={getFieldDecorator} />
            </Card>
          </Col>
        </Row>
        <FormStepAction />
      </Form>
    );
  }
}

Page2.propTypes = {
  form: PropTypes.shape({}).isRequired,
  dispatchMemberData: PropTypes.func.isRequired,
  dispatchNext: PropTypes.func.isRequired,

  membermgmtUI: PropTypes.shape({}).isRequired,
  membermgmtData: PropTypes.shape({}).isRequired,
};
const mapStateToProps = state => ({
  membermgmtUI: state.membermgmt.ui,
  membermgmtData: state.membermgmt.data,
});

const mapDispatchToProps = {
  dispatchMemberData: setMemberData,
  dispatchNext: next,
};

const FormPage2 = Form.create()(Page2);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormPage2);
