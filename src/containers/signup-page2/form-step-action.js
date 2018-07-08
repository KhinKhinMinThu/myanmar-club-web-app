import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { prev, next, validate } from '../../reducers/signup/signup-ui';
import { HalfWidthButton } from './styled-components';

const stepActionStyles = {
  marginTop: '14px',
  textAlign: 'center',
  display: 'inline-block',
  width: '100%',
};

const FormStepAction = ({
  currentStep, dispatchPrev, dispatchNext, dispatchValidate,
}) => {
  const onClickNext = () => {
    switch (currentStep) {
      case 0:
        dispatchNext();
        break;
      case 1:
      case 2:
        dispatchValidate(true);
        break;
      default:
      // do nothing,
    }
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
  dispatchValidate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentStep: state.signup.ui.currentStep,
});

const mapDispatchToProps = {
  dispatchNext: next,
  dispatchPrev: prev,
  dispatchValidate: validate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormStepAction);
