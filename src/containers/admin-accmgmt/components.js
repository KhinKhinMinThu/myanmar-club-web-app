import { Tabs, Button } from 'antd';
import React from 'react';
import { ADMIN_MEMBER_VIEW, ADMIN_MEMBER_EDIT } from '../../actions/location';
import {
  TabIcon,
  BoldText,
  FullWidthTable,
  SelectedText,
  MarginLeftButton,
  TableActionIcon,
  TableActionLink,
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
  const ClubMembersPage = tabContents[1];
  return (
    <Tabs onChange={onChange} type="card">
      <TabPane tab={tabTitles.tab1} key="tab1">
        <EcMembersPage />
      </TabPane>
      <TabPane tab={tabTitles.tab2} key="tab2">
        <ClubMembersPage />
      </TabPane>
    </Tabs>
  );
};

export const EcMembersTable = ({
  ecMembersList, rowSelection, onChange, sortedInfo,
}) => {
  const columns = [
    // dataIndex = databases column names
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => Number.parseInt(a.id, 10) - Number.parseInt(b.id, 10),
      sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    },
    {
      title: 'Email Address',
      dataIndex: 'email_address',
      key: 'email_address',
      sorter: (a, b) => a.email_address.length - b.email_address.length,
      sortOrder: sortedInfo.columnKey === 'email_address' && sortedInfo.order,
    },
    {
      title: 'Mobile No',
      dataIndex: 'mobile_phone',
      key: 'mobile_phone',
      sorter: (a, b) => a.mobile_phone.length - b.mobile_phone.length,
      sortOrder: sortedInfo.columnKey === 'mobile_phone' && sortedInfo.order,
    },
    {
      title: 'Role Title',
      dataIndex: 'role_names',
      key: 'role_names',
      sorter: (a, b) => a.role_names.length - b.role_names.length,
      sortOrder: sortedInfo.columnKey === 'role_names' && sortedInfo.order,
    },
    {
      title: 'Membership Expiry',
      dataIndex: 'membership_expiry',
      key: 'membership_expiry',
      sorter: (a, b) => new Date(a.membership_expiry) - new Date(b.membership_expiry),
      sortOrder: sortedInfo.columnKey === 'membership_expiry' && sortedInfo.order,
    },
    {
      title: 'Status',
      dataIndex: 'membership_status',
      key: 'membership_status',
      sorter: (a, b) => a.membership_status.length - b.membership_status.length,
      sortOrder: sortedInfo.columnKey === 'membership_status' && sortedInfo.order,
    },
    {
      title: 'Action',
      key: 'action',
      // render: (text, record) => ()
      render: record => (
        <span>
          <TableActionLink to={ADMIN_MEMBER_VIEW.concat('/').concat(record.id)}>
            <TableActionIcon type="folder-open" />
          </TableActionLink>
          <TableActionLink to={ADMIN_MEMBER_EDIT.concat('/').concat(record.id)}>
            <TableActionIcon type="edit" />
          </TableActionLink>
        </span>
      ),
    },
  ];

  return (
    <FullWidthTable
      columns={columns}
      dataSource={ecMembersList}
      rowSelection={rowSelection}
      onChange={onChange}
      bordered
    />
  );
};

export const ClubMembersTable = ({
  clubMembersList, rowSelection, onChange, sortedInfo,
}) => {
  const columns = [
    // dataIndex = databases column names
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => Number.parseInt(a.id, 10) - Number.parseInt(b.id, 10),
      sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    },
    {
      title: 'Email Address',
      dataIndex: 'email_address',
      key: 'email_address',
      sorter: (a, b) => a.email_address.length - b.email_address.length,
      sortOrder: sortedInfo.columnKey === 'email_address' && sortedInfo.order,
    },
    {
      title: 'Mobile No',
      dataIndex: 'mobile_phone',
      key: 'mobile_phone',
      sorter: (a, b) => a.mobile_phone.length - b.mobile_phone.length,
      sortOrder: sortedInfo.columnKey === 'mobile_phone' && sortedInfo.order,
    },
    {
      title: 'Membership Type',
      dataIndex: 'membership_type',
      key: 'membership_type',
      sorter: (a, b) => a.membership_type.length - b.membership_type.length,
      sortOrder: sortedInfo.columnKey === 'role_names' && sortedInfo.order,
    },
    {
      title: 'Membership Expiry',
      dataIndex: 'membership_expiry',
      key: 'membership_expiry',
      sorter: (a, b) => new Date(a.membership_expiry) - new Date(b.membership_expiry),
      sortOrder: sortedInfo.columnKey === 'membership_expiry' && sortedInfo.order,
    },
    {
      title: 'Status',
      dataIndex: 'membership_status',
      key: 'membership_status',
      sorter: (a, b) => a.membership_status.length - b.membership_status.length,
      sortOrder: sortedInfo.columnKey === 'membership_status' && sortedInfo.order,
    },
    {
      title: 'Action',
      key: 'action',
      // render: (text, record) => ()
      render: record => (
        <span>
          <TableActionLink to={ADMIN_MEMBER_VIEW.concat('/').concat(record.id)}>
            <TableActionIcon type="folder-open" />
          </TableActionLink>
          <TableActionLink to={ADMIN_MEMBER_EDIT.concat('/').concat(record.id)}>
            <TableActionIcon type="edit" />
          </TableActionLink>
        </span>
      ),
    },
  ];

  return (
    <FullWidthTable
      columns={columns}
      dataSource={clubMembersList}
      rowSelection={rowSelection}
      onChange={onChange}
      bordered
    />
  );
};

export const DeSeletAllButton = ({ onClick, hasSelected, loading }) => (
  <Button type="primary" onClick={onClick} disabled={!hasSelected} loading={loading} ghost>
    Deselect All
  </Button>
);

export const SeletAllButton = ({ onClick, loading }) => (
  <MarginLeftButton type="primary" onClick={onClick} loading={loading} ghost>
    Select All
  </MarginLeftButton>
);

export const SelectedMembers = ({ selectedNum }) => (
  <SelectedText>Selected {selectedNum} member(s)</SelectedText>
);

export const DeleteSeletedButton = ({ onClick, hasSelected }) => (
  <MarginLeftButton type="primary" onClick={onClick} disabled={!hasSelected}>
    Delete Selected Member(s)
  </MarginLeftButton>
);
