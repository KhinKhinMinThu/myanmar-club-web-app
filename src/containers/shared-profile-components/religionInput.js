import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Select, Row, Col,
} from 'antd';
import { layoutHalf, customInput } from './shared-components';

const FormItem = Form.Item;
const { Option } = Select;

class ReligionInput extends Component {
  componentWillReceiveProps(nextProps) {
    const { isOtherRel } = this.props;
    // set the initial value of this.showInput only
    // when current value is undefined and nextProps has value
    // f: the value 'Others'
    // if (!isOtherRel && nextProps.isOtherRel) {
    //   this.showInput = nextProps.isOtherRel === 'f';
    // }
    if (isOtherRel === 'default' && nextProps.isOtherRel !== 'default') {
      this.showInput = nextProps.isOtherRel === 'f';
    }
  }

  onChange = (value) => {
    this.showInput = value === 'Others';
    const {
      form: { setFieldsValue },
    } = this.props;
    if (!this.showInput) setFieldsValue({ otherReligion: '' });
  };

  render() {
    const { decorator } = this.props;
    return (
      <FormItem {...layoutHalf} label="Religion" colon>
        <Row gutter={8} type="flex" justify="start">
          <Col span={12}>
            <FormItem>
              {decorator('religion')(
                <Select {...customInput} onChange={this.onChange}>
                  <Option value="Buddhism">Buddhism</Option>
                  <Option value="Islam">Islam</Option>
                  <Option value="Hinduism">Hinduism</Option>
                  <Option value="Christianity">Christianity</Option>
                  <Option value="Others">Others</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem>
              {decorator('otherReligion', { rules: [{ required: false }] })(
                <Input
                  {...customInput}
                  disabled={!this.showInput}
                  placeholder="Enter religion"
                />,
              )}
            </FormItem>
          </Col>
        </Row>
      </FormItem>
    );
  }
}

ReligionInput.propTypes = {
  isOtherRel: PropTypes.string,
  decorator: PropTypes.func.isRequired,
  form: PropTypes.shape({}).isRequired,
};

ReligionInput.defaultProps = {
  isOtherRel: 'default',
};

export default ReligionInput;
