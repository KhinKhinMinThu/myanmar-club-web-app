import React from 'react';
import { Card } from 'antd';
import ResetpwdForm from './resetpwd-form';
import { cardStyles } from '../shared-components/common';

const ResetpwdPage = () => (
  <div className="login-page">
    <Card bordered={false} style={cardStyles}>
      <div>
        {'Reset your password...'}
      </div>
      <div style={{ marginTop: '30px' }}>
        <ResetpwdForm />
      </div>
    </Card>
  </div>
);

export default ResetpwdPage;
