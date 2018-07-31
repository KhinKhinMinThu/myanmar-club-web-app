import React, { Component } from 'react';
import { Form } from 'antd';
import PropTypes from 'prop-types';
import {
  EventNameInput,
  AddressInput,
  PostalCodeInput,
  StartDateTimePicker,
  EndDateTimePicker,
  EventPhoto,
  TicketFeeInput,
  RefreshmentRadio,
  NumPaxInput,
  ContactPersonInput,
  EmailAddressInput,
  MobileNoInput,
  DeleteEventSwitch,
  EventStatusSwitch,
  SaveUpdateButton,
  BackButton,
  EventDescriptionInput,
} from './components';
import { FormCard, FlexContainer } from './styled-components';

class ViewEvent extends Component {
  componentDidMount() {
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

  render() {
    const {
      form: { getFieldDecorator },
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
            <EventPhoto decorator={getFieldDecorator} />
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
            <DeleteEventSwitch decorator={getFieldDecorator} />
            <EventStatusSwitch decorator={getFieldDecorator} />
          </FormCard>
          <FlexContainer>
            <SaveUpdateButton decorator={getFieldDecorator} />
            <BackButton decorator={getFieldDecorator} />
          </FlexContainer>
        </Form>
      </div>
    );
  }
}

ViewEvent.propTypes = {
  form: PropTypes.shape({
    validateFieldsAndScroll: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
    setFieldsValue: PropTypes.func.isRequired,
  }).isRequired,
  isValidating: PropTypes.bool.isRequired,
  eventData: PropTypes.shape({}).isRequired,
};

const ViewEventPage = Form.create()(ViewEvent);

export default ViewEventPage;
