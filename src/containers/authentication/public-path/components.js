import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import { MenuItem, MenuIcon } from '../shared-styled';
import {
  DEFAULT,
  LOGIN,
  SIGNUP,
  // FORGOTPASSWORD,
  // RESETPASSWORD,
  // PUBLIC_EVENT_VIEW,
} from '../../../actions/location';
import { locationChange } from '../../../reducers/router';

const commonTitles = {
  DEFAULT: { icon: <MenuIcon type="home" />, text: '' },
  LOGIN: { icon: <MenuIcon type="user" />, text: 'Login' },
  SIGNUP: { icon: <MenuIcon type="form" />, text: 'Signup' },
};

const MenuPanel = ({ updateLocation, currentLocation, selectedKeys }) => {
  const onClick = (e) => {
    const location = { ...currentLocation, pathname: e.key };
    updateLocation({ location });
  };
  const height = { style: { height: 40 } };
  return (
    <Menu mode="horizontal" onClick={onClick} selectedKeys={selectedKeys}>
      <MenuItem {...height} key={DEFAULT}>
        {commonTitles.DEFAULT.icon}
        {commonTitles.DEFAULT.text}
      </MenuItem>
      <MenuItem {...height} key={LOGIN}>
        {commonTitles.LOGIN.icon}
        {commonTitles.LOGIN.text}
      </MenuItem>
      <MenuItem {...height} key={SIGNUP}>
        {commonTitles.SIGNUP.icon}
        {commonTitles.SIGNUP.text}
      </MenuItem>
    </Menu>
  );
};

MenuPanel.propTypes = {
  updateLocation: PropTypes.func.isRequired,
  currentLocation: PropTypes.shape().isRequired,
  selectedKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapDispatchToProps = {
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
