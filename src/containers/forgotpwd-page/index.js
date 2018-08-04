import React from 'react';
import { SmallCard } from '../shared-components/common';
import ForgotPassword from './forgot-password-page';

const ForgotPasswordPage = () => (
  <div className="public-pages">
    <SmallCard bordered={false}>
      <ForgotPassword />
    </SmallCard>
  </div>
);

export default ForgotPasswordPage;
