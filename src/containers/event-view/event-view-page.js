import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Spin, Alert, Row, Col,
} from 'antd';
import { EventViewTabs } from './components';
import {
  resetState,
  setCurrentTab,
} from '../../reducers/eventmgmt/eventmgmt-ui';
import { getEventsData } from '../../reducers/eventmgmt/eventmgmt-data';

import EventPage from './event-page';
import RegistrationListPage from './event-rsvp-page';

class EventView extends Component {
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

  render() {
    const {
      eventmgmtUI: { currentTab },
      eventmgmtData: { isGetApiLoading, getErrMsg },
      dispatchResetState,
      dispatchCurrentTab,
    } = this.props;

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
              <h2>
                {currentTab === 'tab1' ? 'Event Page' : 'Event RSVP Page'}
              </h2>
            </div>
            <Row type="flex" justify="start">
              <Col span={24}>
                <EventViewTabs
                  props={this.props}
                  onChange={(tabKey) => {
                    dispatchResetState();
                    dispatchCurrentTab(tabKey);
                  }}
                  tabContents={[EventPage, RegistrationListPage]}
                />
              </Col>
            </Row>
          </div>
        )}
      </Spin>
    );
  }
}

EventView.propTypes = {
  dispatchResetState: PropTypes.func.isRequired,
  dispatchCurrentTab: PropTypes.func.isRequired,
  performGetEventsData: PropTypes.func.isRequired,

  eventmgmtUI: PropTypes.shape({}).isRequired,
  eventmgmtData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  eventmgmtUI: state.eventmgmt.ui,
  eventmgmtData: state.eventmgmt.data,
});

const mapDispatchToProps = {
  dispatchResetState: resetState,
  dispatchCurrentTab: setCurrentTab,
  performGetEventsData: getEventsData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventView);
