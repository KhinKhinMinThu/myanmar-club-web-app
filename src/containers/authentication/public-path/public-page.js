import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Breadcrumb } from 'antd';
import { HeaderText, BreadcrumbIcon, BreadcrumbItem } from '../shared-styled';
import {
  DEFAULT,
  LOGIN,
  SIGNUP,
  FORGOTPASSWORD,
  // RESETPASSWORD,
  // PUBLIC_EVENT_VIEW,
} from '../../../actions/location';
import logo from '../../../images/logo.jpg';
import MainPage from './main-page';
import ErrorPage from '../error-page';
import LoginPage from '../../login-page';
import SignupPage2 from '../../signup-page2';
import ForgotPasswordPage from '../../forgotpwd-page';

const { Header, Content, Sider } = Layout;
const logoImage = (
  <img alt="logo" src={logo} style={{ width: 'auto', height: '65px' }} />
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
        return SignupPage2;
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
                height: 70,
                background: '#ffffff',
                borderBottom: '3px solid #1DA57A',
              }}
            >
              {logoImage}
            </Header>
          </a>
          TEST
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
            <Breadcrumb style={{ margin: '16px 0' }}>
              <BreadcrumbItem href={DEFAULT}>
                <BreadcrumbIcon type="home" />
              </BreadcrumbItem>
              <BreadcrumbItem href={LOGIN}>
                <BreadcrumbIcon type="user" />
                <span>Login</span>
              </BreadcrumbItem>
            </Breadcrumb>
            <Page {...this.props} />
            LONG <br />LONG <br />LONG <br />LONG <br />LONG <br />LONG <br />LONG{' '}
            <br />LONG <br />LONG <br />LONG <br />LONG <br />LONG <br />LONG{' '}
            <br />LONG <br />LONG <br />LONG <br />LONG <br />LONG <br />LONG{' '}
            <br />LONG <br />LONG <br />LONG <br />LONG <br />LONG <br />LONG{' '}
            <br />LONG <br />LONG <br />LONG <br />LONG <br />LONG <br />LONG{' '}
            <br />LONG <br />LONG <br />LONG <br />LONG <br />LONG <br />LONG{' '}
            <br />
            END LONG <br />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

PrivatePage.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

export default connect()(PrivatePage);
