import React from "react";
import createSection from "../containers/Card";
import SignIn from "../components/SignIn";

const SignInSection = createSection(SignIn);

function SignInPage() {
  return (
    <SignInSection />
  );
}

export default SignInPage;
