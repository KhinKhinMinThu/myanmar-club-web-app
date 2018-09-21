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
  INCIDENT_SEARCH,
  INCIDENT_CREATION,
} from '../../../actions/location';
import { setLogout } from '../../../reducers/login/login-data';
import { locationChange } from '../../../reducers/router';

const UsersSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M968.704 918.528c0 44.032-19.456 87.04-94.208 87.04-168.96 0-642.048 1.024-723.968 0-91.136-1.024-94.208-45.056-94.208-87.04 0-202.752 139.264-384 325.632-436.224-81.92-44.032-122.88-124.928-122.88-218.112C258.048 126.976 371.712 15.36 512 15.36c140.288 0 253.952 111.616 253.952 248.832 0 94.208-45.056 175.104-126.976 218.112C825.344 534.528 970.752 717.824 968.704 918.528L968.704 918.528 968.704 918.528 968.704 918.528 968.704 918.528zM968.704 918.528" />
  </svg>
);
const ClaimSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M128 128a128 128 0 0 1 128-128h704a64 64 0 0 1 0 128c-42.688 0-64 21.312-64 64v640H128V128z m128 192v64h64V320H256z m0 192v64h64V512H256z m128-192v64h320V320H384z m0 192v64h320V512H384z m-320 384h832a128 128 0 0 1-128 128H64a64 64 0 0 1 0-128z" />
  </svg>
);
const commonTitles = {
  DASHBOARD: {
    icon: <MenuIcon type="home" theme="filled" />,
    text: 'Home',
  },
  PROFILE: {
    icon: <MenuIcon type="profile" theme="filled" />,
    text: 'Profile',
  },
  LOGOUT: {
    icon: <MenuIcon type="logout" theme="outlined" />,
    text: 'Logout',
  },
};

const adminTitles = {
  ROLE_ASSIGN: {
    icon: <MenuIcon type="setting" theme="filled" />,
    text: 'Assign Roles',
  },
  ROLE_MANAGEMENT: {
    icon: <MenuIcon type="setting" theme="filled" />,
    text: 'Create/ Update Roles',
  },
  MEMBER_MANAGEMENT: {
    icon: <MenuIcon component={UsersSvg} />,
    text: 'Members Management',
  },
  CLAIM_MANAGEMENT: {
    icon: <MenuIcon component={ClaimSvg} />,
    text: 'Claims Management',
  },
  EVENT_TRANSACTION: {
    icon: <MenuIcon type="calculator" theme="filled" />,
    text: 'Event Finance',
  },
  EVENT_MANAGEMENT: {
    icon: <MenuIcon type="calendar" theme="filled" />,
    text: 'View Events List',
  },
  EVENT_CREATION: {
    icon: <MenuIcon type="calendar" theme="filled" />,
    text: 'Create New Event',
  },
  INCIDENT_SEARCH: {
    icon: <MenuIcon type="alert" theme="filled" />,
    text: 'Search Incidents',
  },
  INCIDENT_CREATION: {
    icon: <MenuIcon type="alert" theme="filled" />,
    text: 'Create New Incident',
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
      document.documentElement.scrollTop = 0;
      const location = { ...currentLocation, pathname: e.key };
      updateLocation({ location });
    }
  };
  const roleMgmtSubMenu = (
    <span>
      <MenuIcon type="setting" theme="filled" />
      <span>Role Management</span>
    </span>
  );
  const eventMgmtSubMenu = (
    <span>
      <MenuIcon type="calendar" theme="filled" />
      <span>Event Management</span>
    </span>
  );
  const incidentMgmtSubMenu = (
    <span>
      <MenuIcon type="alert" theme="filled" />
      <span>Incident Management</span>
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
      {isEcMember === '1'
        && functNameList.includes(INCIDENT_SEARCH) && (
          <SubMenu key="incidentMgmtSubMenu" title={incidentMgmtSubMenu}>
            <MenuItem key={INCIDENT_SEARCH}>
              {adminTitles.INCIDENT_SEARCH.icon}
              {adminTitles.INCIDENT_SEARCH.text}
            </MenuItem>
            <MenuItem key={INCIDENT_CREATION}>
              {adminTitles.INCIDENT_CREATION.icon}
              {adminTitles.INCIDENT_CREATION.text}
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
