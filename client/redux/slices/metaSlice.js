import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPriorities, getStatuses, getViews } from '../../utils/requests/metaRequests';

export const getAllMetaData = createAsyncThunk(
  'meta/getAll',
  async ({ userId, workspaceId, token }, thunkApi) => {
    try {
      const { data: { priorities } } = await getPriorities(userId, workspaceId, token);
      const { data: { statuses } } = await getStatuses(userId, workspaceId, token);
      const { data: { views } } = await getViews(userId, workspaceId, token);

      return { priorities, statuses, views };
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
)

function setMetaData(state, { payload }) {
  state.priorities = payload.priorities;
  state.statuses = payload.statuses;
  state.views = payload.views;
}

const initialState = {
  priorities: [],
  statuses: [],
  views: [],
};

export const metaSlice = createSlice({
  name: 'meta',
  initialState,
  reducers: {
  },
  extraReducers: {
    [getAllMetaData.fulfilled]: setMetaData,
  },
});

export default metaSlice.reducer;
