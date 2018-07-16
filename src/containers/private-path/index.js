import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { LOGIN } from '../../actions/location';
import PrivateAdminPage from './private-admin-page';
import PrivateMemberPage from './private-member-page';

const PrivatePath = ({ isLoggedIn, isAdmin, ...props }) => (isLoggedIn ? (
  <Route
    {...props}
    render={() => (isAdmin ? <PrivateAdminPage {...props} /> : <PrivateMemberPage {...props} />)}
  />
) : (
  <Redirect to={LOGIN} />
));

PrivatePath.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { isLoggedIn, isAdmin } = state.login;
  return {
    isLoggedIn,
    isAdmin,
  };
};

export default connect(mapStateToProps)(PrivatePath);
