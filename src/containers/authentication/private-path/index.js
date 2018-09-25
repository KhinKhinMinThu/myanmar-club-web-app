import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { LOGIN } from '../../../actions/location';
import PrivatePage from './private-page';

/* eslint react/prop-types: 0 */
const PrivatePath = ({
  name,
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
        name={name}
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
    name, isLoggedIn, isEcMember, functNameList, token,
  } = state.login.data;
  return {
    name,
    isLoggedIn,
    isEcMember,
    functNameList,
    token,
  };
};

export default connect(mapStateToProps)(PrivatePath);
