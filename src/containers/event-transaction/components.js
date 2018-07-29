import React, { Component } from 'react';
import {
  Form, Row, Col, Popconfirm, Button,
} from 'antd';
import {
  TableActionButton,
  BoldText,
  BoldUnderlineText,
  FullWidthTable,
  MarginLeftButton,
  SearchInput,
  RowWhiteBackground,
} from './styled-components';

const FormItem = Form.Item;

/* eslint react/prop-types: 0 */
export const EventsTable = ({
  eventsList,
  onChange,
  sortedInfo,
  filteredInfo,
  removeRecord,
  expandedRowKeys,
  onExpand,
  onClickAddRow,
  cancelTransaction,
  editTransaction,
  saveTransaction,
  editingKey,
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
      title: 'Event Name',
      dataIndex: 'name',
      key: 'name',
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    },
    {
      title: 'Event Description',
      dataIndex: 'description',
      key: 'description',
      sorter: (a, b) => a.description.length - b.description.length,
      sortOrder: sortedInfo.columnKey === 'description' && sortedInfo.order,
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
      sortOrder: sortedInfo.columnKey === 'startDate' && sortedInfo.order,
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      sorter: (a, b) => new Date(a.endDate) - new Date(b.endDate),
      sortOrder: sortedInfo.columnKey === 'endDate' && sortedInfo.order,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      sorter: (a, b) => a.location.length - b.location.length,
      sortOrder: sortedInfo.columnKey === 'location' && sortedInfo.order,
    },
    {
      title: 'Status',
      dataIndex: 'eventStatus',
      key: 'eventStatus',
      sorter: (a, b) => a.eventStatus.length - b.eventStatus.length,
      sortOrder: sortedInfo.columnKey === 'eventStatus' && sortedInfo.order,
      render: text => (text === '1' ? 'Open' : 'Closed'),
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
      sorter: (a, b) => a.createdBy.length - b.createdBy.length,
      sortOrder: sortedInfo.columnKey === 'createdBy' && sortedInfo.order,
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      sorter: (a, b) => new Date(a.createdDate) - new Date(b.createdDate),
      sortOrder: sortedInfo.columnKey === 'createdDate' && sortedInfo.order,
    },
  ];

  return (
    <FullWidthTable
      columns={columns}
      dataSource={eventsList}
      onChange={onChange}
      bordered
      expandedRowKeys={expandedRowKeys}
      onExpand={onExpand}
      expandedRowRender={record => (
        <TransactionTable
          transactionList={record.eventTransactions}
          removeRecord={transacId => removeRecord(record.id, transacId)}
          transaction={record}
          onClickAddRow={type => onClickAddRow(record.id, type)}
          cancelTransaction={transacId => cancelTransaction(transacId)}
          editTransaction={transacId => editTransaction(transacId)}
          saveTransaction={(form, transacId) => saveTransaction(form, transacId)}
          editingKey={editingKey}
        />
      )}
    />
  );
};

const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);
class EditableCell extends Component {
  getInput = () => {
    const { inputType } = this.props;
    if (inputType === 'number') {
      return <SearchInput />;
    }
    return <SearchInput />;
  };

  render() {
    const {
      editing, dataIndex, title, inputType, record, index, ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `Please Input ${title}!`,
                      },
                    ],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : (
                restProps.children
              )}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

