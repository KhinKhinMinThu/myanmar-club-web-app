import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
  Tabs, Button, Form, Modal, Col, Input, Tooltip, Card,
} from 'antd';
import { MEMBER_EDIT } from '../../../actions/location';
import { DEFAULT_DATE, DATE_FORMAT } from '../../../actions/constants';
import {
  FullWidthTable,
  TabIcon,
  TableActionButton,
  BoldText,
  SelectedText,
  MarginLeftButton,
  BottomUnder,
} from '../shared-styled';

const FormItem = Form.Item;
const { TabPane } = Tabs;

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
    lg: { span: 8 },
    xl: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 16 },
    xl: { span: 16 },
  },
  colon: true,
};
/* eslint react/prop-types: 0 */
// MemberTabs
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

// Member Object Labels
const displayMemberInfo1 = member => [
  { label: 'Member Id', text: member.id || '-' },
  { label: 'Name', text: member.name || '-' },
  { label: 'Gender', text: member.gender || '-' },
  {
    label: 'Date of birth',
    text: member.dateOfBirth
      ? moment(member.dateOfBirth).format(DATE_FORMAT)
      : '-',
  },
  { label: 'Nationality', text: member.nationality || '-' },
  { label: 'Religion', text: member.religion || '-' },
];
const displayMemberInfo2 = member => [
  { label: 'Marital Status', text: member.maritalStatus || '-' },
  { label: 'Education Level', text: member.educationLevel || '-' },
  { label: 'Occupation', text: member.occupation || '-' },
  { label: 'Singapore Pass', text: member.passType || '-' },
  { label: 'ID Number', text: member.idNumber || '-' },
];
const displayMemberInfo3 = member => [
  {
    label: 'Address',
    text: [
      member.addressLine1 || '-',
      member.addressLine2,
      member.postalCode,
    ].join(' '),
  },
  { label: 'Email Address', text: member.emailAddress || '-' },
  { label: 'Facebook Account', text: member.facebookAccount || '-' },
  { label: 'Home Phone', text: member.homePhone || '-' },
  { label: 'Mobile Phone', text: member.mobilePhone || '-' },
  { label: 'Hobbies', text: member.hobbies || '-' },
];
const displayMembership = member => [
  {
    label: 'Membership Type',
    text: member.membershipType
      ? member.membershipType.substr(member.membershipType.indexOf(':') + 1)
      : '-',
  },
  { label: 'Membership Status', text: member.membershipStatus || '-' },
  { label: 'Joined Date', text: member.createdDate || '-' },
  {
    label: 'Expiry Date',
    text:
      moment(member.membershipExpiryDate).format(DATE_FORMAT) === DEFAULT_DATE
        ? '-'
        : member.membershipExpiryDate,
  },
  { label: 'Last Payment Date', text: member.lastPaymentDate || '-' },
  { label: 'Last Payment Type', text: member.lastPaymentType || '-' },
];

// MembersTable
export class MembersTable extends Component {
  state = {
    isModalVisible: false,
    member: {},
  };

  onCloseModal = () => {
    this.setState({
      isModalVisible: false,
      member: {},
    });
  };

  showModal = (record) => {
    this.setState({
      isModalVisible: true,
      member: record,
    });
  };

