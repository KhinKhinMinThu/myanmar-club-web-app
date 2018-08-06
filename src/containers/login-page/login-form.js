import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, message } from 'antd';
import { login } from '../../reducers/login';
import { UsernameInput, PasswordInput, Footer } from './components';

class LoginForm extends Component {
  componentDidUpdate(prevProps) {
    const { errMsg, isPending } = this.props;
    const isApiCall = prevProps.isPending === true && isPending === false;

    if (!isApiCall) return;
    if (errMsg !== '') this.showError(errMsg);
    else message.success('redirect to home page!');
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { form, performLogin } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const { username, password } = values;
        performLogin({ username, password });
      }
    });
  };

  // **** server side field checking **** //

  showError = (errMsg) => {
    const { form } = this.props;

    form.setFields({
      username: {
        errors: [new Error(' ')],
      },
      password: {
        errors: [new Error(errMsg)],
      },
    });
  };

  // **** server side field checking ends **** //

  render() {
    const {
      form: { getFieldDecorator },
      isPending,
    } = this.props;
    return (
      <Form onSubmit={this.onSubmit}>
        <UsernameInput decorator={getFieldDecorator} />
        <PasswordInput decorator={getFieldDecorator} />
        <Footer decorator={getFieldDecorator} isPending={isPending} />
      </Form>
    );
  }
}

LoginForm.propTypes = {
  form: PropTypes.shape({}).isRequired,
  errMsg: PropTypes.string,
  isPending: PropTypes.bool.isRequired,
  performLogin: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  errMsg: null,
};

const mapStateToProps = (state) => {
  const { isPending, errMsg } = state.login;
  return {
    isPending,
    errMsg,
  };
};

export default connect(
  mapStateToProps,
  { performLogin: login },
)(Form.create()(LoginForm));
