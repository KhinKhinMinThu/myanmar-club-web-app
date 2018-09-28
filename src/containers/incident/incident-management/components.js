import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
  Button, Form, Input, Col, Tooltip, Modal, Row, Card,
} from 'antd';
import { DATE_FORMAT } from '../../../actions/constants';
import IncidentSearchModal from '../incidentSearchModal';
import { INCIDENT_EDIT, INCIDENT_CREATION } from '../../../actions/location';
import {
  FullWidthTable,
  TableActionButton,
  SelectedText,
  BottomUnder,
  MarginLeftButton,
} from '../shared-styled';

const FormItem = Form.Item;
const { Search } = Input;
// Responsive layout for event forms
export const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 10 },
    xl: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 14 },
    xl: { span: 14 },
  },
  colon: true,
};
const modalLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 4 },
    xl: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 20 },
    xl: { span: 20 },
  },
  colon: true,
};
/* eslint react/prop-types: 0 */
// SearchNamePanel
export const SearchNamePanel = ({
  onChange,
  decorator,
  onSearch,
  onClickReset,
  placeHolder,
  // modal properties
  incidentTypes,
  submittedBy,
  performSearchIncident,
  getFieldValue,
}) => (
  <FormItem style={{ marginBottom: 3 }}>
    <Col span={4}>
      {decorator('searchName', { initialValue: null })(
        <Search
          placeholder={placeHolder}
          onChange={onChange}
          onSearch={onSearch}
        />,
      )}
    </Col>
    <Col span={20}>
      <IncidentSearchModal
        decorator={decorator}
        incidentTypes={incidentTypes}
        submittedBy={submittedBy}
        performSearchIncident={performSearchIncident}
        getFieldValue={getFieldValue}
      />

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
  icon,
}) => (
  <MarginLeftButton
    type="primary"
    onClick={onClick}
    disabled={!hasSelected}
    loading={isPostApiLoading}
    icon={icon}
  >
    {placeHolder}
  </MarginLeftButton>
);

// Incident Info
const displayIncidentInfo1 = incident => [
  { label: 'Incident Id', text: incident.id || '-' },
  { label: 'Incident Name', text: incident.name || '-' },
  { label: 'Incident Type', text: incident.incidentType || '-' },
  { label: 'Requester Name', text: incident.requesterName || '-' },
  { label: 'Requester Age', text: incident.requesterAge || '-' },
  { label: 'Description', text: incident.description || '-' },
];
const displayIncidentInfo2 = incident => [
  {
    label: 'Created Date',
    text: incident.createdDate
      ? moment(incident.createdDate).format(DATE_FORMAT)
      : '-',
  },
  { label: 'Createtd By', text: incident.createdBy || '-' },
  {
    label: 'Updated Date',
    text: incident.updatedDate
      ? moment(incident.updatedDate).format(DATE_FORMAT)
      : '-',
  },
  { label: 'Updated By', text: incident.updatedBy || '-' },
];

// IncidentTables
export class IncidentsTable extends Component {
  state = {
    isModalVisible: false,
    incident: {},
  };

  onCloseModal = () => {
    this.setState({
      isModalVisible: false,
      incident: {},
    });
  };

  showModal = (record) => {
    this.setState({
      isModalVisible: true,
      incident: record,
    });
  };

  render() {
    const {
      incidentsList,
      rowSelection,
      onChange,
      sortedInfo,
      filteredInfo,
      header,
    } = this.props;
    const { isModalVisible, incident } = this.state;
    const columns = [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => Number.parseInt(a.id, 10) - Number.parseInt(b.id, 10),
        sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
        width: '5%',
      },
      {
        title: 'Name',
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
        width: '10%',
      },
      {
        title: 'Incident Type',
        dataIndex: 'incidentType',
        key: 'incidentType',
        sorter: (a, b) => {
          if (a.incidentType < b.incidentType) return -1;
          if (a.incidentType > b.incidentType) return 1;
          return 0;
        },
        sortOrder: sortedInfo.columnKey === 'incidentType' && sortedInfo.order,
        width: '11%',
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        sorter: (a, b) => {
          if (a.description < b.description) return -1;
          if (a.description > b.description) return 1;
          return 0;
        },
        sortOrder: sortedInfo.columnKey === 'description' && sortedInfo.order,
        width: '23%',
        render: (text) => {
          // const strArr = text.split(' ');
          const strArr = text;
          return strArr.length >= 300
            ? strArr.slice(0, 300).concat(' ...')
            : text;
        },
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
        width: '9%',
      },
      {
        title: 'Created Date',
        dataIndex: 'createdDate',
        key: 'createdDate',
        sorter: (a, b) => new Date(a.createdDate) - new Date(b.createdDate),
        sortOrder: sortedInfo.columnKey === 'createdDate' && sortedInfo.order,
        width: '11%',
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
        width: '9%',
      },
      {
        title: 'Updated Date',
        dataIndex: 'updatedDate',
        key: 'updatedDate',
        sorter: (a, b) => new Date(a.updatedDate) - new Date(b.updatedDate),
        sortOrder: sortedInfo.columnKey === 'updatedDate' && sortedInfo.order,
        width: '11%',
      },
      {
        title: 'Action',
        key: 'action',
        width: '8%',
        // render: (text, record) => ()
        render: record => (
          <div>
            <Tooltip title="View Incident">
              <TableActionButton
                icon="eye"
                onClick={() => this.showModal(record)}
              />
            </Tooltip>
            <Tooltip title="Edit Incident">
              <Link to={INCIDENT_EDIT.concat('/').concat(record.id)}>
                <TableActionButton icon="edit" />
              </Link>
            </Tooltip>
          </div>
        ),
      },
    ];

    return (
      <div>
        <FullWidthTable
          title={() => (
            <Row>
              <Col span={12} style={{ textAlign: 'left' }}>
                {header}
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <CreateNewIncidentButton />
              </Col>
            </Row>
          )}
          columns={columns}
          dataSource={incidentsList}
          rowSelection={rowSelection}
          onChange={onChange}
          bordered
          size="small"
          pagination={{
            position: 'top',
            // showTotal: () => <CreateNewIncidentButton />,
          }}
        />
        <Modal
          width={800}
          visible={isModalVisible}
          style={{ top: 10 }}
          onCancel={this.onCloseModal}
          footer={[
            <Button key="close" type="primary" onClick={this.onCloseModal}>
              Close
            </Button>,
          ]}
        >
          <Card style={{ borderRadius: 15, margin: '0 auto 4px auto' }}>
            {displayIncidentInfo1(incident).map(item => (
              <FormItem
                key={item.label}
                {...modalLayout}
                style={{ marginBottom: 0 }}
                label={item.label}
              >
                <BottomUnder>{item.text}</BottomUnder>
              </FormItem>
            ))}
          </Card>
          <Card style={{ borderRadius: 15, margin: '0 auto 4px auto' }}>
            {displayIncidentInfo2(incident).map(item => (
              <FormItem
                key={item.label}
                {...modalLayout}
                style={{ marginBottom: 0 }}
                label={item.label}
              >
                <BottomUnder>{item.text}</BottomUnder>
              </FormItem>
            ))}
          </Card>
        </Modal>
      </div>
    );
  }
}
export const CreateNewIncidentButton = () => (
  <Link to={INCIDENT_CREATION}>
    <Button type="primary" icon="file-add">
      Create a New Incident
    </Button>
  </Link>
);
