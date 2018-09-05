import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form, message, Spin, Alert, Row, Col, Collapse,
} from 'antd';

import { SUCCESS_DELETEROLE, SHOWFOR } from '../../actions/message';
import {
  RolesTable,
  DeSeletAllButton,
  SeletAllButton,
  SelectedInfo,
  DeleteSeletedButton,
  SearchNamePanel,
  SaveButton,
  GoBackButton,
  RoleNameInput,
  RoleDescriptionInput,
} from './components';

import {
  setSelectedKeys,
  setDeSelectAllLoading,
  setSelectAllLoading,
  setSortedInfo,
  setFilteredInfo,
  resetState,
  setExpandedRowKeys,
  setEditingKey,
} from '../../reducers/access-control/access-control-ui';
import {
  getAccessControlData,
  setAccessControlData,
  postDeleteRole,
} from '../../reducers/access-control/access-control-data';

const FormItem = Form.Item;
const { Panel } = Collapse;
class AccessControl extends Component {
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
    } = this.props;

    const isApiPost = prevProps.accesscontrolData.isPostApiLoading && !isPostApiLoading;
    if (!isApiPost) return;

    if (postErrMsg) {
      message.error(postErrMsg, SHOWFOR);
    } else {
      message.success(SUCCESS_DELETEROLE, SHOWFOR);
    }
  }

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
    } = this.props;

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

  prepareList = (sourceList) => {
    const preparedList = [];
    sourceList.map(item => preparedList.push({
      key: `${item.roleId}`,
      ...item,
      location: `${item.locationLine1}, ${item.locationLine2},
       ${item.locationPostalCode}`,
    }));
    return preparedList;
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
        editingKey,
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
      dispatchExpandedRowKeys,
      dispatchEditingKey,
      history,
    } = this.props;

    const rowSelection = {
      selectedRowKeys: selectedKeys,
      onChange: keys => dispatchSelectedKeys(keys),
    };
    const hasSelected = selectedKeys.length > 0;

    if (accesscontrolData) this.roleList = this.prepareList(accesscontrolData);
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
              <Col span={24}>
                <Collapse onChange={this.onChange}>
                  <Panel header="click to create new role">
                    <FormItem>
                      <RoleNameInput decorator={getFieldDecorator} />
                      <RoleDescriptionInput decorator={getFieldDecorator} />
                    </FormItem>
                  </Panel>
                </Collapse>
              </Col>
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
                  decorator={getFieldDecorator}
                  rowSelection={rowSelection}
                  onChange={(pagination, filters, sorter) => {
                    dispatchSortedInfo(sorter);
                    dispatchFilteredInfo(filters);
                  }}
                  sortedInfo={sortedInfo || {}}
                  filteredInfo={filteredInfo || {}}
                  expandedRowKeys={expandedRowKeys}
                  onExpand={(expanded, record) => {
                    const keys = expanded ? [record.roleId.toString()] : [];
                    dispatchExpandedRowKeys(keys);
                    console.log('keys', keys);
                  }}
                  onClickAddRow={this.onClickAddRow}
                  cancelTransaction={() => dispatchEditingKey(null)}
                  editTransaction={transacId => dispatchEditingKey(transacId)}
                  saveTransaction={this.saveTransaction}
                  editingKey={editingKey}
                  isPostApiLoading={isPostApiLoading}
                  header={header}
                />
              </Col>
              <Col span={12} offset={6}>
                <SaveButton isPostApiLoading={isPostApiLoading} />
                <GoBackButton history={history} />
              </Col>
            </Row>
          </div>
        )}
      </Spin>
    );
  }
}

AccessControl.propTypes = {
  history: PropTypes.shape({}).isRequired,
  form: PropTypes.shape({}).isRequired,
  dispatchSelectedKeys: PropTypes.func.isRequired,
  dispatchDeselectAllLoading: PropTypes.func.isRequired,
  dispatchSelectAllLoading: PropTypes.func.isRequired,
  dispatchSortedInfo: PropTypes.func.isRequired,
  dispatchFilteredInfo: PropTypes.func.isRequired,
  dispatchResetState: PropTypes.func.isRequired,
  dispatchExpandedRowKeys: PropTypes.func.isRequired,
  dispatchEditingKey: PropTypes.func.isRequired,
  performGetAccessControlData: PropTypes.func.isRequired,
  dispatchSetAccessControlData: PropTypes.func.isRequired,
  performDeleteRole: PropTypes.func.isRequired,

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
  dispatchEditingKey: setEditingKey,
  performGetAccessControlData: getAccessControlData,
  dispatchSetAccessControlData: setAccessControlData,
  performDeleteRole: postDeleteRole,
};

const AccessControlPage = Form.create()(AccessControl);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccessControlPage);
