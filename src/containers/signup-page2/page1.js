import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'antd';
import PropTypes from 'prop-types';
import {
  FullNameTextInput,
  GenderRadio,
  DobDatePicker,
  NationalitySelect,
  MaritalStatusSelect,
  EducationLevelTextInput,
  OcupationTextInput,
  StayPassSelect,
  IDTextInput,
} from './form-components';
import { validate, next } from '../../reducers/signup/signup-ui';
import { save } from '../../reducers/signup/signup-data';
import { PageCard } from './styled-components';

class Page1 extends Component {
  componentDidUpdate(prevState) {
    const { isValidating } = this.props;
    const isPropChange = isValidating !== prevState.isValidating;
    if (isValidating && isPropChange) this.validatePage(true);
  }

  validatePage = () => {
    const {
      form, dispatchValidate, dispatchNext, dispatchSave,
    } = this.props;

    form.validateFieldsAndScroll((err, values) => {
      dispatchValidate(false);
      if (err) return;
      dispatchSave(values);
      dispatchNext();
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <PageCard>
        <Form>
          <FullNameTextInput decorator={getFieldDecorator} />
          <GenderRadio decorator={getFieldDecorator} />
          <DobDatePicker decorator={getFieldDecorator} />
          <NationalitySelect decorator={getFieldDecorator} />
          <MaritalStatusSelect decorator={getFieldDecorator} />
          <EducationLevelTextInput decorator={getFieldDecorator} />
          <OcupationTextInput decorator={getFieldDecorator} />
          <StayPassSelect decorator={getFieldDecorator} />
          <IDTextInput decorator={getFieldDecorator} />
        </Form>
      </PageCard>
    );
  }
}

Page1.propTypes = {
  form: PropTypes.shape({
    validateFieldsAndScroll: PropTypes.func.isRequired,
  }).isRequired,
  isValidating: PropTypes.bool.isRequired,
  dispatchValidate: PropTypes.func.isRequired,
  dispatchNext: PropTypes.func.isRequired,
  dispatchSave: PropTypes.func.isRequired,
  // signupData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  currentStep: state.signup.ui.currentStep,
  isValidating: state.signup.ui.isValidating,
  // singupData: state.signup.data,
});

const mapDispatchToProps = {
  dispatchValidate: validate,
  dispatchNext: next,
  dispatchSave: save,
};

const FormPage1 = Form.create()(Page1);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormPage1);
