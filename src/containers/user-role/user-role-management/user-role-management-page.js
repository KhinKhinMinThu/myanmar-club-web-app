import React, { Component } from 'react';
import { withRouter } from 'react-router-dom/es';
import PropTypes from 'prop-types';
import {
  Form, Spin, Alert, message, Row, Col, Card,
} from 'antd';
import { connect } from 'react-redux';
import { SUCCESS_UPDATEASSIGNROLE, SHOWFOR } from '../../../actions/message';
import {
  RoleNameSelect,
  RoleAssignTransfer,
  SaveButton,
  GoBackButton,
  ManageRoleButton,
} from './components';
import {
  setSelectedRole,
  resetState,
} from '../../../reducers/rolemgmt/rolemgmt-ui';
import {
  getRoleData,
  setRoleData,
  postAssignRoles,
} from '../../../reducers/rolemgmt/rolemgmt-data';

class RoleManagement extends Component {
  componentDidMount() {
    const { performGetRoleData, dispatchResetState } = this.props;
    dispatchResetState();
    performGetRoleData();
  }

  componentWillUpdate(nextProps) {
    const {
      rolemgmtData: { isGetApiLoading },
    } = this.props;
    this.isApiCalled = !nextProps.rolemgmtData.isGetApiLoading && isGetApiLoading;
  }

  componentDidUpdate(prevProps) {
    const {
      rolemgmtData: { isPostApiLoading, postErrMsg },
    } = this.props;
    const isApiPost = prevProps.rolemgmtData.isPostApiLoading && !isPostApiLoading;
    if (!isApiPost) return;

    if (postErrMsg) {
      message.error(postErrMsg, SHOWFOR);
    } else {
      message.success(SUCCESS_UPDATEASSIGNROLE, SHOWFOR);
    }
  }

