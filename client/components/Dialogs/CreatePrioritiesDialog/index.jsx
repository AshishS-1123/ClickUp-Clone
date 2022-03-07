import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PrioritiesDialog from './PrioritiesDialog';
import { createNewPriorityAsync } from '../../../redux/slices/metaSlice';

function CreatePrioritiesDialog({ open, closeDialog }) {
  const existingPriorities = useSelector(state => state.metaReducer.priorities);
  const { userId, token } = useSelector(state => state.authReducer);
  const { workspaces, activeWorkspace } = useSelector(state => state.workspaceReducer);

  const dispatch = useDispatch();

  const handleCreatePriority = (color, priorityName) => {
    console.log(color, priorityName);
    const workspaceId = workspaces[activeWorkspace].id;
    const priority = { level: priorityName, color: color };
    dispatch(createNewPriorityAsync({ priority, userId, workspaceId, token }))
      .then((res) => {
        console.log("Response", res);
      })
  }

  return (
    <>
      <PrioritiesDialog
        open={open}
        closeDialog={closeDialog}
        handleCreatePriority={handleCreatePriority}
        existingPriorities={existingPriorities}
      />
    </>
  )
}

export default CreatePrioritiesDialog;
