import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Select, Row, Col,
} from 'antd';
import {
  layout,
  inputLayout1,
  inputLayout2,
  customInput,
} from './shared-components';

const FormItem = Form.Item;
const { Option } = Select;

class NationalityInput extends Component {
  componentWillReceiveProps(nextProps) {
    const { isOtherNat } = this.props;
    // set the initial value of this.showInput only
    // when current value is undefined and nextProps has value
    // f: the value 'Others'
    // if (!isOtherNat && nextProps.isOtherNat) {
    //   this.showInput = nextProps.isOtherNat === 'f';
    // }
    if (isOtherNat === 'default' && nextProps.isOtherNat !== 'default') {
      this.showInput = nextProps.isOtherNat === 'f';
    }
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
      <FormItem {...layout} label="Nationality" colon required>
        <Row gutter={8} type="flex" justify="start">
          <Col {...inputLayout1}>
            <FormItem>
              {decorator('nationality')(
                <Select {...customInput} onChange={this.onChange}>
                  <Option value="Myanmar">Myanmar</Option>
                  <Option value="Singaporean">Singaporean</Option>
                  <Option value="Others">Others</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col {...inputLayout2}>
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
  isOtherNat: PropTypes.string,
  decorator: PropTypes.func.isRequired,
  form: PropTypes.shape({}).isRequired,
};

NationalityInput.defaultProps = {
  isOtherNat: 'default',
};

export default NationalityInput;
