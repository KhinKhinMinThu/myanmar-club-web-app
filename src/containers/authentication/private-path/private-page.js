import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Anchor } from 'antd';
import { HeaderText, UserNameText } from '../shared-styled';
import {
  DEFAULT,
  DASHBOARD,
  PROFILE,
  LOGOUT,
  ROLE_ASSIGN,
  ROLE_MANAGEMENT,
  MEMBER_MANAGEMENT,
  MEMBER_EDIT,
  CLAIM_MANAGEMENT,
  EVENT_TRANSACTION,
  EVENT_MANAGEMENT,
  EVENT_CREATION,
  EVENT_VIEW,
  EVENT_EDIT,
  INCIDENT_CREATION,
  INCIDENT_MANAGMENT,
  INCIDENT_EDIT,
} from '../../../actions/location';
import logo from '../../../images/logo.jpg';
import loginImg from '../../../images/login.jpg';
import MenuPanel from './components';
import Dashboard from './home-ex';
import ErrorPage from '../error-page';
import RoleManagementPage from '../../user-role/user-role-management';
import RoleFunctionManagementPage from '../../access-control';
import MemberManagementPage from '../../member/member-management';
import MemberProfileEditPage from '../../member/member-profile-edit';
import ProfileEditPage from '../../user-account/profile-edit';
import ClaimManagementPage from '../../claim/claim-management';
import EventTransactionPage from '../../event/event-transaction';
import EventCreation from '../../event/event-creation';
import EventManagementPage from '../../event/event-management';
import EventEditPage from '../../event/event-edit';
import EventViewPage from '../../event/event-view';
import IncidentManagementPage from '../../incident/incident-management';
import IncidentCreationPage from '../../incident/incident-creation';
import IncidentEditPage from '../../incident/incident-edit';

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

  switchPageEcMember = (pathname, id, functNameList) => {
    if (pathname === DASHBOARD) return Dashboard;
    if (pathname === PROFILE) return ProfileEditPage;
    if (pathname === LOGOUT) return Dashboard; // prettier-ignore

    if (pathname === MEMBER_MANAGEMENT && functNameList.includes(MEMBER_MANAGEMENT)) return MemberManagementPage; // prettier-ignore
    if (pathname === MEMBER_EDIT && functNameList.includes(MEMBER_EDIT)) return id ? MemberProfileEditPage : ErrorPage; // prettier-ignore
    if (pathname === ROLE_ASSIGN && functNameList.includes(ROLE_ASSIGN)) return RoleManagementPage; // prettier-ignore
    if (pathname === ROLE_MANAGEMENT && functNameList.includes(ROLE_MANAGEMENT)) return RoleFunctionManagementPage; // prettier-ignore
    if (pathname === CLAIM_MANAGEMENT && functNameList.includes(CLAIM_MANAGEMENT)) return ClaimManagementPage; // prettier-ignore
    if (pathname === EVENT_TRANSACTION && functNameList.includes(EVENT_TRANSACTION)) return EventTransactionPage; // prettier-ignore
    if (pathname === EVENT_MANAGEMENT && functNameList.includes(EVENT_MANAGEMENT)) return EventManagementPage; // prettier-ignore
    if (pathname === EVENT_CREATION && functNameList.includes(EVENT_CREATION)) return EventCreation; // prettier-ignore
    if (pathname === EVENT_VIEW && functNameList.includes(EVENT_VIEW)) return id ? EventViewPage : ErrorPage; // prettier-ignore
    if (pathname === EVENT_EDIT && functNameList.includes(EVENT_EDIT)) return id ? EventEditPage : ErrorPage; // prettier-ignore
    if (pathname === INCIDENT_MANAGMENT && functNameList.includes(INCIDENT_MANAGMENT)) return IncidentManagementPage; // prettier-ignore
    if (pathname === INCIDENT_CREATION && functNameList.includes(INCIDENT_CREATION)) return IncidentCreationPage; // prettier-ignore
    if (pathname === INCIDENT_EDIT && functNameList.includes(INCIDENT_EDIT)) return IncidentEditPage; // prettier-ignore

    return ErrorPage;
  };

  render() {
    const {
      computedMatch: { params },
      name,
      isEcMember,
      functNameList,
      // token,
    } = this.props;
    const { pathname, id } = params;
    const path = '/portal/'.concat(pathname); // `/portal/${pathname}`;
    const Page = isEcMember === '1'
      ? this.switchPageEcMember(path, id, functNameList)
      : this.switchPageClubMember(path);

    let contentStyle;
    if (Page === ErrorPage) {
      contentStyle = {
        backgroundImage: `url(${loginImg})`,
        backgroundSize: '100% auto',
        backgroundRepeat: 'no-repeat',
      };
    } else {
      contentStyle = {
        background: '#ffffff',
      };
    }
    // console.log('private props:', this.props);
    // console.log('pathname:', path);

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
            <div
              style={{
                textAlign: 'center',
                marginTop: '8px',
              }}
            >
              <UserNameText>{name}</UserNameText>
            </div>
            <MenuPanel
              selectedKeys={['/portal/'.concat(pathname)]}
              isEcMember={isEcMember}
              functNameList={functNameList}
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
              ...contentStyle,
              margin: '5px',
              padding: '10px 10px 10px 10px',
            }}
          >
            <Page {...this.props} />
          </Content>
          <Footer style={{ textAlign: 'center', background: '#ffffff' }}>
            MyanmarClub Portal ©2018 developed by{' '}
            <a href="https://wiki.smu.edu.sg/is480/IS480_Team_wiki%3A_2018T1_PentaHive_AboutPentaHive">
              PentaHive
            </a>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect()(PrivatePage);
