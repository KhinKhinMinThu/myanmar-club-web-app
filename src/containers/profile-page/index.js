import React from 'react';
import { Card } from 'antd';
import Profile from './profile-page';
import { pageStyles } from '../shared-components/common';
// import RenewalPage from './renewal-page';

const ProfilePage = () => (
  <div className="home-pages">
    <Card bordered={false} style={pageStyles}>
      <Profile />
    </Card>
  </div>
);

export default ProfilePage;
