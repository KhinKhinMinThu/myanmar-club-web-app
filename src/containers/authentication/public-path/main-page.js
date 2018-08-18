import React from 'react';
import { Link } from 'react-router-dom';
import {
  LOGIN,
  SIGNUP,
  FORGOTPASSWORD,
  EVENT_LIST,
} from '../../../actions/location';

const PublicMain = () => (
  <div>
    <Link to={LOGIN}>LOGIN PAGE</Link>
    <br />
    <Link to={SIGNUP}>SIGN UP PAGE</Link>
    <br />
    <Link to={FORGOTPASSWORD}>FORGOT PASSWORD PAGE</Link>
    <br />
    <Link to={EVENT_LIST}>VIEW EVENT(S) TO REGISTER</Link>
  </div>
);

export default PublicMain;
