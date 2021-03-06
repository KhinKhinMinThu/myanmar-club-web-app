import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom/es';
import {
  Form, Row, Col, Modal, Spin, Alert,
} from 'antd';
import { BackButton } from '../shared-components';
import {
  SUCCESS_DELETEINCIDENT,
  CONFIRM_DELETEINCIDENTS,
} from '../../../actions/message';
import {
  IncidentsTable,
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
} from '../../../reducers/incidentmgmt/incidentmgmt-ui';
import {
  setIncidents,
  postDeleteIncidents,
  postSearchIncident,
  getSearchParams,
} from '../../../reducers/incidentmgmt/incidentmgmt-data';

class IncidentManagement extends Component {
  componentDidMount() {
    const { dispatchResetState, performGetSearchParams } = this.props;
    dispatchResetState();
    performGetSearchParams();
  }

  componentWillUpdate(nextProps) {
    const {
      incidentmgmtData: { isGetApiLoading },
    } = this.props;
    this.isApiCalled = !nextProps.incidentmgmtData.isGetApiLoading && isGetApiLoading;
  }

  componentDidUpdate(prevProps) {
    const {
      incidentmgmtData: { isPostApiLoading, postErrMsg },
    } = this.props;

    const isApiPost = prevProps.incidentmgmtData.isPostApiLoading && !isPostApiLoading;
    if (!isApiPost) return;

    if (postErrMsg) {
      Modal.error({ title: 'Error!', content: postErrMsg });
    } else if (this.actionType === 'delete') Modal.success({ title: 'Success!', content: SUCCESS_DELETEINCIDENT });
    this.actionType = 'none';
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
      dispatchSelectedKeys([...this.incidentsList.map(item => item.key)]);
    }, 1000);
  };

  // delete selected incidents
  onDeleteIncidents = () => {
    this.actionType = 'delete';
    const {
      incidentmgmtData: { incidents },
      incidentmgmtUI: { selectedKeys },
      performDeleteIncidents,
      dispatchSetIncidents,
    } = this.props;

    Modal.confirm({
      title: 'Confirmation!',
      content: CONFIRM_DELETEINCIDENTS,
      onOk() {
        performDeleteIncidents({ incidentsToDelete: selectedKeys });
        // to remove the selected incidents from the table display
        const updatedData = incidents.filter(
          item => !selectedKeys.includes(item.id),
        );
        dispatchSetIncidents(updatedData);
      },
    });
  };

  // handle onClick from Reset button
  onClickReset = () => {
    const {
      dispatchFilteredInfo,
      dispatchResetState,
      performSearchIncident,
      form: { resetFields },
    } = this.props;

    if (this.searchNameValue !== null) {
      dispatchFilteredInfo(null);
      resetFields(['searchName']);
      this.searchNameValue = null;
    }
    dispatchResetState();
    performSearchIncident({ default: '1' });
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
      history,
      incidentmgmtUI: {
        selectedKeys,
        deselectAllLoading,
        selectAllLoading,
        sortedInfo,
        filteredInfo,
      },
      incidentmgmtData: {
        incidents,
        isGetApiLoading,
        isPostApiLoading,
        submittedBy,
        incidentTypes,
        getErrMsg,
      },
      form: { getFieldDecorator, getFieldValue },
      dispatchSortedInfo,
      dispatchFilteredInfo,
      dispatchSelectedKeys,
      performSearchIncident,
    } = this.props;

    const rowSelection = {
      selectedRowKeys: selectedKeys,
      onChange: keys => dispatchSelectedKeys(keys),
    };
    const hasSelected = selectedKeys.length > 0;

    this.incidentsList = incidents ? this.prepareList(incidents) : [];
    const header = this.incidentsList
      ? 'Total incidents: '.concat(this.incidentsList.length)
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
              <h2>Incident Managment Page</h2>
            </div>
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
                  placeHolder="Search incident name"
                  // modal properties
                  incidentTypes={incidentTypes}
                  submittedBy={submittedBy}
                  performSearchIncident={performSearchIncident}
                  getFieldValue={getFieldValue}
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
                  onClick={this.onDeleteIncidents}
                  hasSelected={hasSelected}
                  isPostApiLoading={
                    this.actionType === 'delete' ? isPostApiLoading : false
                  }
                  placeHolder="Delete Selected Incident(s)"
                  icon="delete"
                />
                {hasSelected ? (
                  <SelectedInfo
                    selectedNum={selectedKeys.length}
                    placeHolder="incident"
                  />
                ) : null}
              </Col>
              <Col span={24}>
                <IncidentsTable
                  incidentsList={this.incidentsList}
                  rowSelection={rowSelection}
                  onChange={(pagination, filters, sorter) => {
                    dispatchSortedInfo(sorter);
                    dispatchFilteredInfo(filters);
                  }}
                  sortedInfo={sortedInfo || {}}
                  filteredInfo={filteredInfo || {}}
                  header={header}
                />
                <br />
                <BackButton history={history} />
              </Col>
            </Row>
          </div>
        )}
      </Spin>
    );
  }
}

IncidentManagement.propTypes = {
  history: PropTypes.shape({}).isRequired,
  form: PropTypes.shape({}).isRequired,
  dispatchSelectedKeys: PropTypes.func.isRequired,
  dispatchDeselectAllLoading: PropTypes.func.isRequired,
  dispatchSelectAllLoading: PropTypes.func.isRequired,
  dispatchSortedInfo: PropTypes.func.isRequired,
  dispatchFilteredInfo: PropTypes.func.isRequired,
  dispatchResetState: PropTypes.func.isRequired,

  dispatchSetIncidents: PropTypes.func.isRequired,
  performDeleteIncidents: PropTypes.func.isRequired,
  performSearchIncident: PropTypes.func.isRequired,
  performGetSearchParams: PropTypes.func.isRequired,

  incidentmgmtUI: PropTypes.shape({}).isRequired,
  incidentmgmtData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  incidentmgmtUI: state.incidentmgmt.ui,
  incidentmgmtData: state.incidentmgmt.data,
});
const mapDispatchToProps = {
  dispatchSelectedKeys: setSelectedKeys,
  dispatchDeselectAllLoading: setDeSelectAllLoading,
  dispatchSelectAllLoading: setSelectAllLoading,
  dispatchSortedInfo: setSortedInfo,
  dispatchFilteredInfo: setFilteredInfo,
  dispatchResetState: resetState,

  dispatchSetIncidents: setIncidents,
  performDeleteIncidents: postDeleteIncidents,
  performSearchIncident: postSearchIncident,
  performGetSearchParams: getSearchParams,
};

const FormIncidentManagementPage = Form.create()(IncidentManagement);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(FormIncidentManagementPage));
