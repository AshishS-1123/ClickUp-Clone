import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../../utils/requests/authRequests";

export const signUp = createAsyncThunk(
  "auth/register",
  async ({ userEmail, password }, thunkApi) => {
    try {
      const { data, status } = await registerUser(userEmail, password);

      if (status == 201) {
        // Set the values in local storage.
        // localStorage.setItem("token", data.token);
        // Return the new state.
        return data;
      } else {
        return thunkApi.rejectWithValue({
          error: "Invalid Credentials"
        });
      }
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
      });
    }
  }
)

const initialState = {
  userEmail: "",
  loggedIn: false,
  token: "",
  error: "",
  loading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
  },
  extraReducers: {
    [signUp.pending]: startLoading,
    [signUp.fullfilled]: setUserCreds,
    [signUp.rejected]: setError,
  }
});

function startLoading(state) {
  return {
    ...state,
    loading: true,
  };
}
function setUserCreds(state, action) {
  const { userEmail, token } = action.payload;

  return {
    ...state,
    loading: false,
    userEmail: userEmail,
    token: token,
    error: "",
    loggedIn: true,
  }
}

function setError(state, action) {
  console.log("Rejected with ", action.error);
  return {
    ...state,
    loading: false,
    error: action.payload.error,
  }
}

// export const { signIn, signUp, signOut } = authSlice.actions;
export default authSlice.reducer;
