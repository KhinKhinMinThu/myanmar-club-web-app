import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Anchor } from 'antd';
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
import ClaimManagementPage from '../claim/claim-management';
import EventTransactionPage from '../event/event-transaction';
import EventCreation from '../event/event-creation';
import EventManagementPage from '../event/event-management';
import EventEditPage from '../event/event-edit';
import EventViewPage from '../event/event-view';

const { Header, Content, Sider } = Layout;
const logoImage = (
  <img alt="logo" src={logo} style={{ width: 'auto', height: '65px' }} />
);
const siderWidth = 230;

class PrivatePage extends Component {
  // direct urls (e.g., type localhost:3000/dashboard and enter)
  switchPage = (pathname, isAdmin) => {
    switch (pathname) {
      case DASHBOARD:
        return Dashboard;
      case PROFILE:
        return SignupPage2;
      case LOGOUT:
        return Dashboard;
      default:
        if (isAdmin) {
          return this.switchAdminPage(pathname);
        }
        // should return to error page
        return Dashboard;
    }
  };

  switchAdminPage = (pathname) => {
    switch (pathname) {
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
    const Page = this.switchPage(`/${pathname}`, isAdmin);
    console.log('private props:', this.props);
    console.log('pathname:', pathname);

    return (
      <Layout style={{ minWidth: '1500px', background: '#ffffff' }}>
        <Sider
          width={siderWidth}
          style={{
            background: '#ffffff',
            height: '100vh',
          }}
        >
          <a href={DEFAULT}>
            <Header
              style={{
                height: 70,
                background: '#ffffff',
                borderBottom: '3px solid #1DA57A',
              }}
            >
              {logoImage}
            </Header>
          </a>
          <Anchor>
            <MenuPanel
              selectedKeys={['/'.concat(pathname)]}
              isAdmin={isAdmin}
            />
          </Anchor>
        </Sider>

        <Layout>
          <Header
            style={{
              height: 70,
              background: '#312D2D',
              borderBottom: '3px solid #1DA57A',
            }}
          >
            <HeaderText>Myanmar Club Web Portal</HeaderText>;
          </Header>
          <Content
            style={{
              margin: '5px',
              background: '#ffffff',
              padding: '10px 10px 10px 10px',
            }}
          >
            <Page {...this.props} />
          </Content>
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
