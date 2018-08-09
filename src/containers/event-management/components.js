import React from 'react';
import { Button, Form } from 'antd';
import { EVENT_CREATION, EVENT_VIEW, EVENT_EDIT } from '../../actions/location';
import {
  FullWidthTable,
  SelectedText,
  MarginLeftButton,
  TableActionIcon,
  TableActionLink,
  SearchInput,
} from './styled-components';

const FormItem = Form.Item;

/* eslint react/prop-types: 0 */
// SearchNamePanel
export const SearchNamePanel = ({
  onChange,
  decorator,
  onSearch,
  onClickReset,
}) => (
  <FormItem style={{ marginBottom: 3 }}>
    {decorator('searchName', { initialValue: null })(
      <SearchInput
        placeholder="Search event name"
        onChange={onChange}
        onPressEnter={onSearch}
      />,
    )}
    <MarginLeftButton type="primary" onClick={onSearch}>
      Search
    </MarginLeftButton>
    <MarginLeftButton type="primary" onClick={onClickReset} ghost>
      Clear Search
    </MarginLeftButton>
  </FormItem>
);

// EventsTable
export const EventsTable = ({
  eventsList,
  rowSelection,
  onChange,
  sortedInfo,
  filteredInfo,
}) => {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: '3%',
    },
    {
      title: 'Event Name',
      dataIndex: 'name',
      key: 'name',
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.toLowerCase().includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      width: '11%',
    },
    {
      title: 'Event Description',
      dataIndex: 'description',
      key: 'description',
      sorter: (a, b) => a.description.length - b.description.length,
      sortOrder: sortedInfo.columnKey === 'description' && sortedInfo.order,
      width: '22%',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
      sortOrder: sortedInfo.columnKey === 'startDate' && sortedInfo.order,
      width: '10%',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      sorter: (a, b) => new Date(a.endDate) - new Date(b.endDate),
      sortOrder: sortedInfo.columnKey === 'endDate' && sortedInfo.order,
      width: '10%',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      sorter: (a, b) => a.location.length - b.location.length,
      sortOrder: sortedInfo.columnKey === 'location' && sortedInfo.order,
      width: '22%',
    },
    {
      title: 'Status',
      dataIndex: 'eventStatus',
      key: 'eventStatus',
      sorter: (a, b) => a.eventStatus.length - b.eventStatus.length,
      sortOrder: sortedInfo.columnKey === 'eventStatus' && sortedInfo.order,
      render: text => (text === '1' ? 'Open' : 'Closed'),
      width: '11%',
    },
    {
      title: 'Action',
      key: 'action',
      width: '10%',
      // render: (text, record) => ()
      render: record => (
        <span>
          <TableActionLink to={EVENT_VIEW.concat('/').concat(record.id)}>
            <TableActionIcon type="folder-open" />
          </TableActionLink>
          <TableActionLink to={EVENT_EDIT.concat('/').concat(record.id)}>
            <TableActionIcon type="edit" />
          </TableActionLink>
        </span>
      ),
    },
  ];

  return (
    <FullWidthTable
      columns={columns}
      dataSource={eventsList}
      rowSelection={rowSelection}
      onChange={onChange}
      bordered
      size="small"
      pagination={{
        position: 'top',
        showTotal: () => <CreateNewEventButton />,
      }}
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

export const SelectedEvents = ({ selectedNum }) => (
  <SelectedText>Selected {selectedNum} event(s)</SelectedText>
);

export const DeleteSeletedButton = ({
  onClick,
  hasSelected,
  isPostApiLoading,
}) => (
  <MarginLeftButton
    type="primary"
    onClick={onClick}
    disabled={!hasSelected}
    loading={isPostApiLoading}
  >
    Delete Selected Event(s)
  </MarginLeftButton>
);

export const CreateNewEventButton = () => (
  <Button type="primary" icon="file-add" href={EVENT_CREATION}>
    Create a New Event
  </Button>
);
