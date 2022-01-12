import React from "react";
import createSection from "../containers/Card";
// import SignUp from "../components/SignUp";
import AuthForm from "../utils/AuthForm";
import { registerAsync } from "../redux/reducers/authReducer";

const SignUpSection = createSection(AuthForm);

function SignInPage() {
  return (
    <SignUpSection reducer={registerAsync} authType="register" />
  );
}

export default SignInPage;
