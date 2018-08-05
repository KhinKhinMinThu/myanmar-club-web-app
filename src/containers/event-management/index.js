import React from 'react';
import { PageCard } from '../shared-components/common';
import EventManagement from './event-management-page';

const EventManagementPage = () => (
  <div className="home-pages">
    <PageCard bordered={false}>
      <EventManagement />
    </PageCard>
  </div>
);

export default EventManagementPage;
