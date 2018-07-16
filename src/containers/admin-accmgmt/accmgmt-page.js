import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MemberTabs } from './components';
import { validate, resetState } from '../../reducers/accmgmt/accmgmt-ui';
import EcMembersPage from './ecmembers-page';
import ClubMembersPage from './clubmembers-page';

class AccManagement extends Component {
  componentWillMount() {
    const { dispatchResetState } = this.props;
    dispatchResetState();
  }

  componentDidUpdate() {}

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

const mapStateToProps = state => ({
  isValidating: state.accmgmt.ui.isValidating,
});

const mapDispatchToProps = {
  dispatchValidate: validate,
  dispatchResetState: resetState,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccManagement);
