import React from 'react';
import {
  Button, Tooltip, Row, Col,
} from 'antd';
import { Link } from 'react-router-dom';
import {
  EVENT_CREATION,
  EVENT_VIEW,
  EVENT_EDIT,
} from '../../../actions/location';
import { FullWidthTable, TableActionButton } from '../shared-styled';

/* eslint react/prop-types: 0 */
// EventsTable
export const EventsTable = ({
  eventsList,
  rowSelection,
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
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => Number.parseInt(a.id, 10) - Number.parseInt(b.id, 10),
      sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
      width: '5%',
    },
    {
      title: 'Event Name',
      dataIndex: 'name',
      key: 'name',
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.toLowerCase().includes(value),
      sorter: (a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      },
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      width: '11%',
    },
    {
      title: 'Event Description',
      dataIndex: 'description',
      key: 'description',
      sorter: (a, b) => {
        if (a.description < b.description) return -1;
        if (a.description > b.description) return 1;
        return 0;
      },
      sortOrder: sortedInfo.columnKey === 'description' && sortedInfo.order,
      width: '22%',
      // render: (text) => {
      //   // const strArr = text.split(' ');
      //   const strArr = text;
      //   return strArr.length >= 300
      //     ? strArr
      //       .slice(0, 300)
      //       .join(' ')
      //       .concat(' ...')
      //     : text;
      // },
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
      sortOrder: sortedInfo.columnKey === 'startDate' && sortedInfo.order,
      width: '9%',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      sorter: (a, b) => new Date(a.endDate) - new Date(b.endDate),
      sortOrder: sortedInfo.columnKey === 'endDate' && sortedInfo.order,
      width: '9%',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      sorter: (a, b) => {
        if (a.location < b.location) return -1;
        if (a.location > b.location) return 1;
        return 0;
      },
      sortOrder: sortedInfo.columnKey === 'location' && sortedInfo.order,
      width: '22%',
    },
    {
      title: 'Status',
      dataIndex: 'eventStatus',
      key: 'eventStatus',
      sorter: (a, b) => {
        if (a.eventStatus < b.eventStatus) return -1;
        if (a.eventStatus > b.eventStatus) return 1;
        return 0;
      },
      sortOrder: sortedInfo.columnKey === 'eventStatus' && sortedInfo.order,
      render: text => (text === '1' ? 'Open' : 'Closed'),
      width: '7%',
    },
    {
      title: 'Action',
      key: 'action',
      width: '10%',
      // render: (text, record) => ()
      render: record => (
        <div>
          <Tooltip title="View Event Details">
            <Link to={EVENT_VIEW.concat('/').concat(record.id)}>
              <TableActionButton icon="eye" />
            </Link>
          </Tooltip>
          <Tooltip title="Edit Event">
            <Link to={EVENT_EDIT.concat('/').concat(record.id)}>
              <TableActionButton icon="edit" />
            </Link>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <FullWidthTable
      title={() => (
        <Row>
          <Col span={12} style={{ textAlign: 'left' }}>
            {header}
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <CreateNewEventButton />
          </Col>
        </Row>
      )}
      columns={columns}
      dataSource={eventsList}
      rowSelection={rowSelection}
      onChange={onChange}
      bordered
      size="small"
      pagination={{
        position: 'top',
        // showTotal: () => <CreateNewEventButton />,
      }}
    />
  );
};

export const CreateNewEventButton = () => (
  <Link to={EVENT_CREATION}>
    <Button type="primary" icon="file-add">
      Create a New Event
    </Button>
  </Link>
);
