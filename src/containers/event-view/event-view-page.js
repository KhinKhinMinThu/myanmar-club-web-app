import React, { Component } from 'react';
import { Form, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  EventData,
  EditEventButton,
  CloseButton,
  ViewRSVPButton,
  ShareFacebookButton,
  NotifyMsgButton,
} from './components';
import { FlexContainer, FormCard } from '../event-creation/styled-components';

class EventView extends Component {
  componentDidMount() {
    const {
      computedMatch: {
        params: { id },
      },
    } = this.props;
    this.eventId = id;
    console.log('eventId', id);

    const {
      form: { setFieldsValue },
      eventmgmtData: { eventsData },
    } = this.props;
    const eventData = eventsData.find(item => item.id === id);

    setFieldsValue({
      // need to pick one by one due to "cannot setfields before registring" error
      photoLink: eventData.photoLink,
      name: eventData.name,
      description: eventData.description,
      location: `${eventData.locationLine1} ${eventData.locationLine2}`,
      locationPostalCode: eventData.locationPostalCode,
      ticketFee: eventData.ticketFee,
      noOfPax: eventData.noOfPax,
      isRefreshmentProvided:
        eventData.isRefreshmentProvided === '1' ? 'Yes' : 'No',
      contactPerson: eventData.contactPerson,
      emailAddress: eventData.emailAddress,
      mobilePhone: eventData.mobilePhone,
      eventStatus: eventData.eventStatus === '1' ? 'Open' : 'Closed',
      startDate: eventData.startDate,
      endDate: eventData.endDate,
      createdBy: eventData.createdBy,
      createdDate: eventData.createdDate,
    });
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <FormCard>
            <EventData decorator={getFieldDecorator} />
            <br />
            <ShareFacebookButton decorator={getFieldDecorator} />
            <NotifyMsgButton decorator={getFieldDecorator} />
          </FormCard>
        </Form>
        <FlexContainer>
          <Row gutter={8} style={{ width: '100%' }}>
            <Col span={8}>
              <EditEventButton eventId={this.eventId} />
            </Col>
            <Col span={8}>
              <ViewRSVPButton eventId={this.eventId} />
            </Col>
            <Col span={8}>{CloseButton}</Col>
          </Row>
        </FlexContainer>
      </div>
    );
  }
}

EventView.propTypes = {
  computedMatch: PropTypes.shape({}).isRequired,
  form: PropTypes.shape({}).isRequired,

  eventmgmtData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  eventmgmtData: state.eventmgmt.data,
});

const FormEventViewPage = Form.create()(EventView);

export default connect(mapStateToProps)(FormEventViewPage);
