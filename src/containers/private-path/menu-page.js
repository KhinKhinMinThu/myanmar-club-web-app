import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  DASHBOARD, PROFILE, LOGOUT, ADMIN_ROLEMGMT, ADMIN_ACCMGMT,
} from '../../actions/location';
import { FlexContainer } from './styled-components';
import MenuPanel from './components';
import SignupPage2 from '../signup-page2';
import Dashboard from './home-ex';
import RoleManagementPage from '../admin-rolemgmt';
import AccManagementPage from '../admin-accmgmt';

class MenuPage extends Component {
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
      default:
        return Dashboard;
    }
  };

  render() {
    const { location } = this.props;
    const { pathname } = location;
    const Page = this.switchPage(pathname);

    return (
      <FlexContainer>
        <MenuPanel selectedKeys={[pathname]} />
        <Page />
      </FlexContainer>
    );
  }
}

MenuPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect()(MenuPage);
