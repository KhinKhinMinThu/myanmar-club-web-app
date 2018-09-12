import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Spin, Alert, Row, Col,
} from 'antd';
import { ProfileTabs } from '../shared-components';
import {
  resetState,
  setCurrentTab,
} from '../../../reducers/eventmgmt/eventmgmt-ui';
import {
  getMemberData,
  resetMemberData,
} from '../../../reducers/membermgmt/membermgmt-data';
import ProfileEditPage from './profile-edit-page';
import ProfileRenewalPage from './profile-renewal-page';

class Profile extends Component {
  componentDidMount() {
    const {
      loginData: { id },
      // need to reset to prevent from showing member data in profile
      // if the user goes from edit-member to profile.
      performGetMemberData,
      performResetMemberData,
    } = this.props;
    performResetMemberData();
    // performGetMemberFormFields();
    if (id) performGetMemberData({ id });
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
      dispatchResetState,
      dispatchCurrentTab,
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
                  ? 'Edit Profile Page'
                  : 'Membership Renewal Page'}
              </h2>
            </div>
            <Row type="flex" justify="start">
              <Col span={24}>
                <ProfileTabs
                  props={this.props}
                  onChange={(tabKey) => {
                    dispatchResetState();
                    dispatchCurrentTab(tabKey);
                  }}
                  tabContents={[ProfileEditPage, ProfileRenewalPage]}
                />
              </Col>
            </Row>
          </div>
        )}
      </Spin>
    );
  }
}

Profile.propTypes = {
  dispatchResetState: PropTypes.func.isRequired,
  dispatchCurrentTab: PropTypes.func.isRequired,
  performGetMemberData: PropTypes.func.isRequired,
  performResetMemberData: PropTypes.func.isRequired,

  membermgmtUI: PropTypes.shape({}).isRequired,
  membermgmtData: PropTypes.shape({}).isRequired,
  loginData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  membermgmtUI: state.membermgmt.ui,
  membermgmtData: state.membermgmt.data,
  loginData: state.login.data,
});

const mapDispatchToProps = {
  dispatchResetState: resetState,
  dispatchCurrentTab: setCurrentTab,
  performGetMemberData: getMemberData,
  performResetMemberData: resetMemberData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
