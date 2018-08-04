import React from 'react';
import { PageCard } from '../shared-components/common';
import AccManagement from './account-management-page';

const AccountManagementPage = () => (
  <div className="home-pages">
    <PageCard bordered={false}>
      <AccManagement />
    </PageCard>
  </div>
);

export default AccountManagementPage;
