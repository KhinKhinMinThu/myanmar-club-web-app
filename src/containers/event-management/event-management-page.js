import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form, message, Spin, Alert, Row, Col,
} from 'antd';
import { SUCCESS_DELETEEVENT } from '../../actions/message';
import {
  EventsTable,
  DeSeletAllButton,
  SeletAllButton,
  SelectedEvents,
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
} from '../../reducers/eventmgmt/eventmgmt-ui';
import {
  getEventsData,
  setEventsData,
  postDeleteEvent,
} from '../../reducers/eventmgmt/eventmgmt-data';

class EventManagementPage extends Component {
  componentDidMount() {
    const { dispatchResetState, performGetEventsData } = this.props;
    dispatchResetState();
    performGetEventsData();
  }

  componentWillUpdate(nextProps) {
    const {
      eventmgmtData: { isGetApiLoading },
    } = this.props;
    this.isApiCalled = !nextProps.eventmgmtData.isGetApiLoading && isGetApiLoading;
  }

  componentDidUpdate(prevProps) {
    const {
      eventmgmtData: { isPostApiLoading, postErrMsg },
    } = this.props;

    const isApiPost = prevProps.eventmgmtData.isPostApiLoading && !isPostApiLoading;
    if (!isApiPost) return;

    if (postErrMsg) {
      message.error(postErrMsg);
    } else {
      message.success(SUCCESS_DELETEEVENT);
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
      dispatchSelectedKeys([...this.eventsList.map(item => item.key)]);
    }, 1000);
  };

  // handle check-box selection in the table
  onSelectChange = (selectedKeys) => {
    const { dispatchSelectedKeys } = this.props;
    dispatchSelectedKeys(selectedKeys);
  };

  // delete selected events
  onClickDeleteSelected = () => {
    const {
      eventmgmtData: { eventsData },
      eventmgmtUI: { selectedKeys },
      performDeleteEvent,
      dispatchSetEventsData,
    } = this.props;

    performDeleteEvent({ eventsToDelete: selectedKeys });
    // to remove the selected event from the table display
    const updatedData = eventsData.filter(
      item => !selectedKeys.includes(item.id),
    );
    dispatchSetEventsData(updatedData);
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
      location: `${item.locationLine1}, ${item.locationLine2},
       ${item.locationPostalCode}`,
    }));
    return preparedList;
  };

  render() {
    const {
      eventmgmtUI: {
        selectedKeys,
        deselectAllLoading,
        selectAllLoading,
        sortedInfo,
        filteredInfo,
      },
      eventmgmtData: {
        eventsData,
        isGetApiLoading,
        getErrMsg,
        isPostApiLoading,
      },
      form: { getFieldDecorator },
      dispatchSortedInfo,
      dispatchFilteredInfo,
    } = this.props;

    const rowSelection = {
      selectedRowKeys: selectedKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedKeys.length > 0;

    if (eventsData) this.eventsList = this.prepareList(eventsData);

    return (
      <Spin spinning={isGetApiLoading} size="large">
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
              <h2>Event Managment Page</h2>
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
                />
                {hasSelected ? (
                  <SelectedEvents selectedNum={selectedKeys.length} />
                ) : null}
              </Col>
              <Col span={24}>
                <EventsTable
                  eventsList={this.eventsList}
                  rowSelection={rowSelection}
                  onChange={(pagination, filters, sorter) => {
                    dispatchSortedInfo(sorter);
                    dispatchFilteredInfo(filters);
                  }}
                  sortedInfo={sortedInfo || {}}
                  filteredInfo={filteredInfo || {}}
                />
              </Col>
            </Row>
          </div>
        )}
      </Spin>
    );
  }
}

EventManagementPage.propTypes = {
  form: PropTypes.shape({}).isRequired,
  dispatchSelectedKeys: PropTypes.func.isRequired,
  dispatchDeselectAllLoading: PropTypes.func.isRequired,
  dispatchSelectAllLoading: PropTypes.func.isRequired,
  dispatchSortedInfo: PropTypes.func.isRequired,
  dispatchFilteredInfo: PropTypes.func.isRequired,
  dispatchResetState: PropTypes.func.isRequired,

  performGetEventsData: PropTypes.func.isRequired,
  dispatchSetEventsData: PropTypes.func.isRequired,
  performDeleteEvent: PropTypes.func.isRequired,

  eventmgmtUI: PropTypes.shape({}).isRequired,
  eventmgmtData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  eventmgmtUI: state.eventmgmt.ui,
  eventmgmtData: state.eventmgmt.data,
});
const mapDispatchToProps = {
  dispatchSelectedKeys: setSelectedKeys,
  dispatchDeselectAllLoading: setDeSelectAllLoading,
  dispatchSelectAllLoading: setSelectAllLoading,
  dispatchSortedInfo: setSortedInfo,
  dispatchFilteredInfo: setFilteredInfo,
  dispatchResetState: resetState,

  performGetEventsData: getEventsData,
  dispatchSetEventsData: setEventsData,
  performDeleteEvent: postDeleteEvent,
};

const FormEventManagementPage = Form.create()(EventManagementPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormEventManagementPage);
