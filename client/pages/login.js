import React from "react";
import createSection from "../containers/Card";
import AuthForm from "../components/AuthForm";
import { loginAsync } from "../redux/reducers/authReducer";

const SignInSection = createSection(AuthForm);

function SignInPage() {
  return (
    <SignInSection reducer={loginAsync} authType="login" />
  );
}

export default SignInPage;
