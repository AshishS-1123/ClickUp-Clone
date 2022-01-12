// import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import protectedRoute from "../utils/ProtectedRoutes";
import { signOutAsync } from "../redux/reducers/authReducer";


function HomePage() {
  // const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = (event) => {
    event.preventDefault();
    console.log("signout clicked");
    dispatch(signOutAsync());
  }

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleClick}>Sign Out</button>
    </div>
  );
};

export default protectedRoute(HomePage);
