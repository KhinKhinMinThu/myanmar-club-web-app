import React from 'react';
import { PageCard } from '../shared-components/common';
import EventTransaction from './event-transaction-page';

const EventTransactionPage = () => (
  <div className="home-pages">
    <PageCard bordered={false}>
      <EventTransaction />
    </PageCard>
  </div>
);

export default EventTransactionPage;
