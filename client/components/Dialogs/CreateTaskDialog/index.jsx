import React, { useRef } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { createTaskAsync } from '../../../redux/slices/spaceSlice';
import TaskDialog from './TaskDialog';

function CreateTaskDialog({
  open, closeDialog, itemType, itemId, listName, workspaceName
}) {
  const dispatch = useDispatch();
  // const userData = useSelector((state) => state.authReducer);

  const handleCreateTask = () => {
    const taskName = taskNameElement.current.value;

    // const { userId } = userData;
    // const { token } = userData;

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
      inList={listName}
      forWorkspace={workspaceName}
    />
  );
}

const mapStateToProps = (state) => {
  const activeWorkspace = state.workspaceReducer.activeWorkspace;
  const workspace = state.workspaceReducer.workspaces[activeWorkspace];
  console.log("workspace in map", workspace.name);
  return {
    userId: state.authReducer.userId,
    token: state.authReducer.token,
    workspaceName: workspace.name,
  }
}

export default connect(mapStateToProps)(CreateTaskDialog);
