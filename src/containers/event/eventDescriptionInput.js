import React, { Component } from 'react';

import { Form, Input } from 'antd';
import { layout, customInput } from './shared-components';
import { STRING_MAX_LEN } from '../../actions/constants';

const FormItem = Form.Item;
const { TextArea } = Input;
/* eslint react/prop-types: 0 */

// Event Description
class EventDescriptionInput extends Component {
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
          charLen > 0 ? charLen.toString().concat('/', STRING_MAX_LEN) : ''
        }
      >
        {decorator('description', {
          rules: [
            {
              required: true,
              message: 'Please input event description!',
            },
          ],
        })(
          <TextArea
            {...customInput}
            style={{ width: '500px' }}
            rows={4}
            placeholder="Event Description"
            maxLength={STRING_MAX_LEN}
            onChange={this.onChange}
          />,
        )}
      </FormItem>
    );
  }
}

export default EventDescriptionInput;
