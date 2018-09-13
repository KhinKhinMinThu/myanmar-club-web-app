import React, { Component } from 'react';
import { withRouter } from 'react-router-dom/es';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  Form, Row, Col, message, Card,
} from 'antd';
import { SUCCESS_NOTIFYEVENT, SHOWFOR } from '../../../actions/message';
import {
  TIME_FORMAT_DB,
  DATE_FORMAT,
  DEFAULT_DATE,
  DEFAULT_TIME,
} from '../../../actions/constants';
import { EVENT_REGISTER } from '../../../actions/location';
import {
  EventData,
  EditEventButton,
  ShareFacebookButton,
  NotifyMsgButton,
} from './components';
import { BackButton } from '../shared-components';
import { postNotifyEvent } from '../../../reducers/eventmgmt/eventmgmt-data';

class EventPage extends Component {
  componentDidUpdate(prevProps) {
    const {
      eventmgmtData: { isPostApiLoading, postErrMsg },
      eventmgmtUI: { currentTab },
    } = this.props;
    if (currentTab !== 'tab1') return;

    const isApiPost = prevProps.eventmgmtData.isPostApiLoading && !isPostApiLoading;
    if (!isApiPost) return;

    if (postErrMsg) {
      message.error(postErrMsg, SHOWFOR);
    } else {
      message.success(SUCCESS_NOTIFYEVENT, SHOWFOR);
    }
  }

  onClickNotify = (id, url) => {
    const { performNotifyEvent } = this.props;
    performNotifyEvent({ id, url });
  };

  render() {
    const {
      history,
      form: { getFieldDecorator, getFieldValue },
      eventmgmtData: { isPostApiLoading, eventData },
    } = this.props;
    const shareColLayout = {
      xs: { span: 24, offset: 0 },
      sm: { span: 24, offset: 0 },
      md: { span: 24, offset: 0 },
      lg: { span: 12, offset: 0 },
      xl: { span: 12, offset: 0 },
      style: { marginBottom: 14 },
    };
    const actionColLayout = {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 12 },
      xl: { span: 12 },
      style: { marginBottom: 14 },
    };
    const id = getFieldValue('id');
    // const url = 'http://myanmarclub.com.s3-website-ap-southeast-1.amazonaws.com/event-register/15';
    const url = window.location.hostname.concat(EVENT_REGISTER, '/', id);
    // console.log(url);
    return (
      <div>
        <Card style={{ borderRadius: 15, margin: '0 auto 8px auto' }}>
          <EventData decorator={getFieldDecorator} />
          <br />
          <Row gutter={8}>
            <Col
              {...shareColLayout}
              {...{
                lg: { span: 6, offset: 6 },
                xl: { span: 6, offset: 6 },
              }}
            >
              <ShareFacebookButton url={url} />
            </Col>
            <Col {...shareColLayout}>
              <NotifyMsgButton
                onClickNotify={() => this.onClickNotify(id, url)}
                loading={isPostApiLoading}
              />{' '}
              Notify Club Members
            </Col>
          </Row>
          <Row gutter={8}>
            <Col {...actionColLayout}>
              <EditEventButton eventId={eventData ? eventData.id : ''} />
            </Col>
            <Col {...actionColLayout}>
              <BackButton history={history} />
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

EventPage.propTypes = {
  form: PropTypes.shape({}).isRequired,
  performNotifyEvent: PropTypes.func.isRequired,
  eventmgmtData: PropTypes.shape({}).isRequired,
  eventmgmtUI: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  eventmgmtData: state.eventmgmt.data,
  eventmgmtUI: state.eventmgmt.ui,
});

const formatDate = (strDate) => {
  if (strDate) {
    const date = moment(new Date(strDate)).format(DATE_FORMAT) === DEFAULT_DATE
      ? '/'
      : moment(new Date(strDate))
        .format(DATE_FORMAT)
        .toString();
    const time = moment(new Date(strDate)).format(TIME_FORMAT_DB) === DEFAULT_TIME
      ? '/'
      : moment(new Date(strDate))
        .format(TIME_FORMAT_DB)
        .toString();
    return date.concat(' ', time);
  }
  return null;
};

const mapPropsToFields = ({ eventmgmtData: { eventData } }) => {
  const event = eventData || {};
  return {
    photoLink: Form.createFormField({ value: event.photoLink }),
    id: Form.createFormField({ value: event.id }),
    name: Form.createFormField({ value: event.name }),
    description: Form.createFormField({ value: event.description }),
    location: Form.createFormField({
      value: `${event.locationLine1} ${event.locationLine2}`,
    }),
    locationPostalCode: Form.createFormField({
      value: event.locationPostalCode,
    }),
    ticketFee: Form.createFormField({ value: event.ticketFee }),
    noOfPax: Form.createFormField({ value: event.noOfPax }),
    isRefreshmentProvided: Form.createFormField({
      value: event.isRefreshmentProvided === '1' ? 'Yes' : 'No',
    }),
    contactPerson: Form.createFormField({ value: event.contactPerson }),
    emailAddress: Form.createFormField({ value: event.emailAddress }),
    mobilePhone: Form.createFormField({ value: event.mobilePhone }),
    eventStatus: Form.createFormField({
      value: event.eventStatus === '1' ? 'Open' : 'Closed',
    }),
    startDate: Form.createFormField({
      value: formatDate(event.startDate),
    }),
    endDate: Form.createFormField({
      value: formatDate(event.endDate),
    }),
    createdBy: Form.createFormField({ value: event.createdBy }),
    createdDate: Form.createFormField({ value: event.createdDate }),
  };
};

const mapDispatchToProps = {
  performNotifyEvent: postNotifyEvent,
};

const FormEventPagePage = Form.create({ mapPropsToFields })(EventPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(FormEventPagePage));
