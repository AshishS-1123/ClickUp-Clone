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

    // return <WrappedComponent {...props} />
    console.log("in protected route");
    // const router = useRouter();

    const isLoggedIn = useSelector(state => state.authReducer.loggedIn);

    useEffect(() => {
      console.log("loggedin changed", isLoggedIn);
    }, [isLoggedIn])

    if (isLoggedIn && loginNeeded) {
      console.log("logged in and needed");
      // ex. visiting dashboard after signing in.
      return <WrappedComponent {...props} />
    } else if (!isLoggedIn && loginNeeded) {
      console.log("not logged in and needed");
      // ex. visiting dashboard without logging in.
      // router.replace("/login");
      tryRedirect("/login");
      return null;
    } else if (isLoggedIn && !loginNeeded) {
      console.log("logged in and not needed");
      // ex. visiting signin page after logging in.
      // router.replace("/");
      tryRedirect("/");
      return null;
    } else if (!isLoggedIn && !loginNeeded) {
      console.log("not logged in and not needed");
      // ex. visiting signin page without logging in.
      return <WrappedComponent {...props} />
    }

    console.log("Not winndow");
    return null;
    // return <WrappedComponent {...props} />
  }
}

export default protectedRoute;
