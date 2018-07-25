import React from 'react';
import {
  Tabs, Button, Form, Modal,
} from 'antd';
import {
  TabIcon,
  TableActionButton,
  BoldText,
  FullWidthTable,
  SelectedText,
  MarginLeftButton,
  SearchInput,
  ModalItem,
} from './styled-components';

const { TabPane } = Tabs;
const FormItem = Form.Item;

/* eslint react/prop-types: 0 */
export const ClaimTabs = ({ onChange, tabContents }) => {
  const tabTitles = {
    tab1: (
      <BoldText>
        <TabIcon type="calculator" />
        New-Claims
      </BoldText>
    ),
    tab2: (
      <BoldText>
        <TabIcon type="calculator" />
        Approved-Claims
      </BoldText>
    ),
  };

  const NewClaimsPage = tabContents[0];
  const ApprovedClaimsPage = tabContents[1];

  return (
    <Tabs onChange={onChange} type="card">
      <TabPane tab={tabTitles.tab1} key="tab1">
        <NewClaimsPage />
      </TabPane>
      <TabPane tab={tabTitles.tab2} key="tab2">
        <ApprovedClaimsPage />
      </TabPane>
    </Tabs>
  );
};

export const ClaimsTable = ({
  newClaimsList,
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
      title: 'Event Description',
      dataIndex: 'eventDesc',
      key: 'eventDesc',
      sorter: (a, b) => a.eventDesc.length - b.eventDesc.length,
      sortOrder: sortedInfo.columnKey === 'eventDesc' && sortedInfo.order,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      sorter: (a, b) => a.category.length - b.category.length,
      sortOrder: sortedInfo.columnKey === 'category' && sortedInfo.order,
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      sorter: (a, b) => a.totalAmount - b.totalAmount,
      sortOrder: sortedInfo.columnKey === 'totalAmount' && sortedInfo.order,
    },
    {
      title: 'Photo Link',
      dataIndex: 'photoLink',
      key: 'photoLink',
      render: (text, record) => (
        <TableActionButton icon="picture" onClick={() => showModal(record.id)}>
          Click to view the receipt
        </TableActionButton>
      ),
    },
    {
      title: 'Submitted By',
      dataIndex: 'submittedBy',
      key: 'submittedBy',
      filteredValue: filteredInfo.submittedBy || null,
      onFilter: (value, record) => record.submittedBy.includes(value),
      sorter: (a, b) => a.submittedBy.length - b.submittedBy.length,
      sortOrder: sortedInfo.columnKey === 'submittedBy' && sortedInfo.order,
    },
    {
      title: 'Submitted Date',
      dataIndex: 'submittedDate',
      key: 'submittedDate',
      sorter: (a, b) => new Date(a.submittedDate) - new Date(b.submittedDate),
      sortOrder: sortedInfo.columnKey === 'submittedDate' && sortedInfo.order,
    },
  ];

  return (
    <FullWidthTable
      columns={columns}
      dataSource={newClaimsList}
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

export const ApproveSeletedButton = ({ onClick, hasSelected }) => (
  <MarginLeftButton type="primary" onClick={onClick} disabled={!hasSelected}>
    Approve Selected Claim(s)
  </MarginLeftButton>
);

export const UnapproveSeletedButton = ({ onClick, hasSelected }) => (
  <MarginLeftButton type="primary" onClick={onClick} disabled={!hasSelected}>
    Un-Approve Selected Claim(s)
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
      <SearchInput
        placeholder="Search submitted by"
        onChange={onChange}
        onPressEnter={onPressEnter}
      />,
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

export const ClaimModal = ({ onCloseModal, isModalVisible, viewClaim }) => {
  const layout = {
    labelCol: {
      xs: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 20 },
    },
  };
  const { photoLink, remark } = viewClaim;
  return (
    <Modal
      title="Claim's Details"
      visible={isModalVisible}
      style={{ top: 20 }}
      onCancel={onCloseModal}
      footer={[
        <Button key="close" type="primary" onClick={onCloseModal}>
          Close
        </Button>,
      ]}
    >
      <img alt="example" style={{ width: '100%' }} src={photoLink} />
      <ModalItem {...layout} label="Photo Link">
        <a href={photoLink}>{photoLink}</a>
      </ModalItem>
      <ModalItem {...layout} label="Remark">
        <BoldText>{remark}</BoldText>
      </ModalItem>
    </Modal>
  );
};
