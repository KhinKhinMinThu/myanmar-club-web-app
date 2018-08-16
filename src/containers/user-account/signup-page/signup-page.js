import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormStep from './form-step';
import FormStepContent from './form-step-content';
import { resetState } from '../../../reducers/membermgmt/membermgmt-ui';

class Signup extends Component {
  componentWillMount() {
    const { dispatchResetState } = this.props;
    dispatchResetState();
  }

  render() {
    return (
      <div>
        <FormStep />
        <FormStepContent />
      </div>
    );
  }
}

Signup.propTypes = {
  dispatchResetState: PropTypes.func.isRequired,
};
const mapDispatchToProps = {
  dispatchResetState: resetState,
};
export default connect(
  null,
  mapDispatchToProps,
)(Signup);
