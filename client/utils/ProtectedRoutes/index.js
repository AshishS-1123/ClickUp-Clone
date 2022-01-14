import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const protectedRoute = (WrappedComponent, loginNeeded = true) => {
  return (props) => {
    const router = useRouter();
    const tryRedirect = (redirectTo) => {
      if (!(typeof window === "undefined")) {
        router.replace(redirectTo);
      }
    }

    const isLoggedIn = useSelector(state => state.authReducer.loggedIn);

    useEffect(() => {
    }, [isLoggedIn])

    if (isLoggedIn && loginNeeded) {
      // ex. visiting dashboard after signing in.
      return <WrappedComponent {...props} />
    } else if (!isLoggedIn && loginNeeded) {
      // ex. visiting dashboard without logging in.
      // router.replace("/login");
      tryRedirect("/login");
      return null;
    } else if (isLoggedIn && !loginNeeded) {
      // ex. visiting signin page after logging in.
      // router.replace("/");
      tryRedirect("/dashboard");
      return null;
    } else if (!isLoggedIn && !loginNeeded) {
      // ex. visiting signin page without logging in.
      return <WrappedComponent {...props} />
    }

    return null;
    // return <WrappedComponent {...props} />
  }
}

export default protectedRoute;
