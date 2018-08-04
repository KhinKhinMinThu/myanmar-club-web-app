import React from 'react';
import { Card } from 'antd';
// import { FormCard } from './styled-components';
import ViewEventForm from './vieweventregistration-page';
import { pageStyles } from '../shared-components/common';

const ViewEventRegistrationPage = () => (
  <div className="home-pages">
    <Card bordered={false} style={pageStyles}>
      <ViewEventForm />
    </Card>
  </div>
);

export default ViewEventRegistrationPage;
