import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form, message, Spin, Alert, Row, Col,
} from 'antd';
import RoleCreationForm from './role-creation-page';
import { SUCCESS_DELETEROLE, SUCCESS_UPDATEROLE, SHOWFOR } from '../../actions/message';
import {
  RolesTable,
  DeSeletAllButton,
  SeletAllButton,
  SelectedInfo,
  DeleteSeletedButton,
  SearchNamePanel,
  CreateRoleButton,
} from './components';
import {
  setSelectedKeys,
  setDeSelectAllLoading,
  setSelectAllLoading,
  setSortedInfo,
  setFilteredInfo,
  resetState,
  setExpandedRowKeys,
  setCurrentButton,
} from '../../reducers/access-control/access-control-ui';
import {
  getAccessControlData,
  setAccessControlData,
  postDeleteRole,
  postAssignFunctions,
} from '../../reducers/access-control/access-control-data';

class AccessControl extends Component {
  state = {
    isModalVisible: false,
    selectedRole: null,
  };

  componentDidMount() {
    const { dispatchResetState, performGetAccessControlData } = this.props;
    dispatchResetState();
    performGetAccessControlData();
  }

  componentWillUpdate(nextProps) {
    const {
      accesscontrolData: { isGetApiLoading },
    } = this.props;
    this.isApiCalled = !nextProps.accesscontrolData.isGetApiLoading && isGetApiLoading;
  }

  componentDidUpdate(prevProps) {
    const {
      accesscontrolData: { isPostApiLoading, postErrMsg },
      accesscontrolUI: { currentButton },
    } = this.props;

    const isApiPost = prevProps.accesscontrolData.isPostApiLoading && !isPostApiLoading;
    if (!isApiPost) return;

    if (postErrMsg) {
      message.error(postErrMsg, SHOWFOR);
    } else if (currentButton === 'delete') {
      message.success(SUCCESS_DELETEROLE, SHOWFOR);
    } else if (currentButton === 'save') {
      message.success(SUCCESS_UPDATEROLE, SHOWFOR);
    }
  }

  onCloseModal = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  onChange = () => {
    const { isExpand } = this.state;
    this.setState({ isExpand: !isExpand });
  };

  onExpand = (expanded, record) => {
    const {
      accesscontrolData: { accesscontrolData },
      form: { setFieldsValue },
      dispatchExpandedRowKeys,
    } = this.props;
    // set the targetKeys as the list of ecMembers for selected role
    const keys = expanded ? [record.roleId.toString()] : [];
    console.log('keys', keys);
    const targetKeys = accesscontrolData
      ? accesscontrolData
        .find(item => item.roleId === record.roleId)
        .functions.map(item => `${item.id}`)
      : [];
    setFieldsValue({ functionTransfer: targetKeys });
    console.log('target keys', targetKeys);
    dispatchExpandedRowKeys(keys);
    this.setState({
      selectedRole: record.roleId,
    });
  };

  // handle de-select all button
  onClickDeselectAll = () => {
    const { dispatchSelectedKeys, dispatchDeselectAllLoading } = this.props;
    dispatchDeselectAllLoading(true);
    setTimeout(() => {
      dispatchDeselectAllLoading(false);
      dispatchSelectedKeys([]);
    }, 1000);
  };

  // handle select all button
  onClickSelectAll = () => {
    const { dispatchSelectedKeys, dispatchSelectAllLoading } = this.props;
    dispatchSelectAllLoading(true);
    setTimeout(() => {
      dispatchSelectAllLoading(false);
      dispatchSelectedKeys([...this.roleList.map(item => item.key)]);
    }, 1000);
  };

  // delete selected roles
  onClickDeleteSelected = () => {
    const {
      accesscontrolData: { accesscontrolData },
      accesscontrolUI: { selectedKeys },
      performDeleteRole,
      dispatchSetAccessControlData,
      dispatchCurrentButton,
    } = this.props;
    dispatchCurrentButton('delete');
    performDeleteRole({ rolesToDelete: selectedKeys });
    // to remove the selected role from the table display
    const updatedData = accesscontrolData.filter(
      item => !selectedKeys.includes(item.roleId),
    );
    dispatchSetAccessControlData(updatedData);
  };

