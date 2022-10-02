import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createFolder } from "../../utils/requests/folderRequests";
import { createList } from "../../utils/requests/listRequests";
import { createSpace } from "../../utils/requests/spaceRequests";
import { createTask, modifyTask } from "../../utils/requests/taskRequests";
import { getWorkspaceData } from "../../utils/requests/workspaceRequests";
import sanitizeTask from "../../utils/taskAlgorithms/sanitizeTasks";

/*
 * In the space slice we only store the spaces of the currently active workspace.
 * spaceData => stores Id of all spaces and their children
 *    spaceId: String, spaceName: String, children: [{childType: String, childId: String}]
 *    spaceMeta: (Meta data for spaces - color, icon, statuses, views)
 * folderData => stores Id of all folders and its children
 *    folderId: String, folderName: String, children: [{childType: String, childId: String}]
 * listData => stores Id of all lists and the tasks in them
 *    listId: String, listName: String, tasks: [String]
 * activeItem => stores Id of currently active item
 */
const initialState = {
  spaceData: [],
  folderData: [],
  listData: [],
  taskData: [],
  activeItem: "",
  activeItemName: "",
  error: "",
};

/* eslint-disable no-underscore-dangle */
export const getSpaceDataAsync = createAsyncThunk(
  "space/getData",
  async ({
    spaces, workspaceId, userId, token,
  }, thunkApi) => {
    try {
      // const combinedData = await Promise.all(spaces.map(space => fetchSpaceEverything(space, workspaceId, userId, token)));
      const combinedData = await getWorkspaceData(userId, token, workspaceId);
      const { metaReducer } = thunkApi.getState();

      combinedData.tasks = combinedData.tasks.map(task => sanitizeTask(task, metaReducer.priorities, metaReducer.statuses, combinedData.lists));

      return thunkApi.fulfillWithValue({ spaceData: combinedData });
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  },
);

export const createSpaceAsync = createAsyncThunk(
  "space/createSpace",
  async ({
    spaceName, workspaceId, userId, token,
  }, thunkApi) => {
    try {
      const { data } = await createSpace(spaceName, workspaceId, userId, token);

      if (data.success === false) {
        return thunkApi.rejectWithValue({ error: data.error });
      }

      return { data };
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  },
);

export const createFolderAsync = createAsyncThunk(
  "space/createFolder",
  async ({
    folderName, parentType, parentId, userId, token,
  }, thunkApi) => {
    try {
      const { data } = await createFolder(folderName, parentType, parentId, userId, token);

      if (data.success === false) {
        return thunkApi.rejectWithValue({ error: data.error });
      }

      return { data };
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  },
);

export const createListAsync = createAsyncThunk(
  "space/createList",
  async ({
    listName, parentType, parentId, userId, token,
  }, thunkApi) => {
    try {
      const { data } = await createList(listName, parentType, parentId, userId, token);

      if (data.success === false) {
        return thunkApi.rejectWithValue({ error: data.error });
      }

      return { data };
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  },
);

export const createTaskAsync = createAsyncThunk(
  "space/createTask",
  async ({
    taskName, taskMeta, parentType, parentId, userId, token,
  }, thunkApi) => {
    try {
      const { data } = await createTask(taskName, taskMeta, parentType, parentId, userId, token);

      if (data.success === false) {
        return thunkApi.rejectWithValue({ error: data.error });
      }

      const lists = thunkApi.getState().spaceReducer.listData;
      const { priorities, statuses } = thunkApi.getState().metaReducer;
      const task = sanitizeTask(data.task, priorities, statuses, lists);

      return { data: { success: true, task } };
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  },
);

export const modifyTaskAsync = createAsyncThunk(
  "space/modifyTask",
  async ({
    taskId, newData, parentId, userId, token,
  }, thunkApi) => {
    try {
      const { data } = await modifyTask(taskId, newData, parentId, userId, token);

      if (data.success === false) {
        return thunkApi.rejectWithValue({ error: data.error });
      }

      const meta = thunkApi.getState().metaReducer;
      const sanitizedTask = sanitizeTask(data.task, meta.priorities, meta.statuses);

      return { data: { task: sanitizedTask } };
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
)

/* eslint-disable no-param-reassign */
function assignSpaceData(state, action) {
  const spaceData = action?.payload?.spaceData;

  spaceData.spaces.forEach((item) => {
    if (!state.spaceData.includes(item)) state.spaceData.push(item);
  });

  spaceData.folders.forEach((item) => {
    if (!state.folderData.includes(item)) state.folderData.push(item);
  });

  spaceData.lists.forEach((item) => {
    if (!state.listData.includes(item)) state.listData.push(item);
  });

  spaceData.tasks.forEach((item) => {
    if (!state.taskData.includes(item)) state.taskData.push(item);
  });
}

function setActiveItem(state, action) {
  state.activeItem = action.payload.id;
}

function attachNewSpace(state, action) {
  const newSpace = action.payload.data.space;
  state.spaceData.push({...newSpace, id: newSpace._id});
}

function attachNewFolder(state, action) {
  const folder = action.payload?.data?.folder;

  // Add this folder to the list of all folders.
  state.folderData.push({
    id: folder._id,
    name: folder.name,
    children: folder.children,
  });

  // Update this folder data in the parent.
  const { parentId } = folder.parent;
  const parentType = folder.parent.parentType.toLowerCase();

  let parentData;
  if (parentType === "space") {
    parentData = state.spaceData;
  } else if (parentType === "folder") {
    parentData = state.folderData;
  } else if (parentType === "list") {
    parentData = state.listData;
  }

  // Add the new folder to the parent's children list.
  for (let i = 0; i < parentData.length; i += 1) {
    if (parentData[i].id === parentId) {
      parentData[i].children.push({
        childType: "FOLDER",
        id: folder._id,
        _id: folder._id,
      });
      break;
    }
  }
}

function attachNewList(state, action) {
  const { list } = action.payload.data;

  state.listData.push({
    id: list._id,
    name: list.name,
    children: list.children,
  });

  // Update this folder data in the parent.
  const { parentId } = list.parent;
  const parentType = list.parent.parentType.toLowerCase();

  let parentData;
  if (parentType === "space") {
    parentData = state.spaceData;
  } else if (parentType === "folder") {
    parentData = state.folderData;
  } else if (parentType === "list") {
    parentData = state.listData;
  }

  // Add the new folder to the parent's children list.
  for (let i = 0; i < parentData.length; i += 1) {
    if (parentData[i].id === parentId) {
      parentData[i].children.push({
        childType: "LIST",
        id: list._id,
        _id: list._id,
      });
      break;
    }
  }
}

function attachNewTask(state, action) {
  const task = action?.payload?.data?.task;

  state.taskData.push({
    id: task._id,
    _id: task.id,
    name: task.name,
    parent: task.parent,
    status: task.status,
    priority: task.priority,
  });

  // Update this folder data in the parent.
  const { parentId } = task.parent;

  let parentData;
  parentData = state.listData;

  // Add the new task to the parent's children list.
  for (let i = 0; i < parentData.length; i += 1) {
    if (parentData[i].id === parentId) {
      parentData[i].children.push({
        childType: "TASK",
        id: task._id,
        _id: task._id,
      });
      break;
    }
  }
}

function updateTask(state, action) {
  const newTask = action.payload.data.task;
  state.taskData.forEach((task, idx) => {
    if (task._id == newTask._id) {
      state.taskData[idx] = newTask;
      return;
    }
  })
}

function setError(state, action) {
  state.error = action.payload.error;
}

function resetSliceToDefault() {
  return initialState;
}
/* eslint-enable no-param-reassign */

export const spaceSlice = createSlice({
  name: "space",
  initialState,
  reducers: {
    setActive: setActiveItem,
    resetSlice: resetSliceToDefault,
  },
  extraReducers: {
    [getSpaceDataAsync.fulfilled]: assignSpaceData,
    [getSpaceDataAsync.rejected]: setError,
    [createSpaceAsync.fulfilled]: attachNewSpace,
    [createSpaceAsync.rejected]: setError,
    [createFolderAsync.fulfilled]: attachNewFolder,
    [createFolderAsync.rejected]: setError,
    [createListAsync.fulfilled]: attachNewList,
    [createListAsync.rejected]: setError,
    [createTaskAsync.fulfilled]: attachNewTask,
    [createTaskAsync.rejected]: setError,
    [modifyTaskAsync.fulfilled]: updateTask,
    [modifyTaskAsync.rejected]: setError,
  },
});

export const { setActive, resetSlice } = spaceSlice.actions;

export default spaceSlice.reducer;
