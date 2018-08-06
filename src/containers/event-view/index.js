import React from 'react';
import EventView from './event-view-page';
import { PageCard } from '../shared-components/common';

const EventViewPage = props => (
  <div className="home-pages">
    <PageCard bordered={false}>
      <EventView {...props} />
    </PageCard>
  </div>
);

export default EventViewPage;
