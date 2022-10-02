import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createNewWorkspace, getAllWorkspaces } from "../../utils/requests/workspaceRequests";

export const getAllWorkspacesAsync = createAsyncThunk(
  "workspace/getAll",
  async ({ userId, token }, thunkApi) => {
    try {
      const { data } = await getAllWorkspaces(userId, token);

      if (data.success) {
        return { workspaces: data.workspaces };
      }

      return thunkApi.rejectWithValue({ error: data.error });
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  },
);

export const createNewWorkspaceAsync = createAsyncThunk(
  "workspace/createNew",
  async ({ userId, token, workspaceName }, thunkApi) => {
    const { data } = await createNewWorkspace(userId, token, workspaceName);

    try {
      if (data.success) {
        return { workspace: data.workspace };
      }

      return thunkApi.rejectWithValue({ error: data.error });
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  },
);

export const switchWorkspace = createAsyncThunk(
  "workspace/switchWorkspace",
  async ({ workspaceId }) => ({ workspaceId }),
);

/* eslint-disable no-param-reassign */
function setWorkspaces(state, action) {
  state.workspaces = action?.payload?.workspaces;
  state.activeWorkspace = state.workspaces.length === 0 ? -1 : 0;

  if (state.activeWorkspace !== -1) state.activeWorkspaceChildren = state.workspaces[0].spaces;
}

function setError(state, action) {
  state.error = action?.payload?.error;
}

function addNewWorkspace(state, action) {
  state.workspaces = [...state.workspaces, action?.payload?.workspace];

  // If this is the first workspace, then make it the active one.
  if (state.workspaces.length === 1) {
    state.activeWorkspace = 0;
  }
}

function setActiveWorkspace(state, action) {
  state.activeWorkspace = action.payload?.workspaceId || 0;
  state.activeWorkspaceChildren = state.workspaces[state.activeWorkspace].spaces;
}
/* eslint-enable no-param-reassign */

const initialState = {
  // Array of all workspace ids belonging to this user.
  // Workspaces will be stored as objects {id, name}
  workspaces: [],
  // Id and name of active workspace.
  activeWorkspace: 0,
  // Stores ids of all spaces that belong the currently selected workspace.
  activeWorkspaceChildren: [],
  // Stores any errors that were generated,
  error: "",
};

export const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {

  },
  extraReducers: {
    [getAllWorkspacesAsync.fulfilled]: setWorkspaces,
    [getAllWorkspacesAsync.rejected]: setError,
    [createNewWorkspaceAsync.fulfilled]: addNewWorkspace,
    [createNewWorkspaceAsync.rejected]: setError,
    [switchWorkspace.fulfilled]: setActiveWorkspace,
  },
});

export default workspaceSlice.reducer;
