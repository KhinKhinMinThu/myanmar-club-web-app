import React from 'react';
import { PageCard } from '../shared-components/common';
import RoleManagement from './role-management-page';

const RoleManagementPage = () => (
  <div className="home-pages">
    <PageCard bordered={false}>
      <RoleManagement />
    </PageCard>
  </div>
);

export default RoleManagementPage;
