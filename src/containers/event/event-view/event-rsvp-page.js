import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form, Row, Col, Modal,
} from 'antd';
import {
  SUCCESS_UPDATERSVP,
  SUCCESS_DOWNLAODREG,
  CONFIRM_PAIDREG,
  CONFIRM_UNPAIDREG,
} from '../../../actions/message';
import { RegistrationTable } from './components';
import {
  DeSeletAllButton,
  SeletAllButton,
  SelectedInfo,
  DeleteSeletedButton,
  SearchNamePanel,
} from '../shared-components';
import {
  setSelectedKeys,
  setDeSelectAllLoading,
  setSelectAllLoading,
  setSortedInfo,
  setFilteredInfo,
  resetState,
  setAction,
} from '../../../reducers/eventmgmt/eventmgmt-ui';
import {
  setEventData,
  postDeleteRSVP,
  postUpdateRegPayment,
} from '../../../reducers/eventmgmt/eventmgmt-data';

class EventRSVPPage extends Component {
  componentDidUpdate(prevProps) {
    const {
      eventmgmtData: { isPostApiLoading, postErrMsg },
      eventmgmtUI: { currentTab },
    } = this.props;
    if (currentTab !== 'tab2') return;

    const isApiPost = prevProps.eventmgmtData.isPostApiLoading && !isPostApiLoading;
    if (!isApiPost) return;

    if (postErrMsg) Modal.error({ title: 'Error!', content: postErrMsg });

    if (!postErrMsg) {
      if (this.actionType === 'download') Modal.success({ title: 'Success!', content: SUCCESS_DOWNLAODREG });
      else Modal.success({ title: 'Success!', content: SUCCESS_UPDATERSVP });
    }
    this.actionType = 'update';
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
      dispatchSelectedKeys([...this.registrationList.map(item => item.key)]);
    }, 1000);
  };

  // update paid regsitrations
  onClickUpdatePayment = (type) => {
    const {
      eventmgmtData: { eventData },
      eventmgmtUI: { selectedKeys },
      performUpdatePayment,
      dispatchSetEventData,
      dispatchSetAction,
      dispatchResetState,
    } = this.props;
    Modal.confirm({
      title: 'Confirmation!',
      content: type === 'paid' ? CONFIRM_PAIDREG : CONFIRM_UNPAIDREG,
      onOk() {
        dispatchSetAction(type);
        const eventRSVPPayment = {
          eventId: eventData.id,
          paidReg: type === 'paid' ? selectedKeys : [],
          unpaidReg: type === 'unpaid' ? selectedKeys : [],
        };
        performUpdatePayment(eventRSVPPayment);

        // update RSVP payment statements
        const { eventRSVPData } = eventData;
        selectedKeys.forEach((item) => {
          const reg = eventRSVPData.find(rsvp => rsvp.id === item);
          if (reg) {
            if (type === 'paid') reg.isPaid = '1';
            if (type === 'unpaid') reg.isPaid = '0';
          }
        });
        dispatchSetEventData(eventData);
        dispatchResetState();
      },
    });
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

  prepareList = (sourceList) => {
    const preparedList = [];
    sourceList.map(item => preparedList.push({
      key: `${item.id}`,
      ...item,
      isPaid: item.isPaid === '1' ? 'Yes' : 'No',
    }));
    return preparedList;
  };

  prepareCSVList = (sourceList) => {
    const preparedList = [];
    sourceList.map((item, index) => preparedList.push({
      No: index + 1,
      Name: item.name,
      Email_Address: item.emailAddress,
      Mobile_No: item.mobilePhone,
      No_of_Pax: item.noOfPax,
      Payment: item.isPaid === '1' ? 'Paid' : 'Unpaid',
      PaymentType: item.paymentType,
    }));
    return preparedList;
  };

  // delete registraion
  deleteRegistration = (regId) => {
    const {
      eventmgmtData: { eventData },
      performDeleteRSVP,
      dispatchSetEventData,
      dispatchSetAction,
    } = this.props;

    dispatchSetAction('delete');
    performDeleteRSVP({ eventRSVPToDelete: [regId] });

    const { eventRSVPData } = eventData;
    const index = eventRSVPData.findIndex(rsvp => rsvp.id === regId);
    if (index !== -1) eventRSVPData.splice(index, 1);
    dispatchSetEventData(eventData);
  };

  render() {
    const {
      eventmgmtUI: {
        selectedKeys,
        deselectAllLoading,
        selectAllLoading,
        sortedInfo,
        filteredInfo,
        action,
      },
      eventmgmtData: { eventData, isPostApiLoading },
      form: { getFieldDecorator },
      dispatchSortedInfo,
      dispatchFilteredInfo,
      dispatchSelectedKeys,
      // performDownloadRegistrations,
    } = this.props;

    const rowSelection = {
      selectedRowKeys: selectedKeys,
      onChange: keys => dispatchSelectedKeys(keys),
    };
    const hasSelected = selectedKeys.length > 0;

    this.registrationList = eventData
      ? this.prepareList(eventData.eventRSVPData)
      : [];
    const exportList = eventData
      ? this.prepareCSVList(eventData.eventRSVPData)
      : [];
    // registrations-event-2-3082018.csv
    const header = this.registrationList
      ? 'Total registration: '.concat(this.registrationList.length)
      : '';
    const currentDate = new Date();
    const exportFileName = 'registrations-event'.concat(
      '-',
      eventData.id,
      '-',
      currentDate.getDate(),
      currentDate.getMonth(),
      currentDate.getFullYear(),
      '.csv',
    );
    return (
      <div>
        <Row type="flex" justify="start">
          <Col span={24}>
            <SearchNamePanel
              onChange={(e) => {
                this.searchNameValue = e.target.value;
              }}
              decorator={getFieldDecorator}
              onSearch={() => dispatchFilteredInfo(
                this.searchNameValue
                  ? { name: [this.searchNameValue.toLowerCase()] }
                  : {},
              )
              }
              onClickReset={this.onClickReset}
              placeHolder="Search name"
            />
          </Col>
          <Col span={24}>
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
              onClick={() => this.onClickUpdatePayment('paid')}
              hasSelected={hasSelected}
              isPostApiLoading={action === 'paid' ? isPostApiLoading : false}
              placeHolder="Paid"
              icon="check-circle"
            />
            <DeleteSeletedButton
              onClick={() => this.onClickUpdatePayment('unpaid')}
              hasSelected={hasSelected}
              isPostApiLoading={action === 'unpaid' ? isPostApiLoading : false}
              placeHolder="Not Paid"
              icon="close-circle"
            />
            {hasSelected ? (
              <SelectedInfo
                selectedNum={selectedKeys.length}
                placeHolder="registration"
              />
            ) : null}
          </Col>
          <Col span={24}>
            <RegistrationTable
              registrationList={this.registrationList}
              rowSelection={rowSelection}
              onChange={(pagination, filters, sorter) => {
                dispatchSortedInfo(sorter);
                dispatchFilteredInfo(filters);
              }}
              sortedInfo={sortedInfo || {}}
              filteredInfo={filteredInfo || {}}
              header={header}
              deleteRegistration={this.deleteRegistration}
              // exportList={() => {
              //   this.actionType = 'download';
              //   performDownloadRegistrations(eventData.id);
              // }}
              exportList={exportList}
              exportFileName={exportFileName}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

EventRSVPPage.propTypes = {
  form: PropTypes.shape({}).isRequired,
  dispatchSelectedKeys: PropTypes.func.isRequired,
  dispatchDeselectAllLoading: PropTypes.func.isRequired,
  dispatchSelectAllLoading: PropTypes.func.isRequired,
  dispatchSortedInfo: PropTypes.func.isRequired,
  dispatchFilteredInfo: PropTypes.func.isRequired,
  dispatchResetState: PropTypes.func.isRequired,
  dispatchSetAction: PropTypes.func.isRequired,

  dispatchSetEventData: PropTypes.func.isRequired,
  performDeleteRSVP: PropTypes.func.isRequired,
  performUpdatePayment: PropTypes.func.isRequired,

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
  dispatchSetAction: setAction,

  dispatchSetEventData: setEventData,
  performDeleteRSVP: postDeleteRSVP,
  performUpdatePayment: postUpdateRegPayment,
};

const FormEventRSVPPage = Form.create()(EventRSVPPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormEventRSVPPage);
