/* eslint react/prop-types: 0 */
import React from 'react';
import {
  Form,
  Radio,
  DatePicker,
  Select,
  Input,
  Col,
  Row,
  Collapse,
  Checkbox,
  Upload,
  Icon,
} from 'antd';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const CollapsePanel = Collapse.Panel;
const InputTextArea = Input.TextArea;
const CheckBoxGroup = Checkbox.Group;

export const FIGroup = ({ formItemProps, componentIds, render }) => {
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

export const FICollapse = ({ formItemProps, componentIds, render }) => {
  const { formItemLayout, panelHeader, label } = formItemProps;
  return (
    <FormItem {...formItemLayout} label={label} colon={false}>
      <Collapse>
        <CollapsePanel header={panelHeader}>
          {componentIds.map(componentId => render(componentId))}
        </CollapsePanel>
      </Collapse>
    </FormItem>
  );
};

const getValidationRules = (validation) => {
  if (!validation) return {};
  const rules = [];

  const {
    requiredField,
    requiredFieldMsg,
    patternRegex,
    patternRegexMsg,
    validationType,
    validationTypeMsg,
  } = validation;

  if (requiredField) {
    rules.push({
      required: requiredField,
      message: requiredFieldMsg,
    });
  }

  if (patternRegex) {
    rules.push({
      pattern: patternRegex,
      message: patternRegexMsg,
    });
  }

  if (validationType) {
    rules.push({
      type: validationType,
      message: validationTypeMsg,
    });
  }

  return { rules };
};

export const FIDecorator = ({
  formItemProps,
  decorator,
  render,
  componentProps,
  onChange,
  addOnComponent,
}) => {
  const {
    label, formItemLayout, formKey, validation,
  } = formItemProps;
  const validationRules = getValidationRules(validation);

  return (
    <FormItem label={label} {...formItemLayout}>
      {decorator(formKey, validationRules)(
        render({
          ...componentProps,
          formKey,
          onChange,
          addOnComponent,
        }),
      )}
    </FormItem>
  );
};

export const FIInput = props => (
  <FIDecorator
    {...props}
    render={({ placeholder, maxLength, addOnComponent }) => (
      <Input
        placeholder={placeholder}
        maxLength={maxLength}
        addonBefore={addOnComponent}
      />
    )}
  />
);

export const FIDatePicker = props => (
  <FIDecorator
    {...props}
    render={({ dateFormat }) => <DatePicker format={dateFormat} />}
  />
);

export const FISelect = props => (
  <FIDecorator
    {...props}
    render={({
      options, onChange, formKey, style,
    }) => (
      <Select onChange={val => onChange(formKey, val)} style={style}>
        {options.map(({ value, description }) => (
          <SelectOption value={value} key={value}>
            {description}
          </SelectOption>
        ))}
      </Select>
    )}
  />
);

export const NSelect = (props) => {
  const { formKey, decorator, componentProps } = props;
  const { options, style } = componentProps;
  return decorator(formKey)(
    <Select style={style}>
      {options.map(({ value, description }) => (
        <SelectOption value={value} key={value}>
          {description}
        </SelectOption>
      ))}
    </Select>,
  );
};

export const FIRadio = props => (
  <FIDecorator
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

export const FICheckBoxGroup = props => (
  <FIDecorator
    {...props}
    render={({ options }) => (
      <CheckBoxGroup>
        {options.map(({ value, description }) => (
          <Row>
            <Checkbox value={value}>{description}</Checkbox>
          </Row>
        ))}
      </CheckBoxGroup>
    )}
  />
);

export const FITextArea = props => (
  <FIDecorator
    {...props}
    render={({ rows }) => <InputTextArea rows={rows} />}
  />
);

export const FIUpload = props => (
  <FIDecorator
    {...props}
    render={({ fileList }) => (
      <Upload listType="picture-card" fileList={fileList}>
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">Upload New Photo</div>
        </div>
      </Upload>
    )}
  />
);
