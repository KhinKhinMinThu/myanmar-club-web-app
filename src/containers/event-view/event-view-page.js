import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { EventViewTabs } from './components';
import { resetState } from '../../reducers/eventmgmt/eventmgmt-ui';
import EventPage from './event-page';
import RegistrationListPage from './event-rsvp-page';

class EventView extends Component {
  componentWillMount() {
    const { dispatchResetState } = this.props;
    dispatchResetState();
  }

  onChange = () => {
    const { dispatchResetState } = this.props;
    dispatchResetState();
  };

  render() {
    return (
      <div>
        <EventViewTabs
          props={this.props}
          onChange={this.onChange}
          tabContents={[EventPage, RegistrationListPage]}
        />
      </div>
    );
  }
}

EventView.propTypes = {
  dispatchResetState: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  dispatchResetState: resetState,
};

export default connect(
  null,
  mapDispatchToProps,
)(EventView);
