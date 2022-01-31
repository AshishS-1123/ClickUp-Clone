import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSpaceEverything } from "../../utils/requests/everythingRequests";
import { createSpace } from "../../utils/requests/spaceRequests";

export const getSpaceDataAsync = createAsyncThunk(
  "space/getData",
  async ({ spaceId, workspaceId, userId, token }, thunkApi) => {
    try {
      const spaceData = await fetchSpaceEverything(spaceId, workspaceId, userId, token);
      return { spaceData };
    } catch (error) {
      thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

export const createSpaceAsync = createAsyncThunk(
  "space/createSpace",
  async ({ spaceName, workspaceId, userId, token }, thunkApi) => {
    try {
      const { data } = await createSpace(spaceName, workspaceId, userId, token);

      if (data.success == false) {
        thunkApi.rejectWithValue({ error: data.error });
      }

      return { data };
    } catch (error) {
      thunkApi.rejectWithValue({ error: error.message });
    }
  }
)

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
  activeItem: "",
};

export const spaceSlice = createSlice({
  name: "space",
  initialState: initialState,
  reducers: {
    setActive: setActiveItem,
  },
  extraReducers: {
    [getSpaceDataAsync.fulfilled]: assignSpaceData,
    [createSpaceAsync.fulfilled]: attachNewSpace,
  }
})

function assignSpaceData(state, action) {
  const spaceData = action?.payload?.spaceData;
  spaceData.space.forEach(item => {
    if (!state.spaceData.includes(item))
      state.spaceData.push(item);
  });

  spaceData.folder.forEach(item => {
    if (!state.folderData.includes(item))
      state.folderData.push(item);
  });

  spaceData.list.forEach(item => {
    if (!state.listData.includes(item))
      state.listData.push(item);
  });
}

function setActiveItem(state, action) {
  state.activeItem = action.payload.id;
}

function attachNewSpace(state, action) {
  state.spaceData.push(action.payload.data.space);
}

export const { setActive } = spaceSlice.actions;

export default spaceSlice.reducer;
