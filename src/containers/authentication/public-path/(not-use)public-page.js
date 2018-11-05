import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import loginImg from '../../../images/login.jpg';
import { HeaderText } from '../shared-styled';
import {
  DEFAULT,
  LOGIN,
  SIGNUP,
  FORGOTPASSWORD,
  EVENT_LIST,
  EVENT_REGISTER,
  // RESETPASSWORD,
  // PUBLIC_EVENT_VIEW,
} from '../../../actions/location';
import logo from '../../../images/logo.jpg';
// import MenuPanel from './components';
import MainPage from './main-page';
import ErrorPage from '../error-page';
import LoginPage from '../../user-account/login';
import EventRegisterPage from '../../event-public/event-registration';
// import EventListPage from '../../event-public/event-list';
import EventListPage from '../../public-site/containers/events';
import SignupPage from '../../user-account/signup-page';
import ForgotPasswordPage from '../../user-account/forgotpwd-page';

const { Header, Content, Footer } = Layout;
const logoImage = (
  <img alt="logo" src={logo} style={{ width: 'auto', height: '55px' }} />
);
// const siderWidth = 230;

/* eslint react/prop-types: 0 */
class PrivatePage extends Component {
  // direct urls (e.g., type localhost:3000/dashboard and enter)
  switchPage = (pathname, id) => {
    switch (pathname) {
      case DEFAULT:
        return MainPage;
      case LOGIN:
        return LoginPage;
      case SIGNUP:
        return SignupPage;
      case FORGOTPASSWORD:
        return ForgotPasswordPage;
      case EVENT_LIST:
        return EventListPage;
      case EVENT_REGISTER:
        return id ? EventRegisterPage : ErrorPage;
      default:
        // should return to error page
        return ErrorPage;
    }
  };

  render() {
    const {
      // location: { pathname },
      computedMatch: { params },
    } = this.props;
    const { pathname, id } = params;
    const path = pathname ? '/'.concat(pathname) : DEFAULT;
    const Page = this.switchPage(path, id);

    let contentStyle;
    if (Page === LoginPage || Page === ErrorPage) {
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
    // console.log('public props:', this.props);
    // console.log('pathname:', path);

    return (
      <Layout style={{ minWidth: '1500px' }}>
        <Layout>
          <a href={DEFAULT}>
            <Header
              style={{
                height: 65,
                background: '#312D2D',
                borderBottom: '3px solid #1DA57A',
              }}
            >
              <HeaderText>
                {logoImage} &emsp;Myanmar Club (Singapore)
              </HeaderText>
            </Header>
          </a>
          {/* <Anchor> */}
          {/*  <MenuPanel selectedKeys={[path]} /> *}
          {/* </Anchor> */}
          <Content
            style={{
              ...contentStyle,
              margin: '5px',
              padding: '10px 10px 10px 10px',
              minHeight: 560,
            }}
          >
            <Page {...this.props} />
          </Content>
          <Footer
            style={{
              textAlign: 'center',
              background: '#ffffff',
            }}
          >
            MyanmarClub ©2018 developed by{' '}
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
