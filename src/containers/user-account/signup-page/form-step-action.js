import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { prev, next } from '../../../reducers/membermgmt/membermgmt-ui';
import { FullButton } from '../shared-styled';
import { LOGIN } from '../../../actions/location';

const stepActionStyles = {
  marginTop: '14px',
  marginBottom: '14px',
};
const layout = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 24 },
  lg: { span: 12 },
  xl: { span: 12 },
};

const FormStepAction = ({ membermgmtUI: { currentStep }, dispatchPrev }) => {
  const PrevButton = () => (
    <FullButton onClick={() => dispatchPrev()}>Previous</FullButton>
  );
  const NextButton = () => (
    <FullButton type="primary" htmlType="submit">
      Next
    </FullButton>
  );
  const ApplyButton = () => (
    <FullButton type="primary" htmlType="submit">
      Apply for Membership
    </FullButton>
  );
  const GoToLoginButton = () => (
    <FullButton type="primary" href={LOGIN}>
      Go To Login
    </FullButton>
  );

  return (
    <div>
      <Row gutter={8} style={stepActionStyles}>
        <Col span={24}>{currentStep === 0 && <NextButton />}</Col>
        <Col span={24}>{currentStep === 3 && <GoToLoginButton />}</Col>
        <Col {...layout}>
          {currentStep > 0 && currentStep !== 3 && <PrevButton />}
        </Col>
        <Col {...layout}>
          {currentStep < 2 && currentStep > 0 && <NextButton />}
          {currentStep === 2 && <ApplyButton />}
        </Col>
      </Row>
    </div>
  );
};

FormStepAction.propTypes = {
  dispatchNext: PropTypes.func.isRequired,
  dispatchPrev: PropTypes.func.isRequired,
  membermgmtUI: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  membermgmtUI: state.membermgmt.ui,
});

const mapDispatchToProps = {
  dispatchNext: next,
  dispatchPrev: prev,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormStepAction);
