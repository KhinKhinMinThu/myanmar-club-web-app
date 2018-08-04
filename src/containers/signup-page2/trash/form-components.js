import React, { Component } from 'react';
import {
  Form, Col, Radio, Select,
} from 'antd';
import {
  FormInput1, FormDatePicker, FormSelect, ExtraInfoText,
} from './styled-components';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;

const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

/* eslint react/prop-types: 0 */

export const FormItemWithDecorator = ({
  label,
  decorator,
  formKey,
  requiredField,
  validationMsg,
  patternRegex,
  patternMsg,
  render,
  renderInfo,
  meta,
}) => (
  <FormItem {...layout} label={label}>
    {decorator(formKey, {
      rules: [
        {
          pattern: patternRegex,
          message: patternMsg,
        },
        {
          required: requiredField,
          message: validationMsg,
        },
      ],
    })(render(meta))}
    {renderInfo ? renderInfo(meta) : null}
  </FormItem>
);

export const FormItemWrapper = ({ label, render, meta }) => (
  <FormItem {...layout} label={label}>
    {render(meta)}
  </FormItem>
);

// gender
export const GenderRadio = props => (
  <FormItemWithDecorator
    {...props}
    render={() => (
      <RadioGroup name="gender">
        <RadioButton value="M">Male</RadioButton>
        <RadioButton value="F">Female</RadioButton>
      </RadioGroup>
    )}
  />
);

// dob
export const DobDatePicker = props => (
  <FormItemWithDecorator
    {...props}
    render={({ dateFormat }) => <FormDatePicker format={dateFormat} />}
  />
);

// marital status
export const MaritalStatusSelect = props => (
  <FormItemWithDecorator
    {...props}
    render={({ placeholder, options }) => (
      <FormSelect placeholder={placeholder}>
        {options.map(({ value, description }) => (
          <SelectOption value={value} key={value}>
            {description}
          </SelectOption>
        ))}
      </FormSelect>
    )}
  />
);

// education level
export const EducationLevelTextInput = props => (
  <FormItemWithDecorator
    {...props}
    render={({ placeholder }) => <FormInput1 placeholder={placeholder} />}
    renderInfo={({ info }) => <ExtraInfoText>{info}</ExtraInfoText>}
  />
);

// occupation
export const OccupationTextInput = props => (
  <FormItemWithDecorator
    {...props}
    render={({ placeholder }) => <FormInput1 placeholder={placeholder} />}
  />
);

// stay pass
export const StayPassSelect = props => (
  <FormItemWithDecorator
    {...props}
    render={({ placeholder, options }) => (
      <FormSelect placeholder={placeholder}>
        {options.map(({ value, description }) => (
          <SelectOption value={value} key={value}>
            {description}
          </SelectOption>
        ))}
      </FormSelect>
    )}
  />
);

// id number
export const IDTextInput = props => (
  <FormItemWithDecorator
    {...props}
    render={({ placeholder, maxLength }) => (
      <FormInput1 placeholder={placeholder} maxLength={maxLength} />
    )}
    renderInfo={({ info }) => <ExtraInfoText>{info}</ExtraInfoText>}
  />
);


// address

class SelectWithOtherToggler extends Component {
  state = { showTextInput: false };

  onSelect = (value) => {
    if (value === 'OT') {
      this.setState({ showTextInput: true });
    } else {
      this.setState({ showTextInput: false });
    }
  };

  render() {
    const { render } = this.props;
    const { showTextInput } = this.state;
    return render(showTextInput, this.onSelect);
  }
}

// nationality
export const NationalitySelect = ({ decorator }) => (
  <SelectWithOtherToggler
    render={(showTextInput, onSelect) => (
      <FormItem {...layout} label="Nationality" colon required>
        <Col span={7}>
          <FormItem>
            {decorator('nationality')(
              <FormSelect onChange={value => onSelect(value)}>
                <SelectOption value="MM">Myanmar</SelectOption>
                <SelectOption value="SG">Singaporean</SelectOption>
                <SelectOption value="OT">Others</SelectOption>
              </FormSelect>,
            )}
          </FormItem>
        </Col>
        {/* show text input if nationality is others */}
        {showTextInput && (
          <Col span={17}>
            <FormItem>
              {decorator('otherNationality', {
                rules: [
                  {
                    required: true,
                    message: 'Please specify your nationality!',
                  },
                ],
              })(<FormInput1 type="text" />)}
            </FormItem>
          </Col>
        )}
      </FormItem>
    )}
  />
);

// religion
export const ReligionSelect = ({ decorator }) => (
  <SelectWithOtherToggler
    render={(showTextInput, onSelect) => (
      <FormItem {...layout} label="Religion" colon required>
        <Col span={7}>
          <FormItem>
            {decorator('religion')(
              <FormSelect onChange={value => onSelect(value)}>
                <SelectOption value="BU">Buddhism</SelectOption>
                <SelectOption value="IS">Islam</SelectOption>
                <SelectOption value="HI">Hinduism</SelectOption>
                <SelectOption value="CH">Christianity</SelectOption>
                <SelectOption value="OT">Others</SelectOption>
              </FormSelect>,
            )}
          </FormItem>
        </Col>
        {/* show text input if religion is others */}
        {showTextInput && (
          <Col span={17}>
            <FormItem>
              {decorator('otherReligion', {
                rules: [
                  {
                    required: true,
                    message: 'Please specify your religion!',
                  },
                ],
              })(<FormInput1 type="text" />)}
            </FormItem>
          </Col>
        )}
      </FormItem>
    )}
  />
);

// full name
export const FullNameTextInput = ({ decorator }) => (
  <FormItem {...layout} label="Name" colon required>
    <Col span={7}>
      <FirstNameTextInput decorator={decorator} />
    </Col>
    <Col span={7}>
      <MiddleNameTextInput decorator={decorator} />
    </Col>
    <Col span={10}>
      <LastNameTextInput decorator={decorator} />
    </Col>
  </FormItem>
);

export const FirstNameTextInput = props => (
  <FormItemWithDecorator
    {...props}
    render={({ type, placeholder }) => <FormInput1 type={type} placeholder={placeholder} />}
  />
);

// middle name
export const MiddleNameTextInput = ({ decorator }) => (
  <FormItem>
    {decorator('middleName')(<FormInput1 type="text" placeholder="Middle Name" />)}
  </FormItem>
);

// last name
export const LastNameTextInput = ({ decorator }) => (
  <FormItem>{decorator('lastName')(<FormInput1 type="text" placeholder="Last Name" />)}</FormItem>
);
