import React from 'react';
import { connect } from 'react-redux';
import Responsive from 'react-responsive';
import { Route, Redirect } from 'react-router';
import { LOGIN } from '../../../actions/location';
import PrivatePage from './private-page';

/* eslint react/prop-types: 0 */
const Desktop = props => <Responsive {...props} minWidth={1200} />;
const Tablet = props => (
  <Responsive {...props} minWidth={992} maxWidth={1199} />
);
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => (
  <Responsive {...props} minWidth={768} maxWidth={991} />
);

const PrivatePath = ({
  name,
  photo,
  isLoggedIn,
  isEcMember,
  roleIdList,
  functNameList,
  token,
  ...props
}) => {
  const Page = (
    <PrivatePage
      {...props}
      name={name}
      photo={photo}
      isEcMember={isEcMember}
      functNameList={functNameList}
      token={token}
    />
  );
  return isLoggedIn ? (
    <Route
      {...props}
      render={() => (
        <div>
          <Desktop>{Page}</Desktop>
          <Tablet>{Page}</Tablet>
          <Mobile>{Page}</Mobile>
          <Default>{Page}</Default>
        </div>
      )}
    />
  ) : (
    <Redirect to={LOGIN} />
  );
};

const mapStateToProps = (state) => {
  // const { isLoggedIn, isAdmin, token } = state.login.data;
  const {
    name,
    photo,
    isLoggedIn,
    isEcMember,
    functNameList,
    token,
  } = state.login.data;
  return {
    name,
    photo,
    isLoggedIn,
    isEcMember,
    functNameList,
    token,
  };
};

export default connect(mapStateToProps)(PrivatePath);
