import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, message } from 'antd';
import { SHOWFOR } from '../../../actions/message';
import { UsernameInput, PasswordInput, Footer } from './components';
import { postLogin } from '../../../reducers/login/login-data';
import { LoginCard } from '../shared-styled';

class LoginForm extends Component {
  componentDidUpdate(prevProps) {
    const {
      loginData: { isPostApiLoading, postErrMsg },
    } = this.props;

    const isApiPost = prevProps.loginData.isPostApiLoading && !isPostApiLoading;
    if (!isApiPost) return;

    if (postErrMsg) {
      message.error(postErrMsg, SHOWFOR);
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      form: { validateFields },
      performLogin,
    } = this.props;
    validateFields((err, values) => {
      if (!err) {
        const { username, password } = values;
        performLogin({ username, password });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      loginData: { isPostApiLoading },
    } = this.props;
    return (
      <LoginCard style={{ borderRadius: 15, margin: '0 auto 0 auto' }}>
        <Form onSubmit={this.onSubmit}>
          <UsernameInput decorator={getFieldDecorator} />
          <PasswordInput decorator={getFieldDecorator} />
          <Footer decorator={getFieldDecorator} loading={isPostApiLoading} />
        </Form>
      </LoginCard>
    );
  }
}

LoginForm.propTypes = {
  form: PropTypes.shape({}).isRequired,
  performLogin: PropTypes.func.isRequired,
  loginData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  loginData: state.login.data,
});

const mapDispatchToProps = {
  performLogin: postLogin,
};

const FormLoginPage = Form.create()(LoginForm);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormLoginPage);
