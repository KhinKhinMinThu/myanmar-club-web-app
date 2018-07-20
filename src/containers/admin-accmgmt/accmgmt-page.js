import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MemberTabs } from './components';
import { resetState } from '../../reducers/accmgmt/accmgmt-ui';
import EcMembersPage from './members-ec-page';
import ClubMembersPage from './members-club-page';

class AccManagement extends Component {
  componentWillMount() {
    const { dispatchResetState } = this.props;
    dispatchResetState();
  }

  render() {
    const { dispatchResetState } = this.props;
    return (
      <div>
        <MemberTabs
          onChange={() => dispatchResetState()}
          tabContents={[EcMembersPage, ClubMembersPage]}
        />
      </div>
    );
  }
}
AccManagement.propTypes = {
  dispatchResetState: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  dispatchResetState: resetState,
};

export default connect(
  null,
  mapDispatchToProps,
)(AccManagement);
