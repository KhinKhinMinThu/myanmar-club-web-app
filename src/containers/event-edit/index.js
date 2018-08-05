import React from 'react';
import EventEdit from './event-edit-page';
import { PageCard } from '../shared-components/common';

const EventEditPage = props => (
  <div className="home-pages">
    <PageCard bordered={false}>
      <EventEdit {...props} />
    </PageCard>
  </div>
);

export default EventEditPage;
