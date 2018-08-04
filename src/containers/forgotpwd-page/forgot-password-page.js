import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Row, Col } from 'antd';
import { EmailInput, ResetButton, BackButton } from './components';
import { BoldText, BlockContainer } from './styled-components';
import { save } from '../../reducers/forgot-password/forgot-password-data';

class ForgotPasswordPage extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        /* eslint-disable no-console */
        const { dispatchSave } = this.props;
        dispatchSave(values);
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.onSubmit}>
        <BlockContainer>
          <BoldText>Enter your email address to reset the password...</BoldText>
          <EmailInput decorator={getFieldDecorator} />
        </BlockContainer>
        <Row gutter={8}>
          <Col span={12}>{ResetButton}</Col>
          <Col span={12}>{BackButton}</Col>
        </Row>
      </Form>
    );
  }
}

ForgotPasswordPage.propTypes = {
  form: PropTypes.shape({}).isRequired,
  dispatchSave: PropTypes.func.isRequired,
};

const FormForgotPasswordPage = Form.create()(ForgotPasswordPage);

export default connect(
  null,
  { dispatchSave: save },
)(FormForgotPasswordPage);
