import React from 'react';
import createSection from '../containers/Card';
import AuthForm from '../utils/AuthForm';
import { loginAsync } from '../redux/slices/authSlice';

const SignInSection = createSection(AuthForm);

function SignInPage() {
  return (
    <SignInSection reducer={loginAsync} authType="login" />
  );
}

export default SignInPage;
