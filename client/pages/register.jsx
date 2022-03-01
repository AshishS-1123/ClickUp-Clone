import React from 'react';
import createSection from '../containers/Card';
import AuthForm from '../utils/AuthForm';
import { registerAsync } from '../redux/slices/authSlice';

const SignUpSection = createSection(AuthForm);

function SignInPage() {
  return (
    <SignUpSection reducer={registerAsync} authType="register" />
  );
}

export default SignInPage;
