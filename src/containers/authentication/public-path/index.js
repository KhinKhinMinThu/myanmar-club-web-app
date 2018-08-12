import React from 'react';
import { Route } from 'react-router';
import PublicPage from './public-page';

const PublicPath = ({ ...props }) => (
  <Route {...props} render={() => <PublicPage {...props} />} />
);

export default PublicPath;
