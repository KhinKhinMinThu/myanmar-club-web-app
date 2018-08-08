import React from 'react';
import { ForgotPwdCard } from './styled-components';
import ForgotPassword from './forgot-password-page';

const ForgotPasswordPage = () => (
  <div className="public-pages">
    <ForgotPwdCard bordered={false}>
      <ForgotPassword />
    </ForgotPwdCard>
  </div>
);

export default ForgotPasswordPage;