  // handle onClick from Reset button
  onClickReset = () => {
    const {
      dispatchFilteredInfo,
      dispatchResetState,
      form: { resetFields },
    } = this.props;

    if (this.searchNameValue !== null) {
      dispatchFilteredInfo(null);
      resetFields(['searchName']);
      this.searchNameValue = null;
    }
    dispatchResetState();
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      form: { validateFieldsAndScroll },
      accesscontrolData: { accesscontrolData },
      performAssignFunctions,
      dispatchCurrentButton,
    } = this.props;
    const { selectedRole } = this.state;
    validateFieldsAndScroll((err, values) => {
      if (err) return;
      const { functionTransfer } = values;
      const roleId = selectedRole.toString();
      // get the original list of selected role
      const affectedRole = accesscontrolData
        .find(item => item.roleId === roleId)
        .functions.map(item => `${item.id}`);

      /* compare the changes:
        e.g role1 member ids = [1, 2, 3]
        roleTransfer member ids (right box) = [2, 4]
        transferTo: [4]
        transferFrom: [1, 3]
      */
      const roleIdStr = roleId.toString();
      const transferTo = functionTransfer.filter(
        item => !affectedRole.includes(item),
      );
      const transferFrom = affectedRole.filter(
        item => !functionTransfer.includes(item),
      );

      // to update the roleData in state to reflect the update on page
      this.removeTrasferFrom(roleId, transferFrom);
      this.addTransferTo(roleId, transferTo);
      dispatchCurrentButton('save');
      performAssignFunctions({ roleId: roleIdStr, transferTo, transferFrom });
    });
  };

  removeTrasferFrom = (roleId, transferFrom) => {
    if (transferFrom.length > 0) {
      // console.log('removeTrasferFrom...................');
      const {
        accesscontrolData: { accesscontrolData },
        dispatchSetAccessControlData,
      } = this.props;
      const selectedRoleData = accesscontrolData.find(item => item.roleId === roleId);
      const { functions } = selectedRoleData;
      const updatedFunctionList = functions.filter(
        item => !transferFrom.includes(item.id.toString()),
      );
      // console.log('updatedEcList', updatedEcList);

      selectedRoleData.ecMembers = updatedFunctionList;
      // console.log('selectedRoleData', selectedRoleData);

      const newRoleData = accesscontrolData.filter(item => item.roleId !== roleId);
      newRoleData.push(selectedRoleData);
      // console.log('newRoleData', newRoleData);

      dispatchSetAccessControlData(newRoleData);
    }
  };

  addTransferTo = (roleId, transferTo) => {
    if (transferTo.length > 0) {
      // console.log('addTransferTo...................');
      const {
        accesscontrolData: { accesscontrolData, allFunctionList },
        dispatchSetAccessControlData,
      } = this.props;
      const selectedRoleData = accesscontrolData.find(item => item.roleId === roleId);
      const { functions } = selectedRoleData;
      const updatedFunctionList = allFunctionList.filter(item => transferTo.includes(item.id.toString()));
      console.log('updatedFunctionList', updatedFunctionList);

      selectedRoleData.functions = [...functions, ...updatedFunctionList];
      // console.log('selectedRoleData', selectedRoleData);

      const newRoleData = accesscontrolData.filter(item => item.roleId !== roleId);
      newRoleData.push(selectedRoleData);
      // console.log('newRoleData', newRoleData);

      dispatchSetAccessControlData(newRoleData);
    }
  };

  showModal = () => {
    this.setState({
      isModalVisible: true,
    });
  };

  prepareList = (sourceList) => {
    const preparedList = [];
    sourceList.map(item => preparedList.push({
      key: `${item.roleId}`,
      ...item,
    }));
    return preparedList;
  };

  funcList = (sourceList) => {
    const funcList = [];
    const selectedRoleData = sourceList.find(item => item.roleId === '0');
    const { functions } = selectedRoleData;
    functions.map(item => funcList.push({
      key: `${item.id}`,
      title: `ID: ${item.id}`,
      description: `Function Id: ${item.id} - ${item.description}`,
    }));
    return funcList;
  };

  render() {
    const {
      accesscontrolUI: {
        selectedKeys,
        deselectAllLoading,
        selectAllLoading,
        sortedInfo,
        filteredInfo,
        expandedRowKeys,
      },
      accesscontrolData: {
        accesscontrolData,
        isGetApiLoading,
        getErrMsg,
        isPostApiLoading,
      },
      form: { getFieldDecorator },
      dispatchSortedInfo,
      dispatchFilteredInfo,
      dispatchSelectedKeys,
      form,
    } = this.props;
    const { isModalVisible } = this.state;
    const rowSelection = {
      selectedRowKeys: selectedKeys,
      onChange: keys => dispatchSelectedKeys(keys),
    };
    const hasSelected = selectedKeys.length > 0;

    if (accesscontrolData) this.roleList = this.prepareList(accesscontrolData);
    const dataSource = accesscontrolData ? this.funcList(accesscontrolData) : [];
    const header = this.roleList
      ? 'Total roles: '.concat(this.roleList.length)
      : '';
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
          <div>
            <div className="pageHeaderContainer">
              <h2>Role Management Page</h2>
            </div>
            <Row type="flex" justify="start">
              <CreateRoleButton showModal={this.showModal} />
              <RoleCreationForm
                form={form}
                decorator={getFieldDecorator}
                isModalVisible={isModalVisible}
                onCloseModal={this.onCloseModal}
              />
              <Col span={24}>
                <SearchNamePanel
                  onChange={(e) => {
                    this.searchNameValue = e.target.value;
                  }}
                  decorator={getFieldDecorator}
                  onSearch={() => dispatchFilteredInfo(
                    this.searchNameValue
                      ? { roleName: [this.searchNameValue.toLowerCase()] }
                      : {},
                  )
                  }
                  onClickReset={this.onClickReset}
                  placeHolder="Search role name"
                />
              </Col>
              <Col span={24}>
                <SeletAllButton
                  onClick={this.onClickSelectAll}
                  loading={selectAllLoading}
                />
                <DeSeletAllButton
                  onClick={this.onClickDeselectAll}
                  hasSelected={hasSelected}
                  loading={deselectAllLoading}
                />
                <DeleteSeletedButton
                  onClick={this.onClickDeleteSelected}
                  hasSelected={hasSelected}
                  isPostApiLoading={isPostApiLoading}
                  placeHolder="Delete Selected Role(s)"
                />
                {hasSelected ? (
                  <SelectedInfo
                    selectedNum={selectedKeys.length}
                    placeHolder="role"
                  />
                ) : null}
              </Col>
              <Col span={24}>
                <RolesTable
                  roleList={this.roleList}
                  functionList={dataSource}
                  decorator={getFieldDecorator}
                  rowSelection={rowSelection}
                  onChange={(pagination, filters, sorter) => {
                    dispatchSortedInfo(sorter);
                    dispatchFilteredInfo(filters);
                  }}
                  sortedInfo={sortedInfo || {}}
                  filteredInfo={filteredInfo || {}}
                  expandedRowKeys={expandedRowKeys}
                  onExpand={this.onExpand}
                  isPostApiLoading={isPostApiLoading}
                  onSubmit={this.onSubmit}
                  header={header}
                />
              </Col>
            </Row>
          </div>
        )}
      </Spin>
    );
  }
}

