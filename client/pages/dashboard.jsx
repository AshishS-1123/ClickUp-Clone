import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavDrawer from '../features/NavBar';
import Views from '../features/Views';
import protectedRoute from '../utils/ProtectedRoutes';
import { getAllWorkspacesAsync } from '../redux/slices/workspaceSlice';
import { getSpaceDataAsync, resetSlice } from '../redux/slices/spaceSlice';
import { getAllMetaData } from '../redux/slices/metaSlice';

function Dashboard() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.authReducer.userId);
  const token = useSelector((state) => state.authReducer.token);
  const workspaces = useSelector((state) => state.workspaceReducer.activeWorkspaceChildren);

  useEffect(() => {
    // Dispatch request to fetch workspaces.
    dispatch(getAllWorkspacesAsync({ userId, token }))
      .then((action) => {
        dispatch(resetSlice);
        // console.log(action);
        const workspaceId = action.payload.workspaces[0].id;

        // Fetch data for each of the spaces.
        action.payload.workspaces[0].spaces.forEach((spaceId) => {
          dispatch(getSpaceDataAsync({
            spaceId, workspaceId, userId, token,
          }));
        });

        // Fetch the meta data related to this workspace.
        dispatch(getAllMetaData({ userId, workspaceId, token }))
          .then((res) => {
            // console.log("Meta", res);
          })
      });

  }, []);

  return (
    <>
      <NavDrawer />
      <Views />
    </>
  );
}

export default protectedRoute(Dashboard);
// export default Dashboard;
