import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageInfo from './page-info';
import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';

const stepContentStyles = {
  marginTop: '20px',
  borderRadius: 10,
  backgroundColor: '#fafafa',
  textAlign: 'center',
  padding: '18px',
  width: '100%',
};

const FormStepContent = ({ currentStep }) => {
  let page;
  switch (currentStep) {
    case 0:
      page = <PageInfo />;
      break;
    case 1:
      page = <Page1 />;
      break;
    case 2:
      page = <Page2 />;
      break;
    case 3:
      page = <Page3 />;
      break;
    default:
      page = <div />; // unknown step
  }

  return <div style={stepContentStyles}>{page}</div>;
};

FormStepContent.propTypes = {
  currentStep: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  currentStep: state.signup.ui.currentStep,
});

export default connect(
  mapStateToProps,
  null,
)(FormStepContent);
