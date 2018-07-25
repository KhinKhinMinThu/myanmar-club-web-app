import React from 'react';
import { PageCard } from '../shared-components/common';
import ClaimManagement from './claim-management-page';

const ClaimManagementPage = () => (
  <div className="home-pages">
    <PageCard bordered={false}>
      <ClaimManagement />
    </PageCard>
  </div>
);

export default ClaimManagementPage;
