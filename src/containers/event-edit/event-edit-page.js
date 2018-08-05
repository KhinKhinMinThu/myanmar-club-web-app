import React, { Component } from 'react';
import moment from 'moment';
import {
  Form, message, Row, Col,
} from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  EventNameInput,
  EventDescriptionInput,
  StartDateTimePicker,
  EndDateTimePicker,
  AddressInput,
  PostalCodeInput,
  EventPhoto,
  EventPhotoModal,
  TicketFeeInput,
  NumPaxInput,
  RefreshmentRadio,
  ContactPersonInput,
  EmailAddressInput,
  MobileNoInput,
  DeleteEventSwitch,
  EventStatusSwitch,
  SaveUpdateButton,
  BackButton,
} from '../event-creation/components';
import { FormCard, FlexContainer } from '../event-creation/styled-components';
import {
  setModalVisibility,
  setFileList,
} from '../../reducers/eventmgmt/eventmgmt-ui';
import { save, remove } from '../../reducers/eventmgmt/eventmgmt-data';

class EventEdit extends Component {
  componentDidMount() {
    const {
      computedMatch: {
        params: { id },
      },
    } = this.props;
    console.log('eventId', id);

    const {
      form: { setFieldsValue },
      eventmgmtData: { eventsData },
      dispatchFileList,
    } = this.props;
    const eventData = eventsData.find(item => item.id === id);
    dispatchFileList([{ uid: eventData.id, url: eventData.photoLink }]);
    setFieldsValue({
      // need to pick one by one due to "cannot setfields before registring" error
      name: eventData.name,
      description: eventData.description,
      locationLine1: eventData.locationLine1,
      locationLine2: eventData.locationLine2,
      locationPostalCode: eventData.locationPostalCode,
      ticketFee: eventData.ticketFee,
      noOfPax: eventData.noOfPax,
      isRefreshmentProvided: eventData.isRefreshmentProvided,
      contactPerson: eventData.contactPerson,
      emailAddress: eventData.emailAddress,
      areaCode: eventData.mobilePhone.substr(0, 2),
      mobilePhone: eventData.mobilePhone.substr(2),
      eventStatus: eventData.eventStatus,
      startDate: this.formatDate(eventData.startDate),
      startTime: this.formatDate(eventData.startDate),
      endDate: this.formatDate(eventData.endDate),
      endTime: this.formatDate(eventData.endDate),
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      computedMatch: {
        params: { id },
      },
      form,
      dispatchSave,
      dispatchRemove,
    } = this.props;

    // if user selects to delete event, it will be deleted without
    // updating the rest of the data even if the user changed anything else.
    if (form.getFieldValue('deleteEvent')) {
      dispatchRemove({ eventsToDelete: [id] });
    } else {
      form.validateFieldsAndScroll((error, values) => {
        if (!error) {
          const formValues = values;
          const startDate = this.formatDateTime(
            formValues.startDate,
            formValues.startTime,
          );
          const endDate = this.formatDateTime(
            formValues.endDate,
            formValues.endTime,
          );

          // remove time value from the object
          delete formValues.startTime;
          delete formValues.endTime;

          dispatchSave({
            ...formValues,
            startDate,
            endDate,
            mobilePhone: formValues.areaCode + formValues.mobilePhone,
            eventStatus: formValues.eventStatus ? '1' : '0',
          });
          message.success('Event updated!');
        }
      });
    }
  };

  // handle close button on Modal pop-up
  onCloseModal = () => {
    const { dispatchModalVisibility } = this.props;
    dispatchModalVisibility({
      isModalVisible: false,
      photoLink: '',
    });
  };

  onChange = ({ fileList }) => {
    const { dispatchFileList } = this.props;
    let newFile = fileList;
    if (fileList.length > 1) {
      newFile = fileList.slice(1);
    }
    dispatchFileList(newFile);
  };

  // convert string date to moment object for date/time picker
  formatDate = strDate => (strDate ? moment(strDate, 'DD-MM-YYYY HH:mm') : null);

  // convert string date to Date object and combine date and time.
  formatDateTime = (strDate, strTime) => {
    if (strDate && strTime) {
      const date = new Date(strDate);
      const time = new Date(strTime);
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes(),
        0,
      );
    }
    return null;
  };

  showModal = (file) => {
    const { dispatchModalVisibility } = this.props;
    dispatchModalVisibility({
      isModalVisible: true,
      photoLink: file.url || file.thumbUrl,
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      eventmgmtUI: { isModalVisible, photoLink, fileList },
    } = this.props;

    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <FormCard>
            <EventNameInput decorator={getFieldDecorator} />
            <EventDescriptionInput decorator={getFieldDecorator} />
            <StartDateTimePicker decorator={getFieldDecorator} />
            <EndDateTimePicker decorator={getFieldDecorator} />
            <AddressInput decorator={getFieldDecorator} />
            <PostalCodeInput decorator={getFieldDecorator} />
            <EventPhoto
              decorator={getFieldDecorator}
              onPreview={this.showModal}
              onChange={this.onChange}
              fileList={fileList}
            />
            <EventPhotoModal
              onCloseModal={this.onCloseModal}
              isModalVisible={isModalVisible}
              photoLink={photoLink}
            />
          </FormCard>
          <FormCard>
            <TicketFeeInput decorator={getFieldDecorator} />
            <NumPaxInput decorator={getFieldDecorator} />
            <RefreshmentRadio decorator={getFieldDecorator} />
          </FormCard>
          <FormCard>
            <ContactPersonInput decorator={getFieldDecorator} />
            <EmailAddressInput decorator={getFieldDecorator} />
            <MobileNoInput decorator={getFieldDecorator} />
          </FormCard>
          <FormCard>
            <EventStatusSwitch decorator={getFieldDecorator} />
            <DeleteEventSwitch decorator={getFieldDecorator} />
          </FormCard>
          <FlexContainer>
            <Row gutter={8} style={{ width: '100%' }}>
              <Col span={12}>{SaveUpdateButton}</Col>
              <Col span={12}>{BackButton}</Col>
            </Row>
          </FlexContainer>
        </Form>
      </div>
    );
  }
}

EventEdit.propTypes = {
  computedMatch: PropTypes.shape({}).isRequired,
  form: PropTypes.shape({
    validateFieldsAndScroll: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
    setFieldsValue: PropTypes.func.isRequired,
  }).isRequired,
  dispatchSave: PropTypes.func.isRequired,
  dispatchRemove: PropTypes.func.isRequired,
  dispatchModalVisibility: PropTypes.func.isRequired,
  dispatchFileList: PropTypes.func.isRequired,

  eventmgmtUI: PropTypes.shape({}).isRequired,
  eventmgmtData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  eventmgmtUI: state.eventmgmt.ui,
  eventmgmtData: state.eventmgmt.data,
});
const mapDispatchToProps = {
  dispatchModalVisibility: setModalVisibility,
  dispatchFileList: setFileList,
  dispatchSave: save,
  dispatchRemove: remove,
};

const FormEventEditPage = Form.create()(EventEdit);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormEventEditPage);
