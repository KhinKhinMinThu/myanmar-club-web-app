import React from 'react';
import { Card } from 'antd';
// import { FormCard } from './styled-components';
import ViewEventForm from './viewevent-page';
import { pageStyles } from '../shared-components/common';

const ViewEventPage = () => (
  <div className="home-pages">
    <Card bordered={false} style={pageStyles}>
      <ViewEventForm />
    </Card>
  </div>
);

export default ViewEventPage;
