import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSpaceAsync } from '../../../redux/slices/spaceSlice';
import SpaceDialog from './SpaceDialog';

function CreateSpaceDialog({
  open, closeDialog,
}) {
  const spaceNameElement = useRef(null);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authReducer);
  const workspaceData = useSelector((state) => state.workspaceReducer);

  const handleCreateSpace = () => {
    const spaceName = spaceNameElement.current.value;

    const { userId } = userData;
    const { token } = userData;

    const workspaceId = workspaceData.workspaces[workspaceData.activeWorkspace].id;

    dispatch(createSpaceAsync({
      spaceName, workspaceId, userId, token,
    }))
      .then((res) => {
        if (res.payload.data.success) {
          closeDialog();
        }
      });
  };

  return (
    <SpaceDialog
      open={open}
      closeDialog={closeDialog}
      handleCreateSpace={handleCreateSpace}
      ref={spaceNameElement}
    />
  );
}

export default CreateSpaceDialog;
