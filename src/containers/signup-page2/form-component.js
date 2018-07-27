/* eslint react/prop-types: 0 */
import React from 'react';
import {
  Form, Radio, DatePicker, Select, Input, Col, Row,
} from 'antd';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;

export const FormItemGroup = ({ formItemProps, componentIds, render }) => {
  const { label, formItemLayout, colSpans } = formItemProps;
  return (
    <FormItem label={label} {...formItemLayout} colon required>
      <Row gutter={16}>
        {componentIds.map((componentId, index) => (
          <Col key={componentId} span={colSpans[index]}>
            {render(componentId)}
          </Col>
        ))}
      </Row>
    </FormItem>
  );
};

const getValidationRules = (validation) => {
  if (!validation) return {};

  const {
    requiredField, validationMsg, patternRegex, patternMsg,
  } = validation;

  return {
    rules: [
      {
        required: requiredField,
        message: validationMsg,
      },
      {
        pattern: patternRegex,
        message: patternMsg,
      },
    ],
  };
};

export const FormItemWithDecorator = ({
  formItemProps,
  decorator,
  render,
  componentProps,
  onChange,
}) => {
  const {
    label, formItemLayout, formKey, validation,
  } = formItemProps;
  const validationRules = getValidationRules(validation);

  return (
    <FormItem label={label} {...formItemLayout}>
      {decorator(formKey, validationRules)(
        render({ ...componentProps, onChange, formKey }),
      )}
    </FormItem>
  );
};

export const FormInput = props => (
  <FormItemWithDecorator
    {...props}
    render={({ placeholder, maxLength }) => (
      <Input placeholder={placeholder} maxLength={maxLength} />
    )}
  />
);

export const FormDatePicker = props => (
  <FormItemWithDecorator
    {...props}
    render={({ dateFormat }) => <DatePicker format={dateFormat} />}
  />
);

export const FormSelect = props => (
  <FormItemWithDecorator
    {...props}
    render={({ options, onChange, formKey }) => (
      <Select onChange={val => onChange(formKey, val)}>
        {options.map(({ value, description }) => (
          <SelectOption value={value} key={value}>
            {description}
          </SelectOption>
        ))}
      </Select>
    )}
  />
);

export const FormRadio = props => (
  <FormItemWithDecorator
    {...props}
    render={({ groupName, options }) => (
      <RadioGroup name={groupName}>
        {options.map(({ value, description }) => (
          <RadioButton value={value} key={value}>
            {description}
          </RadioButton>
        ))}
      </RadioGroup>
    )}
  />
);
