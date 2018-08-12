import React from 'react';
import { Table } from 'antd';

// ******************************* info page components
// *******************************

export const unicode = { fontFamily: 'Myanmar3', fontSize: 14 };

const columns = [
  { title: '', dataIndex: 'NA', align: 'right' },
  {
    title: 'Life',
    dataIndex: 'LI',
    align: 'right',
    width: '20%',
  },
  {
    title: 'Ordinary',
    dataIndex: 'OR',
    align: 'right',
    width: '20%',
  },
  {
    title: 'Student/ Worker',
    dataIndex: 'SW',
    align: 'right',
    width: '30%',
  },
];

const data = [
  {
    key: '1',
    NA: 'Entrance Fee',
    LI: 'SGD 50',
    OR: 'SGD 50',
    SW: 'Waive',
  },
  {
    key: '2',
    NA: 'Annual Fee',
    LI: 'NA',
    OR: 'SGD 24',
    SW: 'SGD 24',
  },
  {
    key: '3',
    NA: 'The Member',
    LI: 'SGD 300',
    OR: 'NA',
    SW: 'NA',
  },
  {
    key: '4',
    NA: 'Total',
    LI: 'SGD 350',
    OR: 'SGD 74',
    SW: 'SGD 24',
  },
];

export const feesTbl = (
  <Table
    style={{ border: '1px solid black' }}
    columns={columns}
    dataSource={data}
    pagination={false}
    size="small"
    bordered
  />
);
