import React, { Component } from 'react';
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
} from '../shared-styled';

const FormItem = Form.Item;
const { TabPane } = Tabs;
// Responsive layout for event forms
export const layout = {
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
  style: {
    border: 0,
    outline: 0,
    borderRadius: 0,
    padding: 0,
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
  },
};

/* eslint react/prop-types: 0 */
// claim tabs
export const ClaimTabs = ({ onChange, tabContents }) => {
  const tabTitles = {
    tab1: (
      <BoldText>
        <TabIcon type="pay-circle-o" />
        New-Claims
      </BoldText>
    ),
    tab2: (
      <BoldText>
        <TabIcon type="pay-circle-o" />
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

export class ClaimsTable extends Component {
  state = {
    isModalVisible: false,
  };

  onCloseModal = () => {
    this.setState({
      isModalVisible: false,
      photoLink: '',
      remark: '',
    });
  };

  showModal = (record) => {
    this.setState({
      isModalVisible: true,
      photoLink: record.photoLink,
      remark: record.remark,
    });
  };

  render() {
    const {
      claimsList,
      rowSelection,
      onChange,
      sortedInfo,
      filteredInfo,
    } = this.props;
    const { isModalVisible, photoLink, remark } = this.state;

    const columns = [
      {
        title: 'No',
        dataIndex: 'no',
        key: 'no',
        width: '4%',
        render: (text, record, index) => <span>{`${index + 1}`}</span>,
      },
      {
        title: 'Event Description',
        dataIndex: 'eventDesc',
        key: 'eventDesc',
        sorter: (a, b) => a.eventDesc.length - b.eventDesc.length,
        sortOrder: sortedInfo.columnKey === 'eventDesc' && sortedInfo.order,
        width: '25%',
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        sorter: (a, b) => a.category.length - b.category.length,
        sortOrder: sortedInfo.columnKey === 'category' && sortedInfo.order,
        width: '14%',
      },
      {
        title: 'Total Amount',
        dataIndex: 'totalAmount',
        key: 'totalAmount',
        sorter: (a, b) => Number.parseFloat(a.totalAmount) - Number.parseFloat(b.totalAmount),
        sortOrder: sortedInfo.columnKey === 'totalAmount' && sortedInfo.order,
        render: text => `SGD ${text}`,
        width: '14%',
      },
      {
        title: 'Photo Link',
        dataIndex: 'photoLink',
        key: 'photoLink',
        render: (text, record) => (
          <TableActionButton
            icon="picture"
            onClick={() => this.showModal(record)}
          >
            Click to view the receipt
          </TableActionButton>
        ),
        width: '15%',
      },
      {
        title: 'Submitted By',
        dataIndex: 'submittedBy',
        key: 'submittedBy',
        filteredValue: filteredInfo.submittedBy || null,
        onFilter: (value, record) => record.submittedBy.toLowerCase().includes(value),
        sorter: (a, b) => a.submittedBy.length - b.submittedBy.length,
        sortOrder: sortedInfo.columnKey === 'submittedBy' && sortedInfo.order,
        width: '14%',
      },
      {
        title: 'Submitted Date',
        dataIndex: 'submittedDate',
        key: 'submittedDate',
        sorter: (a, b) => new Date(a.submittedDate) - new Date(b.submittedDate),
        sortOrder: sortedInfo.columnKey === 'submittedDate' && sortedInfo.order,
        width: '14%',
      },
    ];

    return (
      <div>
        <FullWidthTable
          columns={columns}
          dataSource={claimsList}
          rowSelection={rowSelection}
          onChange={onChange}
          bordered
          size="small"
          pagination={{ position: 'top' }}
        />
        <Modal
          title="Claim's Receipt"
          visible={isModalVisible}
          onCancel={this.onCloseModal}
          style={{ top: 10 }}
          footer={[
            <Button key="close" type="primary" onClick={this.onCloseModal}>
              Close
            </Button>,
          ]}
        >
          <img alt="receipt" width="100%" src={photoLink} />
          <FormItem {...layout} style={{ marginBottom: 0 }} label="Photo Link">
            <a href={photoLink}>{photoLink}</a>
          </FormItem>
          <FormItem {...layout} style={{ marginBottom: 0 }} label="Remark">
            <BoldText>{remark}</BoldText>
          </FormItem>
        </Modal>
      </div>
    );
  }
}
