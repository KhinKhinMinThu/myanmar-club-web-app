/* eslint react/prop-types: 0 */
import React from 'react';
import {
  Form, Radio, DatePicker, Select, Input, Col, Row,
} from 'antd';
import { toClass } from 'recompose';
import {
  INPUT, RADIO, DATE_PICKER, SELECT,
} from './form-config';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;

export const FormRadio = ({ groupName, options }) => (
  <RadioGroup name={groupName}>
    {options.map(({ value, description }) => (
      <RadioButton value={value} key={value}>
        {description}
      </RadioButton>
    ))}
  </RadioGroup>
);

export const FormDatePicker = ({ dateFormat }) => (
  <DatePicker format={dateFormat} />
);

export const FormSelect = ({ placeholder, options, onChange }) => (
  <Select placeholder={placeholder} onChange={onChange}>
    {options.map(({ value, description }) => (
      <SelectOption value={value} key={value}>
        {description}
      </SelectOption>
    ))}
  </Select>
);

export const FormInput = ({ placeholder }) => (
  <Input placeholder={placeholder} />
);

const getFormClassComponent = (inputType) => {
  switch (inputType) {
    case RADIO:
      return toClass(FormRadio);
    case DATE_PICKER:
      return toClass(FormDatePicker);
    case SELECT:
      return toClass(FormSelect);
    case INPUT:
      return toClass(FormInput);
    default:
      return toClass(<div />);
  }
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
  formKey,
  inputType,
  label,
  formItemLayout,
  validation,
  componentProps,
  decorator,
  onChange,
}) => {
  const FormClassComponent = getFormClassComponent(inputType);
  const validationRules = getValidationRules(validation);

  return (
    <FormItem label={label} {...formItemLayout}>
      {decorator(formKey, validationRules)(
        <FormClassComponent {...componentProps} onChange={onChange} />,
      )}
    </FormItem>
  );
};

export const FormItemGroup = ({
  label,
  inlineComponentIds,
  colSpans,
  formItemLayout,
  render,
}) => (
  <FormItem label={label} {...formItemLayout} colon required>
    <Row gutter={16}>
      {inlineComponentIds.map((componentId, index) => (
        <Col key={componentId} span={colSpans[index]}>
          {render(componentId)}
        </Col>
      ))}
    </Row>
  </FormItem>
);

// mapPropsToFields(props) {
//   const mappedToFields = {};
//   const { allData } = props;
//   stepOneFormKeys.forEach((id) => {
//     mappedToFields[id] = createFormField({ value: allData[id] });
//   });
//   return mappedToFields;
// },
// onFieldsChange(props, fields) {
//   const { dpSaveFields } = props;
//   const key = Object.keys(fields)[0];
//   const { name, value } = fields[key];
//   dpSaveFields({ [name]: value });
// },