  onChangeSelect = (value, option) => {
    const {
      rolemgmtData: { roleData },
      form: { setFieldsValue },
      dispatchSelectedRole,
    } = this.props;
    // set the targetKeys as the list of ecMembers for selected role
    const targetKeys = roleData
      ? roleData
        .find(item => item.roleId === value)
        .ecMembers.map(item => `${item.id}`)
      : [];
    setFieldsValue({ roleTransfer: targetKeys });
    dispatchSelectedRole({
      selectedRole: option.props.children.concat(':'),
      selectedRoleId: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      form: { validateFieldsAndScroll },
      rolemgmtData: { roleData },
      performAssignRoles,
    } = this.props;

    validateFieldsAndScroll((err, values) => {
      if (err) return;
      const { roleId, roleTransfer } = values;

      // get the original list of selected role
      const affectedRole = roleData
        .find(item => item.roleId === roleId)
        .ecMembers.map(item => `${item.id}`);

      /* compare the changes:
        e.g role1 member ids = [1, 2, 3]
        roleTransfer member ids (right box) = [2, 4]
        transferTo: [4]
        transferFrom: [1, 3]
      */
      const roleIdStr = roleId.toString();
      const transferTo = roleTransfer.filter(
        item => !affectedRole.includes(item),
      );
      const transferFrom = affectedRole.filter(
        item => !roleTransfer.includes(item),
      );

      // to update the roleData in state to reflect the update on page
      this.removeTrasferFrom(roleId, transferFrom);
      this.addTransferTo(roleId, transferTo);

      performAssignRoles({ roleId: roleIdStr, transferTo, transferFrom });
    });
  };

  removeTrasferFrom = (roleId, transferFrom) => {
    if (transferFrom.length > 0) {
      // console.log('removeTrasferFrom...................');
      const {
        rolemgmtData: { roleData },
        dispatchRoleData,
      } = this.props;
      const selectedRoleData = roleData.find(item => item.roleId === roleId);
      const { ecMembers } = selectedRoleData;
      const updatedEcList = ecMembers.filter(
        item => !transferFrom.includes(item.id.toString()),
      );
      // console.log('updatedEcList', updatedEcList);

      selectedRoleData.ecMembers = updatedEcList;
      // console.log('selectedRoleData', selectedRoleData);

      const newRoleData = roleData.filter(item => item.roleId !== roleId);
      newRoleData.push(selectedRoleData);
      // console.log('newRoleData', newRoleData);

      dispatchRoleData(newRoleData);
    }
  };

  addTransferTo = (roleId, transferTo) => {
    if (transferTo.length > 0) {
      // console.log('addTransferTo...................');
      const {
        rolemgmtData: { roleData, allEcList },
        dispatchRoleData,
      } = this.props;
      const selectedRoleData = roleData.find(item => item.roleId === roleId);
      const { ecMembers } = selectedRoleData;
      const updatedEcList = allEcList.filter(item => transferTo.includes(item.id.toString()));
      // console.log('updatedEcList', updatedEcList);

      selectedRoleData.ecMembers = [...ecMembers, ...updatedEcList];
      // console.log('selectedRoleData', selectedRoleData);

      const newRoleData = roleData.filter(item => item.roleId !== roleId);
      newRoleData.push(selectedRoleData);
      // console.log('newRoleData', newRoleData);

      dispatchRoleData(newRoleData);
    }
  };

  prepareList = (sourceList) => {
    const {
      rolemgmtUI: { selectedRoleId },
      rolemgmtData: { roleData },
    } = this.props;
    console.log('eclist', sourceList);
    // admin list if selected role is not admin
    const admins = selectedRoleId !== 1
      ? roleData
        .find(item => item.roleId === 1)
        .ecMembers.map(item => `${item.id}`)
      : [];

    const preparedList = [];
    sourceList.map(item => preparedList.push({
      key: `${item.id}`,
      title: `ID: ${item.id}`,
      description: `Member Id: ${item.id} - ${item.username}`,
      disabled: admins.includes(item.id.toString()),
    }));
    return preparedList;
  };

  render() {
    const {
      history,
      rolemgmtUI: { selectedRole },
      rolemgmtData: {
        roleData,
        roleNameList,
        allEcList,
        isGetApiLoading,
        getErrMsg,
        isPostApiLoading,
      },
      form: { getFieldDecorator },
    } = this.props;
    const dataSource = roleData ? this.prepareList(allEcList) : [];
    const actionColLayout = {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 12 },
      xl: { span: 12 },
      style: { marginBottom: 14 },
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
          <Form onSubmit={this.onSubmit}>
            <Card style={{ borderRadius: 15, margin: '0 auto 8px auto' }}>
              <ManageRoleButton />
              <Row gutter={8} type="flex" justify="center">
                <Col span={15}>
                  <Row gutter={8} type="flex" justify="center">
                    <Col span={24}>
                      <RoleNameSelect
                        onChange={this.onChangeSelect}
                        roleNameList={roleNameList}
                        decorator={getFieldDecorator}
                      />
                    </Col>
                  </Row>

                  <Row gutter={8} type="flex" justify="center">
                    <Col span={24} style={{ textAlign: 'center' }}>
                      <RoleAssignTransfer
                        dataSource={dataSource}
                        decorator={getFieldDecorator}
                        selectedRole={selectedRole}
                      />
                    </Col>
                  </Row>

                  <br />
                  <Row gutter={8}>
                    <Col {...actionColLayout}>
                      <SaveButton isPostApiLoading={isPostApiLoading} />
                    </Col>
                    <Col {...actionColLayout}>
                      <GoBackButton history={history} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Form>
        )}
      </Spin>
    );
  }
}

RoleManagement.propTypes = {
  history: PropTypes.shape({}).isRequired,
  form: PropTypes.shape({}).isRequired,
  performGetRoleData: PropTypes.func.isRequired,
  performAssignRoles: PropTypes.func.isRequired,
  dispatchSelectedRole: PropTypes.func.isRequired,
  dispatchResetState: PropTypes.func.isRequired,
  dispatchRoleData: PropTypes.func.isRequired,

  rolemgmtUI: PropTypes.shape({}).isRequired,
  rolemgmtData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  rolemgmtUI: state.rolemgmt.ui,
  rolemgmtData: state.rolemgmt.data,
});

const mapDispatchToProps = {
  performGetRoleData: getRoleData,
  performAssignRoles: postAssignRoles,
  dispatchSelectedRole: setSelectedRole,
  dispatchResetState: resetState,
  dispatchRoleData: setRoleData,
};

const FormRoleManagement = Form.create()(RoleManagement);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(FormRoleManagement));
