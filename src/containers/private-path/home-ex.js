// dummy home page: to be removed later
import React from 'react';
import { Link } from 'react-router-dom';
import { LOGIN, SIGNUP } from '../../actions/location';

const Dashboard = () => (
  <div>
    HOME PAGE<br />
    <Link to={LOGIN}>LOGIN PAGE</Link>
    <br />
    <Link to={SIGNUP}>SIGN UP PAGE</Link>
    <br />
  </div>
);
export default Dashboard;
