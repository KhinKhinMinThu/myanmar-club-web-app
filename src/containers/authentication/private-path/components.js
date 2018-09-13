import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import { MenuItem, SubMenu, MenuIcon } from '../shared-styled';
import {
  DASHBOARD,
  PROFILE,
  LOGOUT,
  LOGIN,
  ROLE_ASSIGN,
  ROLE_MANAGEMENT,
  MEMBER_MANAGEMENT,
  CLAIM_MANAGEMENT,
  EVENT_TRANSACTION,
  EVENT_MANAGEMENT,
  EVENT_CREATION,
} from '../../../actions/location';
import { setLogout } from '../../../reducers/login/login-data';
import { locationChange } from '../../../reducers/router';

const commonTitles = {
  DASHBOARD: { icon: <MenuIcon type="home" />, text: 'Home' },
  PROFILE: { icon: <MenuIcon type="solution" />, text: 'Profile' },
  LOGOUT: {
    icon: <MenuIcon type="logout" />,
    text: 'Logout',
  },
};

const adminTitles = {
  ROLE_ASSIGN: {
    icon: <MenuIcon type="setting" />,
    text: 'Assign Roles',
  },
  ROLE_MANAGEMENT: {
    icon: <MenuIcon type="setting" />,
    text: 'Create/ Update Roles',
  },
  MEMBER_MANAGEMENT: {
    icon: <MenuIcon type="user" />,
    text: 'Members Management',
  },
  CLAIM_MANAGEMENT: {
    icon: <MenuIcon type="file-text" />,
    text: 'Claims Management',
  },
  EVENT_TRANSACTION: {
    icon: <MenuIcon type="calculator" />,
    text: 'Event Finance',
  },
  EVENT_MANAGEMENT: {
    icon: <MenuIcon type="calendar" />,
    text: 'View Events List',
  },
  EVENT_CREATION: {
    icon: <MenuIcon type="calendar" />,
    text: 'Create New Event',
  },
};

const MenuPanel = ({
  performLogout,
  updateLocation,
  currentLocation,
  selectedKeys,
  isEcMember,
  functNameList,
}) => {
  const onClick = (e) => {
    if (e.key === LOGOUT) {
      performLogout();
      // redirect to login page
      localStorage.clear();
      console.log('cleared local storage');
    } else {
      const location = { ...currentLocation, pathname: e.key };
      updateLocation({ location });
    }
  };
  const roleMgmtSubMenu = (
    <span>
      <MenuIcon type="setting" />
      <span>Role Management</span>
    </span>
  );
  const eventMgmtSubMenu = (
    <span>
      <MenuIcon type="calendar" />
      <span>Event Management</span>
    </span>
  );

  return (
    <Menu
      mode="vertical"
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
      {isEcMember === '1'
        && functNameList.includes(ROLE_MANAGEMENT) && (
          <SubMenu key="roleMgmtSubMenu" title={roleMgmtSubMenu}>
            <MenuItem key={ROLE_MANAGEMENT}>
              {adminTitles.ROLE_MANAGEMENT.icon}
              {adminTitles.ROLE_MANAGEMENT.text}
            </MenuItem>
            <MenuItem key={ROLE_ASSIGN}>
              {adminTitles.ROLE_ASSIGN.icon}
              {adminTitles.ROLE_ASSIGN.text}
            </MenuItem>
          </SubMenu>
      )}
      {isEcMember === '1'
        && functNameList.includes(MEMBER_MANAGEMENT) && (
          <MenuItem key={MEMBER_MANAGEMENT}>
            {adminTitles.MEMBER_MANAGEMENT.icon}
            {adminTitles.MEMBER_MANAGEMENT.text}
          </MenuItem>
      )}
      {isEcMember === '1'
        && functNameList.includes(CLAIM_MANAGEMENT) && (
          <MenuItem key={CLAIM_MANAGEMENT}>
            {adminTitles.CLAIM_MANAGEMENT.icon}
            {adminTitles.CLAIM_MANAGEMENT.text}
          </MenuItem>
      )}
      {isEcMember === '1'
        && functNameList.includes(EVENT_TRANSACTION) && (
          <MenuItem key={EVENT_TRANSACTION}>
            {adminTitles.EVENT_TRANSACTION.icon}
            {adminTitles.EVENT_TRANSACTION.text}
          </MenuItem>
      )}
      {isEcMember === '1'
        && functNameList.includes(EVENT_MANAGEMENT) && (
          <SubMenu key="eventMgmtSubMenu" title={eventMgmtSubMenu}>
            <MenuItem key={EVENT_MANAGEMENT}>
              {adminTitles.EVENT_MANAGEMENT.icon}
              {adminTitles.EVENT_MANAGEMENT.text}
            </MenuItem>
            <MenuItem key={EVENT_CREATION}>
              {adminTitles.EVENT_CREATION.icon}
              {adminTitles.EVENT_CREATION.text}
            </MenuItem>
          </SubMenu>
      )}
      <MenuItem key={LOGOUT}>
        <a href={LOGIN}>
          {commonTitles.LOGOUT.icon}
          {commonTitles.LOGOUT.text}
        </a>
      </MenuItem>
    </Menu>
  );
};

MenuPanel.propTypes = {
  performLogout: PropTypes.func.isRequired,
  updateLocation: PropTypes.func.isRequired,
  currentLocation: PropTypes.shape().isRequired,
  selectedKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  isEcMember: PropTypes.string.isRequired,
  functNameList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapDispatchToProps = {
  performLogout: setLogout,
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
