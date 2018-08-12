import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'antd';
import PropTypes from 'prop-types';
import {
  MemberTypeText,
  StatusText,
  JoinDateText,
  ExpiryDateText,
  LastPaymentDateText,
  LastPaymentTypeText,
  MemberTypeRadio,
  PaymentTypeSelect,
  RenewButton,
  GoBackButton,
} from './components';
import { ButtonContainer } from './styled-components';
import { save } from '../../reducers/membermgmt/membermgmt-data';
import { startValidate, endValidate } from '../../reducers/membermgmt/membermgmt-ui';

class MemberRenewPage extends Component {
  onSubmit = (e) => {
    e.preventDefault();
    const {
      form: { validateFieldsAndScroll },
      dispatchEndValidate,
      dispatchSave,
    } = this.props;

    validateFieldsAndScroll((err, formValues) => {
      dispatchEndValidate();
      if (!err) {
        dispatchSave({ ...formValues });
      }
    });
  };

  render() {
    const {
      membermgmtData: {
        memberType,
        status,
        expiryDate,
        joinedDate,
        lastPaymentDate,
        lastPaymentType,
      },
      form: { getFieldDecorator },
      isValidating,
      dispatchStartValidate,
    } = this.props;

    return (
      <Form onSubmit={this.onSubmit}>
        <MemberTypeText value={memberType} />
        <StatusText value={status} />
        <JoinDateText value={joinedDate} />
        <ExpiryDateText value={expiryDate} />
        <LastPaymentDateText value={lastPaymentDate} />
        <LastPaymentTypeText value={lastPaymentType} />
        <MemberTypeRadio decorator={getFieldDecorator} />
        <PaymentTypeSelect decorator={getFieldDecorator} />

        <ButtonContainer>
          <RenewButton isValidating={isValidating} onClick={() => dispatchStartValidate(true)} />
          <GoBackButton onClick={() => console.log('clicked goback')} />
        </ButtonContainer>
      </Form>
    );
  }
}

MemberRenewPage.propTypes = {
  form: PropTypes.shape({
    validateFieldsAndScroll: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
    setFieldsValue: PropTypes.func.isRequired,
  }).isRequired,
  isValidating: PropTypes.bool.isRequired,
  dispatchStartValidate: PropTypes.func.isRequired,
  dispatchEndValidate: PropTypes.func.isRequired,
  dispatchSave: PropTypes.func.isRequired,
  membermgmtData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => {
  const {
    ui: { isValidating },
    data,
  } = state.membermgmt;
  return {
    isValidating,
    membermgmtData: data,
  };
};

const mapDispatchToProps = {
  dispatchStartValidate: startValidate,
  dispatchEndValidate: endValidate,
  dispatchSave: save,
};

const FormMemberRenewPage = Form.create()(MemberRenewPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormMemberRenewPage);
