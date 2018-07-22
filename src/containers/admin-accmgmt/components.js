import React from 'react';
import {
  Tabs, Button, Form, Modal,
} from 'antd';
import { ADMIN_MEMBER_EDIT } from '../../actions/location';
import {
  TabIcon,
  BoldText,
  FullWidthTable,
  SelectedText,
  MarginLeftButton,
  TableActionIcon,
  TableActionLink,
  SearchInput,
  TableActionButton,
  ModalItem,
} from './styled-components';

const { TabPane } = Tabs;
const FormItem = Form.Item;

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
  ecMembersList,
  rowSelection,
  onChange,
  sortedInfo,
  filteredInfo,
  showModal,
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

      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
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
          <TableActionButton icon="folder-open" onClick={() => showModal(record.id)} />
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
  clubMembersList,
  rowSelection,
  onChange,
  sortedInfo,
  filteredInfo,
  showModal,
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
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
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
          <TableActionButton icon="folder-open" onClick={() => showModal(record.id)} />
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
  <MarginLeftButton
    type="primary"
    onClick={onClick}
    disabled={!hasSelected}
    loading={loading}
    ghost
  >
    Deselect All
  </MarginLeftButton>
);

export const SeletAllButton = ({ onClick, loading }) => (
  <Button type="primary" onClick={onClick} loading={loading} ghost>
    Select All
  </Button>
);

export const SelectedMembers = ({ selectedNum }) => (
  <SelectedText>Selected {selectedNum} member(s)</SelectedText>
);

export const DeleteSeletedButton = ({ onClick, hasSelected }) => (
  <MarginLeftButton type="primary" onClick={onClick} disabled={!hasSelected}>
    Delete Selected Member(s)
  </MarginLeftButton>
);

export const SearchNamePanel = ({
  onChange,
  onPressEnter,
  decorator,
  onClickSearch,
  onClickReset,
}) => (
  <FormItem
    {...{
      labelCol: {
        xs: { span: 0 },
        sm: { span: 0 },
      },
      wrapperCol: {
        xs: { span: 8 },
        sm: { span: 8 },
      },
    }}
  >
    {decorator('searchName', { initialValue: null })(
      <SearchInput placeholder="Search name" onChange={onChange} onPressEnter={onPressEnter} />,
    )}
    <SearchNameButton onClick={onClickSearch} />
    <ResetButton onClick={onClickReset} />
  </FormItem>
);

export const SearchNameButton = ({ onClick }) => (
  <MarginLeftButton type="primary" onClick={onClick}>
    Search
  </MarginLeftButton>
);

export const ResetButton = ({ onClick }) => (
  <MarginLeftButton type="primary" onClick={onClick} ghost>
    Clear Search
  </MarginLeftButton>
);

export const MemberModal = ({ onCloseModal, isModalVisible, viewMember }) => {
  const layout = {
    labelCol: {
      xs: { span: 12 },
    },
    wrapperCol: {
      xs: { span: 12 },
    },
  };
  return (
    <Modal
      title="Member's Details"
      visible={isModalVisible}
      style={{ top: 20 }}
      onCancel={onCloseModal}
      footer={[
        <Button key="close" type="primary" onClick={onCloseModal}>
          Close
        </Button>,
      ]}
    >
      <ModalItem {...layout} label="Member Id">
        <BoldText>{viewMember.id}</BoldText>
      </ModalItem>
      <ModalItem {...layout} label="Name">
        <BoldText>{viewMember.name}</BoldText>
      </ModalItem>
      <ModalItem {...layout} label="Gender">
        <BoldText>??</BoldText>
      </ModalItem>
      <ModalItem {...layout} label="Date of Birth">
        <BoldText>??</BoldText>
      </ModalItem>
      <ModalItem {...layout} label="Nationality">
        <BoldText>??</BoldText>
      </ModalItem>
      <ModalItem {...layout} label="Religion">
        <BoldText>??</BoldText>
      </ModalItem>
      <ModalItem {...layout} label="Marital Status">
        <BoldText>??</BoldText>
      </ModalItem>
      <ModalItem {...layout} label="Education Level">
        <BoldText>??</BoldText>
      </ModalItem>
      <ModalItem {...layout} label="Occupation">
        <BoldText>??</BoldText>
      </ModalItem>
      <ModalItem {...layout} label="Singapore Pass">
        <BoldText>??</BoldText>
      </ModalItem>
      <ModalItem {...layout} label="Identification Number">
        <BoldText>??</BoldText>
      </ModalItem>
      <ModalItem {...layout} label="Address">
        <BoldText>??</BoldText>
      </ModalItem>
      <ModalItem {...layout} label="Postal Code">
        <BoldText>??</BoldText>
      </ModalItem>
      <ModalItem {...layout} label="Email Address">
        <BoldText>{viewMember.email_address}</BoldText>
      </ModalItem>
      <ModalItem {...layout} label="Facebook Account">
        <BoldText>??</BoldText>
      </ModalItem>
      <ModalItem {...layout} label="Home Phone Number">
        <BoldText>??</BoldText>
      </ModalItem>
      <ModalItem {...layout} label="Mobile Number">
        <BoldText>{viewMember.mobile_phone}</BoldText>
      </ModalItem>
      <ModalItem {...layout} label="Hobbies">
        <BoldText>??</BoldText>
      </ModalItem>
      <ModalItem {...layout} label="Sub-Committee Member">
        <BoldText>??</BoldText>
      </ModalItem>
      <ModalItem {...layout} label="Member Type">
        <BoldText>{viewMember.membership_type}</BoldText>
      </ModalItem>
      <ModalItem {...layout} label="Member Status">
        <BoldText>{viewMember.membership_status}</BoldText>
      </ModalItem>
      <ModalItem {...layout} label="Membership Expiry Date">
        <BoldText>{viewMember.membership_expiry}</BoldText>
      </ModalItem>
    </Modal>
  );
};
