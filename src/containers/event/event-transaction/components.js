import React, { Component } from 'react';
import {
  Form, Row, Col, Popconfirm, Button, Input, Tooltip,
} from 'antd';
import {
  BoldText,
  TableActionButton,
  BoldUnderlineText,
  FullWidthTable,
} from '../shared-styled';

const FormItem = Form.Item;

/* eslint react/prop-types: 0 */
// EditableContext
const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends Component {
  getInput = (title, record, dataIndex, decorator) => {
    const { inputType } = this.props;
    const options = {
      rules: [
        {
          required: true,
          message: `Please enter ${title}!`,
        },
        { validator: inputType === 'number' ? this.validateAmount : null },
      ],
      initialValue: record[dataIndex],
    };
    return (
      <FormItem style={{ marginBottom: 3 }}>
        {decorator(dataIndex, options)(<Input />)}
      </FormItem>
    );
  };

  validateAmount = (rule, value, callback) => {
    if (value && Number.isNaN(Number(value))) {
      callback('Please enter a number!');
    } else {
      callback();
    }
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing
                ? this.getInput(title, record, dataIndex, getFieldDecorator)
                : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}
// end

// EventsTable
export const EventsTable = ({
  eventsList,
  onChange,
  sortedInfo,
  filteredInfo,
  deleteTransaction,
  expandedRowKeys,
  onExpand,
  onClickAddRow,
  cancelTransaction,
  editTransaction,
  saveTransaction,
  editingKey,
  isPostApiLoading,
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
      width: '17%',
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
      width: '17%',
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
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
      sorter: (a, b) => {
        if (a.createdBy < b.createdBy) return -1;
        if (a.createdBy > b.createdBy) return 1;
        return 0;
      },
      sortOrder: sortedInfo.columnKey === 'createdBy' && sortedInfo.order,
      width: '10%',
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      sorter: (a, b) => new Date(a.createdDate) - new Date(b.createdDate),
      sortOrder: sortedInfo.columnKey === 'createdDate' && sortedInfo.order,
      width: '10%',
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
      expandedRowKeys={expandedRowKeys}
      onExpand={onExpand}
      expandedRowRender={record => (
        <TransactionTable
          transactionList={record.eventTransactions}
          deleteTransaction={transacId => deleteTransaction(record.id, transacId)
          }
          onClickAddRow={type => onClickAddRow(record.id, type)}
          cancelTransaction={transacId => cancelTransaction(transacId)}
          editTransaction={transacId => editTransaction(transacId)}
          saveTransaction={(form, transacId) => saveTransaction(form, record.id, transacId)
          }
          editingKey={editingKey}
          isPostApiLoading={isPostApiLoading}
        />
      )}
    />
  );
};

// SaveButton for TransactionTable
export const SaveButton = ({ record, action, loading }) => (
  <EditableContext.Consumer>
    {form => (
      <TableActionButton
        icon="save"
        onClick={() => action(form, record.id)}
        loading={loading}
      />
    )}
  </EditableContext.Consumer>
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
    title="Confirm to remove this transaction record?"
    onConfirm={() => action(record.id)}
  >
    <Tooltip title="Delete Income">
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

// to add all amount
const reducer = (prev, next) => (typeof prev === 'object' ? prev.amount + next.amount : prev + next.amount);
const totalIncome = preparedList => preparedList.filter(item => item.type === 'income').reduce(reducer, 0);
const totalExpenditure = preparedList => preparedList.filter(item => item.type === 'expenditure').reduce(reducer, 0);
const totalBalance = preparedList => totalIncome(preparedList) - totalExpenditure(preparedList);

// TransactionTable
const TransactionTable = ({
  transactionList,
  deleteTransaction,
  onClickAddRow,
  cancelTransaction,
  editTransaction,
  saveTransaction,
  editingKey,
  isPostApiLoading,
}) => {
  const isEditing = record => record.key === editingKey;
  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      editable: true,
      width: 200,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      editable: true,
      width: 200,
    },
    {
      title: '',
      key: '',
      width: 100,
      // render: (text, record) => ()
      render: (record) => {
        const editable = isEditing(record);
        return (
          <div>
            {editable ? (
              <div>
                <SaveButton
                  record={record}
                  action={saveTransaction}
                  loading={isPostApiLoading}
                />
                <CancelButton record={record} action={cancelTransaction} />
              </div>
            ) : (
              <div>
                <EditButton record={record} action={editTransaction} />
                <DeleteButton record={record} action={deleteTransaction} />
              </div>
            )}
          </div>
        );
      },
    },
  ];

  // add the key and convert amount to number
  const preparedList = [];
  transactionList.map(item => preparedList.push({
    key: `${item.id}`,
    ...item,
    amount: item.amount ? Number(item.amount) : item.amount,
  }));

  const title1 = (
    <Row>
      <BoldUnderlineText>INCOME</BoldUnderlineText>
      <AddRowButton type="income" action={onClickAddRow} />
    </Row>
  );
  const title2 = (
    <Row>
      <BoldUnderlineText>EXPENDITURE</BoldUnderlineText>
      <AddRowButton type="expenditure" action={onClickAddRow} />
    </Row>
  );

  const components = {
    body: {
      row: EditableFormRow,
      cell: EditableCell,
    },
  };

  const editableColumns = columns.map((col) => {
    if (!col.editable) return col;
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

  const incomeList = preparedList.filter(
    item => item.type.toLowerCase() === 'income',
  );
  const expenditureList = preparedList.filter(
    item => item.type.toLowerCase() === 'expenditure',
  );

  const totalIncomeText = (
    <BoldText>
      {'Total Income: SGD '}
      {totalIncome(preparedList).toFixed(2)}
    </BoldText>
  );
  const totalExpText = (
    <BoldText>
      {'Total Expenditure: SGD '}
      {totalExpenditure(preparedList).toFixed(2)}
    </BoldText>
  );
  const totalBalanceAmt = totalBalance(preparedList).toFixed(2);
  const totalBalanceText = (
    <span
      style={{
        fontWeight: 'bold',
        color: totalBalanceAmt < 0 ? '#B22222' : '#1DA57A',
      }}
    >
      <br />
      {'Nett Amount: SGD '}
      {totalBalanceAmt}
    </span>
  );

  return (
    <div style={{ background: '#ffffff', padding: 8 }}>
      <Row gutter={8}>
        <Col span={12}>
          <FullWidthTable
            title={() => title1}
            components={components}
            columns={editableColumns}
            dataSource={incomeList}
            pagination={{ pageSize: 5 }}
            bordered
            size="small"
            rowClassName="editable-row"
          />
        </Col>
        <Col span={12}>
          <FullWidthTable
            title={() => title2}
            components={components}
            columns={editableColumns}
            dataSource={expenditureList}
            pagination={{ pageSize: 5 }}
            bordered
            size="small"
            rowClassName="editable-row"
          />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>{totalIncomeText}</Col>
        <Col span={12}>{totalExpText}</Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          {totalBalanceText}
        </Col>
      </Row>
    </div>
  );
};
