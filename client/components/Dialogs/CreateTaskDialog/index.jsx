import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTaskAsync } from '../../../redux/slices/spaceSlice';
import TaskDialog from './TaskDialog';

function CreateTaskDialog({
  open, closeDialog, itemType, itemId,
}) {
  const taskNameElement = useRef(null);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authReducer);

  const handleCreateTask = () => {
    const taskName = taskNameElement.current.value;

    const { userId } = userData;
    const { token } = userData;

    dispatch(createTaskAsync({
      taskName, parentType: itemType, parentId: itemId, userId, token,
    }))
      .then((res) => {
        if (res.payload.data.success) {
          closeDialog();
        }
      });
  };

  return (
    <TaskDialog
      open={open}
      closeDialog={closeDialog}
      handleCreateTask={handleCreateTask}
      ref={taskNameElement}
    />
  );
}

export default CreateTaskDialog;
