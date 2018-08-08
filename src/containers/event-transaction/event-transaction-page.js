import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form, message, Spin, Alert,
} from 'antd';
import {
  SUCCESS_DELETEEVENTTRANSC,
  SUCCESS_ADDEVENTTRANSC,
} from '../../actions/message';

import { EventsTable, SearchNamePanel } from './components';
import { FlexContainer } from './styled-components';
import {
  setSortedInfo,
  setFilteredInfo,
  setExpandedRowKeys,
  resetState,
  setDummyTransac,
  setEditingKey,
} from '../../reducers/event-transaction/event-transaction-ui';
import {
  getEventTranscData,
  postDeleteEventTransc,
  postAddEventTransc,
} from '../../reducers/event-transaction/event-transaction-data';

class EventTransaction extends Component {
  componentDidMount() {
    const { dispatchResetState, performGetEventTranscData } = this.props;
    dispatchResetState();
    performGetEventTranscData();
  }

  componentWillUpdate(nextProps) {
    const {
      eventTransactionData: { isGetApiLoading },
    } = this.props;
    this.isApiCalled = !nextProps.eventTransactionData.isGetApiLoading && isGetApiLoading;
  }

  componentDidUpdate(prevProps) {
    const {
      eventTransactionData: { isPostApiLoading, postErrMsg },
    } = this.props;

    const isApiPost = prevProps.eventTransactionData.isPostApiLoading && !isPostApiLoading;
    if (!isApiPost) return;

    if (this.actionType) {
      if (postErrMsg) {
        message.error(postErrMsg);
      } else {
        if (this.actionType === 'save') message.success(SUCCESS_ADDEVENTTRANSC);
        if (this.actionType === 'delete') message.success(SUCCESS_DELETEEVENTTRANSC);
      }
    }
    this.actionType = null;
  }

  // handle onClick from Reset button
  onClickReset = () => {
    const {
      dispatchFilteredInfo,
      dispatchResetState,
      form: { resetFields },
    } = this.props;

    if (this.searchNameValue !== null) {
      dispatchFilteredInfo(null);
      resetFields(['searchName']);
      this.searchNameValue = null;
    }
    dispatchResetState();
  };

  onClickAddRow = (eventId, type) => {
    const {
      eventTransactionUI: { dummyTransacIndex },
      dispatchDummyTransac,
      dispatchEditingKey,
    } = this.props;
    const event = this.eventsList.find(item => item.id === eventId);
    const { eventTransactions } = event;

    const key = dummyTransacIndex + 1;
    const newData = {
      key: `dummy${key}`,
      id: `dummy${key}`,
      type,
      category: null,
      amount: null,
    };
    eventTransactions.push(newData);
    dispatchDummyTransac(key);
    dispatchEditingKey(`dummy${key}`);
  };

  deleteTransaction = (eventId, transacId) => {
    this.actionType = 'delete';
    const event = this.eventsList.find(item => item.id === eventId);
    const { eventTransactions } = event;
    const index = eventTransactions.findIndex(item => item.id === transacId);

    eventTransactions.splice(index, 1);

    const { performDeleteTransc } = this.props;
    performDeleteTransc({
      eventId,
      transacIdToRemove: transacId,
    });
  };

  prepareList = (sourceList) => {
    const preparedList = [];
    sourceList.map(item => preparedList.push({
      key: `${item.id}`,
      ...item,
    }));
    return preparedList;
  };

  saveTransaction = (form, eventId, transacId) => {
    this.actionType = 'save';
    const { dispatchEditingKey, performAddTransc } = this.props;
    dispatchEditingKey(transacId);
    form.validateFieldsAndScroll((error, row) => {
      if (error) return;

      const event = this.eventsList.find(item => item.id === eventId);
      const { eventTransactions } = event;
      const index = eventTransactions.findIndex(item => item.id === transacId);
      const newData = { ...eventTransactions[index], ...row };

      eventTransactions.splice(index, 1, newData);

      dispatchEditingKey(null);
      performAddTransc({ eventId, transacDataToAdd: newData });
    });
  };

  render() {
    const {
      eventTransactionUI: {
        sortedInfo,
        filteredInfo,
        expandedRowKeys,
        editingKey,
      },
      eventTransactionData: {
        eventsData,
        isGetApiLoading,
        getErrMsg, isPostApiLoading,
      },
      form: { getFieldDecorator },
      dispatchSortedInfo,
      dispatchFilteredInfo,
      dispatchExpandedRowKeys,
      dispatchEditingKey,
    } = this.props;

    if (eventsData) this.eventsList = this.prepareList(eventsData);

    return (
      <Spin spinning={isGetApiLoading} size="large">
        {this.isApiCalled && getErrMsg ? (
          <Alert
            message="Error"
            description={getErrMsg}
            type="error"
            showIcon
          />
        ) : (
          <div>
            <SearchNamePanel
              onChange={(e) => {
                this.searchNameValue = e.target.value;
              }}
              decorator={getFieldDecorator}
              onSearch={() => dispatchFilteredInfo(
                this.searchNameValue ? { name: [this.searchNameValue] } : {},
              )
              }
              onClickReset={this.onClickReset}
            />

            <FlexContainer>
              <EventsTable
                eventsList={this.eventsList}
                onChange={(pagination, filters, sorter) => {
                  dispatchSortedInfo(sorter);
                  dispatchFilteredInfo(filters);
                }}
                sortedInfo={sortedInfo || {}}
                filteredInfo={filteredInfo || {}}
                deleteTransaction={(eventId, transacId) => this.deleteTransaction(eventId, transacId)
                }
                expandedRowKeys={expandedRowKeys}
                onExpand={(expanded, record) => {
                  const keys = expanded ? [record.id] : [];
                  dispatchExpandedRowKeys(keys);
                }}
                onClickAddRow={this.onClickAddRow}
                cancelTransaction={() => dispatchEditingKey(null)}
                editTransaction={transacId => dispatchEditingKey(transacId)}
                saveTransaction={this.saveTransaction}
                editingKey={editingKey}
                isPostApiLoading={isPostApiLoading}
              />
            </FlexContainer>
          </div>
        )}
      </Spin>
    );
  }
}

EventTransaction.propTypes = {
  form: PropTypes.shape({}).isRequired,
  dispatchSortedInfo: PropTypes.func.isRequired,
  dispatchFilteredInfo: PropTypes.func.isRequired,
  dispatchResetState: PropTypes.func.isRequired,
  dispatchExpandedRowKeys: PropTypes.func.isRequired,
  dispatchDummyTransac: PropTypes.func.isRequired,
  dispatchEditingKey: PropTypes.func.isRequired,

  performGetEventTranscData: PropTypes.func.isRequired,
  performAddTransc: PropTypes.func.isRequired,
  performDeleteTransc: PropTypes.func.isRequired,

  eventTransactionUI: PropTypes.shape({}).isRequired,
  eventTransactionData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  eventTransactionUI: state.eventTransaction.ui,
  eventTransactionData: state.eventTransaction.data,
});
const mapDispatchToProps = {
  dispatchSortedInfo: setSortedInfo,
  dispatchFilteredInfo: setFilteredInfo,
  dispatchExpandedRowKeys: setExpandedRowKeys,
  dispatchResetState: resetState,
  dispatchDummyTransac: setDummyTransac,
  dispatchEditingKey: setEditingKey,

  performGetEventTranscData: getEventTranscData,
  performAddTransc: postAddEventTransc,
  performDeleteTransc: postDeleteEventTransc,
};

const FormEventTransactionPage = Form.create()(EventTransaction);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormEventTransactionPage);
