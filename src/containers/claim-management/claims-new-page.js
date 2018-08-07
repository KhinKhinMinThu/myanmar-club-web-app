import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, message } from 'antd';
import { SUCCESS_APPROVECLAIMS } from '../../actions/message';
import {
  ClaimsTable,
  DeSeletAllButton,
  SeletAllButton,
  SelectedMembers,
  ApproveSeletedButton,
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
import {
  postApproveClaims,
  setNewClaimsData,
  setOldClaimsData,
} from '../../reducers/claimmgmt/claimmgmt-data';

class NewClaimsPage extends Component {
  componentDidUpdate(prevProps) {
    const {
      claimmgmtData: { isPostApiLoading, postErrMsg },
      claimmgmtUI: { currentTab },
    } = this.props;
    if (currentTab !== 'tab1') return;

    const isApiPost = prevProps.claimmgmtData.isPostApiLoading && !isPostApiLoading;
    if (!isApiPost) return;

    if (postErrMsg) {
      message.error(postErrMsg);
    } else {
      message.success(SUCCESS_APPROVECLAIMS);
    }
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
      dispatchSelectedKeys([...this.claimsList.map(item => item.key)]);
    }, 1000);
  };

  // delete selected member accounts
  onClickApproveSelected = () => {
    const {
      claimmgmtUI: { selectedKeys },
      claimmgmtData: { newClaimsList, oldClaimsList },
      performApproveClaims,
      dispatchResetState,
      dispatchNewClaimsData,
      dispatchOldClaimsData,
    } = this.props;
    performApproveClaims(selectedKeys);
    dispatchResetState();
    const updatedNewClaims = newClaimsList.filter(
      item => !selectedKeys.includes(item.id),
    );
    const updatedOldClaims = newClaimsList.filter(item => selectedKeys.includes(item.id));

    dispatchNewClaimsData(updatedNewClaims);
    dispatchOldClaimsData([...oldClaimsList, ...updatedOldClaims]);
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
      key: `${item.id}`,
      ...item,
    }));
    return preparedList;
  };

  render() {
    const {
      claimmgmtUI: {
        selectedKeys,
        deselectAllLoading,
        selectAllLoading,
        sortedInfo,
        filteredInfo,
        isModalVisible,
        viewClaim,
      },
      claimmgmtData: { newClaimsList, isPostApiLoading },
      form: { getFieldDecorator },
      dispatchSelectedKeys,
      dispatchSortedInfo,
      dispatchFilteredInfo,
      dispatchModalVisibility,
      dispatchViewClaim,
    } = this.props;

    if (newClaimsList) this.claimsList = this.prepareList(newClaimsList);

    const rowSelection = {
      selectedRowKeys: selectedKeys,
      // handle check-box selection in the table
      onChange: keys => dispatchSelectedKeys(keys),
    };
    const hasSelected = selectedKeys.length > 0;

    return (
      <div>
        <SearchNamePanel
          onChange={(e) => {
            this.searchNameValue = e.target.value;
          }}
          decorator={getFieldDecorator}
          // handle onClick from SearchName button and onPressEnter from input field
          onSearch={() => dispatchFilteredInfo(
            this.searchNameValue
              ? { submittedBy: [this.searchNameValue] }
              : {},
          )
          }
          onClickReset={this.onClickReset}
        />

        <FlexContainer>
          <SeletAllButton
            onClick={this.onClickSelectAll}
            loading={selectAllLoading}
          />
          <DeSeletAllButton
            onClick={this.onClickDeselectAll}
            hasSelected={hasSelected}
            loading={deselectAllLoading}
          />
          <ApproveSeletedButton
            onClick={this.onClickApproveSelected}
            hasSelected={hasSelected}
            loading={isPostApiLoading}
          />
          {hasSelected ? (
            <SelectedMembers selectedNum={selectedKeys.length} />
          ) : null}
        </FlexContainer>

        <FlexContainer>
          <ClaimsTable
            claimsList={this.claimsList}
            rowSelection={rowSelection}
            onChange={(pagination, filters, sorter) => {
              dispatchSortedInfo(sorter);
              dispatchFilteredInfo(filters);
            }}
            sortedInfo={sortedInfo || {}}
            filteredInfo={filteredInfo || {}}
            showModal={(id) => {
              dispatchViewClaim(this.claimsList.find(item => item.id === id));
              dispatchModalVisibility(true);
            }}
          />
        </FlexContainer>
        <ClaimModal
          isModalVisible={isModalVisible}
          onCloseModal={() => dispatchModalVisibility(false)}
          viewClaim={viewClaim}
        />
      </div>
    );
  }
}

NewClaimsPage.propTypes = {
  form: PropTypes.shape({}).isRequired,
  dispatchSelectedKeys: PropTypes.func.isRequired,
  dispatchDeselectAllLoading: PropTypes.func.isRequired,
  dispatchSelectAllLoading: PropTypes.func.isRequired,
  dispatchSortedInfo: PropTypes.func.isRequired,
  dispatchFilteredInfo: PropTypes.func.isRequired,
  dispatchModalVisibility: PropTypes.func.isRequired,
  dispatchResetState: PropTypes.func.isRequired,
  dispatchViewClaim: PropTypes.func.isRequired,
  performApproveClaims: PropTypes.func.isRequired,

  dispatchNewClaimsData: PropTypes.func.isRequired,
  dispatchOldClaimsData: PropTypes.func.isRequired,

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

  dispatchNewClaimsData: setNewClaimsData,
  dispatchOldClaimsData: setOldClaimsData,
  performApproveClaims: postApproveClaims,
};

const FormNewClaimsPage = Form.create()(NewClaimsPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormNewClaimsPage);
