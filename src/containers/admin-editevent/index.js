import React from 'react';
import { Card } from 'antd';
// import { FormCard } from './styled-components';
import EditEventForm from './editevent-page';
import { pageStyles } from '../shared-components/common';

const EditEventPage = () => (
  <div className="home-pages">
    <Card bordered={false} style={pageStyles}>
      <EditEventForm />
    </Card>
  </div>
);

export default EditEventPage;
