import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavDrawer from '../features/NavBar';
import Views from '../features/Views';
import protectedRoute from '../utils/ProtectedRoutes';
import { getAllWorkspacesAsync } from '../redux/slices/workspaceSlice';
import { getSpaceDataAsync, resetSlice } from '../redux/slices/spaceSlice';
import { getAllMetaData } from '../redux/slices/metaSlice';
import useMobile from '../utils/useMobile';
import InvalidDevice from '../components/Misc/InvalidDevice';

function Dashboard() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.authReducer.userId);
  const token = useSelector((state) => state.authReducer.token);
  const isMobile = useMobile();

  useEffect(() => {
    // Dispatch request to fetch workspaces.
    dispatch(getAllWorkspacesAsync({ userId, token }))
      .then((action) => {
        dispatch(resetSlice);
        // const workspaceId = action.payload.workspaces[0].id;
        // const spaces = action.payload.workspaces[0].spaces;
        const {id: workspaceId, spaces} = action.payload.workspaces[0];

        // Fetch the meta data related to this workspace.
        dispatch(getAllMetaData({ userId, workspaceId, token }))
          .then(() => {
            // Fetch data for each of the spaces.
            dispatch(getSpaceDataAsync({
              spaces, workspaceId, userId, token,
            }));
          });
      });
  }, []);

  if (isMobile) {
    return <InvalidDevice />;
  }

  return (
    <>
      <NavDrawer />
      <Views />
    </>
  );
}

export default protectedRoute(Dashboard);
