import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Collapse, Icon,
} from 'antd';
import { layout, customInput } from './shared-components';
import { ExtraInfoText } from './shared-styled';

const FormItem = Form.Item;
const { Panel } = Collapse;
// password

class PasswordInput extends Component {
  state = {
    isExpand: false,
  };

  componentWillUpdate(nextProps, nextState) {
    const { isExpand } = this.state;
    if (isExpand && !nextState.isExpand) {
      const {
        form: { setFields, getFieldValue },
      } = this.props;
      const password = getFieldValue('password');
      const confirmPassword = getFieldValue('confirmPassword');

      setFields({
        password: {
          value: password || '',
          errors: null,
        },
      });
      setFields({
        confirmPassword: {
          value: confirmPassword || '',
          errors: null,
        },
      });
    }
  }

  onChange = () => {
    const { isExpand } = this.state;
    this.setState({ isExpand: !isExpand });
  };

  onBlur = (e) => {
    const { value } = e.target;
    const {
      form: { setFields },
    } = this.props;
    if (value) {
      const has6Char = value.length >= 6;
      // const hasUpperCase = /[A-Z]/.test(value);
      // const hasLowerCase = /[a-z]/.test(value);
      const hasCharacter = /[a-zA-Z]/.test(value);
      const hasNumbers = /\d/.test(value);
      // const hasNonalphas = /\W/.test(value);
      if (!(has6Char && hasCharacter && hasNumbers)) {
        setFields({
          password: {
            errors: [
              new Error(
                'Password must be at least 6-15 characters and contain at least one letter and one number',
              ),
            ],
          },
        });
      }
    }
  };

  validateWithConfirmPassword = (rule, value, callback) => {
    const {
      form: { validateFields },
    } = this.props;
    if (value) {
      validateFields(['confirmPassword'], { force: true });
    }
    callback();
  };

  validateWithPassword = (rule, value, callback) => {
    const {
      form: { getFieldValue },
    } = this.props;
    if (value && value !== getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  render() {
    const { decorator, placeHolder } = this.props;
    const { isExpand } = this.state;
    return (
      <FormItem {...layout} label={placeHolder} colon>
        <Collapse onChange={this.onChange}>
          <Panel header="click to expand...">
            <FormItem {...layout} label="Password">
              {decorator('password', {
                initialValue: '',
                rules: [
                  {
                    required: isExpand,
                    message: 'Please enter the password!',
                  },
                  {
                    validator: isExpand
                      ? this.validateWithConfirmPassword
                      : null,
                  },
                ],
              })(
                <Input {...customInput} type="password" onBlur={this.onBlur} />,
              )}
            </FormItem>
            <FormItem {...layout} label="Confirm Password">
              {decorator('confirmPassword', {
                initialValue: '',
                rules: [
                  {
                    required: isExpand,
                    message: 'Please enter to confirm password!',
                  },
                  {
                    validator: isExpand ? this.validateWithPassword : null,
                  },
                ],
              })(<Input {...customInput} type="password" />)}
            </FormItem>
            <FormItem {...layout} label=" " colon={false} style={{ margin: 0 }}>
              <Icon type="exclamation-circle-o" />{' '}
              <ExtraInfoText>
                The password must be at least 6-15 characters.
              </ExtraInfoText>
              <br />
              <Icon type="exclamation-circle-o" />{' '}
              <ExtraInfoText>
                It must contain at least one letter and one number.
              </ExtraInfoText>
              <br />
              <Icon type="exclamation-circle-o" />{' '}
              <ExtraInfoText>Passwords are case sensitive.</ExtraInfoText>
            </FormItem>
          </Panel>
        </Collapse>
      </FormItem>
    );
  }
}

PasswordInput.propTypes = {
  isOtherNat: PropTypes.string,

  decorator: PropTypes.func.isRequired,
  form: PropTypes.shape({}).isRequired,
  placeHolder: PropTypes.string.isRequired,
};

PasswordInput.defaultProps = {
  isOtherNat: 'default',
};

export default PasswordInput;
