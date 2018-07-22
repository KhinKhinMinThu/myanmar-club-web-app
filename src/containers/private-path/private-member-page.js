import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DASHBOARD, PROFILE, LOGOUT } from '../../actions/location';
import { FlexContainer } from './styled-components';
import MenuPanel from './components';
import SignupPage2 from '../signup-page2';
import Dashboard from './home-ex';

class PrivateMemberPage extends Component {
  // direct urls (e.g., type localhost:3000/dashboard and enter)
  switchPage = (pathname) => {
    switch (pathname) {
      case DASHBOARD:
        return Dashboard;
      case PROFILE:
        return SignupPage2;
      case LOGOUT:
        return Dashboard;
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
    console.log('private member props:', this.props);

    return (
      <FlexContainer>
        <MenuPanel selectedKeys={['/'.concat(pathname)]} isAdmin={false} />
        <Page {...this.props} />
      </FlexContainer>
    );
  }
}

PrivateMemberPage.propTypes = {
  computedMatch: PropTypes.shape({}).isRequired,
};

export default connect()(PrivateMemberPage);
