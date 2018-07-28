import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { connect } from 'react-redux';
import { EventsTable, SearchNamePanel } from './components';
import { FlexContainer } from './styled-components';
import {
  setSortedInfo,
  setFilteredInfo,
  setExpandedRowKeys,
  resetState,
  setDummyTransac,
} from '../../reducers/event-transaction/event-transaction-ui';
import { save, remove } from '../../reducers/event-transaction/event-transaction-data';

class EventTransaction extends Component {
  componentWillMount() {
    const {
      eventTransactionData: { eventsData },
    } = this.props;
    this.eventsList = this.prepareList(eventsData);
  }

  // handle input changes from searchName field
  onChangeSearchName = (e) => {
    this.searchNameValue = e.target.value;
  };

  // handle onClick from SearchName button and onPressEnter from input field
  onSearchName = () => {
    const filters = this.searchNameValue ? { name: [this.searchNameValue] } : {};
    if (this.searchNameValue !== null) this.onChange({}, filters, {});
  };

  // handle table change event
  onChange = (pagination, filters, sorter) => {
    const { dispatchSortedInfo, dispatchFilteredInfo } = this.props;
    dispatchSortedInfo(sorter);
    dispatchFilteredInfo(filters);
  };

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
    } = this.props;
    const { eventTransactions } = this.eventsList.find(item => item.id === eventId);
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
    console.log(type, this.eventsList);
  };

  onExpand = (expanded, record) => {
    const { dispatchExpandedRowKeys } = this.props;
    const keys = [];
    if (expanded) {
      keys.push(record.id);
    }
    dispatchExpandedRowKeys(keys);
  };

  removeRecord = (eventId, transacId) => {
    const { eventTransactions } = this.eventsList.find(item => item.id === eventId);
    const index = eventTransactions.findIndex(transac => transac.id === transacId);
    eventTransactions.splice(index, 1);

    const { dispatchRemove } = this.props;
    dispatchRemove({
      eventId,
      transacIdToRemove: transacId,
    });
  };

  // add the key and format role_names of member list
  prepareList = (sourceList) => {
    const preparedList = [];
    sourceList.map(item => preparedList.push({
      key: `${item.id}`,
      ...item,
    }));
    return preparedList;
  };

  render() {
    const {
      eventTransactionUI,
      form: { getFieldDecorator },
    } = this.props;
    const { sortedInfo, filteredInfo, expandedRowKeys } = eventTransactionUI;
    return (
      <div>
        <SearchNamePanel
          onChange={this.onChangeSearchName}
          onPressEnter={this.onSearchName}
          decorator={getFieldDecorator}
          onClickSearch={this.onSearchName}
          onClickReset={this.onClickReset}
        />

        <FlexContainer>
          <EventsTable
            eventsList={this.eventsList}
            onChange={this.onChange}
            sortedInfo={sortedInfo || {}}
            filteredInfo={filteredInfo || {}}
            removeRecord={(eventId, transacId) => this.removeRecord(eventId, transacId)}
            expandedRowKeys={expandedRowKeys}
            onExpand={this.onExpand}
            onClickAddRow={this.onClickAddRow}
          />
        </FlexContainer>
      </div>
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
  dispatchRemove: PropTypes.func.isRequired,

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
  dispatchSave: save,
  dispatchRemove: remove,
};

const FormEventTransactionPage = Form.create()(EventTransaction);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormEventTransactionPage);