AccessControl.propTypes = {
  form: PropTypes.shape({}).isRequired,
  dispatchSelectedKeys: PropTypes.func.isRequired,
  dispatchDeselectAllLoading: PropTypes.func.isRequired,
  dispatchSelectAllLoading: PropTypes.func.isRequired,
  dispatchSortedInfo: PropTypes.func.isRequired,
  dispatchFilteredInfo: PropTypes.func.isRequired,
  dispatchResetState: PropTypes.func.isRequired,
  dispatchExpandedRowKeys: PropTypes.func.isRequired,
  performGetAccessControlData: PropTypes.func.isRequired,
  dispatchSetAccessControlData: PropTypes.func.isRequired,
  performDeleteRole: PropTypes.func.isRequired,
  dispatchCurrentButton: PropTypes.func.isRequired,
  performAssignFunctions: PropTypes.func.isRequired,

  accesscontrolUI: PropTypes.shape({}).isRequired,
  accesscontrolData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  accesscontrolUI: state.accessControl.ui,
  accesscontrolData: state.accessControl.data,
});
const mapDispatchToProps = {
  dispatchSelectedKeys: setSelectedKeys,
  dispatchDeselectAllLoading: setDeSelectAllLoading,
  dispatchSelectAllLoading: setSelectAllLoading,
  dispatchSortedInfo: setSortedInfo,
  dispatchFilteredInfo: setFilteredInfo,
  dispatchResetState: resetState,
  dispatchExpandedRowKeys: setExpandedRowKeys,
  performGetAccessControlData: getAccessControlData,
  dispatchSetAccessControlData: setAccessControlData,
  performDeleteRole: postDeleteRole,
  dispatchCurrentButton: setCurrentButton,
  performAssignFunctions: postAssignFunctions,
};

const AccessControlPage = Form.create()(AccessControl);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccessControlPage);
