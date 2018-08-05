import React from 'react';
import EventCreation from './event-creation-page';
import { PageCard } from '../shared-components/common';

const EventCreationPage = () => (
  <div className="home-pages">
    <PageCard bordered={false}>
      <EventCreation />
    </PageCard>
  </div>
);

export default EventCreationPage;
