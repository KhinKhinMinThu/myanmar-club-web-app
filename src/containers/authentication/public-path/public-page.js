import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import loginImg from '../../../images/login.jpg';
import { MenuBar, MenuBarLink, MenuBarLinkContainer } from './styled/menu-bar';
import { LogoText, LogoImage, LogoContainer } from './styled/logo';
import Home from './containers/home';
import Events from './containers/events';
import Footer from './containers/footer';
import TopBar from './containers/top-bar';
import {
  DEFAULT,
  LOGIN,
  SIGNUP,
  FORGOTPASSWORD,
  EVENT_LIST,
  EVENT_REGISTER,
} from '../../../actions/location';
// import MainPage from './main-page';
import ErrorPage from '../error-page';
import LoginPage from '../../user-account/login';
import EventRegisterPage from '../../event-public/event-registration';
// import EventListPage from '../../event-public/event-list';
// import EventListPage from '../../public-site/containers/events';
import SignupPage from '../../user-account/signup-page';
import ForgotPasswordPage from '../../user-account/forgotpwd-page';

const { Content } = Layout;

/* eslint react/prop-types: 0 */
class PrivatePage extends Component {
  // direct urls (e.g., type localhost:3000/dashboard and enter)
  switchPage = (pathname, id) => {
    switch (pathname) {
      case DEFAULT:
        return Home;
      case LOGIN:
        return LoginPage;
      case SIGNUP:
        return SignupPage;
      case FORGOTPASSWORD:
        return ForgotPasswordPage;
      case EVENT_LIST:
        return Events;
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
        opacity: 1,
      };
    }
    // console.log('public props:', this.props);
    // console.log('pathname:', path);

    return (
      <Layout
        style={{
          minWidth: '1500px',
          overflow: 'hidden',
          display: 'block',
          position: 'relative',
          paddingBottom: '23em',
          backgroundColor: '#fff',
        }}
      >
        <TopBar />
        <MenuBar>
          <LogoContainer>
            <a href={DEFAULT}>
              <LogoImage />
            </a>
            <LogoText> Myanmar Club SG</LogoText>
          </LogoContainer>
          <MenuBarLinkContainer>
            <MenuBarLink exact activeClassName="active" to="/">
              Home
            </MenuBarLink>
            <MenuBarLink exact activeClassName="active" to="/events">
              Upcoming Events
            </MenuBarLink>
          </MenuBarLinkContainer>
        </MenuBar>

        <Layout>
          <Content
            style={{
              ...contentStyle,

              minHeight: 500,
              padding: '2em 10em 2em 10em',
            }}
          >
            <Page {...this.props} />
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}

export default connect()(PrivatePage);
