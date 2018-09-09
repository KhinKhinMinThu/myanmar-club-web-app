import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { LOGIN } from '../../../actions/location';
import PrivatePage from './private-page';

/* eslint react/prop-types: 0 */
const PrivatePath = ({
  isLoggedIn,
  isEcMember,
  roleIdList,
  functNameList,
  token,
  ...props
}) => (isLoggedIn ? (
  <Route
    {...props}
    render={() => (
      <PrivatePage
        {...props}
        isEcMember={isEcMember}
        functNameList={functNameList}
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
    isLoggedIn, isEcMember, functNameList, token,
  } = state.login.data;
  return {
    isLoggedIn,
    isEcMember,
    functNameList,
    token,
  };
};

export default connect(mapStateToProps)(PrivatePath);
