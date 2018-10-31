import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spin, Alert, Button } from 'antd';
import moment from 'moment';
import { Content } from '../styled/content';
import {
  EventBlockContainer,
  EventImage,
  EventTextContainer,
  EventTextOne,
  EventTextTwo,
  EventTextThree,
} from '../styled/event-block';
import { getEventsData } from '../../../reducers/eventmgmt/eventmgmt-data';
import { EVENT_REGISTER } from '../../../actions/location';

class Events extends Component {
  componentDidMount() {
    const { performGetEventsData } = this.props;
    performGetEventsData();
  }

  componentWillUpdate(nextProps) {
    const {
      eventmgmtData: { isGetApiLoading },
    } = this.props;
    this.isApiCalled = !nextProps.eventmgmtData.isGetApiLoading && isGetApiLoading;
  }

  prepareList = (sourceList) => {
    const preparedList = [];
    const now = moment();
    sourceList.map(
      item => (item.eventStatus !== '0' && now.isBefore(moment(item.endDate))
        ? preparedList.push({
          key: `${item.id}`,
          ...item,
          location: `${item.locationLine1}, ${item.locationLine2},
       ${item.locationPostalCode}`,
        })
        : ''),
    );
    return preparedList;
  };

  render() {
    const {
      eventmgmtData: { eventsData, isGetApiLoading, getErrMsg },
    } = this.props;

    if (eventsData) this.eventsList = this.prepareList(eventsData);

    if (this.isApiCalled && getErrMsg) {
      return (
        <Alert message="Error" description={getErrMsg} type="error" showIcon />
      );
    }

    console.log(this.eventsList);

    return (
      <Content
        style={{ display: 'flex', justifyContent: 'center', paddingTop: '3em' }}
      >
        <Spin spinning={isGetApiLoading} size="large" delay={1000} />

        {this.eventsList
          && this.eventsList.map(event => (
            <EventBlockContainer key={event.id}>
              <EventImage src={event.photoLink} />
              <EventTextContainer>
                <EventTextOne>{event.name}</EventTextOne>
                <EventTextTwo>{`Location:  ${event.location}`}</EventTextTwo>
                <EventTextTwo>
                  {`Time   : ${moment(event.startDate).format(
                    'D MMM (ddd)',
                  )} - ${moment(event.endDate).format('D MMM (ddd)')}`}
                </EventTextTwo>
                <EventTextTwo>Fee: ${event.ticketFee}</EventTextTwo>
                <EventTextThree>{event.description}</EventTextThree>
                <Button
                  type="primary"
                  href={EVENT_REGISTER.concat('/').concat(event.id)}
                  icon="form"
                  style={{ width: '10em' }}
                >
                  Register
                </Button>
              </EventTextContainer>
            </EventBlockContainer>
          ))}
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  eventmgmtData: state.eventmgmt.data,
});
const mapDispatchToProps = {
  performGetEventsData: getEventsData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Events);

Events.propTypes = {
  performGetEventsData: PropTypes.func.isRequired,
  eventmgmtData: PropTypes.shape({}).isRequired,
};
