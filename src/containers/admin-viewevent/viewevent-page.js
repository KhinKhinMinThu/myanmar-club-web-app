import React, { Component } from 'react';
import { Form } from 'antd';
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
  ShareFacebookButton,
  NotifyMsgButton,
  EditEventButton,
  CloseButton,
  ViewRSVPButton,
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
            <ShareFacebookButton decorator={getFieldDecorator} />
            <NotifyMsgButton decorator={getFieldDecorator} />
            <FlexContainer>
              <EditEventButton decorator={getFieldDecorator} />
              <ViewRSVPButton decorator={getFieldDecorator} />
              <CloseButton decorator={getFieldDecorator} />
            </FlexContainer>
          </FormCard>
        </Form>
      </div>
    );
  }
}

ViewEvent.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
  }).isRequired,
  isValidating: PropTypes.bool.isRequired,
  eventData: PropTypes.shape({}).isRequired,
};

const ViewEventPage = Form.create()(ViewEvent);

export default ViewEventPage;
