import React from 'react';
import FormStep from './form-step';
import FormStepContent from './form-step-content';
import FormStepAction from './form-step-action';
import { FormCard } from './styled-components';

const SignupPage = () => (
  <div className="home-pages">
    <FormCard bordered={false}>
      <FormStep />
      <FormStepContent />
      <FormStepAction />
    </FormCard>
  </div>
);

export default SignupPage;
