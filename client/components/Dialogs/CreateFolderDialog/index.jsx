import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createFolderAsync } from '../../../redux/slices/spaceSlice';
import FolderDialog from './FolderDialog';

function CreateFolderDialog({
  open, closeDialog, itemType, itemId,
}) {
  const folderNameElement = useRef(null);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authReducer);

  const handleCreateFolder = () => {
    const folderName = folderNameElement.current.value;

    const { userId } = userData;
    const { token } = userData;

    dispatch(createFolderAsync({
      folderName, parentType: itemType, parentId: itemId, userId, token,
    }))
      .then((res) => {
        if (res.payload.data.success) {
          closeDialog();
        }
      });
  };

  return (
    <FolderDialog
      open={open}
      closeDialog={closeDialog}
      handleCreateFolder={handleCreateFolder}
      ref={folderNameElement}
    />
  );
}

export default CreateFolderDialog;
