import React, { Component } from 'react';
import {
  Tabs, Button, Form, Modal,
} from 'antd';
import { MEMBER_EDIT } from '../../../actions/location';
import {
  FullWidthTable,
  TableActionIcon,
  TableActionLink,
  TableActionButton,
  TabIcon,
  BoldText,
  SelectedText,
  MarginLeftButton,
  SearchInput,
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
    {decorator('searchName', { initialValue: null })(
      <SearchInput
        placeholder={placeHolder}
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
const displayMemberInfo = member => [
  { label: 'Member Id', text: member.id || '-' },
  { label: 'Name', text: member.name || '-' },
  { label: 'Gender', text: member.gender || '-' },
  { label: 'Date of birth', text: member.dateOfBirth || '-' },
  { label: 'Nationality', text: member.nationality || '-' },
  { label: 'Religion', text: member.religion || '-' },
  { label: 'Marital Status', text: member.maritalStatus || '-' },
  { label: 'Education Level', text: member.educationLevel || '-' },
  { label: 'Occupation', text: member.occupation || '-' },
  { label: 'Singapore Pass', text: member.passType || '-' },
  { label: 'ID Number', text: member.idNumber || '-' },
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
  { label: 'Membership Type', text: member.membershipType || '-' },
  { label: 'Membership Status', text: member.membershipStatus || '-' },
  { label: 'Joined Date', text: member.createdDate || '-' },
  { label: 'Membership Expiry Date', text: member.membershipExpiryDate || '-' },
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
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        width: '15%',
      },
      {
        title: 'Email Address',
        dataIndex: 'emailAddress',
        key: 'emailAddress',
        sorter: (a, b) => a.emailAddress.length - b.emailAddress.length,
        sortOrder: sortedInfo.columnKey === 'emailAddress' && sortedInfo.order,
        width: '22%',
      },
      {
        title: 'Mobile No',
        dataIndex: 'mobilePhone',
        key: 'mobilePhone',
        sorter: (a, b) => a.mobilePhone.length - b.mobilePhone.length,
        sortOrder: sortedInfo.columnKey === 'mobilePhone' && sortedInfo.order,
        width: '9%',
      },
      {
        title: 'Role Title(s)',
        dataIndex: 'roleNames',
        key: 'roleNames',
        sorter: (a, b) => a.roleNames.length - b.roleNames.length,
        sortOrder: sortedInfo.columnKey === 'roleNames' && sortedInfo.order,
        width: '12%',
      },
      {
        title: 'Membership Expiry',
        dataIndex: 'membershipExpiry',
        key: 'membershipExpiry',
        sorter: (a, b) => new Date(a.membershipExpiry) - new Date(b.membershipExpiry),
        sortOrder:
          sortedInfo.columnKey === 'membershipExpiry' && sortedInfo.order,
        width: '15%',
      },
      {
        title: 'Status',
        dataIndex: 'membershipStatus',
        key: 'membershipStatus',
        sorter: (a, b) => a.membershipStatus.length - b.membershipStatus.length,
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
          <span>
            <TableActionButton
              icon="folder-open"
              onClick={() => this.showModal(record)}
            />
            <TableActionLink to={MEMBER_EDIT.concat('/').concat(record.id)}>
              <TableActionIcon type="edit" />
            </TableActionLink>
          </span>
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
              {displayMemberInfo(member).map(item => (
                <FormItem
                  key={item.label}
                  {...layout}
                  style={{ marginBottom: 0 }}
                  label={item.label}
                >
                  <BottomUnder>{item.text}</BottomUnder>
                </FormItem>
              ))}
            </TabPane>
            <TabPane tab="Membership" key="tab2">
              {displayMembership(member).map(item => (
                <FormItem
                  key={item.label}
                  {...layout}
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
/* <ModalItem {...layout} label="Member Id">
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
        <BoldText>{viewMember.emailAddress}</BoldText>
      </ModalItem>
      <ModalItem {...layout} label="Facebook Account">
        <BoldText>??</BoldText>
      </ModalItem>
      <ModalItem {...layout} label="Home Phone Number">
        <BoldText>??</BoldText>
      </ModalItem>
      <ModalItem {...layout} label="Mobile Number">
        <BoldText>{viewMember.mobilePhone}</BoldText>
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
        <BoldText>{viewMember.membershipStatus}</BoldText>
      </ModalItem>
      <ModalItem {...layout} label="Membership Expiry Date">
        <BoldText>{viewMember.membershipExpiry}</BoldText>
      </ModalItem>
    </Modal> */
