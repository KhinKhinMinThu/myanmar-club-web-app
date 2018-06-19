import React from "react";
import { Card } from "antd";
import SignupForm from "./signup-form";
import { pageStyles } from "../shared-components/common";

const SignupPage = () => (
  <div className="signup-page">
    <Card bordered={false} style={pageStyles}>
      <SignupForm />
    </Card>
  </div>
);

export default SignupPage;
