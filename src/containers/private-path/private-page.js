import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { HeaderText } from './styled-components';
import {
  DEFAULT,
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
import logo from '../../images/logo.jpg';
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

const { Header, Sider } = Layout;

class PrivatePage extends Component {
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
        // should return to error page
        return Dashboard;
    }
  };

  render() {
    const {
      computedMatch: { params },
      isAdmin,
    } = this.props;
    const { pathname } = params;
    const Page = this.switchPage(`/${pathname}`);
    console.log('private props:', this.props);
    console.log('pathname:', pathname);
    return (
      <Layout>
        <Sider width={250} style={{ background: '#ffffff' }}>
          <Header style={{ height: 70, background: '#ffffff' }}>
            <a href={DEFAULT}>
              <img
                alt="logo"
                src={logo}
                style={{ width: 'auto', height: '70px' }}
              />
            </a>
          </Header>
          <MenuPanel selectedKeys={['/'.concat(pathname)]} isAdmin={isAdmin} />
        </Sider>

        <Layout style={{ height: '100vh' }}>
          <Header style={{ height: 70, background: '#1DA57A' }}>
            <HeaderText>Myanmar Club Web Portal</HeaderText>;
          </Header>
          <Page {...this.props} />
        </Layout>
      </Layout>
    );
  }
}

PrivatePage.propTypes = {
  computedMatch: PropTypes.shape({}).isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default connect()(PrivatePage);
