import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logInUser, registerUser } from "../../utils/requests/authRequests";

export const registerAsync = createAsyncThunk(
  "auth/register",
  async ({ userEmail, password }, thunkApi) => {
    // Check that the email and password are provided
    if (!userEmail || !password) {
      return thunkApi.rejectWithValue({
        error: "Please provide email and password",
      });
    }

    try {
      const { data, status } = await registerUser(userEmail, password);

      if (status === 201) {
        // Set the values in local storage.
        // localStorage.setItem("token", data.token);
        // Return the new state.
        return data;
      }
      return thunkApi.rejectWithValue({
        error: data.error,
      });
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
      });
    }
  },
);

export const loginAsync = createAsyncThunk(
  "auth/login",
  async ({ userEmail, password }, thunkApi) => {
    // Check that the email and password are provided
    if (!userEmail || !password) {
      return thunkApi.rejectWithValue({
        error: "Please provide email and password",
      });
    }

    try {
      const { data, status } = await logInUser(userEmail, password);

      if (status === 201) {
        // Set the values in local storage.
        // localStorage.setItem("token", data.token);
        // Return the new state.
        return data;
      }
      return thunkApi.rejectWithValue({
        error: data.error,
      });
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
      });
    }
  },
);

export const signOutAsync = createAsyncThunk(
  "auth/signout",
  () => { },
);

/* eslint-disable no-param-reassign */
function startLoading(state) {
  state.loading = true;
}
function setUserCreds(state, action) {
  const { userEmail, token, userId } = action.payload;

  state.loading = false;
  state.userEmail = userEmail;
  state.token = token;
  state.error = "";
  state.loggedIn = true;
  state.userId = userId;
}

function setError(state, { payload }) {
  state.loading = false;
  state.error = payload.error;
}

function signOutUser(state) {
  state.userEmail = "";
  state.token = "";
  state.loggedIn = false;
  state.loading = false;
  state.userId = "";
}
/* eslint-disable no-param-reassign */

const initialState = {
  userEmail: "",
  loggedIn: false,
  token: "",
  error: "",
  loading: true,
  userId: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  },
  extraReducers: {
    [registerAsync.pending]: startLoading,
    [registerAsync.fulfilled]: setUserCreds,
    [registerAsync.rejected]: setError,
    [loginAsync.pending]: startLoading,
    [loginAsync.fulfilled]: setUserCreds,
    [loginAsync.rejected]: setError,
    [signOutAsync.fulfilled]: signOutUser,
  },
});

export default authSlice.reducer;
