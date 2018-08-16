import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Spin, Alert, Row, Col,
} from 'antd';
import { ClaimTabs } from './components';
import {
  resetState,
  setCurrentTab,
} from '../../../reducers/claimmgmt/claimmgmt-ui';
import { getClaimsData } from '../../../reducers/claimmgmt/claimmgmt-data';

import NewClaimsPage from './claims-new-page';
import ApprovedClaimsPage from './claims-approved-page';

class ClaimManagement extends Component {
  componentDidMount() {
    const { dispatchResetState, performGetClaimsData } = this.props;
    dispatchResetState();
    performGetClaimsData();
  }

  componentWillUpdate(nextProps) {
    const {
      claimmgmtData: { isGetApiLoading },
    } = this.props;
    this.isApiCalled = !nextProps.claimmgmtData.isGetApiLoading && isGetApiLoading;
  }

  render() {
    const {
      claimmgmtUI: { currentTab },
      claimmgmtData: { isGetApiLoading, getErrMsg },
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
                  ? 'New Claim(s) Page'
                  : 'Approved Claim(s) Page'}
              </h2>
            </div>
            <Row type="flex" justify="start">
              <Col span={24}>
                <ClaimTabs
                  onChange={(tabKey) => {
                    dispatchResetState();
                    dispatchCurrentTab(tabKey);
                  }}
                  tabContents={[NewClaimsPage, ApprovedClaimsPage]}
                />
              </Col>
            </Row>
          </div>
        )}
      </Spin>
    );
  }
}
ClaimManagement.propTypes = {
  dispatchCurrentTab: PropTypes.func.isRequired,
  dispatchResetState: PropTypes.func.isRequired,
  performGetClaimsData: PropTypes.func.isRequired,

  claimmgmtUI: PropTypes.shape({}).isRequired,
  claimmgmtData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  claimmgmtUI: state.claimmgmt.ui,
  claimmgmtData: state.claimmgmt.data,
});

const mapDispatchToProps = {
  dispatchCurrentTab: setCurrentTab,
  dispatchResetState: resetState,
  performGetClaimsData: getClaimsData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClaimManagement);