const TransactionTable = ({
  transactionList,
  removeRecord,
  transaction,
  onClickAddRow,
  cancelTransaction,
  editTransaction,
  saveTransaction,
  editingKey,
}) => {
  const isEditing = record => record.key === editingKey;
  const columns = [
    // dataIndex = databases column names
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      editable: true,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      editable: true,
    },
    {
      title: '',
      key: '',

      // render: (text, record) => ()

      render: (record) => {
        const editable = isEditing(record);
        return (
          <div>
            {editable ? (
              <div>
                <EditableContext.Consumer>
                  {form => (
                    <TableActionButton
                      type="primary"
                      onClick={() => saveTransaction(form, record.id)}
                    >
                      Save
                    </TableActionButton>
                  )}
                </EditableContext.Consumer>
                <Popconfirm
                  title="Confirm to cancel?"
                  onConfirm={() => cancelTransaction(record.id)}
                >
                  <TableActionButton type="primary" ghost>
                    Cancel
                  </TableActionButton>
                </Popconfirm>
              </div>
            ) : (
              <div>
                <Popconfirm
                  title="Confirm to remove this transaction record?"
                  onConfirm={() => removeRecord(record.id)}
                >
                  <TableActionButton icon="delete" />
                </Popconfirm>
                <TableActionButton icon="edit" onClick={() => editTransaction(record.id)} />
              </div>
            )}
          </div>
        );
      },
    },
  ];

  // add the key and format role_names of member list
  const preparedList = [];
  transactionList.map(item => preparedList.push({
    key: `${item.id}`,
    ...item,
  }));

  const title1 = <BoldUnderlineText>INCOME</BoldUnderlineText>;
  const title2 = <BoldUnderlineText>EXPENDITURE</BoldUnderlineText>;
  const addRowButton = type => (
    <Button type="primary" size="small" onClick={() => onClickAddRow(type)}>
      Add row
    </Button>
  );
  const totalIncome = (
    <BoldText>
      {'Total Income: SGD '}
      {transaction.income}
    </BoldText>
  );
  const totalExpenditure = (
    <BoldText>
      {'Total Expenditure: SGD '}
      {transaction.expenditure}
    </BoldText>
  );

  const components = {
    body: {
      row: EditableFormRow,
      cell: EditableCell,
    },
  };

  const editableColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === 'amount' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <RowWhiteBackground gutter={8}>
      <Col span={12}>
        <FullWidthTable
          title={() => (
            <Row>
              <Col span={8}>{title1}</Col>
              <Col span={16} style={{ textAlign: 'right' }}>
                {addRowButton('income')}
              </Col>
            </Row>
          )}
          components={components}
          columns={editableColumns}
          dataSource={preparedList.filter(item => item.type.toLowerCase() === 'income')}
          pagination={{ pageSize: 5 }}
          bordered
          size="small"
        />
        {totalIncome}
      </Col>
      <Col span={12}>
        <FullWidthTable
          title={() => (
            <Row>
              <Col span={8}>{title2}</Col>
              <Col span={16} style={{ textAlign: 'right' }}>
                {addRowButton('expenditure')}
              </Col>
            </Row>
          )}
          components={components}
          columns={editableColumns}
          dataSource={preparedList.filter(item => item.type.toLowerCase() === 'expenditure')}
          pagination={{ pageSize: 5 }}
          bordered
          size="small"
        />
        {totalExpenditure}
      </Col>
    </RowWhiteBackground>
  );
};

// export const DeSeletAllButton = ({ onClick, hasSelected, loading }) => (
//   <MarginLeftButton
//     type="primary"
//     onClick={onClick}
//     disabled={!hasSelected}
//     loading={loading}
//     ghost
//   >
//     Deselect All
//   </MarginLeftButton>
// );

// export const SeletAllButton = ({ onClick, loading }) => (
//   <Button type="primary" onClick={onClick} loading={loading} ghost>
//     Select All
//   </Button>
// );

// export const SelectedMembers = ({ selectedNum }) => (
//   <SelectedText>Selected {selectedNum} member(s)</SelectedText>
// );

// export const ApproveSeletedButton = ({ onClick, hasSelected }) => (
//   <MarginLeftButton type="primary" onClick={onClick} disabled={!hasSelected}>
//     Approve Selected Claim(s)
//   </MarginLeftButton>
// );

// export const UnapproveSeletedButton = ({ onClick, hasSelected }) => (
//   <MarginLeftButton type="primary" onClick={onClick} disabled={!hasSelected}>
//     Un-Approve Selected Claim(s)
//   </MarginLeftButton>
// );

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
