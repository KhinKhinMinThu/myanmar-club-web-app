import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { DEFAULT } from '../../actions/location';
import PrivatePage from './private-page';

const PrivatePath = ({ isLoggedIn, isAdmin, ...props }) => (isLoggedIn ? (
  <Route
    {...props}
      // render={() => (isAdmin ? <PrivateAdminPage {...props} /> : <PrivateMemberPage {...props} />)}
    render={() => <PrivatePage {...props} isAdmin={isAdmin} />}
  />
) : (
  <Redirect to={DEFAULT} />
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
