import React, { Component } from 'react';

import { Form, Input } from 'antd';
import { layout, customInput } from './shared-components';
import { STRING_MAX_LEN2 } from '../../actions/constants';

const FormItem = Form.Item;
const { TextArea } = Input;
/* eslint react/prop-types: 0 */

// Incident Description
class IncidentDescriptionInput extends Component {
  state = { charLen: 0 };

  onChange = (e) => {
    const { value } = e.target;
    this.setState({ charLen: value ? value.length : 0 });
  };

  render() {
    const { charLen } = this.state;
    const { decorator } = this.props;
    return (
      <FormItem
        {...layout}
        label="Description"
        extra={
          charLen > 0 ? charLen.toString().concat('/', STRING_MAX_LEN2) : ''
        }
        style={{ marginBottom: 0 }}
      >
        {decorator('description', {
          rules: [
            {
              required: true,
              message: 'Please input incident description!',
            },
          ],
        })(
          <TextArea
            {...customInput}
            style={{ width: '500px' }}
            rows={4}
            placeholder="Incident Description"
            maxLength={STRING_MAX_LEN2}
            onChange={this.onChange}
          />,
        )}
      </FormItem>
    );
  }
}

export default IncidentDescriptionInput;
