import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getPriorities, getStatuses, getViews, createNewView, createNewPriority,
} from "../../utils/requests/metaRequests";

export const getAllMetaData = createAsyncThunk(
  "meta/getAll",
  async ({ userId, workspaceId, token }, thunkApi) => {
    try {
      const { data: { priorities } } = await getPriorities(userId, workspaceId, token);
      const { data: { statuses } } = await getStatuses(userId, workspaceId, token);
      const { data: { views } } = await getViews(userId, workspaceId, token);

      return { priorities, statuses, views };
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  },
);

export const createNewViewAsync = createAsyncThunk(
  "meta/createView",
  async ({
    view, userId, workspaceId, token,
  }, thunkApi) => {
    try {
      const { data } = await createNewView(view, userId, workspaceId, token);

      if (!data.success) {
        return thunkApi.rejectWithValue({ error: data });
      }

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  },
);

export const createNewPriorityAsync = createAsyncThunk(
  "meta/createPriority",
  async ({
    priority, userId, workspaceId, token,
  }, thunkApi) => {
    try {
      const { data } = await createNewPriority(priority, userId, workspaceId, token);

      if (!data.success) {
        return thunkApi.rejectWithValue({ error: data });
      }

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  },
);

/* eslint-disable no-param-reassign */
function setMetaData(state, { payload }) {
  state.priorities = payload.priorities;
  state.statuses = payload.statuses;
  state.views = payload.views;
}

function setViews(state, { payload }) {
  state.views = payload.views;
}

function setPriority(state, { payload }) {
  state.priorities = payload.priorities;
}
/* eslint-enable no-param-reassign */

const initialState = {
  priorities: [],
  statuses: [],
  views: [],
};

export const metaSlice = createSlice({
  name: "meta",
  initialState,
  reducers: {
  },
  extraReducers: {
    [getAllMetaData.fulfilled]: setMetaData,
    [createNewViewAsync.fulfilled]: setViews,
    [createNewPriorityAsync.fulfilled]: setPriority,
  },
});

export default metaSlice.reducer;
