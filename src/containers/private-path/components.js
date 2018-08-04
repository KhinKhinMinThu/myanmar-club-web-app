import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MainMenu, MenuItem, MenuIcon } from './styled-components';
import {
  DASHBOARD,
  PROFILE,
  LOGOUT,
  ROLE_MANAGEMENT,
  ACCOUNT_MANAGEMENT,
  CLAIM_MANAGEMENT,
  EVENT_TRANSACTION,
  ADMIN_EVENT_CREATE,
  ADMIN_EVENT_EDIT,
  ADMIN_EVENT_VIEW,
  ADMIN_EVENTREGISTRATION_VIEW,
} from '../../actions/location';
import { logout } from '../../reducers/login';
import { locationChange } from '../../reducers/router';

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
  ACCOUNT_MANAGEMENT: {
    icon: <MenuIcon type="user" />,
    text: 'Accounts Management',
  },
  CLAIM_MANAGEMENT: {
    icon: <MenuIcon type="pay-circle-o" />,
    text: 'Claims Management',
  },
  EVENT_TRANSACTION: {
    icon: <MenuIcon type="calculator" />,
    text: 'Event Transactions',
  },
  ADMIN_EVENT_CREATE: {
    icon: <MenuIcon type="calendar" />,
    text: 'Create Event (Admin)',
  },
  ADMIN_EVENT_EDIT: {
    icon: <MenuIcon type="edit" />,
    text: 'Edit Event (Admin)',
  },
  ADMIN_EVENT_VIEW: {
    icon: <MenuIcon type="eye" />,
    text: 'View Event (Admin)',
  },
  ADMIN_EVENTREGISTRATION_VIEW: {
    icon: <MenuIcon type="table" />,
    text: 'View Event Registration (Admin)',
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
      performLogout(false);
    }
    const location = { ...currentLocation, pathname: e.key };
    updateLocation({ location });
  };

  return (
    <MainMenu
      mode="inline"
      onClick={onClick}
      selectedKeys={selectedKeys}
      style={{ width: '250px' }}
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
        <MenuItem key={ACCOUNT_MANAGEMENT}>
          {adminTitles.ACCOUNT_MANAGEMENT.icon}
          {adminTitles.ACCOUNT_MANAGEMENT.text}
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
        <MenuItem key={ADMIN_EVENT_CREATE}>
          {adminTitles.ADMIN_EVENT_CREATE.icon}
          {adminTitles.ADMIN_EVENT_CREATE.text}
        </MenuItem>
      )}
      {isAdmin && (
        <MenuItem key={ADMIN_EVENT_EDIT}>
          {adminTitles.ADMIN_EVENT_EDIT.icon}
          {adminTitles.ADMIN_EVENT_EDIT.text}
        </MenuItem>
      )}
      {isAdmin && (
        <MenuItem key={ADMIN_EVENT_VIEW}>
          {adminTitles.ADMIN_EVENT_VIEW.icon}
          {adminTitles.ADMIN_EVENT_VIEW.text}
        </MenuItem>
      )}
      {isAdmin && (
        <MenuItem key={ADMIN_EVENTREGISTRATION_VIEW}>
          {adminTitles.ADMIN_EVENTREGISTRATION_VIEW.icon}
          {adminTitles.ADMIN_EVENTREGISTRATION_VIEW.text}
        </MenuItem>
      )}
      <MenuItem key={LOGOUT}>
        {commonTitles.LOGOUT.icon}
        {commonTitles.LOGOUT.text}
      </MenuItem>
    </MainMenu>
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
