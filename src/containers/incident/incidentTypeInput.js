import React, { Component } from 'react';
import {
  Form, Input, Select, Row, Col,
} from 'antd';
import { layout, customInput } from './shared-components';

const FormItem = Form.Item;
const { Option } = Select;

/* eslint react/prop-types: 0 */
class IncidentTypeInput extends Component {
  componentWillReceiveProps() {
    const {
      form: { getFieldValue },
    } = this.props;
    // set the initial value of this.showInput only
    // when current value is undefined and nextProps has value
    // f: the value 'Others'
    this.showInput = getFieldValue('incidentType') === '-1';
  }

  onChange = (value) => {
    this.showInput = value === '-1';
    const {
      form: { setFieldsValue },
    } = this.props;
    if (!this.showInput) setFieldsValue({ otherIncidentType: '' });
  };

  render() {
    const { decorator, incidentTypes } = this.props;
    return (
      <FormItem {...layout} label="Incident Type" colon required>
        <Row gutter={8} type="flex" justify="start">
          <Col span={12}>
            <FormItem>
              {decorator('incidentType', {
                initialValue: '0', // index
              })(
                <Select
                  {...customInput}
                  onChange={this.onChange}
                  showSearch
                  placeholder="Select incident type"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {incidentTypes.map((item, index) => (
                    <Option key={item.id} value={index.toString()}>
                      {item.name}
                    </Option>
                  ))}
                  <Option value="-1">Others</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem>
              {decorator('otherIncidentType', {
                rules: [
                  {
                    required: this.showInput,
                    message: 'Please enter incident type!',
                  },
                ],
              })(
                <Input
                  {...customInput}
                  disabled={!this.showInput}
                  placeholder="Enter incident type"
                />,
              )}
            </FormItem>
          </Col>
        </Row>
      </FormItem>
    );
  }
}

export default IncidentTypeInput;
