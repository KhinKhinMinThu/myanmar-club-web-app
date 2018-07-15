import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { LOGIN } from '../../actions/location';
import MenuPage from './menu-page';

const PrivatePath = ({ isLoggedIn, ...props }) => (
  <Route
    {...props}
    render={() => (isLoggedIn ? <MenuPage {...props} /> : <Redirect to={LOGIN} />)}
  />
);

PrivatePath.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { isLoggedIn } = state.login;
  return {
    isLoggedIn,
  };
};

export default connect(mapStateToProps)(PrivatePath);
