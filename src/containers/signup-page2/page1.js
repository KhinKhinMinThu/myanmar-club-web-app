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
  OccupationTextInput,
  StayPassSelect,
  IDTextInput,
} from './form-components';
import { validate, next } from '../../reducers/signup/signup-ui';
import { save } from '../../reducers/signup/signup-data';
import { PageCard } from './styled-components';

class Page1 extends Component {
  componentDidMount() {
    const {
      form: { setFieldsValue },
      signupData,
    } = this.props;
    setFieldsValue({ ...signupData });
  }

  componentDidUpdate(prevState) {
    const { isValidating } = this.props;
    const isPropChange = isValidating !== prevState.isValidating;
    if (isValidating && isPropChange) this.validatePage(true);
  }

  validatePage = () => {
    const {
      form: { validateFieldsAndScroll },
      dispatchValidate,
      dispatchNext,
      dispatchSave,
    } = this.props;

    validateFieldsAndScroll((err, formValues) => {
      dispatchValidate(false);

      if (!err) {
        dispatchSave(formValues);
        dispatchNext();
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <PageCard>
        <Form>
          <FullNameTextInput decorator={getFieldDecorator} />
          <GenderRadio decorator={getFieldDecorator} />
          <DobDatePicker decorator={getFieldDecorator} />
          <NationalitySelect decorator={getFieldDecorator} />
          <MaritalStatusSelect decorator={getFieldDecorator} />
          <EducationLevelTextInput decorator={getFieldDecorator} />
          <OccupationTextInput decorator={getFieldDecorator} />
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
    getFieldDecorator: PropTypes.func.isRequired,
    setFieldsValue: PropTypes.func.isRequired,
  }).isRequired,
  isValidating: PropTypes.bool.isRequired,
  dispatchValidate: PropTypes.func.isRequired,
  dispatchNext: PropTypes.func.isRequired,
  dispatchSave: PropTypes.func.isRequired,
  signupData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => {
  const {
    ui: { currentStep, isValidating },
    data,
  } = state.signup;
  return {
    currentStep,
    isValidating,
    signupData: data,
  };
};

const mapDispatchToProps = {
  dispatchValidate: validate,
  dispatchNext: next,
  dispatchSave: save,
};

const FormPage1 = Form.create({})(Page1);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormPage1);

/*
mapPropsToFields(props) {
  const { signupData } = props;
  const mappedToFields = {};
  Object.keys(signupData).forEach((key) => {
    mappedToFields[key] = Form.createFormField({ value: signupData[key] });
  });
  return mappedToFields;
}
*/
