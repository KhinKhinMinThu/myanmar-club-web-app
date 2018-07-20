import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  DASHBOARD,
  PROFILE,
  LOGOUT,
  ADMIN_ROLEMGMT,
  ADMIN_ACCMGMT,
  ADMIN_MEMBER_VIEW,
  ADMIN_MEMBER_EDIT,
} from '../../actions/location';
import { FlexContainer } from './styled-components';
import MenuPanel from './components';
import SignupPage2 from '../signup-page2';
import Dashboard from './home-ex';
import RoleManagementPage from '../admin-rolemgmt';
import AccManagementPage from '../admin-accmgmt';
import MemberManagementPage from '../admin-member-profile';

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
      case ADMIN_ROLEMGMT:
        return RoleManagementPage;
      case ADMIN_ACCMGMT:
        return AccManagementPage;
      case ADMIN_MEMBER_VIEW:
      case ADMIN_MEMBER_EDIT:
        return MemberManagementPage;
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

    return (
      <FlexContainer>
        <MenuPanel selectedKeys={[pathname]} isAdmin />
        <Page {...this.props} />
      </FlexContainer>
    );
  }
}

PrivateAdminPage.propTypes = {
  computedMatch: PropTypes.shape({}).isRequired,
};

export default connect()(PrivateAdminPage);
