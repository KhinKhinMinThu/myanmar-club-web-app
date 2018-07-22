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
  SubCommitteeRadio,
  RoleAssignTransfer,
  SaveButton,
  GoBackButton,
} from './components';
import { ButtonContainer } from './styled-components';
import { save } from '../../reducers/membermgmt/membermgmt-data';
import { startValidate, endValidate } from '../../reducers/membermgmt/membermgmt-ui';

class MemberProfilePage extends Component {
  componentWillMount() {
    const {
      membermgmtData: { memberRoles, allRoles },
    } = this.props;
    this.dataSource = this.prepareList(allRoles);
    this.targetKeys = memberRoles.map(item => `${item}`);
  }

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

  prepareList = (sourceList) => {
    const preparedList = [];
    sourceList.map(item => preparedList.push({
      key: `${item.id}`,
      title: `ID: ${item.id}`,
      description: `ID: ${item.id} - ${item.name}`,
    }));
    return preparedList;
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
        Others details to be added!
        <SubCommitteeRadio decorator={getFieldDecorator} />
        <RoleAssignTransfer
          dataSource={this.dataSource}
          onChange={this.onChange}
          decorator={getFieldDecorator}
          targetKeys={this.targetKeys}
        />
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

const FormMemberProfilePage = Form.create()(MemberProfilePage);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormMemberProfilePage);

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
