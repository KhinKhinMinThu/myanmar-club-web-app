import React from 'react';
import { PageCard } from '../shared-components/common';
import MemberManagement from './member-management-page';

const MemberManagementPage = props => (
  <div className="home-pages">
    <PageCard bordered={false}>
      <MemberManagement {...props} />
    </PageCard>
  </div>
);

export default MemberManagementPage;
