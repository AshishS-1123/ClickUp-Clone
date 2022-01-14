import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import NavDrawer from "../features/NavBar";
import protectedRoute from "../utils/ProtectedRoutes";
import { getAllWorkspacesAsync } from "../redux/slices/workspaceSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.authReducer.userId);
  const token = useSelector(state => state.authReducer.token);

  useEffect(() => {
    // Dispatch request to fetch workspaces.
    dispatch(getAllWorkspacesAsync({ userId, token }))
  }, []);

  return (
    <>
      <NavDrawer />
    </>
  )
}

export default protectedRoute(Dashboard);
