import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'antd';
import PropTypes from 'prop-types';

// components
import { PageCard } from './styled-components';
import {
  FormItemGroup,
  FormInput,
  FormDatePicker,
  FormSelect,
  FormRadio,
} from './form-component';

// config
import formConfig, {
  GROUP,
  DATE_PICKER,
  RADIO,
  SELECT,
  INPUT,
  stepOneFormKeys,
} from './form-config';

// redux
import { saveFields } from '../../reducers/user-info/data';
import { endValidate } from '../../reducers/user-info/ui';

// selectors
import {
  getAllData,
  getIsNationaltiyOther,
  getIsReligionOther,
  getCurrentStep,
  getIsValidating,
} from '../../selectors';

class Page1 extends Component {
  componentDidMount() {
    const {
      form, allData, isReligionOther, isNationalityOther,
    } = this.props;

    stepOneFormKeys.forEach((formKey) => {
      let value;

      switch (formKey) {
        case 'religion':
          if (isReligionOther) value = 'OT';
          break;
        case 'nationality':
          if (isNationalityOther) value = 'OT';
          break;
        case 'otherReligion':
          if (isReligionOther) value = allData.religion;
          break;
        default:
          value = allData[formKey];
      }

      form.setFieldsValue({
        [formKey]: value,
      });
    });
  }

  componentDidUpdate(prevState) {
    const {
      form, isValidating, dpEndValidate, dpSaveFields,
    } = this.props;
    const isPropChange = isValidating !== prevState.isValidating;

    if (!isValidating || !isPropChange) return;

    form.validateFieldsAndScroll((err, formValues) => {
      dpEndValidate();

      if (!err) {
        dpSaveFields(formValues);
      }
    });
  }

  onSelect = (formKey, value) => {
    const { dpSaveFields } = this.props;
    dpSaveFields({ [formKey]: value });
  };

  renderBasedOnInputType = (inputType, finalConfig) => {
    switch (inputType) {
      case INPUT:
        return <FormInput {...finalConfig} />;
      case SELECT:
        return <FormSelect {...finalConfig} onChange={this.onSelect} />;
      case RADIO:
        return <FormRadio {...finalConfig} />;
      case DATE_PICKER:
        return <FormDatePicker {...finalConfig} />;
      default:
        return <div />;
    }
  };

  renderFormItemGroup = (byId, config) => {
    const { isReligionOther, isNationalityOther } = this.props;
    const { decorator, ...groupConfig } = config;

    return (
      <FormItemGroup
        {...groupConfig}
        render={(componentId) => {
          const { inputType, ...otherProps } = byId[componentId];
          const finalConfig = { ...otherProps, decorator };

          if (componentId === 'otherReligion' && !isReligionOther) return <div />;
          if (componentId === 'otherNationality' && !isNationalityOther) return <div />;
          return this.renderBasedOnInputType(inputType, finalConfig);
        }}
      />
    );
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator: decorator } = form;
    const { byId, stepOneIds } = formConfig;

    return (
      <PageCard>
        <Form>
          {stepOneIds.map((id) => {
            const { inputType, ...otherProps } = byId[id];
            const config = { ...otherProps, decorator };

            switch (inputType) {
              case GROUP:
                return this.renderFormItemGroup(byId, config);
              default:
                return this.renderBasedOnInputType(inputType, config);
            }
          })}
        </Form>
      </PageCard>
    );
  }
}

Page1.propTypes = {
  form: PropTypes.shape({}).isRequired,
  isValidating: PropTypes.bool.isRequired,
  dpEndValidate: PropTypes.func.isRequired,
  dpSaveFields: PropTypes.func.isRequired,
  allData: PropTypes.shape({}).isRequired,
  isNationalityOther: PropTypes.bool.isRequired,
  isReligionOther: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  allData: getAllData(state),
  isReligionOther: getIsReligionOther(state),
  isNationalityOther: getIsNationaltiyOther(state),
  isValidating: getIsValidating(state),
  currentStep: getCurrentStep(state),
});

const mapDispatchToProps = {
  dpSaveFields: saveFields,
  dpEndValidate: endValidate,
};

const FormPage1 = Form.create({})(Page1);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormPage1);
