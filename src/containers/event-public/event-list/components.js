import React from 'react';
import { EVENT_VIEW, EVENT_REGISTER } from '../../../actions/location';
import { FullWidthTable, TableActionButton } from '../shared-styled';

/* eslint react/prop-types: 0 */
// EventsTable
const EventsTable = ({
  eventsList,
  onChange,
  sortedInfo,
  filteredInfo,
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
      width: '10%',
    },
    {
      title: 'Action',
      key: 'action',
      width: '10%',
      // render: (text, record) => ()
      render: record => (
        <div>
          <TableActionButton
            href={EVENT_VIEW.concat('/').concat(record.id)}
            icon="folder-open"
          />
          <TableActionButton
            href={EVENT_REGISTER.concat('/').concat(record.id)}
            icon="edit"
          />
        </div>
      ),
    },
  ];

  return (
    <FullWidthTable
      title={() => header}
      columns={columns}
      dataSource={eventsList}
      onChange={onChange}
      bordered
      size="small"
      pagination={{ position: 'top' }}
    />
  );
};

export default EventsTable;
