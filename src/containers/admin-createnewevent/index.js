import React from 'react';
import { Card } from 'antd';
// import { FormCard } from './styled-components';
import CreatEventForm from './createnewevent-page';
import { pageStyles } from '../shared-components/common';

const CreateNewEventPage = () => (
  <div className="home-pages">
    <Card bordered={false} style={pageStyles}>
      <CreatEventForm />
    </Card>
  </div>
);

export default CreateNewEventPage;
