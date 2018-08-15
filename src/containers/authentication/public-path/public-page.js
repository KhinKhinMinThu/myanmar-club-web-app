import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Anchor } from 'antd';
import { HeaderText } from '../shared-styled';
import {
  DEFAULT,
  LOGIN,
  SIGNUP,
  FORGOTPASSWORD,
  // RESETPASSWORD,
  // PUBLIC_EVENT_VIEW,
} from '../../../actions/location';
import logo from '../../../images/logo.jpg';
import MenuPanel from './components';
import MainPage from './main-page';
import ErrorPage from '../error-page';
import LoginPage from '../../user-account/login';
import SignupPage from '../../signup-page';
import ForgotPasswordPage from '../../forgotpwd-page';

const {
  Header, Content, Sider, Footer,
} = Layout;
const logoImage = (
  <img alt="logo" src={logo} style={{ width: 'auto', height: '55px' }} />
);
const siderWidth = 230;

class PrivatePage extends Component {
  // direct urls (e.g., type localhost:3000/dashboard and enter)
  switchPage = (pathname) => {
    switch (pathname) {
      case DEFAULT:
        return MainPage;
      case LOGIN:
        return LoginPage;
      case SIGNUP:
        return SignupPage;
      case FORGOTPASSWORD:
        return ForgotPasswordPage;

      default:
        // should return to error page
        return ErrorPage;
    }
  };

  render() {
    const {
      location: { pathname },
    } = this.props;
    const Page = this.switchPage(pathname);
    console.log('public props:', this.props);
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
                height: 65,
                background: '#ffffff',
                borderBottom: '3px solid #1DA57A',
              }}
            >
              {logoImage}
            </Header>
          </a>
        </Sider>

        <Layout>
          <Header
            style={{
              height: 65,
              background: '#312D2D',
              borderBottom: '3px solid #1DA57A',
            }}
          >
            <HeaderText>Myanmar Club Web Portal</HeaderText>;
          </Header>
          <div style={{ marginLeft: '4px' }}>
            <Anchor style={{ background: 'transparent' }}>
              <MenuPanel selectedKeys={[pathname]} />
            </Anchor>
          </div>
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

PrivatePage.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

export default connect()(PrivatePage);
