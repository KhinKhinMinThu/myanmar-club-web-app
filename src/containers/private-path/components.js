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

const commonTitles = {
  DASHBOARD: { icon: <MenuIcon type="home" />, text: 'Dashboard' },
  PROFILE: { icon: <MenuIcon type="solution" />, text: 'Profile' },
  LOGOUT: { icon: <MenuIcon type="logout" />, text: 'Logout' },
};

const adminTitles = {
  ADMIN_ROLEMGMT: { icon: <MenuIcon type="setting" />, text: 'Role Management' },
  ADMIN_ACCMGMT: { icon: <MenuIcon type="user" />, text: 'Account Management' },
};

const MenuPanel = ({
  performLogout, updateLocation, currentLocation, selectedKeys, isAdmin,
}) => {
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
          {commonTitles.DASHBOARD.icon}
          {commonTitles.DASHBOARD.text}
        </MenuItem>
        <MenuItem key={PROFILE}>
          {commonTitles.PROFILE.icon}
          {commonTitles.PROFILE.text}
        </MenuItem>
        {isAdmin && (
          <MenuItem key={ADMIN_ROLEMGMT}>
            {adminTitles.ADMIN_ROLEMGMT.icon}
            {adminTitles.ADMIN_ROLEMGMT.text}
          </MenuItem>
        )}
        {isAdmin && (
          <MenuItem key={ADMIN_ACCMGMT}>
            {adminTitles.ADMIN_ACCMGMT.icon}
            {adminTitles.ADMIN_ACCMGMT.text}
          </MenuItem>
        )}
        <MenuItem key={LOGOUT}>
          {commonTitles.LOGOUT.icon}
          {commonTitles.LOGOUT.text}
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
  isAdmin: PropTypes.bool.isRequired,
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
