import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  MenuIcon, MainMenu, MenuItem, MenuContainer,
} from './styled-components';
import {
  DASHBOARD, PROFILE, LOGOUT, ADMIN_ROLEMGMT, ADMIN_ACCMGMT,
} from '../../actions/location';
import { logout } from '../../reducers/login';
import { locationChange } from '../../reducers/router';

const MenuPanel = ({
  performLogout, updateLocation, currentLocation, selectedKeys,
}) => {
  const titles = {
    DASHBOARD: { icon: <MenuIcon type="home" />, text: 'Dashboard' },
    PROFILE: { icon: <MenuIcon type="solution" />, text: 'Profile' },
    ADMIN_ROLEMGMT: { icon: <MenuIcon type="setting" />, text: 'Role Management (Admin)' },
    ADMIN_ACCMGMT: { icon: <MenuIcon type="user" />, text: 'Account Management (Admin)' },
    LOGOUT: { icon: <MenuIcon type="logout" />, text: 'Logout' },
  };

  const onClick = (e) => {
    if (e.key === LOGOUT) {
      performLogout(false);
    }
    const location = { ...currentLocation, pathname: e.key };
    updateLocation({ location });
  };

  return (
    <MenuContainer>
      <MainMenu mode="inline" onClick={onClick} selectedKeys={selectedKeys}>
        <MenuItem key={DASHBOARD}>
          {titles.DASHBOARD.icon}
          {titles.DASHBOARD.text}
        </MenuItem>
        <MenuItem key={PROFILE}>
          {titles.PROFILE.icon}
          {titles.PROFILE.text}
        </MenuItem>
        <MenuItem key={ADMIN_ROLEMGMT}>
          {titles.ADMIN_ROLEMGMT.icon}
          {titles.ADMIN_ROLEMGMT.text}
        </MenuItem>
        <MenuItem key={ADMIN_ACCMGMT}>
          {titles.ADMIN_ACCMGMT.icon}
          {titles.ADMIN_ACCMGMT.text}
        </MenuItem>
        <MenuItem key={LOGOUT}>
          {titles.LOGOUT.icon}
          {titles.LOGOUT.text}
        </MenuItem>
      </MainMenu>
    </MenuContainer>
  );
};

MenuPanel.propTypes = {
  performLogout: PropTypes.func.isRequired,
  updateLocation: PropTypes.func.isRequired,
  currentLocation: PropTypes.shape().isRequired,
  selectedKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
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
