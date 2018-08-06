import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  DASHBOARD,
  PROFILE,
  LOGOUT,
  ROLE_MANAGEMENT,
  ACCOUNT_MANAGEMENT,
  EDIT_MEMBER,
  CLAIM_MANAGEMENT,
  EVENT_TRANSACTION,
  EVENT_MANAGEMENT,
  EVENT_CREATION,
  EVENT_VIEW,
  EVENT_EDIT,
} from '../../actions/location';
import { FlexContainer } from './styled-components';
import MenuPanel from './components';
import SignupPage2 from '../signup-page2';
import Dashboard from './home-ex';
import RoleManagementPage from '../role-management';
import AccManagementPage from '../account-management';
import MemberManagementPage from '../member-management';
import ClaimManagementPage from '../claim-management';
import EventTransactionPage from '../event-transaction';
import EventCreation from '../event-creation';
import EventManagementPage from '../event-management';
import EventEditPage from '../event-edit';
import EventViewPage from '../event-view';

class PrivateAdminPage extends Component {
  // direct urls (e.g., type localhost:3000/dashboard and enter)
  switchPage = (pathname) => {
    switch (pathname) {
      case DASHBOARD:
        return Dashboard;
      case PROFILE:
        return SignupPage2;
      case LOGOUT:
        return Dashboard;
      case ROLE_MANAGEMENT:
        return RoleManagementPage;
      case ACCOUNT_MANAGEMENT:
        return AccManagementPage;
      case EDIT_MEMBER:
        return MemberManagementPage;
      case CLAIM_MANAGEMENT:
        return ClaimManagementPage;
      case EVENT_TRANSACTION:
        return EventTransactionPage;
      case EVENT_MANAGEMENT:
        return EventManagementPage;
      case EVENT_CREATION:
        return EventCreation;
      case EVENT_VIEW:
        return EventViewPage;
      case EVENT_EDIT:
        return EventEditPage;
      default:
        return Dashboard;
    }
  };

  render() {
    const {
      computedMatch: { params },
    } = this.props;
    const { pathname } = params;
    const Page = this.switchPage(`/${pathname}`);
    console.log('private admin props:', this.props);
    console.log('pathname:', pathname);
    return (
      <FlexContainer>
        <MenuPanel selectedKeys={['/'.concat(pathname)]} isAdmin />
        <Page {...this.props} />
      </FlexContainer>
    );
  }
}

PrivateAdminPage.propTypes = {
  computedMatch: PropTypes.shape({}).isRequired,
};

export default connect()(PrivateAdminPage);
