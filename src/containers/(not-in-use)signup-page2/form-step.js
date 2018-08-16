import React from 'react';
import { connect } from 'react-redux';
import { Steps } from 'antd';
import PropTypes from 'prop-types';
import { StepIcon } from './styled-components';

const { Step } = Steps;
const steps = ['Info  Page', 'First Step', 'Second Step', 'Last Step'];

const FormStep = ({ currentStep }) => (
  <Steps current={currentStep}>
    {steps.map((step, i) => (
      <Step
        key={step}
        title={step}
        icon={i === steps.length - 1 ? <StepIcon type="smile-o" /> : null}
      />
    ))}
  </Steps>
);

FormStep.propTypes = {
  currentStep: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  currentStep: state.signup.ui.currentStep,
});

export default connect(
  mapStateToProps,
  null,
)(FormStep);
