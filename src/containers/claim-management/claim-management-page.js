import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ClaimTabs } from './components';
import { resetState } from '../../reducers/accmgmt/accmgmt-ui';
import NewClaimsPage from './claims-new-page';
import ApprovedClaimsPage from './claims-approved-page';

class ClaimManagement extends Component {
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
        <ClaimTabs onChange={this.onChange} tabContents={[NewClaimsPage, ApprovedClaimsPage]} />
      </div>
    );
  }
}
ClaimManagement.propTypes = {
  dispatchResetState: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  dispatchResetState: resetState,
};

export default connect(
  null,
  mapDispatchToProps,
)(ClaimManagement);
