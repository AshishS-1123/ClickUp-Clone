import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const protectedRoute = (WrappedComponent, loginNeeded = true) => function (props) {
  const router = useRouter();
  const tryRedirect = (redirectTo) => {
    if (!(typeof window === 'undefined')) {
      router.replace(redirectTo);
    }
  };

  const isLoggedIn = useSelector((state) => state.authReducer.loggedIn);

  useEffect(() => {
  }, [isLoggedIn]);

  if (isLoggedIn && loginNeeded) {
    // ex. visiting dashboard after signing in.
    return <WrappedComponent {...props} />;
  } if (!isLoggedIn && loginNeeded) {
    // ex. visiting dashboard without logging in.
    tryRedirect('/login');
    return null;
  } if (isLoggedIn && !loginNeeded) {
    // ex. visiting signin page after logging in.
    tryRedirect('/dashboard');
    return null;
  } if (!isLoggedIn && !loginNeeded) {
    // ex. visiting signin page without logging in.
    return <WrappedComponent {...props} />;
  }

  return null;
};

export default protectedRoute;
