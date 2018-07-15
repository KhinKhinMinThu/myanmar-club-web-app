import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { prev, next, startValidate } from '../../reducers/signup/signup-ui';
import { HalfWidthButton } from './styled-components';

const stepActionStyles = {
  marginTop: '14px',
  textAlign: 'center',
  display: 'inline-block',
  width: '100%',
};

const FormStepAction = ({
  currentStep, dispatchPrev, dispatchNext, dispatchStartValidate,
}) => {
  const onClickNext = () => {
    if (currentStep === 0) dispatchNext();
    else if (currentStep === 1 || 2) dispatchStartValidate();
  };
  const onClickApply = () => {};

  return (
    <div style={stepActionStyles}>
      {currentStep > 0 && (
        <HalfWidthButton style={{ marginRight: 8 }} onClick={() => dispatchPrev()}>
          Previous
        </HalfWidthButton>
      )}
      {currentStep < 3 && (
        <HalfWidthButton type="primary" htmlType="submit" onClick={() => onClickNext()}>
          Next
        </HalfWidthButton>
      )}
      {currentStep === 3 && (
        <HalfWidthButton type="primary" onClick={onClickApply()}>
          Apply for Membership
        </HalfWidthButton>
      )}
    </div>
  );
};

FormStepAction.propTypes = {
  currentStep: PropTypes.number.isRequired,
  dispatchNext: PropTypes.func.isRequired,
  dispatchPrev: PropTypes.func.isRequired,
  dispatchStartValidate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentStep: state.signup.ui.currentStep,
});

const mapDispatchToProps = {
  dispatchNext: next,
  dispatchPrev: prev,
  dispatchStartValidate: startValidate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormStepAction);
