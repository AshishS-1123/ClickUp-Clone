import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSpaceEverything } from "../../utils/requests/everythingRequests";

export const getSpaceDataAsync = createAsyncThunk(
  "space/getData",
  async ({ spaceId, workspaceId, userId, token }, thunkApi) => {
    console.log("Getting space Data...");
    try {
      const spaceData = await fetchSpaceEverything(spaceId, workspaceId, userId, token);
      console.log("Space Data");
      console.log(spaceData);
      return { spaceData };
    } catch (error) {
      thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

/*
 * In the space slice we only store the spaces of the currently active workspace.
 * spaceData => stores Id of all spaces and their children
 *    spaceId: String, spaceName: String, children: [{childType: String, childId: String}]
 *    spaceMeta: (Meta data for spaces - color, icon, statuses, views)
 * folderData => stores Id of all folders and its children
 *    folderId: String, folderName: String, children: [{childType: String, childId: String}]
 * listData => stores Id of all lists and the tasks in them
 *    listId: String, listName: String, tasks: [String]
 */

const initialState = {
  spaceData: [],
  folderData: [],
  listData: [],
};

export const spaceSlice = createSlice({
  name: "space",
  initialState: initialState,
  reducers: {

  },
  extraReducers: {
    [getSpaceDataAsync.fulfilled]: assignSpaceData,
  }
})

function assignSpaceData(state, action) {
  const spaceData = action?.payload?.spaceData;
  console.log(spaceData);
  spaceData.space.forEach(item => {
    state.spaceData.push(item);
  });

  spaceData.folder.forEach(item => {
    state.folderData.push(item);
  });

  spaceData.list.forEach(item => {
    state.listData.push(item);
  });
}

export default spaceSlice.reducer;
