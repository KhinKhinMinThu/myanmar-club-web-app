import React, { Component } from 'react';
import { Form, message } from 'antd';
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
  CreateButton,
} from './components';
import { FormCard, FlexContainer } from './styled-components';
import {
  setModalVisibility,
  setFileList,
} from '../../reducers/eventmgmt/eventmgmt-ui';
import { save } from '../../reducers/eventmgmt/eventmgmt-data';

class EventCreation extends Component {
  onSubmit = (e) => {
    e.preventDefault();
    const { form, dispatchSave } = this.props;
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
          eventStatus: '1',
        });
        message.success('New event created!');
      }
    });
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

  // handle open-folder icon click from table row
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
          <FlexContainer>{CreateButton}</FlexContainer>
        </Form>
      </div>
    );
  }
}

EventCreation.propTypes = {
  form: PropTypes.shape({
    validateFieldsAndScroll: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
    setFieldsValue: PropTypes.func.isRequired,
  }).isRequired,
  // isValidating: PropTypes.bool.isRequired,
  dispatchModalVisibility: PropTypes.func.isRequired,
  dispatchFileList: PropTypes.func.isRequired,
  dispatchSave: PropTypes.func.isRequired,

  eventmgmtUI: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  eventmgmtUI: state.eventmgmt.ui,
});
const mapDispatchToProps = {
  dispatchModalVisibility: setModalVisibility,
  dispatchFileList: setFileList,
  dispatchSave: save,
};

const FormEventCreation = Form.create()(EventCreation);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormEventCreation);
