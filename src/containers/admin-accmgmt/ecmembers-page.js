import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  EcMembersTable,
  DeSeletAllButton,
  SeletAllButton,
  SelectedMembers,
  DeleteSeletedButton,
} from './components';
import { FlexContainer } from './styled-components';
import {
  setECSelectedKeys,
  setDeSelectAllLoading,
  setSelectAllLoading,
  setSortedInfo,
} from '../../reducers/accmgmt/accmgmt-ui';

class EcMembersPage extends Component {
  componentWillMount() {
    const { accmgmtData } = this.props;
    const { membersData } = accmgmtData;
    this.ecMembersList = this.prepareList(membersData.filter(item => item.isec_member === '1'));
  }

  onClickDeselectAll = () => {
    const { dispatchECSelectedKeys, dispatchDeselectAllLoading } = this.props;
    dispatchDeselectAllLoading(true);
    setTimeout(() => {
      dispatchDeselectAllLoading(false);
      dispatchECSelectedKeys([]);
    }, 1000);
  };

  onClickSelectAll = () => {
    const { dispatchECSelectedKeys, dispatchSelectAllLoading } = this.props;
    dispatchSelectAllLoading(true);
    setTimeout(() => {
      dispatchSelectAllLoading(false);
      dispatchECSelectedKeys([...this.ecMembersList.map(item => item.key)]);
    }, 1000);
  };

  onSelectChange = (ecSelectedKeys) => {
    const { dispatchECSelectedKeys } = this.props;
    dispatchECSelectedKeys(ecSelectedKeys);
  };

  onChange = (pagination, filters, sorter) => {
    const { dispatchSortedInfo } = this.props;
    dispatchSortedInfo(sorter);
  };

  onClickDeleteSelected = (ecSelectedKeys) => {
    // membersToDelete
    console.log('memberstodelete', ecSelectedKeys);
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
      ecSelectedKeys, deselectAllLoading, selectAllLoading, sortedInfo,
    } = accmgmtUI;
    const rowSelection = {
      selectedRowKeys: ecSelectedKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = ecSelectedKeys.length > 0;

    return (
      <div>
        <DeSeletAllButton
          onClick={this.onClickDeselectAll}
          hasSelected={hasSelected}
          loading={deselectAllLoading}
        />
        <SeletAllButton onClick={this.onClickSelectAll} loading={selectAllLoading} />
        <DeleteSeletedButton
          onClick={this.onClickDeleteSelected(ecSelectedKeys)}
          hasSelected={hasSelected}
        />
        {hasSelected ? <SelectedMembers selectedNum={ecSelectedKeys.length} /> : null}
        <FlexContainer>
          <EcMembersTable
            ecMembersList={this.ecMembersList}
            rowSelection={rowSelection}
            onChange={this.onChange}
            sortedInfo={sortedInfo || {}}
          />
        </FlexContainer>
      </div>
    );
  }
}

EcMembersPage.propTypes = {
  // isValidating: PropTypes.bool.isRequired,
  dispatchECSelectedKeys: PropTypes.func.isRequired,
  dispatchDeselectAllLoading: PropTypes.func.isRequired,
  dispatchSelectAllLoading: PropTypes.func.isRequired,
  dispatchSortedInfo: PropTypes.func.isRequired,
  accmgmtUI: PropTypes.shape({}).isRequired,
  accmgmtData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  accmgmtUI: state.accmgmt.ui,
  accmgmtData: state.accmgmt.data,
});
const mapDispatchToProps = {
  dispatchECSelectedKeys: setECSelectedKeys,
  dispatchDeselectAllLoading: setDeSelectAllLoading,
  dispatchSelectAllLoading: setSelectAllLoading,
  dispatchSortedInfo: setSortedInfo,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EcMembersPage);
