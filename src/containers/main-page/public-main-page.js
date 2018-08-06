import React from 'react';
import { Link } from 'react-router-dom';
import { LOGIN, SIGNUP, FORGOTPASSWORD } from '../../actions/location';

const PublicMain = () => (
  <div>
    <Link to={LOGIN}>LOGIN PAGE</Link>
    <br />
    <Link to={SIGNUP}>SIGN UP PAGE</Link>
    <br />
    <Link to={FORGOTPASSWORD}>FORGOT PASSWORD PAGE</Link>
  </div>
);
export default PublicMain;
