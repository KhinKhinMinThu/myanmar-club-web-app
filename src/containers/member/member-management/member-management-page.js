import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Spin, Alert, Row, Col,
} from 'antd';
import { MemberTabs } from './components';
import {
  resetState,
  setCurrentTab,
} from '../../../reducers/membermgmt/membermgmt-ui';
import { getMembersData } from '../../../reducers/membermgmt/membermgmt-data';

import EcMembersPage from './members-ec-page';
import ClubMembersPage from './members-club-page';

class MemberManagement extends Component {
  componentDidMount() {
    const { dispatchResetState, performGetMembersData } = this.props;
    dispatchResetState();
    performGetMembersData();
  }

  componentWillUpdate(nextProps) {
    const {
      membermgmtData: { isGetApiLoading },
    } = this.props;
    this.isApiCalled = !nextProps.membermgmtData.isGetApiLoading && isGetApiLoading;
  }

  render() {
    const {
      membermgmtUI: { currentTab },
      membermgmtData: { isGetApiLoading, getErrMsg },
      dispatchCurrentTab,
      dispatchResetState,
    } = this.props;

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
              <h2>
                {currentTab === 'tab1'
                  ? 'Executive Committee Member(s) Page'
                  : 'Club Member(s) Page'}
              </h2>
            </div>
            <Row type="flex" justify="start">
              <Col span={24}>
                <MemberTabs
                  onChange={(tabKey) => {
                    dispatchResetState();
                    dispatchCurrentTab(tabKey);
                  }}
                  tabContents={[EcMembersPage, ClubMembersPage]}
                />
              </Col>
            </Row>
          </div>
        )}
      </Spin>
    );
  }
}
MemberManagement.propTypes = {
  dispatchCurrentTab: PropTypes.func.isRequired,
  dispatchResetState: PropTypes.func.isRequired,
  performGetMembersData: PropTypes.func.isRequired,

  membermgmtUI: PropTypes.shape({}).isRequired,
  membermgmtData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  membermgmtUI: state.membermgmt.ui,
  membermgmtData: state.membermgmt.data,
});

const mapDispatchToProps = {
  dispatchCurrentTab: setCurrentTab,
  dispatchResetState: resetState,
  performGetMembersData: getMembersData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MemberManagement);
