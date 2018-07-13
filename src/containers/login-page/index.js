import React from 'react';
import { Card } from 'antd';
import LoginForm from './login-form';
import { cardStyles } from '../shared-components/common';

const LoginPage = () => (
  <div className="login-page">
    <Card bordered={false} style={cardStyles}>
      <LoginForm />
    </Card>
  </div>
);

export default LoginPage;
