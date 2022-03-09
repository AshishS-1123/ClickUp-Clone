import React from 'react';
import { useDispatch, connect } from 'react-redux';
import { createTaskAsync } from '../../../redux/slices/spaceSlice';
import TaskDialog from './TaskDialog';

function CreateTaskDialog({
  open, closeDialog, itemType, itemId, listName, workspaceName, userId, token
}) {
  const dispatch = useDispatch();

  const handleCreateTask = (taskName, priority, dueDate) => {
    const taskMeta = {
      priority,
      dueDate,
    };

    dispatch(createTaskAsync({
      taskName, taskMeta, parentType: itemType, parentId: itemId, userId, token,
    }))
      .then((res) => {
        console.log("Res", res);
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
  return {
    userId: state.authReducer.userId,
    token: state.authReducer.token,
    workspaceName: workspace.name,
  }
}

export default connect(mapStateToProps)(CreateTaskDialog);
