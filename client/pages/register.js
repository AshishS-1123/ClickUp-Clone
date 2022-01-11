import React from "react";
import createSection from "../containers/Card";
// import SignUp from "../components/SignUp";
import AuthForm from "../components/AuthForm";
import { signUp } from "../redux/reducers/authReducer";

const SignUpSection = createSection(AuthForm);

function SignInPage() {
  return (
    <SignUpSection reducer={signUp} authType="register" />
  );
}

export default SignInPage;
