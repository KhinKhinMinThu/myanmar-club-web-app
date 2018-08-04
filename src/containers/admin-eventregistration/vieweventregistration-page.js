import React, { Component } from 'react';
import { Form } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  EventName,
  Address,
  StartDateTime,
  EndDateTime,
  EventPhoto,
  TicketFee,
  Refreshment,
  NumPax,
  ContactPerson,
  EmailAddress,
  MobileNo,
  EventDescription,
  EventStatus,
  BackButton,
  EcMembersTable,
} from './components';
import { FormCard, FlexContainer } from './styled-components';
import {
  setSelectedKeys,
  setDeSelectAllLoading,
  setSelectAllLoading,
  setSortedInfo,
} from '../../reducers/eventmgmt/eventmgmt-ui';
import { save } from '../../reducers/eventmgmt/eventmgmt-data';

class ViewEventRegistration extends Component {
  componentDidMount() {
    const { eventmgmtData } = this.props;
    const { eventRSVPData } = eventmgmtData;
    this.ecMembersList = this.prepareList(eventRSVPData);
    const {
      form: { setFieldsValue },
      eventData,
    } = this.props;
    setFieldsValue({ ...eventData });
  }

  componentDidUpdate(prevState) {
    const { isValidating } = this.props;
    const isPropChange = isValidating !== prevState.isValidating;
    if (isValidating && isPropChange) this.validatePage();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll();
  };

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
      form: { getFieldDecorator },
    } = this.props;
    const { eventmgmtUI } = this.props;
    const { selectedKeys, sortedInfo } = eventmgmtUI;
    const rowSelection = {
      selectedRowKeys: selectedKeys,
      onChange: this.onSelectChange,
    };

    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <FormCard>
            <EventPhoto decorator={getFieldDecorator} />
            <EventName decorator={getFieldDecorator} />
            <EventDescription decorator={getFieldDecorator} />
            <StartDateTime decorator={getFieldDecorator} />
            <EndDateTime decorator={getFieldDecorator} />
            <Address decorator={getFieldDecorator} />
            <TicketFee decorator={getFieldDecorator} />
            <NumPax decorator={getFieldDecorator} />
            <Refreshment decorator={getFieldDecorator} />
            <ContactPerson decorator={getFieldDecorator} />
            <EmailAddress decorator={getFieldDecorator} />
            <MobileNo decorator={getFieldDecorator} />
            <EventStatus decorator={getFieldDecorator} />
            <FlexContainer>
              <EcMembersTable
                ecMembersList={this.ecMembersList}
                rowSelection={rowSelection}
                onChange={this.onChange}
                sortedInfo={sortedInfo || {}}
              />
            </FlexContainer>
            <FlexContainer>
              <BackButton decorator={getFieldDecorator} />
            </FlexContainer>
          </FormCard>
        </Form>
      </div>
    );
  }
}

ViewEventRegistration.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
  }).isRequired,
  isValidating: PropTypes.bool.isRequired,
  eventmgmtUI: PropTypes.shape({}).isRequired,
  eventData: PropTypes.shape({}).isRequired,
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
  dispatchSave: save,
};
const ViewEventRegistrationPage = Form.create()(ViewEventRegistration);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewEventRegistrationPage);
