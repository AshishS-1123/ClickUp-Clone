import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ViewDialog from './ViewDialog';

function CreateViewDialog({
  open, closeDialog,
}) {
  const existingViews = useSelector(state => state.metaReducer.views);
  const dispatch = useDispatch();

  const handleCreateView = () => {

  };

  const handleViewSettings = () => {

  }

  return (
    <ViewDialog
      open={open}
      closeDialog={closeDialog}
      handleViewSettings={handleViewSettings}
      existingViews={existingViews}
    />
  );
}

export default CreateViewDialog;
