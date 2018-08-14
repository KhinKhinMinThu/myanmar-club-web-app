import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form, message, Row, Col,
} from 'antd';
import { SUCCESS_UNAPPROVECLAIMS, SHOWFOR } from '../../../actions/message';
import {
  ClaimsTable,
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
} from '../../../reducers/claimmgmt/claimmgmt-ui';
import {
  postUnApproveClaims,
  setNewClaimsData,
  setOldClaimsData,
} from '../../../reducers/claimmgmt/claimmgmt-data';

class ApprovedClaimsPage extends Component {
  componentDidUpdate(prevProps) {
    const {
      claimmgmtData: { isPostApiLoading, postErrMsg },
      claimmgmtUI: { currentTab },
    } = this.props;
    if (currentTab !== 'tab2') return;

    const isApiPost = prevProps.claimmgmtData.isPostApiLoading && !isPostApiLoading;
    if (!isApiPost) return;

    if (postErrMsg) {
      message.error(postErrMsg, SHOWFOR);
    } else {
      message.success(SUCCESS_UNAPPROVECLAIMS, SHOWFOR);
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
      dispatchSelectedKeys([...this.claimsList.map(item => item.key)]);
    }, 1000);
  };

  onClickDeleteSelected = () => {
    const {
      claimmgmtUI: { selectedKeys },
      claimmgmtData: { newClaimsList, oldClaimsList },
      performUnApproveClaims,
      dispatchResetState,
      dispatchNewClaimsData,
      dispatchOldClaimsData,
    } = this.props;

    performUnApproveClaims({ claimsToUnApprove: selectedKeys });
    dispatchResetState();

    const updatedNewClaims = oldClaimsList.filter(item => selectedKeys.includes(item.id));
    const updatedOldClaims = oldClaimsList.filter(
      item => !selectedKeys.includes(item.id),
    );
    dispatchNewClaimsData([...newClaimsList, ...updatedNewClaims]);
    dispatchOldClaimsData(updatedOldClaims);
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
      },
      claimmgmtData: { oldClaimsList, isPostApiLoading },
      form: { getFieldDecorator },
      dispatchSelectedKeys,
      dispatchSortedInfo,
      dispatchFilteredInfo,
    } = this.props;

    if (oldClaimsList) this.claimsList = this.prepareList(oldClaimsList);
    const header = this.claimsList
      ? 'Approved Claim(s): '.concat(this.claimsList.length)
      : '';

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
                  ? { submittedBy: [this.searchNameValue.toLowerCase()] }
                  : {},
              )
              }
              onClickReset={this.onClickReset}
              placeHolder="Search submitted by"
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
              placeHolder="Unapprove Selected Claim(s)"
            />
            {hasSelected ? (
              <SelectedInfo
                selectedNum={selectedKeys.length}
                placeHolder="claim"
              />
            ) : null}
          </Col>
          <Col span={24}>
            <ClaimsTable
              claimsList={this.claimsList}
              rowSelection={rowSelection}
              onChange={(pagination, filters, sorter) => {
                dispatchSortedInfo(sorter);
                dispatchFilteredInfo(filters);
              }}
              sortedInfo={sortedInfo || {}}
              filteredInfo={filteredInfo || {}}
              header={header}
            />
          </Col>
        </Row>
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
  dispatchResetState: PropTypes.func.isRequired,
  performUnApproveClaims: PropTypes.func.isRequired,

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
  dispatchResetState: resetState,

  dispatchNewClaimsData: setNewClaimsData,
  dispatchOldClaimsData: setOldClaimsData,
  performUnApproveClaims: postUnApproveClaims,
};

const FormApprovedClaimsPage = Form.create()(ApprovedClaimsPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormApprovedClaimsPage);
