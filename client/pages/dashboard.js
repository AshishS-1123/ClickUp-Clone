import React from "react";
import NavDrawer from "../features/NavBar";
import protectedRoute from "../utils/ProtectedRoutes";

function Dashboard() {
  return (
    <>
      <NavDrawer />
    </>
  )
}

export default protectedRoute(Dashboard);
