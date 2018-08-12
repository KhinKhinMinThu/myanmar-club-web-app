import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import { MenuItem, MenuIcon } from '../shared-styled';
import {
  DASHBOARD,
  PROFILE,
  LOGOUT,
  LOGIN,
  ROLE_MANAGEMENT,
  MEMBER_MANAGEMENT,
  CLAIM_MANAGEMENT,
  EVENT_TRANSACTION,
  EVENT_MANAGEMENT,
} from '../../../actions/location';
import { setIsLoggedIn } from '../../../reducers/login/login-data';
import { locationChange } from '../../../reducers/router';

const commonTitles = {
  DASHBOARD: { icon: <MenuIcon type="home" />, text: 'Dashboard' },
  PROFILE: { icon: <MenuIcon type="solution" />, text: 'Profile' },
  LOGOUT: { icon: <MenuIcon type="logout" />, text: 'Logout' },
};

const adminTitles = {
  ROLE_MANAGEMENT: {
    icon: <MenuIcon type="setting" />,
    text: 'Roles Management',
  },
  MEMBER_MANAGEMENT: {
    icon: <MenuIcon type="user" />,
    text: 'Members Management',
  },
  CLAIM_MANAGEMENT: {
    icon: <MenuIcon type="pay-circle-o" />,
    text: 'Claims Management',
  },
  EVENT_TRANSACTION: {
    icon: <MenuIcon type="calculator" />,
    text: 'Event Transactions',
  },
  EVENT_MANAGEMENT: {
    icon: <MenuIcon type="calendar" />,
    text: 'Events Management',
  },
};

const MenuPanel = ({
  performLogout,
  updateLocation,
  currentLocation,
  selectedKeys,
  isAdmin,
}) => {
  const onClick = (e) => {
    if (e.key === LOGOUT) {
      performLogout({ payload: false });
      // redirect to login page
      e.key = LOGIN;
      localStorage.clear();
    }
    const location = { ...currentLocation, pathname: e.key };
    updateLocation({ location });
  };

  return (
    <Menu
      mode="inline"
      onClick={onClick}
      selectedKeys={selectedKeys}
      style={{
        marginTop: 5,
      }}
    >
      <MenuItem key={DASHBOARD}>
        {commonTitles.DASHBOARD.icon}
        {commonTitles.DASHBOARD.text}
      </MenuItem>
      <MenuItem key={PROFILE}>
        {commonTitles.PROFILE.icon}
        {commonTitles.PROFILE.text}
      </MenuItem>
      {isAdmin && (
        <MenuItem key={ROLE_MANAGEMENT}>
          {adminTitles.ROLE_MANAGEMENT.icon}
          {adminTitles.ROLE_MANAGEMENT.text}
        </MenuItem>
      )}
      {isAdmin && (
        <MenuItem key={MEMBER_MANAGEMENT}>
          {adminTitles.MEMBER_MANAGEMENT.icon}
          {adminTitles.MEMBER_MANAGEMENT.text}
        </MenuItem>
      )}
      {isAdmin && (
        <MenuItem key={CLAIM_MANAGEMENT}>
          {adminTitles.CLAIM_MANAGEMENT.icon}
          {adminTitles.CLAIM_MANAGEMENT.text}
        </MenuItem>
      )}
      {isAdmin && (
        <MenuItem key={EVENT_TRANSACTION}>
          {adminTitles.EVENT_TRANSACTION.icon}
          {adminTitles.EVENT_TRANSACTION.text}
        </MenuItem>
      )}
      {isAdmin && (
        <MenuItem key={EVENT_MANAGEMENT}>
          {adminTitles.EVENT_MANAGEMENT.icon}
          {adminTitles.EVENT_MANAGEMENT.text}
        </MenuItem>
      )}
      <MenuItem key={LOGOUT}>
        {commonTitles.LOGOUT.icon}
        {commonTitles.LOGOUT.text}
      </MenuItem>
    </Menu>
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
  performLogout: setIsLoggedIn,
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
