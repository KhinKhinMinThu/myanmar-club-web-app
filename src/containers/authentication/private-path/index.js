import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { LOGIN } from '../../../actions/location';
import PrivatePage from './private-page';

/* eslint react/prop-types: 0 */
const PrivatePath = ({
  isLoggedIn, isEcMember, roleIdList, token, ...props
}) => (isLoggedIn ? (
  <Route
    {...props}
      // render={() => (isAdmin ? <PrivateAdminPage {...props} /> : <PrivateMemberPage {...props} />)}
    render={() => (
      <PrivatePage
        {...props}
        isEcMember={isEcMember}
        roleIdList={roleIdList}
        token={token}
      />
    )}
  />
) : (
  <Redirect to={LOGIN} />
));

const mapStateToProps = (state) => {
  // const { isLoggedIn, isAdmin, token } = state.login.data;
  const {
    isLoggedIn, isEcMember, roleIdList, token,
  } = state.login.data;
  return {
    isLoggedIn,
    isEcMember,
    roleIdList,
    token,
  };
};

export default connect(mapStateToProps)(PrivatePath);
