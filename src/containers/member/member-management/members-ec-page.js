import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form, message, Row, Col,
} from 'antd';
import { SUCCESS_DELETEMEMBER, SHOWFOR } from '../../../actions/message';
import {
  MembersTable,
  DeSeletAllButton,
  SeletAllButton,
  SelectedInfo,
  DeleteSeletedButton,
  SearchNamePanel,
} from './components';
import {
  setSelectedKeys,
  setDeSelectAllLoading,
  setSelectAllLoading,
  setSortedInfo,
  setFilteredInfo,
  resetState,
} from '../../../reducers/membermgmt/membermgmt-ui';
import {
  postDeleteMembers,
  setEcMembersData,
} from '../../../reducers/membermgmt/membermgmt-data';

class EcMembersPage extends Component {
  componentDidUpdate(prevProps) {
    const {
      membermgmtData: { isPostApiLoading, postErrMsg },
      membermgmtUI: { currentTab },
    } = this.props;
    if (currentTab !== 'tab1') return;

    const isApiPost = prevProps.membermgmtData.isPostApiLoading && !isPostApiLoading;
    if (!isApiPost) return;

    if (postErrMsg) {
      message.error(postErrMsg, SHOWFOR);
    } else {
      message.success(SUCCESS_DELETEMEMBER, SHOWFOR);
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
      dispatchSelectedKeys([...this.membersList.map(item => item.key)]);
    }, 1000);
  };

  // delete selected member accounts
  onClickDeleteSelected = () => {
    const {
      membermgmtUI: { selectedKeys },
      membermgmtData: { ecMembersList },
      performDeleteMember,
      dispatchResetState,
      dispatchEcMembersData,
    } = this.props;
    performDeleteMember({ membersToDelete: selectedKeys });
    dispatchResetState();

    const updatedEcMembers = ecMembersList.filter(
      item => !selectedKeys.includes(item.id),
    );
    dispatchEcMembersData(updatedEcMembers);
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

  // add the key and format role_names of member list
  prepareList = (sourceList) => {
    const preparedList = [];
    sourceList.map(item => preparedList.push({
      key: `${item.id}`,
      ...item,
      roleNames: item.roleNames
        ? item.roleNames
          .map(
            (role, index) => (index === item.roleNames.length - 1
              ? `${role.name}`
              : `${role.name}, `),
          )
          .join('')
        : '',
    }));
    return preparedList;
  };

  render() {
    const {
      membermgmtUI: {
        selectedKeys,
        deselectAllLoading,
        selectAllLoading,
        sortedInfo,
        filteredInfo,
        currentTab,
      },
      membermgmtData: { ecMembersList, isPostApiLoading },
      form: { getFieldDecorator },
      dispatchSelectedKeys,
      dispatchSortedInfo,
      dispatchFilteredInfo,
    } = this.props;

    if (ecMembersList) this.membersList = this.prepareList(ecMembersList);

    const rowSelection = {
      selectedRowKeys: selectedKeys,
      // handle check-box selection in the table
      onChange: keys => dispatchSelectedKeys(keys),
    };
    const hasSelected = selectedKeys.length > 0;

    return (
      <div>
        <Row type="flex" justify="start">
          <Col span={24}>
            <SearchNamePanel
              onChange={(e) => {
                this.searchNameValue = e.target.value;
              }}
              decorator={getFieldDecorator}
              onSearch={() => dispatchFilteredInfo(
                this.searchNameValue
                  ? { name: [this.searchNameValue.toLowerCase()] }
                  : {},
              )
              }
              onClickReset={this.onClickReset}
              placeHolder="Search member by name"
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
              placeHolder="Delete Selected Member(s)"
            />
            {hasSelected ? (
              <SelectedInfo
                selectedNum={selectedKeys.length}
                placeHolder="member"
              />
            ) : null}
          </Col>
          <Col span={24}>
            <MembersTable
              membersList={this.membersList}
              rowSelection={rowSelection}
              onChange={(pagination, filters, sorter) => {
                dispatchSortedInfo(sorter);
                dispatchFilteredInfo(filters);
              }}
              sortedInfo={sortedInfo || {}}
              filteredInfo={filteredInfo || {}}
              currentTab={currentTab}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

EcMembersPage.propTypes = {
  form: PropTypes.shape({}).isRequired,
  dispatchSelectedKeys: PropTypes.func.isRequired,
  dispatchDeselectAllLoading: PropTypes.func.isRequired,
  dispatchSelectAllLoading: PropTypes.func.isRequired,
  dispatchSortedInfo: PropTypes.func.isRequired,
  dispatchFilteredInfo: PropTypes.func.isRequired,
  dispatchResetState: PropTypes.func.isRequired,

  performDeleteMember: PropTypes.func.isRequired,
  dispatchEcMembersData: PropTypes.func.isRequired,

  membermgmtUI: PropTypes.shape({}).isRequired,
  membermgmtData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  membermgmtUI: state.membermgmt.ui,
  membermgmtData: state.membermgmt.data,
});
const mapDispatchToProps = {
  dispatchSelectedKeys: setSelectedKeys,
  dispatchDeselectAllLoading: setDeSelectAllLoading,
  dispatchSelectAllLoading: setSelectAllLoading,
  dispatchSortedInfo: setSortedInfo,
  dispatchFilteredInfo: setFilteredInfo,
  dispatchResetState: resetState,

  performDeleteMember: postDeleteMembers,
  dispatchEcMembersData: setEcMembersData,
};

const FormEcMembersPage = Form.create()(EcMembersPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormEcMembersPage);