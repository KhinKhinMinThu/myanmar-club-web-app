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
  ADMIN_EVENT_CREATE,
  ADMIN_EVENT_VIEW,
  ADMIN_EVENT_EDIT,
  ADMIN_EVENTREGISTRATION_VIEW,
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
import CreateNewEventPage from '../admin-createnewevent';
import EditEventPage from '../admin-editevent';
import ViewEventPage from '../admin-viewevent';
import ViewEventRegistrationPage from '../admin-eventregistration';

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
      case ADMIN_EVENT_CREATE:
        return CreateNewEventPage;
      case ADMIN_EVENT_EDIT:
        return EditEventPage;
      case ADMIN_EVENT_VIEW:
        return ViewEventPage;
      case ADMIN_EVENTREGISTRATION_VIEW:
        return ViewEventRegistrationPage;
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
