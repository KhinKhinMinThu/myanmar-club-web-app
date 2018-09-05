import React from 'react';
import {
  Form, Col, Popconfirm, Button, Input, Tooltip, Transfer,
} from 'antd';
import {
  TableActionButton,
  FullWidthTable,
  MarginLeftButton,
  FullButton,
  HalfWidthButton,
  SelectedText,
  BoldUnderlineText,
} from './styled-components';

const FormItem = Form.Item;
const TextArea = Form.text;
/* eslint react/prop-types: 0 */

// RolesTable
export const RolesTable = ({
  roleList,
  rowSelection,
  decorator,
  onChange,
  sortedInfo,
  filteredInfo,
  expandedRowKeys,
  onExpand,
  header,
}) => {
  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      width: '4%',
      render: (text, record, index) => <span>{`${index + 1}`}</span>,
    },
    {
      title: 'Role Name',
      dataIndex: 'roleName',
      key: 'roleName',
      filteredValue: filteredInfo.roleName || null,
      onFilter: (value, record) => record.roleName.toLowerCase().includes(value),
      sorter: (a, b) => {
        if (a.roleName < b.roleName) return -1;
        if (a.roleName > b.roleName) return 1;
        return 0;
      },
      sortOrder: sortedInfo.columnKey === 'roleName' && sortedInfo.order,
      width: '20%',
    },
    {
      title: 'Role Description',
      dataIndex: 'roleDescription',
      key: 'roleDescription',
      sorter: (a, b) => {
        if (a.roleDescription < b.roleDescription) return -1;
        if (a.roleDescription > b.roleDescription) return 1;
        return 0;
      },
      sortOrder: sortedInfo.columnKey === 'roleDescription' && sortedInfo.order,
      width: '23%',
    },
    {
      title: 'Created Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      sortOrder: sortedInfo.columnKey === 'createdAt' && sortedInfo.order,
      width: '12%',
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
      sorter: (a, b) => {
        if (a.createdBy < b.createdBy) return -1;
        if (a.createdBy > b.createdBy) return 1;
        return 0;
      },
      sortOrder: sortedInfo.columnKey === 'createdBy' && sortedInfo.order,
      width: '12%',
    },
    {
      title: 'Updated Date',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
      sortOrder: sortedInfo.columnKey === 'updatedAt' && sortedInfo.order,
      width: '12%',
    },
    {
      title: 'Updated By',
      dataIndex: 'updatedBy',
      key: 'updatedBy',
      sorter: (a, b) => {
        if (a.updatedBy < b.updatedBy) return -1;
        if (a.updatedBy > b.updatedBy) return 1;
        return 0;
      },
      sortOrder: sortedInfo.columnKey === 'updatedBy' && sortedInfo.order,
      width: '12%',
    },
  ];

  return (
    <FullWidthTable
      title={() => header}
      columns={columns}
      dataSource={roleList}
      rowSelection={rowSelection}
      onChange={onChange}
      decorator={decorator}
      bordered
      size="small"
      style={{ marginBottom: '30px' }}
      pagination={{ position: 'top' }}
      expandedRowKeys={expandedRowKeys}
      onExpand={onExpand}
      expandedRowRender={({ dataSource, selectedFunction }) => (
        <FunctionTransfer
          decorator={decorator}
          data={dataSource}
          selectedFunction={selectedFunction}
        />
      )}
    />
  );
};

export const SaveButton = ({ isPostApiLoading }) => (
  <HalfWidthButton type="primary" htmlType="submit" loading={isPostApiLoading}>
    Save
  </HalfWidthButton>
);

export const GoBackButton = ({ history }) => (
  <HalfWidthButton onClick={() => history.go(-1)}>Go Back</HalfWidthButton>
);

// CancelButton for TransactionTable
export const CancelButton = ({ record, action }) => (
  <Popconfirm title="Confirm to cancel?" onConfirm={() => action(record.id)}>
    <TableActionButton icon="close-circle-o" />
  </Popconfirm>
);

// EditButton for TransactionTable
export const EditButton = ({ record, action }) => (
  <Tooltip title="Edit Income">
    <TableActionButton icon="edit" onClick={() => action(record.id)} />
  </Tooltip>
);

// DeleteButton for TransactionTable
export const DeleteButton = ({ record, action }) => (
  <Popconfirm
    title="Confirm to remove this role?"
    onConfirm={() => action(record.id)}
  >
    <Tooltip title="Delete Role">
      <TableActionButton icon="delete" />
    </Tooltip>
  </Popconfirm>
);

// AddRowButton for TransactionTable
export const AddRowButton = ({ type, action }) => (
  <Button
    type="primary"
    size="small"
    onClick={() => action(type)}
    style={{ float: 'right' }}
  >
    {type === 'income' ? 'Add New Income' : 'Add New Expenditure'}
  </Button>
);

// SearchNamePanel
export const SearchNamePanel = ({
  onChange,
  decorator,
  onSearch,
  onClickReset,
  placeHolder,
}) => (
  <FormItem style={{ marginBottom: 3 }}>
    <Col span={4}>
      {decorator('searchName', { initialValue: null })(
        <Input
          placeholder={placeHolder}
          onChange={onChange}
          onPressEnter={onSearch}
        />,
      )}
    </Col>
    <Col span={20}>
      <MarginLeftButton type="primary" onClick={onSearch}>
        Search
      </MarginLeftButton>
      <MarginLeftButton type="primary" onClick={onClickReset} ghost>
        Clear Search
      </MarginLeftButton>
    </Col>
  </FormItem>
);

// DeSeletAllButton
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

// SeletAllButton
export const SeletAllButton = ({ onClick, loading }) => (
  <Button type="primary" onClick={onClick} loading={loading} ghost>
    Select All
  </Button>
);

// SelectedInfo
export const SelectedInfo = ({ selectedNum, placeHolder }) => (
  <SelectedText>
    Selected {selectedNum} {placeHolder}(s)
  </SelectedText>
);

// DeleteSeletedButton
export const DeleteSeletedButton = ({
  onClick,
  hasSelected,
  isPostApiLoading,
  placeHolder,
}) => (
  <MarginLeftButton
    type="primary"
    onClick={onClick}
    disabled={!hasSelected}
    loading={isPostApiLoading}
  >
    {placeHolder}
  </MarginLeftButton>
);

// BackButton
export const BackButton = ({ history }) => (
  <FullButton onClick={() => history.go(-1)}>Go Back</FullButton>
);

export const FunctionTransfer = ({
  decorator,
  dataSource,
  selectedFunction,
}) => {
  const titles = [
    <BoldUnderlineText>Function(s):</BoldUnderlineText>,
    <BoldUnderlineText>{selectedFunction}</BoldUnderlineText>,
  ];

  return (
    <Col offset={5}>
      <FormItem>
        {decorator('functionTransfer', { valuePropName: 'targetKeys' })(
          <Transfer
            dataSource={dataSource}
            titles={titles}
            showSearch
            searchPlaceholder="Search function"
            listStyle={{
              width: 350,
              height: 300,
              textAlign: 'left',
            }}
            render={item => item.description}
          />,
        )}
      </FormItem>
    </Col>
  );
};

// Role Name
export const RoleNameInput = ({ decorator }) => (
  <FormItem label="Role Name">
    {decorator('name')(<Input placeholder="Role Name" />)}
  </FormItem>
);

// Role Description
export const RoleDescriptionInput = ({ decorator }) => (
  <FormItem label="Description">
    {decorator('description')(<TextArea rows={2} placeholder="Role Description" />)}
  </FormItem>
);
