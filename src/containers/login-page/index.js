import React from 'react';
import { LoginCard } from './styled-components';
import Login from './login-form';

const LoginPage = () => (
  <div className="public-pages">
    <LoginCard bordered={false}>
      <Login />
    </LoginCard>
  </div>
);

export default LoginPage;
