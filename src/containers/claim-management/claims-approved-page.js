import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form } from 'antd';
import {
  ClaimsTable,
  DeSeletAllButton,
  SeletAllButton,
  SelectedMembers,
  UnapproveSeletedButton,
  SearchNamePanel,
  ClaimModal,
} from './components';
import { FlexContainer } from './styled-components';
import {
  setSelectedKeys,
  setDeSelectAllLoading,
  setSelectAllLoading,
  setSortedInfo,
  setFilteredInfo,
  setModalVisibility,
  setViewClaim,
  resetState,
} from '../../reducers/claimmgmt/claimmgmt-ui';
import { save } from '../../reducers/claimmgmt/claimmgmt-data';

class ApprovedClaimsPage extends Component {
  // get the memberlist from API
  componentWillMount() {
    const {
      claimmgmtData: { claimsData },
    } = this.props;
    this.newClaimsList = this.prepareList(claimsData.filter(item => item.isApproved === '1'));
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
      dispatchSelectedKeys([...this.newClaimsList.map(item => item.key)]);
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
  onClickUnApproveSelected = () => {
    const {
      claimmgmtUI: { selectedKeys },
      dispatchSave,
      dispatchResetState,
    } = this.props;
    dispatchSave({ claimsToUnApprove: selectedKeys });
    dispatchResetState();
    // to remove the selected claims from the table display
    this.newClaimsList = this.newClaimsList.filter(item => !selectedKeys.includes(item.id));
  };

  // handle input changes from searchName field
  onChangeSearchName = (e) => {
    this.searchNameValue = e.target.value;
  };

  // handle onClick from SearchName button and onPressEnter from input field
  onSearchName = () => {
    const filters = this.searchNameValue ? { submittedBy: [this.searchNameValue] } : {};
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

  // handle close button on Modal pop-up
  onCloseModal = () => {
    const { dispatchModalVisibility } = this.props;
    dispatchModalVisibility(false);
  };

  // handle open-folder icon click from table row
  showModal = (id) => {
    const {
      claimmgmtData: { claimsData },
      dispatchModalVisibility,
      dispatchViewClaim,
    } = this.props;
    const viewClaim = claimsData.find(item => item.id === id);
    dispatchModalVisibility(true);
    dispatchViewClaim(viewClaim);
  };

  // add the key and format role_names of member list
  prepareList = (sourceList) => {
    const preparedList = [];
    sourceList.map(item => preparedList.push({
      key: `${item.id}`,
      ...item,
    }));
    return preparedList;
  };

  render() {
    const {
      claimmgmtUI,
      form: { getFieldDecorator },
    } = this.props;
    const {
      selectedKeys,
      deselectAllLoading,
      selectAllLoading,
      sortedInfo,
      filteredInfo,
      isModalVisible,
      viewClaim,
    } = claimmgmtUI;
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
          <UnapproveSeletedButton
            onClick={this.onClickUnApproveSelected}
            hasSelected={hasSelected}
          />
          {hasSelected ? <SelectedMembers selectedNum={selectedKeys.length} /> : null}
        </FlexContainer>

        <FlexContainer>
          <ClaimsTable
            newClaimsList={this.newClaimsList}
            rowSelection={rowSelection}
            onChange={this.onChange}
            sortedInfo={sortedInfo || {}}
            filteredInfo={filteredInfo || {}}
            showModal={id => this.showModal(id)}
          />
        </FlexContainer>
        <ClaimModal
          isModalVisible={isModalVisible}
          onCloseModal={this.onCloseModal}
          viewClaim={viewClaim}
        />
      </div>
    );
  }
}

ApprovedClaimsPage.propTypes = {
  form: PropTypes.shape({}).isRequired,
  dispatchSelectedKeys: PropTypes.func.isRequired,
  dispatchDeselectAllLoading: PropTypes.func.isRequired,
  dispatchSelectAllLoading: PropTypes.func.isRequired,
  dispatchSortedInfo: PropTypes.func.isRequired,
  dispatchFilteredInfo: PropTypes.func.isRequired,
  dispatchModalVisibility: PropTypes.func.isRequired,
  dispatchResetState: PropTypes.func.isRequired,
  dispatchViewClaim: PropTypes.func.isRequired,
  dispatchSave: PropTypes.func.isRequired,

  claimmgmtUI: PropTypes.shape({}).isRequired,
  claimmgmtData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  claimmgmtUI: state.claimmgmt.ui,
  claimmgmtData: state.claimmgmt.data,
});
const mapDispatchToProps = {
  dispatchSelectedKeys: setSelectedKeys,
  dispatchDeselectAllLoading: setDeSelectAllLoading,
  dispatchSelectAllLoading: setSelectAllLoading,
  dispatchSortedInfo: setSortedInfo,
  dispatchFilteredInfo: setFilteredInfo,
  dispatchModalVisibility: setModalVisibility,
  dispatchViewClaim: setViewClaim,
  dispatchResetState: resetState,
  dispatchSave: save,
};

const FormApprovedClaimsPage = Form.create()(ApprovedClaimsPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormApprovedClaimsPage);
