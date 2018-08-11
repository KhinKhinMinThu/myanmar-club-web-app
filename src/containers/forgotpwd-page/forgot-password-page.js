import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Row, Col } from 'antd';
import {
  EmailInput,
  ResetButton,
  BackButton,
  SuccessMessage,
  ErrorMessage,
} from './components';
import { BoldText, ForgotPwdCard } from './styled-components';
import { postForgotPwd } from '../../reducers/forgot-password/forgot-password-data';

class ForgotPasswordPage extends Component {
  componentWillUpdate(nextProps) {
    const {
      forgotpasswordData: { isPostApiLoading },
    } = this.props;

    this.isApiPost = !nextProps.forgotpasswordData.isPostApiLoading && isPostApiLoading;
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { performForgotPwd } = this.props;
        performForgotPwd(values);
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      forgotpasswordData: { email, isPostApiLoading, postErrMsg },
    } = this.props;

    let message;
    if (this.isApiPost) {
      message = postErrMsg ? (
        <ErrorMessage postErrMsg={postErrMsg} />
      ) : (
        <SuccessMessage email={email} />
      );
    }
    return (
      <ForgotPwdCard style={{ borderRadius: 15, margin: 'auto' }}>
        <Form onSubmit={this.onSubmit}>
          {this.isApiPost ? (
            message
          ) : (
            <Row gutter={8}>
              <Col span={24}>
                <BoldText>
                  Enter your email address to reset the password...
                </BoldText>
                <EmailInput decorator={getFieldDecorator} />
              </Col>
              <Col span={12}>
                <ResetButton loading={isPostApiLoading} />
              </Col>
              <Col span={12}>
                <BackButton />
              </Col>
            </Row>
          )}
        </Form>
      </ForgotPwdCard>
    );
  }
}

ForgotPasswordPage.propTypes = {
  form: PropTypes.shape({}).isRequired,
  performForgotPwd: PropTypes.func.isRequired,

  forgotpasswordData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  forgotpasswordData: state.forgotpassword.data,
});

const FormForgotPasswordPage = Form.create()(ForgotPasswordPage);

export default connect(
  mapStateToProps,
  { performForgotPwd: postForgotPwd },
)(FormForgotPasswordPage);
