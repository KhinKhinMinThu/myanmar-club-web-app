import React from 'react';
import { Card } from 'antd';
import LoginForm from './login-form';
const cardStyles = {
  width: 350,
  height: 300,
  padding: '20px 5px 5px',
  borderRadius: 10,
  margin: 'auto',
  marginRight: 'auto',
};

const LoginPage = () => (
  <div className="login-page">
    <Card bordered={false} style={cardStyles}>
      <LoginForm />
    </Card>
  </div>
);

export default LoginPage;
