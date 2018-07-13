import React from 'react';
// import LoginPage from "./login-page";
// import SignupPage from '../containers/signup-page';
// import LoginPage from '../containers/login-page';
import ForgotpwdPage1 from '../containers/forgotpwd-page/forgotpwd-form1';
import ForgotpwdPage2 from '../containers/forgotpwd-page/forgotpwd-form2';
import ResetpwdPage from '../containers/resetpwd-page';

const App = () => (
  <div className="App">
    {/* <LoginPage /> */}
    <ForgotpwdPage1 />
    <ForgotpwdPage2 />
    <ResetpwdPage />
    {/* <SignupPage /> */}
  </div>
);

export default App;
