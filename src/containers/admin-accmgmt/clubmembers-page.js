import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  ClubMembersTable,
  DeSeletAllButton,
  SeletAllButton,
  SelectedMembers,
  DeleteSeletedButton,
} from './components';
import { FlexContainer } from './styled-components';
import {
  setSelectedKeys,
  setDeSelectAllLoading,
  setSelectAllLoading,
  setSortedInfo,
} from '../../reducers/accmgmt/accmgmt-ui';
import { save } from '../../reducers/accmgmt/accmgmt-data';

class ClubMembersPage extends Component {
  componentWillMount() {
    const { accmgmtData } = this.props;
    const { membersData } = accmgmtData;
    this.clubMembersList = this.prepareList(membersData.filter(item => item.isec_member === '0'));
  }

  onClickDeselectAll = () => {
    const { dispatchSelectedKeys, dispatchDeselectAllLoading } = this.props;
    dispatchDeselectAllLoading(true);
    setTimeout(() => {
      dispatchDeselectAllLoading(false);
      dispatchSelectedKeys([]);
    }, 1000);
  };

  onClickSelectAll = () => {
    const { dispatchSelectedKeys, dispatchSelectAllLoading } = this.props;
    dispatchSelectAllLoading(true);
    setTimeout(() => {
      dispatchSelectAllLoading(false);
      dispatchSelectedKeys([...this.clubMembersList.map(item => item.key)]);
    }, 1000);
  };

  onSelectChange = (selectedKeys) => {
    const { dispatchSelectedKeys } = this.props;
    dispatchSelectedKeys(selectedKeys);
  };

  onChange = (pagination, filters, sorter) => {
    const { dispatchSortedInfo } = this.props;
    dispatchSortedInfo(sorter);
  };

  onClickDeleteSelected = () => {
    const { accmgmtUI, dispatchSave } = this.props;
    const { selectedKeys } = accmgmtUI;
    dispatchSave({ membersToDelete: selectedKeys });
    // to remove the selected members from the table display
    this.clubMembersList = this.clubMembersList.filter(item => !selectedKeys.includes(item.id));
  };

  prepareList = (sourceList) => {
    const preparedList = [];
    sourceList.map(item => preparedList.push({
      key: `${item.id}`,
      ...item,
    }));
    return preparedList;
  };

  render() {
    const { accmgmtUI } = this.props;
    const {
      selectedKeys, deselectAllLoading, selectAllLoading, sortedInfo,
    } = accmgmtUI;
    const rowSelection = {
      selectedRowKeys: selectedKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedKeys.length > 0;

    return (
      <div>
        <DeSeletAllButton
          onClick={this.onClickDeselectAll}
          hasSelected={hasSelected}
          loading={deselectAllLoading}
        />
        <SeletAllButton onClick={this.onClickSelectAll} loading={selectAllLoading} />
        <DeleteSeletedButton onClick={this.onClickDeleteSelected} hasSelected={hasSelected} />
        {hasSelected ? <SelectedMembers selectedNum={selectedKeys.length} /> : null}
        <FlexContainer>
          <ClubMembersTable
            clubMembersList={this.clubMembersList}
            rowSelection={rowSelection}
            onChange={this.onChange}
            sortedInfo={sortedInfo || {}}
          />
        </FlexContainer>
      </div>
    );
  }
}

ClubMembersPage.propTypes = {
  // isValidating: PropTypes.bool.isRequired,
  dispatchSelectedKeys: PropTypes.func.isRequired,
  dispatchDeselectAllLoading: PropTypes.func.isRequired,
  dispatchSelectAllLoading: PropTypes.func.isRequired,
  dispatchSortedInfo: PropTypes.func.isRequired,
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
  dispatchSave: save,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClubMembersPage);
