import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageInfo from './page-info';
import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';

const stepContentStyles = {
  marginTop: '15px',
  borderRadius: 15,
  backgroundColor: '#fafafa',
  padding: '8px',
};

class FormStepContent extends React.Component {
  getCurrentPage = () => {
    const {
      membermgmtUI: { currentStep },
    } = this.props;
    switch (currentStep) {
      case 0:
        return PageInfo;
      case 1:
        return Page1;
      case 2:
        return Page2;
      default:
        return Page3;
    }
  };

  render() {
    const Page = this.getCurrentPage();
    return (
      <div style={stepContentStyles}>
        <Page />
      </div>
    );
  }
}

FormStepContent.propTypes = {
  membermgmtUI: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  membermgmtUI: state.membermgmt.ui,
});

export default connect(
  mapStateToProps,
  null,
)(FormStepContent);
