import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewViewAsync } from '../../../redux/slices/metaSlice';
import ViewDialog from './ViewDialog';

function CreateViewDialog({
  open, closeDialog,
}) {
  const existingViews = useSelector(state => state.metaReducer.views);
  const { userId, token } = useSelector(state => state.authReducer);
  const { workspaces, activeWorkspace } = useSelector(state => state.workspaceReducer);

  const dispatch = useDispatch();

  const handleCreateView = (view) => {
    const workspaceId = workspaces[activeWorkspace].id;
    dispatch(createNewViewAsync({ view, userId, workspaceId, token }))
      .then((res) => {
        console.log("Response", res);
      })
  }

  return (
    <ViewDialog
      open={open}
      closeDialog={closeDialog}
      handleCreateView={handleCreateView}
      existingViews={existingViews}
    />
  );
}

export default CreateViewDialog;
