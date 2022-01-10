import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../../utils/requests/authRequests";

export const signUp = createAsyncThunk(
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

      if (status == 201) {
        // Set the values in local storage.
        // localStorage.setItem("token", data.token);
        // Return the new state.
        return data;
      } else {
        return thunkApi.rejectWithValue({
          error: data.error,
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
  state.loading = true;
}
function setUserCreds(state, action) {
  const { userEmail, token } = action.payload;

  state.loading = false;
  state.userEmail = userEmail;
  state.token = token;
  state.error = "";
  state.loggedIn = true;
}

function setError(state, { payload }) {
  console.log("Rejected with ", payload.error);
  state.loading = false;
  state.error = payload.error;
}

// export const { signIn, signUp, signOut } = authSlice.actions;
export default authSlice.reducer;
