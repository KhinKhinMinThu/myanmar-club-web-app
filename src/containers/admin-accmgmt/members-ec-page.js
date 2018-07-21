import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form } from 'antd';
import {
  EcMembersTable,
  DeSeletAllButton,
  SeletAllButton,
  SelectedMembers,
  DeleteSeletedButton,
  SearchNamePanel,
} from './components';
import { FlexContainer } from './styled-components';
import {
  setSelectedKeys,
  setDeSelectAllLoading,
  setSelectAllLoading,
  setSortedInfo,
  setFilteredInfo,
} from '../../reducers/accmgmt/accmgmt-ui';
import { save } from '../../reducers/accmgmt/accmgmt-data';

class EcMembersPage extends Component {
  // get the memberlist from API
  componentWillMount() {
    const { accmgmtData } = this.props;
    const { membersData } = accmgmtData;
    this.ecMembersList = this.prepareList(membersData.filter(item => item.isec_member === '1'));
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
      dispatchSelectedKeys([...this.ecMembersList.map(item => item.key)]);
    }, 1000);
  };

  // handle check-box selection in the table
  onSelectChange = (selectedKeys) => {
    const { dispatchSelectedKeys } = this.props;
    dispatchSelectedKeys(selectedKeys);
  };

  // handle tabs change event
  onChange = (pagination, filters, sorter) => {
    const { dispatchSortedInfo, dispatchFilteredInfo } = this.props;
    dispatchSortedInfo(sorter);
    dispatchFilteredInfo(filters);
  };

  // delete selected member accounts
  onClickDeleteSelected = () => {
    const {
      accmgmtUI: { selectedKeys },
      dispatchSave,
    } = this.props;
    dispatchSave({ membersToDelete: selectedKeys });
    // to remove the selected members from the table display
    this.ecMembersList = this.ecMembersList.filter(item => !selectedKeys.includes(item.id));
  };

  // handle input changes from searchName field
  onChangeSearchName = (e) => {
    this.searchNameValue = e.target.value;
  };

  // handle onClick from SearchName button and onPressEnter from input field
  onSearchName = () => {
    const filters = this.searchNameValue ? { name: [this.searchNameValue] } : {};
    if (this.searchNameValue !== null) this.onChange({}, filters, {});
  };

  // handle onClick from Reset button
  onClickReset = () => {
    const {
      dispatchFilteredInfo,
      form: { resetFields },
    } = this.props;

    if (this.searchNameValue !== null) {
      dispatchFilteredInfo(null);
      resetFields(['searchName']);
      this.searchNameValue = null;
    }
  };

  // add the key and format role_names of member list
  prepareList = (sourceList) => {
    const preparedList = [];
    sourceList.map(item => preparedList.push({
      key: `${item.id}`,
      ...item,
      role_names: item.role_names.map(
        (role, index) => (index === item.role_names.length - 1 ? `${role}` : `${role}, `),
      ),
    }));
    return preparedList;
  };

  render() {
    const {
      accmgmtUI,
      form: { getFieldDecorator },
    } = this.props;
    const {
      selectedKeys,
      deselectAllLoading,
      selectAllLoading,
      sortedInfo,
      filteredInfo,
    } = accmgmtUI;
    const rowSelection = {
      selectedRowKeys: selectedKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedKeys.length > 0;

    return (
      <div>
        <SearchNamePanel
          onChange={this.onChangeSearchName}
          onPressEnter={this.onSearchName}
          decorator={getFieldDecorator}
          onClickSearch={this.onSearchName}
          onClickReset={this.onClickReset}
        />

        <FlexContainer>
          <SeletAllButton onClick={this.onClickSelectAll} loading={selectAllLoading} />
          <DeSeletAllButton
            onClick={this.onClickDeselectAll}
            hasSelected={hasSelected}
            loading={deselectAllLoading}
          />
          <DeleteSeletedButton onClick={this.onClickDeleteSelected} hasSelected={hasSelected} />
          {hasSelected ? <SelectedMembers selectedNum={selectedKeys.length} /> : null}
        </FlexContainer>

        <FlexContainer>
          <EcMembersTable
            ecMembersList={this.ecMembersList}
            rowSelection={rowSelection}
            onChange={this.onChange}
            sortedInfo={sortedInfo || {}}
            filteredInfo={filteredInfo || {}}
          />
        </FlexContainer>
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
  dispatchSave: PropTypes.func.isRequired,

  accmgmtUI: PropTypes.shape({}).isRequired,
  accmgmtData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  accmgmtUI: state.accmgmt.ui,
  accmgmtData: state.accmgmt.data,
});
const mapDispatchToProps = {
  dispatchSelectedKeys: setSelectedKeys,
  dispatchDeselectAllLoading: setDeSelectAllLoading,
  dispatchSelectAllLoading: setSelectAllLoading,
  dispatchSortedInfo: setSortedInfo,
  dispatchFilteredInfo: setFilteredInfo,
  dispatchSave: save,
};

const FormEcMembersPage = Form.create()(EcMembersPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormEcMembersPage);
