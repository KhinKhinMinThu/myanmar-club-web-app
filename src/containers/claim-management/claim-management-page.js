import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin, Alert } from 'antd';
import { ClaimTabs } from './components';
import {
  resetState,
  setCurrentTab,
} from '../../reducers/claimmgmt/claimmgmt-ui';
import { getClaimsData } from '../../reducers/claimmgmt/claimmgmt-data';

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
      claimmgmtData: { isApiLoading },
    } = this.props;
    this.isApiCalled = !nextProps.claimmgmtData.isApiLoading && isApiLoading;
  }

  render() {
    const {
      claimmgmtData: { isApiLoading, getErrMsg },
      dispatchCurrentTab,
      dispatchResetState,
    } = this.props;
    return (
      <Spin spinning={isApiLoading} size="large">
        {this.isApiCalled && getErrMsg ? (
          <Alert
            message="Error"
            description={getErrMsg}
            type="error"
            showIcon
          />
        ) : (
          <ClaimTabs
            onChange={(currentTab) => {
              dispatchResetState();
              dispatchCurrentTab(currentTab);
            }}
            tabContents={[NewClaimsPage, ApprovedClaimsPage]}
          />
        )}
      </Spin>
    );
  }
}
ClaimManagement.propTypes = {
  dispatchCurrentTab: PropTypes.func.isRequired,
  dispatchResetState: PropTypes.func.isRequired,
  performGetClaimsData: PropTypes.func.isRequired,

  claimmgmtData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
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
