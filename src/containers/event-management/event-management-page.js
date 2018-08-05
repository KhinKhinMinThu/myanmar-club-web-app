import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form } from 'antd';
import {
  EventsTable,
  DeSeletAllButton,
  SeletAllButton,
  SelectedEvents,
  DeleteSeletedButton,
  SearchNamePanel,
} from './components';
import { FlexContainer } from './styled-components';
import {
  setSelectedKeys,
  setDeSelectAllLoading,
  setSelectAllLoading,
  setSortedInfo,
  setFilteredInfo,
  resetState,
} from '../../reducers/eventmgmt/eventmgmt-ui';
import { remove } from '../../reducers/eventmgmt/eventmgmt-data';

class EventManagementPage extends Component {
  // get the eventlist from API
  componentWillMount() {
    const {
      eventmgmtData: { eventsData },
    } = this.props;
    this.eventsList = this.prepareList(eventsData);
  }

  // handle de-select all button
  onClickDeselectAll = () => {
    const { dispatchSelectedKeys, dispatchDeselectAllLoading } = this.props;
    dispatchDeselectAllLoading(true);
    setTimeout(() => {
      dispatchDeselectAllLoading(false);
      dispatchSelectedKeys([]);
    }, 1000);
  };

  // handle select all button
  onClickSelectAll = () => {
    const { dispatchSelectedKeys, dispatchSelectAllLoading } = this.props;
    dispatchSelectAllLoading(true);
    setTimeout(() => {
      dispatchSelectAllLoading(false);
      dispatchSelectedKeys([...this.eventsList.map(item => item.key)]);
    }, 1000);
  };

  // handle check-box selection in the table
  onSelectChange = (selectedKeys) => {
    const { dispatchSelectedKeys } = this.props;
    dispatchSelectedKeys(selectedKeys);
  };

  // handle tabs change event
  onChange = (pagination, filters, sorter) => {
    const { dispatchSortedInfo, dispatchFilteredInfo } = this.props;
    dispatchSortedInfo(sorter);
    dispatchFilteredInfo(filters);
  };

  // delete selected events
  onClickDeleteSelected = () => {
    const {
      eventmgmtUI: { selectedKeys },
      dispatchRemove,
      dispatchResetState,
    } = this.props;
    dispatchRemove({ eventsToDelete: selectedKeys });
    dispatchResetState();
    // to remove the selected event from the table display
    this.eventsList = this.eventsList.filter(
      item => !selectedKeys.includes(item.id),
    );
  };

  // handle input changes from searchName field
  onChangeSearchName = (e) => {
    this.searchNameValue = e.target.value;
  };

  // handle onClick from SearchName button and onPressEnter from input field
  onSearchName = () => {
    const filters = this.searchNameValue
      ? { name: [this.searchNameValue] }
      : {};
    if (this.searchNameValue !== null) this.onChange({}, filters, {});
  };

  // handle onClick from Reset button
  onClickReset = () => {
    const {
      dispatchFilteredInfo,
      form: { resetFields },
    } = this.props;

    if (this.searchNameValue !== null) {
      dispatchFilteredInfo(null);
      resetFields(['searchName']);
      this.searchNameValue = null;
    }
  };

  // add the key and format role_names of member list
  prepareList = (sourceList) => {
    const preparedList = [];
    sourceList.map(item => preparedList.push({
      key: `${item.id}`,
      ...item,
      location: `${item.locationLine1}, ${item.locationLine2},
       ${item.locationPostalCode}`,
    }));
    return preparedList;
  };

  render() {
    const {
      eventmgmtUI,
      form: { getFieldDecorator },
    } = this.props;
    const {
      selectedKeys,
      deselectAllLoading,
      selectAllLoading,
      sortedInfo,
      filteredInfo,
    } = eventmgmtUI;
    const rowSelection = {
      selectedRowKeys: selectedKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedKeys.length > 0;

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
          <SeletAllButton
            onClick={this.onClickSelectAll}
            loading={selectAllLoading}
          />
          <DeSeletAllButton
            onClick={this.onClickDeselectAll}
            hasSelected={hasSelected}
            loading={deselectAllLoading}
          />
          <DeleteSeletedButton
            onClick={this.onClickDeleteSelected}
            hasSelected={hasSelected}
          />
          {hasSelected ? (
            <SelectedEvents selectedNum={selectedKeys.length} />
          ) : null}
        </FlexContainer>

        <FlexContainer>
          <EventsTable
            eventsList={this.eventsList}
            rowSelection={rowSelection}
            onChange={this.onChange}
            sortedInfo={sortedInfo || {}}
            filteredInfo={filteredInfo || {}}
          />
        </FlexContainer>
      </div>
    );
  }
}

EventManagementPage.propTypes = {
  form: PropTypes.shape({}).isRequired,
  dispatchSelectedKeys: PropTypes.func.isRequired,
  dispatchDeselectAllLoading: PropTypes.func.isRequired,
  dispatchSelectAllLoading: PropTypes.func.isRequired,
  dispatchSortedInfo: PropTypes.func.isRequired,
  dispatchFilteredInfo: PropTypes.func.isRequired,
  dispatchResetState: PropTypes.func.isRequired,
  dispatchRemove: PropTypes.func.isRequired,

  eventmgmtUI: PropTypes.shape({}).isRequired,
  eventmgmtData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  eventmgmtUI: state.eventmgmt.ui,
  eventmgmtData: state.eventmgmt.data,
});
const mapDispatchToProps = {
  dispatchSelectedKeys: setSelectedKeys,
  dispatchDeselectAllLoading: setDeSelectAllLoading,
  dispatchSelectAllLoading: setSelectAllLoading,
  dispatchSortedInfo: setSortedInfo,
  dispatchFilteredInfo: setFilteredInfo,
  dispatchResetState: resetState,
  dispatchRemove: remove,
};

const FormEventManagementPage = Form.create()(EventManagementPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormEventManagementPage);
