import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import { connect } from 'react-redux';
import {
  MenuIcon, MainMenu, MenuItem, MenuContainer,
} from './styled-components';
import { DASHBOARD, PROFILE, LOGOUT } from '../../actions/location';
import { logout } from '../../reducers/login';
import { locationChange } from '../../reducers/router';

const MenuPanel = ({ performLogout, updateLocation, currentLocation }) => {
  const dashboardMenuLink = (
    <span>
      <MenuIcon type="home" />
      Dashboard
    </span>
  );

  const profileMenuLink = (
    <span>
      <MenuIcon type="user" />
      Profile
    </span>
  );

  const logoutMenuLink = (
    <span>
      <MenuIcon type="logout" />
      Log Out
    </span>
  );

  const onClick = (e) => {
    if (e.key === LOGOUT) {
      performLogout(false);
    }
    const location = { ...currentLocation, pathname: e.key };
    updateLocation({ location });
  };

  return (
    <MenuContainer>
      <MainMenu mode="inline" onClick={onClick}>
        <Menu.Item key={DASHBOARD}>{dashboardMenuLink}</Menu.Item>
        <MenuItem key={PROFILE}>{profileMenuLink}</MenuItem>
        <MenuItem key={LOGOUT}>{logoutMenuLink}</MenuItem>
      </MainMenu>
    </MenuContainer>
  );
};

MenuPanel.propTypes = {
  performLogout: PropTypes.func.isRequired,
  updateLocation: PropTypes.func.isRequired,
  currentLocation: PropTypes.shape({}).isRequired,
};

const mapDispatchToProps = {
  performLogout: logout,
  updateLocation: locationChange,
};

const mapStateToProps = (state) => {
  const { location } = state.router;
  return { currentLocation: location };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuPanel);
