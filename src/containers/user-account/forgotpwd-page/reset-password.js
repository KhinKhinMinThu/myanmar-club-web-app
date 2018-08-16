import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { GoToLoginButton, CloseButton } from './components';
import { ResetPwdCard, BoldText, BlockContainer } from './styled-components';

// UNUSED!!!
const ResetPasswordPage = (props) => {
  const {
    forgotpasswordData: { email },
  } = props;
  return (
    <div className="public-pages">
      <ResetPwdCard bordered={false}>
        <BlockContainer>
          Password reset link has been sent to
          <BoldText>{` "${email}".`}</BoldText>
          <br />
          <br />
          <BoldText>
            Please check the email and follow the instrution to reset your
            password.
          </BoldText>
        </BlockContainer>
        <br />
        <br />
        <Row gutter={8}>
          <Col span={12}>
            <GoToLoginButton />
          </Col>
          <Col span={12}>
            <CloseButton />
          </Col>
        </Row>
      </ResetPwdCard>
    </div>
  );
};

ResetPasswordPage.propTypes = {
  forgotpasswordData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  forgotpasswordData: state.forgotpassword.data,
});

export default connect(mapStateToProps)(ResetPasswordPage);
