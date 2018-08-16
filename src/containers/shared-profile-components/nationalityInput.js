import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Select, Row, Col,
} from 'antd';
import { layoutHalf, customInput } from './shared-components';

const FormItem = Form.Item;
const { Option } = Select;

class NationalityInput extends Component {
  componentWillReceiveProps() {
    const {
      form: { getFieldValue },
    } = this.props;
    // set the initial value of this.showInput only
    // when current value is undefined and nextProps has value
    // f: the value 'Others'
    // if (!isOtherNat && nextProps.isOtherNat) {
    //   this.showInput = nextProps.isOtherNat === 'f';
    // }
    this.showInput = getFieldValue('nationality') === 'Others';
    // if (isOtherNat === 'default' && nextProps.isOtherNat !== 'default') {
    //   this.showInput = nextProps.isOtherNat === 'f';
    // }
  }

  onChange = (value) => {
    this.showInput = value === 'Others';
    const {
      form: { setFieldsValue },
    } = this.props;
    if (!this.showInput) setFieldsValue({ otherNationality: '' });
  };

  render() {
    const { decorator } = this.props;
    return (
      <FormItem {...layoutHalf} label="Nationality" colon required>
        <Row gutter={8} type="flex" justify="start">
          <Col span={12}>
            <FormItem>
              {decorator('nationality', { initialValue: 'Myanmar' })(
                <Select {...customInput} onChange={this.onChange}>
                  <Option value="Myanmar">Myanmar</Option>
                  <Option value="Singaporean">Singaporean</Option>
                  <Option value="Others">Others</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem>
              {decorator('otherNationality', {
                rules: [
                  {
                    required: this.showInput,
                    message: 'Please enter natioanlity!',
                  },
                ],
              })(
                <Input
                  {...customInput}
                  disabled={!this.showInput}
                  placeholder="Enter nationality"
                />,
              )}
            </FormItem>
          </Col>
        </Row>
      </FormItem>
    );
  }
}

NationalityInput.propTypes = {
  // isOtherNat: PropTypes.string,
  decorator: PropTypes.func.isRequired,
  form: PropTypes.shape({}).isRequired,
};

// NationalityInput.defaultProps = {
//   isOtherNat: 'default',
// };

export default NationalityInput;
