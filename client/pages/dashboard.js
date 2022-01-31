import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import NavDrawer from "../features/NavBar";
import protectedRoute from "../utils/ProtectedRoutes";
import { getAllWorkspacesAsync } from "../redux/slices/workspaceSlice";
import { getSpaceDataAsync } from "../redux/slices/spaceSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.authReducer.userId);
  const token = useSelector(state => state.authReducer.token);
  const activeSpaces = useSelector(state => state.workspaceReducer.activeWorkspaceChildren);

  useEffect(() => {
    // Dispatch request to fetch workspaces.
    // dispatch(getAllWorkspacesAsync({ userId, token }))
    //   .then((action) => {
    //     const workspaceId = action.payload.workspaces[0].id;
    //     action.payload.workspaces[0].spaces.forEach(spaceId => {
    //       dispatch(getSpaceDataAsync({ spaceId, workspaceId, userId, token }));
    //     });
    //   })
  }, []);

  return (
    <>
      <NavDrawer />
    </>
  )
}

// export default protectedRoute(Dashboard);
export default Dashboard;
