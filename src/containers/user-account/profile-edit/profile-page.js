import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Spin, Alert, Row, Col,
} from 'antd';
import { ProfileTabs } from './components';
import {
  resetState,
  setCurrentTab,
} from '../../../reducers/eventmgmt/eventmgmt-ui';
import {
  getMemberData,
  getMemberFormFields,
} from '../../../reducers/membermgmt/membermgmt-data';
import MemberEditPage from './profile-edit-page';
import MemberRenewalPage from './profile-renewal-page';

class MemberProfile extends Component {
  componentDidMount() {
    const {
      computedMatch: {
        params: { id },
      },
      performGetMemberFormFields,
      performGetMemberData,
    } = this.props;
    performGetMemberFormFields();
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
                  ? 'Edit Member Page'
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
                  tabContents={[MemberEditPage, MemberRenewalPage]}
                />
              </Col>
            </Row>
          </div>
        )}
      </Spin>
    );
  }
}

MemberProfile.propTypes = {
  computedMatch: PropTypes.shape({}).isRequired,
  dispatchResetState: PropTypes.func.isRequired,
  dispatchCurrentTab: PropTypes.func.isRequired,
  performGetMemberData: PropTypes.func.isRequired,
  performGetMemberFormFields: PropTypes.func.isRequired,

  membermgmtUI: PropTypes.shape({}).isRequired,
  membermgmtData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  membermgmtUI: state.membermgmt.ui,
  membermgmtData: state.membermgmt.data,
});

const mapDispatchToProps = {
  dispatchResetState: resetState,
  dispatchCurrentTab: setCurrentTab,
  performGetMemberData: getMemberData,
  performGetMemberFormFields: getMemberFormFields,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MemberProfile);
