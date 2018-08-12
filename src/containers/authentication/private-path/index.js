import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { LOGIN } from '../../../actions/location';
import PrivatePage from './private-page';

const PrivatePath = ({
  isLoggedIn, isAdmin, token, ...props
}) => (isLoggedIn ? (
  <Route
    {...props}
      // render={() => (isAdmin ? <PrivateAdminPage {...props} /> : <PrivateMemberPage {...props} />)}
    render={() => <PrivatePage {...props} isAdmin={isAdmin} token={token} />}
  />
) : (
  <Redirect to={LOGIN} />
));

PrivatePath.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const { isLoggedIn, isAdmin, token } = state.login.data;
  return {
    isLoggedIn,
    isAdmin,
    token,
  };
};

export default connect(mapStateToProps)(PrivatePath);
