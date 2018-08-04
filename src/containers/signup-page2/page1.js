import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'antd';
import PropTypes from 'prop-types';

// components
import { PageCard } from './styled-components';
import {
  FIGroup,
  FICollapse,
  FIInput,
  FIDatePicker,
  FISelect,
  FIRadio,
  FICheckBoxGroup,
  FITextArea,
  FIUpload,
  NSelect,
} from './form-component';

// config
import formConfig, {
  FI_DATE_PICKER,
  FI_RADIO,
  FI_SELECT,
  FI_INPUT,
  FI_TEXT_AREA,
  FI_GROUP,
  FI_COLLAPSE,
  FI_INPUT_ADDON,
  FI_CHECKBOX_GROUP,
  FI_UPLOAD,
  stepOneFormKeys,
} from './form-config';

// redux
import { saveFields } from '../../reducers/user-info/data';
import { endValidate, next } from '../../reducers/user-info/ui';

// selectors
import {
  getUserInfo,
  getIsNationaltiyOther,
  getIsReligionOther,
  getCurrentStep,
  getIsValidating,
} from '../../selectors';

class Page1 extends Component {
  componentDidMount() {
    const {
      form, userInfo, isNationalityOther, isReligionOther,
    } = this.props;

    stepOneFormKeys.forEach((formKey) => {
      if (formKey === 'otherNationality' && !isNationalityOther) return;
      if (formKey === 'otherReligion' && !isReligionOther) return;

      form.setFieldsValue({
        [formKey]: userInfo[formKey],
      });
    });
  }

  componentDidUpdate(prevState) {
    const {
      form,
      isValidating,
      dpEndValidate,
      dpSaveFields,
      dpNext,
    } = this.props;
    const isPropChange = isValidating !== prevState.isValidating;

    if (!isValidating || !isPropChange) return;

    form.validateFieldsAndScroll((err, formValues) => {
      dpEndValidate();
      dpNext();
      if (!err) {
        dpSaveFields(formValues);
        // dpNext();
      }
    });
  }

  onSelect = (formKey, value) => {
    const { dpSaveFields } = this.props;
    dpSaveFields({ [formKey]: value });
  };

  renderBasedOnType = (inputType, finalConfig) => {
    switch (inputType) {
      case FI_INPUT:
        return <FIInput {...finalConfig} />;
      case FI_SELECT:
        return <FISelect {...finalConfig} onChange={this.onSelect} />;
      case FI_RADIO:
        return <FIRadio {...finalConfig} />;
      case FI_DATE_PICKER:
        return <FIDatePicker {...finalConfig} />;
      case FI_TEXT_AREA:
        return <FITextArea {...finalConfig} />;
      case FI_CHECKBOX_GROUP:
        return <FICheckBoxGroup {...finalConfig} />;
      case FI_UPLOAD:
        return <FIUpload {...finalConfig} />;
      default:
        return <div />;
    }
  };

  renderFIGroup = (byId, config) => {
    const { isReligionOther, isNationalityOther } = this.props;
    const { decorator, ...groupConfig } = config;

    return (
      <FIGroup
        {...groupConfig}
        render={(componentId) => {
          const { inputType, ...otherProps } = byId[componentId];
          const finalConfig = { ...otherProps, decorator };

          if (componentId === 'otherReligion' && !isReligionOther) return <div />;
          if (componentId === 'otherNationality' && !isNationalityOther) return <div />;
          return this.renderBasedOnType(inputType, finalConfig);
        }}
      />
    );
  };

  renderFICollapse = (byId, config) => {
    const { decorator, ...collapseConfig } = config;

    return (
      <FICollapse
        {...collapseConfig}
        render={(componentId) => {
          const { inputType, ...otherProps } = byId[componentId];
          const finalConfig = { ...otherProps, decorator };
          return this.renderBasedOnType(inputType, finalConfig);
        }}
      />
    );
  };

  renderInputAddon = (byId, config) => {
    const { addOnId, decorator, ...inputProps } = config;

    const { inputType, ...addOnProps } = byId[addOnId];
    const addOnConfig = { ...addOnProps, decorator };
    const addOnComponent = <NSelect {...addOnConfig} />;

    const inputConfig = { ...inputProps, decorator, addOnComponent };
    return this.renderBasedOnType(FI_INPUT, inputConfig);
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
              case FI_GROUP:
                return this.renderFIGroup(byId, config);
              case FI_COLLAPSE:
                return this.renderFICollapse(byId, config);
              case FI_INPUT_ADDON:
                return this.renderInputAddon(byId, config);
              default:
                return this.renderBasedOnType(inputType, config);
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
  dpNext: PropTypes.func.isRequired,
  userInfo: PropTypes.shape({}).isRequired,
  isNationalityOther: PropTypes.bool.isRequired,
  isReligionOther: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  userInfo: getUserInfo(state),
  isReligionOther: getIsReligionOther(state),
  isNationalityOther: getIsNationaltiyOther(state),
  isValidating: getIsValidating(state),
  currentStep: getCurrentStep(state),
});

const mapDispatchToProps = {
  dpSaveFields: saveFields,
  dpEndValidate: endValidate,
  dpNext: next,
};

const FormPage1 = Form.create({})(Page1);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormPage1);
