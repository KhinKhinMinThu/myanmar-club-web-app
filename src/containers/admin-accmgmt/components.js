import { Tabs, Button } from 'antd';
import React from 'react';
import {
  TabIcon, BoldText, FullWidthTable, SelectedText,
} from './styled-components';

const { TabPane } = Tabs;

/* eslint react/prop-types: 0 */
export const MemberTabs = ({ onChange, tabContents }) => {
  const tabTitles = {
    tab1: (
      <BoldText>
        <TabIcon type="user" />
        EC-Members
      </BoldText>
    ),
    tab2: (
      <BoldText>
        <TabIcon type="user" />
        Club-Members
      </BoldText>
    ),
  };

  const EcMembersPage = tabContents[0];
  return (
    <Tabs onChange={onChange} type="card">
      <TabPane tab={tabTitles.tab1} key="tab1">
        <EcMembersPage />
      </TabPane>
      <TabPane tab={tabTitles.tab2} key="tab2">
        Content of Tab Pane 2
      </TabPane>
    </Tabs>
  );
};

export const EcMembersTable = ({ ecMembersList, rowSelection }) => {
  const columns = [
    // dataIndex = databases column names
    { title: 'Id', dataIndex: 'id' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Email Address', dataIndex: 'email_address' },
    { title: 'Mobile No', dataIndex: 'mobile_phone' },
    { title: 'Role Title', dataIndex: 'role_names' },
    { title: 'Membership Expiry', dataIndex: 'membership_expiry' },
    { title: 'Status', dataIndex: 'membership_status' },
    {
      title: 'Action',
      key: 'action',
      // render: (text, record) => ()
      render: () => (
        <span>
          <a href="www.google.com">View</a>
          <a href="www.google.com">Edit</a>
          <a href="www.google.com">Delete</a>
        </span>
      ),
    },
  ];

  return (
    <FullWidthTable
      columns={columns}
      dataSource={ecMembersList}
      rowSelection={rowSelection}
      bordered
    />
  );
};

export const DeSeletAllButton = ({ onClick, hasSelected, loading }) => (
  <Button type="primary" onClick={onClick} disabled={!hasSelected} loading={loading} ghost>
    Deselect All
  </Button>
);

export const SelectedMembers = ({ selectedNum }) => (
  <SelectedText>Selected {selectedNum} member(s)</SelectedText>
);
