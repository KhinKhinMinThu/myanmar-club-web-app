import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Anchor } from 'antd';
import { HeaderText } from '../shared-styled';
import {
  DEFAULT,
  DASHBOARD,
  PROFILE,
  LOGOUT,
  ROLE_MANAGEMENT,
  MEMBER_MANAGEMENT,
  MEMBER_EDIT,
  CLAIM_MANAGEMENT,
  EVENT_TRANSACTION,
  EVENT_MANAGEMENT,
  EVENT_CREATION,
  EVENT_VIEW,
  EVENT_EDIT,
} from '../../../actions/location';
import logo from '../../../images/logo.jpg';
import MenuPanel from './components';
// import SignupPage2 from '../../signup-page2';
import Dashboard from './home-ex';
import ErrorPage from '../error-page';
import RoleManagementPage from '../../user-role/user-role-management';
import MemberManagementPage from '../../member/member-management';
import MemberProfileEditPage from '../../member/member-profile-edit';
import ProfileEditPage from '../../user-account/profile-edit';
import ClaimManagementPage from '../../claim/claim-management';
import EventTransactionPage from '../../event/event-transaction';
import EventCreation from '../../event/event-creation';
import EventManagementPage from '../../event/event-management';
import EventEditPage from '../../event/event-edit';
import EventViewPage from '../../event/event-view';

const {
  Header, Content, Sider, Footer,
} = Layout;
const logoImage = (
  <img alt="logo" src={logo} style={{ width: 'auto', height: '55px' }} />
);
const siderWidth = 230;

/* eslint react/prop-types: 0 */
class PrivatePage extends Component {
  // direct urls (e.g., type localhost:3000/dashboard and enter)
  switchPageClubMember = (pathname) => {
    if (pathname === DASHBOARD) return Dashboard;
    if (pathname === PROFILE) return ProfileEditPage;
    if (pathname === LOGOUT) return Dashboard;
    return ErrorPage;
  };

  switchPageEcMember = (pathname, id, roleIdList) => {
    if (pathname === DASHBOARD) return Dashboard;
    if (pathname === PROFILE) return ProfileEditPage;
    if (pathname === LOGOUT) return Dashboard;
    if (pathname === MEMBER_MANAGEMENT) return MemberManagementPage;
    if (pathname === MEMBER_EDIT) return id ? MemberProfileEditPage : ErrorPage;
    if (pathname === ROLE_MANAGEMENT && roleIdList.includes(1)) return RoleManagementPage;
    if (
      pathname === CLAIM_MANAGEMENT
      && (roleIdList.includes(1) || roleIdList.includes(2))
    ) return ClaimManagementPage;
    if (
      pathname === EVENT_TRANSACTION
      && (roleIdList.includes(1) || roleIdList.includes(2))
    ) return EventTransactionPage;
    if (
      pathname === EVENT_MANAGEMENT
      && (roleIdList.includes(1) || roleIdList.includes(3))
    ) return EventManagementPage;
    if (
      pathname === EVENT_CREATION
      && (roleIdList.includes(1) || roleIdList.includes(3))
    ) return EventCreation;
    if (
      pathname === EVENT_VIEW
      && (roleIdList.includes(1) || roleIdList.includes(3))
    ) return id ? EventViewPage : ErrorPage;
    if (
      pathname === EVENT_EDIT
      && (roleIdList.includes(1) || roleIdList.includes(3))
    ) return id ? EventEditPage : ErrorPage;

    return ErrorPage;
  };
  // switchPage = (pathname, isEcMember) => {
  //   switch (pathname) {
  //     case DASHBOARD:
  //       return Dashboard;
  //     case PROFILE:
  //       return ProfileEditPage;
  //     case LOGOUT:
  //       return Dashboard;
  //     default:
  //       if (isAdmin) {
  //         return this.switchAdminPage(pathname);
  //       }
  //       // should return to error page
  //       return ErrorPage;
  //   }
  // };

  // switchAdminPage = (pathname) => {
  //   switch (pathname) {
  //     case ROLE_MANAGEMENT:
  //       return RoleManagementPage;
  //     case MEMBER_MANAGEMENT:
  //       return MemberManagementPage;
  //     case MEMBER_EDIT:
  //       return MemberProfileEditPage;
  //     case CLAIM_MANAGEMENT:
  //       return ClaimManagementPage;
  //     case EVENT_TRANSACTION:
  //       return EventTransactionPage;
  //     case EVENT_MANAGEMENT:
  //       return EventManagementPage;
  //     case EVENT_CREATION:
  //       return EventCreation;
  //     case EVENT_VIEW:
  //       return EventViewPage;
  //     case EVENT_EDIT:
  //       return EventEditPage;
  //     default:
  //       // should return to error page
  //       return ErrorPage;
  //   }
  // };

  render() {
    const {
      computedMatch: { params },
      isEcMember,
      roleIdList,
      // token,
    } = this.props;
    const { pathname, id } = params;
    const path = '/portal/'.concat(pathname); // `/portal/${pathname}`;
    const Page = isEcMember === '1'
      ? this.switchPageEcMember(path, id, roleIdList)
      : this.switchPageClubMember(path);

    console.log('private props:', this.props);
    console.log('pathname:', path);

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
                height: 65,
                background: '#ffffff',
                borderBottom: '3px solid #1DA57A',
              }}
            >
              {logoImage}
            </Header>
          </a>
          <Anchor>
            <MenuPanel
              selectedKeys={['/portal/'.concat(pathname)]}
              isEcMember={isEcMember}
              roleIdList={roleIdList}
            />
          </Anchor>
        </Sider>

        <Layout>
          <Header
            style={{
              height: 65,
              background: '#312D2D',
              borderBottom: '3px solid #1DA57A',
            }}
          >
            <HeaderText>Myanmar Club (Singapore) Web Portal</HeaderText>;
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
          <Footer style={{ textAlign: 'center' }}>
            MClubPortal ©2018 Created by PentaHive as Singapore Management
            University Final Year Project.
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect()(PrivatePage);
