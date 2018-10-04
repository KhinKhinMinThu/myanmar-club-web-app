import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Form, Spin, Alert, Row, Col,
} from 'antd';
import EventsTable from './components';
import { SearchNamePanel } from '../shared-components';
import {
  setSortedInfo,
  setFilteredInfo,
  resetState,
} from '../../../reducers/eventmgmt/eventmgmt-ui';
import { getEventsData } from '../../../reducers/eventmgmt/eventmgmt-data';

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

  // filter closed event
  prepareList = (sourceList) => {
    const preparedList = [];
    const now = moment();
    sourceList.map(
      item => (item.eventStatus !== '0' && now.isBefore(moment(item.endDate))
        ? preparedList.push({
          key: `${item.id}`,
          ...item,
          location: `${item.locationLine1}, ${item.locationLine2},
       ${item.locationPostalCode}`,
        })
        : ''),
    );
    return preparedList;
  };

  render() {
    const {
      eventmgmtUI: { sortedInfo, filteredInfo },
      eventmgmtData: { eventsData, isGetApiLoading, getErrMsg },
      form: { getFieldDecorator },
      dispatchSortedInfo,
      dispatchFilteredInfo,
    } = this.props;

    if (eventsData) this.eventsList = this.prepareList(eventsData);
    const header = this.eventsList
      ? 'Total events: '.concat(this.eventsList.length)
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
              <h2>Event(s) List</h2>
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
                  placeHolder="Search event name"
                />
              </Col>
              <Col span={24}>
                <EventsTable
                  eventsList={this.eventsList}
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
        )}
      </Spin>
    );
  }
}

EventManagementPage.propTypes = {
  form: PropTypes.shape({}).isRequired,
  dispatchSortedInfo: PropTypes.func.isRequired,
  dispatchFilteredInfo: PropTypes.func.isRequired,
  dispatchResetState: PropTypes.func.isRequired,

  performGetEventsData: PropTypes.func.isRequired,

  eventmgmtUI: PropTypes.shape({}).isRequired,
  eventmgmtData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  eventmgmtUI: state.eventmgmt.ui,
  eventmgmtData: state.eventmgmt.data,
});
const mapDispatchToProps = {
  dispatchSortedInfo: setSortedInfo,
  dispatchFilteredInfo: setFilteredInfo,
  dispatchResetState: resetState,

  performGetEventsData: getEventsData,
};

const FormEventManagementPage = Form.create()(EventManagementPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormEventManagementPage);