  render() {
    const {
      membersList,
      rowSelection,
      onChange,
      sortedInfo,
      filteredInfo,
      currentTab,
      header,
    } = this.props;
    const { isModalVisible, member } = this.state;
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
        width: '15%',
      },
      {
        title: 'Email Address',
        dataIndex: 'emailAddress',
        key: 'emailAddress',
        sorter: (a, b) => {
          if (a.emailAddress < b.emailAddress) return -1;
          if (a.emailAddress > b.emailAddress) return 1;
          return 0;
        },
        sortOrder: sortedInfo.columnKey === 'emailAddress' && sortedInfo.order,
        width: '22%',
      },
      {
        title: 'Mobile No',
        dataIndex: 'mobilePhone',
        key: 'mobilePhone',
        sorter: (a, b) => {
          if (a.mobilePhone < b.mobilePhone) return -1;
          if (a.mobilePhone > b.mobilePhone) return 1;
          return 0;
        },
        sortOrder: sortedInfo.columnKey === 'mobilePhone' && sortedInfo.order,
        width: '9%',
      },
      {
        title: 'Role Title(s)',
        dataIndex: 'roleNames',
        key: 'roleNames',
        sorter: (a, b) => {
          if (a.roleNames < b.roleNames) return -1;
          if (a.roleNames > b.roleNames) return 1;
          return 0;
        },
        sortOrder: sortedInfo.columnKey === 'roleNames' && sortedInfo.order,
        width: '12%',
      },
      {
        title: 'Membership Expiry',
        dataIndex: 'membershipExpiryDate',
        key: 'membershipExpiryDate',
        sorter: (a, b) => new Date(a.membershipExpiryDate) - new Date(b.membershipExpiryDate),
        sortOrder:
          sortedInfo.columnKey === 'membershipExpiryDate' && sortedInfo.order,
        width: '15%',
        render: (text, record) => (
          <div>
            {moment(record.membershipExpiryDate).format(DATE_FORMAT)
            === DEFAULT_DATE
              ? '-'
              : record.membershipExpiryDate}
          </div>
        ),
      },
      {
        title: 'Status',
        dataIndex: 'membershipStatus',
        key: 'membershipStatus',
        sorter: (a, b) => {
          if (a.membershipStatus < b.membershipStatus) return -1;
          if (a.membershipStatus > b.membershipStatus) return 1;
          return 0;
        },
        sortOrder:
          sortedInfo.columnKey === 'membershipStatus' && sortedInfo.order,
        width: '8%',
      },
      {
        title: 'Action',
        key: 'action',
        width: '10%',
        // render: (text, record) => ()
        render: (text, record) => (
          <div>
            <Tooltip title="View Member Details">
              <TableActionButton
                icon="eye"
                onClick={() => this.showModal(record)}
              />
            </Tooltip>
            <Tooltip title="Edit Member">
              <Link to={MEMBER_EDIT.concat('/').concat(record.id)}>
                <TableActionButton icon="edit" />
              </Link>
            </Tooltip>
          </div>
        ),
      },
    ];
    // remove role title colum for club members
    if (currentTab === 'tab2') {
      columns.splice(5, 1);
      columns[columns.length - 1].width = '22%';
    }
    return (
      <div>
        <FullWidthTable
          title={() => header}
          columns={columns}
          dataSource={membersList}
          rowSelection={rowSelection}
          onChange={onChange}
          bordered
          size="small"
          pagination={{ position: 'top' }}
        />
        <Modal
          visible={isModalVisible}
          style={{ top: 10 }}
          onCancel={this.onCloseModal}
          footer={[
            <Button key="close" type="primary" onClick={this.onCloseModal}>
              Close
            </Button>,
          ]}
        >
          <Tabs onChange={onChange} type="card">
            <TabPane tab="Member's Info" key="tab1">
              <Card style={{ borderRadius: 15, margin: '0 auto 4px auto' }}>
                {displayMemberInfo1(member).map(item => (
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
                {displayMemberInfo2(member).map(item => (
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
                {displayMemberInfo3(member).map(item => (
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
            </TabPane>
            <TabPane tab="Membership" key="tab2">
              {displayMembership(member).map(item => (
                <FormItem
                  key={item.label}
                  {...modalLayout}
                  style={{ marginBottom: 0 }}
                  label={item.label}
                >
                  <BottomUnder>{item.text}</BottomUnder>
                </FormItem>
              ))}
            </TabPane>
            <TabPane tab="Photo" key="tab3">
              <img
                alt="example"
                style={{
                  width: 'auto',
                  height: '300px',
                  margin: '0 auto 0 auto',
                  display: 'block',
                }}
                src={member.photoLink}
              />,
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    );
  }
}
