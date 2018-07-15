import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, message } from 'antd';
import { connect } from 'react-redux';
import {
  RoleNameSelect, RoleAssignTransfer, SaveButton, GoBackButton,
} from './components';
import { ButtonContainer } from './styled-components';
import { validate } from '../../reducers/rolemgmt/rolemgmt-ui';
import { save } from '../../reducers/rolemgmt/rolemgmt-data';

<<<<<<< HEAD
class RoleManagement extends Component {
=======
class RoleManagment extends Component {
>>>>>>> menu-page
  data = [];

  ecMembersList = [];

  componentWillMount() {
    const { rolemgmtData } = this.props;
    this.roleData = rolemgmtData.roleData;
    this.dataSource = this.prepareList(this.roleData.find(item => item.roleId === 0).ecMembers);

    this.roleNameList = [];
    this.roleData
      .filter(item => item.roleId > 0)
      .map(item => this.roleNameList.push({ id: item.roleId, name: item.roleName }));
  }

  componentDidUpdate(prevState) {
    const { isValidating } = this.props;
    const isPropChange = isValidating !== prevState.isValidating;
    if (isValidating && isPropChange) message.success('redirect to home page!');
  }

  onSelect = (value) => {
    // set the targetKeys as the list of ecMembers for selected role
    const targetKeys = this.roleData
      .find(item => item.roleId === value)
      .ecMembers.map(item => `${item.id}`);
    const { form } = this.props;
    form.setFieldsValue({ roleTransfer: targetKeys });
  };

  onChange = (targetKeys) => {
    const { form } = this.props;
    form.setFieldsValue({ roleTransfer: targetKeys });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { form, dispatchValidate, dispatchSave } = this.props;

    form.validateFieldsAndScroll((err, values) => {
      dispatchValidate(false);
      if (err) return;
      const { roleId, roleTransfer } = values;
      // get the original list of selected role
      const affectedRole = this.roleData
        .find(item => item.roleId === roleId)
        .ecMembers.map(item => `${item.id}`);
      /* compare the changes:
        e.g role1 member ids = [1, 2, 3]
        roleTransfer member ids (right box) = [2, 4]
        transferTo: [4]
        transferFrom: [1, 3]
      */
      const transferTo = roleTransfer.filter(item => !affectedRole.includes(item));
      const transferFrom = affectedRole.filter(item => !roleTransfer.includes(item));
      dispatchSave({ roleId, transferTo, transferFrom });
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
    const { form, isValidating, dispatchValidate } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form onSubmit={this.onSubmit}>
        <RoleNameSelect
          onChange={this.onSelect}
          roleNameList={this.roleNameList}
          decorator={getFieldDecorator}
        />
        <RoleAssignTransfer
          dataSource={this.dataSource}
          onChange={this.onChange}
          decorator={getFieldDecorator}
        />
        <ButtonContainer>
          <SaveButton isValidating={isValidating} onClick={() => dispatchValidate(true)} />
          <GoBackButton onClick={() => console.log('clicked goback')} />
        </ButtonContainer>
      </Form>
    );
  }
}
<<<<<<< HEAD
RoleManagement.propTypes = {
=======
RoleManagment.propTypes = {
>>>>>>> menu-page
  form: PropTypes.shape({
    validateFieldsAndScroll: PropTypes.func.isRequired,
  }).isRequired,
  isValidating: PropTypes.bool.isRequired,
  dispatchValidate: PropTypes.func.isRequired,
  dispatchSave: PropTypes.func.isRequired,
  rolemgmtData: PropTypes.shape({}).isRequired,
};
<<<<<<< HEAD
const FormRoleManagement = Form.create()(RoleManagement);

const mapStateToProps = state => ({
  isValidating: state.rolemgmt.ui.isValidating,
=======
const FormRoleManagement = Form.create()(RoleManagment);

const mapStateToProps = state => ({
  isValidating: state.signup.ui.isValidating,
>>>>>>> menu-page
  rolemgmtData: state.rolemgmt.data,
});

const mapDispatchToProps = {
  dispatchValidate: validate,
  dispatchSave: save,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormRoleManagement);
