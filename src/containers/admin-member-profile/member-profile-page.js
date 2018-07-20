import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'antd';
import PropTypes from 'prop-types';
import {
  FullNameTextInput,
  GenderRadio,
  DobDatePicker,
  NationalitySelect,
  ReligionSelect,
  MaritalStatusSelect,
  EducationLevelTextInput,
  OccupationTextInput,
  StayPassSelect,
  IDTextInput,
  SaveButton,
  GoBackButton,
} from './components';
import { ButtonContainer } from './styled-components';
import { save } from '../../reducers/membermgmt/membermgmt-data';
import { startValidate, endValidate } from '../../reducers/membermgmt/membermgmt-ui';

class MemberProfilePage extends Component {
  componentDidMount() {
    const {
      form: { setFieldsValue },
      membermgmtData,
    } = this.props;
    setFieldsValue({ ...membermgmtData });
  }

  //   componentDidUpdate(prevState) {
  //     const { isValidating } = this.props;
  //     const isPropChange = isValidating !== prevState.isValidating;
  //     if (isValidating && isPropChange) this.validatePage();
  //   }

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
        console.log('no error, formvalues saved');
        dispatchSave(formValues);
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      isValidating,
      dispatchStartValidate,
    } = this.props;

    return (
      <Form onSubmit={this.onSubmit}>
        <FullNameTextInput decorator={getFieldDecorator} />
        <GenderRadio decorator={getFieldDecorator} />
        <DobDatePicker decorator={getFieldDecorator} />
        <NationalitySelect decorator={getFieldDecorator} />
        <ReligionSelect decorator={getFieldDecorator} />
        <MaritalStatusSelect decorator={getFieldDecorator} />
        <EducationLevelTextInput decorator={getFieldDecorator} />
        <OccupationTextInput decorator={getFieldDecorator} />
        <StayPassSelect decorator={getFieldDecorator} />
        <IDTextInput decorator={getFieldDecorator} />
        <ButtonContainer>
          <SaveButton isValidating={isValidating} onClick={() => dispatchStartValidate(true)} />
          <GoBackButton onClick={() => console.log('clicked goback')} />
        </ButtonContainer>
      </Form>
    );
  }
}

MemberProfilePage.propTypes = {
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

const FormPage1 = Form.create()(MemberProfilePage);

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
