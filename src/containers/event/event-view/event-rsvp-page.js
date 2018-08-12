import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form, Row, Col, message,
} from 'antd';
import { SUCCESS_DELETERSVP, SHOWFOR } from '../../../actions/message';
import { RegistrationTable } from './components';
import {
  DeSeletAllButton,
  SeletAllButton,
  SelectedInfo,
  DeleteSeletedButton,
  SearchNamePanel,
} from '../shared-components';
import {
  setSelectedKeys,
  setDeSelectAllLoading,
  setSelectAllLoading,
  setSortedInfo,
  setFilteredInfo,
  resetState,
} from '../../../reducers/eventmgmt/eventmgmt-ui';
import {
  setEventsData,
  postDeleteRSVP,
} from '../../../reducers/eventmgmt/eventmgmt-data';

class EventRSVPPage extends Component {
  componentDidUpdate(prevProps) {
    const {
      eventmgmtData: { isPostApiLoading, postErrMsg },
    } = this.props;

    const isApiPost = prevProps.eventmgmtData.isPostApiLoading && !isPostApiLoading;
    if (!isApiPost) return;

    if (postErrMsg) {
      message.error(postErrMsg, SHOWFOR);
    } else {
      message.success(SUCCESS_DELETERSVP, SHOWFOR);
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
      dispatchSelectedKeys([...this.registrationList.map(item => item.key)]);
    }, 1000);
  };

  // delete selected rsvp
  onClickDeleteSelected = () => {
    const {
      computedMatch: {
        params: { id },
      },
      eventmgmtData: { eventsData },
      eventmgmtUI: { selectedKeys },
      performDeleteRSVP,
      dispatchSetEventsData,
      dispatchResetState,
    } = this.props;
    performDeleteRSVP({ eventRSVPToDelete: selectedKeys });

    const event = eventsData.find(item => item.id === id);
    const { eventRSVPData } = event;

    selectedKeys.forEach((item) => {
      const index = eventRSVPData.findIndex(rsvp => rsvp.id === item);
      if (index !== -1) eventRSVPData.splice(index, 1);
    });
    dispatchSetEventsData(eventsData);
    dispatchResetState();
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
      computedMatch: {
        params: { id },
      },
      eventmgmtUI: {
        selectedKeys,
        deselectAllLoading,
        selectAllLoading,
        sortedInfo,
        filteredInfo,
      },
      eventmgmtData: { eventsData, isPostApiLoading },
      form: { getFieldDecorator },
      dispatchSortedInfo,
      dispatchFilteredInfo,
      dispatchSelectedKeys,
    } = this.props;

    const rowSelection = {
      selectedRowKeys: selectedKeys,
      onChange: keys => dispatchSelectedKeys(keys),
    };
    const hasSelected = selectedKeys.length > 0;

    const eventData = eventsData ? eventsData.find(item => item.id === id) : {};
    this.registrationList = this.prepareList(eventData.eventRSVPData);

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
              placeHolder="Search name"
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
              placeHolder="Delete Selected Registration(s)"
            />
            {hasSelected ? (
              <SelectedInfo
                selectedNum={selectedKeys.length}
                placeHolder="registration"
              />
            ) : null}
          </Col>
          <Col span={24}>
            <RegistrationTable
              registrationList={this.registrationList}
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
    );
  }
}

EventRSVPPage.propTypes = {
  computedMatch: PropTypes.shape({}).isRequired,
  form: PropTypes.shape({}).isRequired,
  dispatchSelectedKeys: PropTypes.func.isRequired,
  dispatchDeselectAllLoading: PropTypes.func.isRequired,
  dispatchSelectAllLoading: PropTypes.func.isRequired,
  dispatchSortedInfo: PropTypes.func.isRequired,
  dispatchFilteredInfo: PropTypes.func.isRequired,
  dispatchResetState: PropTypes.func.isRequired,

  dispatchSetEventsData: PropTypes.func.isRequired,
  performDeleteRSVP: PropTypes.func.isRequired,

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

  dispatchSetEventsData: setEventsData,
  performDeleteRSVP: postDeleteRSVP,
};

const FormEventRSVPPage = Form.create()(EventRSVPPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormEventRSVPPage);
