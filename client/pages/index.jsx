// import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import protectedRoute from "../utils/ProtectedRoutes";
import { signOutAsync } from "../redux/slices/authSlice";

function HomePage() {
  const dispatch = useDispatch();

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(signOutAsync());
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleClick} type="button">Sign Out</button>
    </div>
  );
}

export default protectedRoute(HomePage);
