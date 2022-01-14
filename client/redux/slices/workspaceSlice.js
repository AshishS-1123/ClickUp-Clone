import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllWorkspaces } from "../../utils/requests/workspaceRequests";

export const getAllWorkspacesAsync = createAsyncThunk(
  "workspace/getAll",
  async ({ userId, token }, thunkApi) => {
    try {
      const { data, status } = await getAllWorkspaces(userId, token);

      if (data.success) {
        return { workspaces: data.workspaces };
      }

      return thunkApi.rejectWithValue({ error: data.error });
    } catch (error) {
      console.log(error.message);
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
)

const initialState = {
  // Array of all workspace ids belonging to this user.
  // Workspaces will be stored as objects {id, name}
  workspaces: [],
  // Stores ids of all spaces that belong the currently selected workspace.
  activeWorkspaceChildren: [],
}

export const workspaceSlice = createSlice({
  name: "workspace",
  initialState: initialState,
  reducers: {

  },
  extraReducers: {
    [getAllWorkspacesAsync.fulfilled]: setWorkspaces,
    [getAllWorkspacesAsync.rejected]: state => {
      console.log("Failed");
    }
  }
})

function setWorkspaces(state, action) {
  state.workspaces = action?.payload?.workspaces;
}

export default workspaceSlice.reducer;
