import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    increment: () => { }

  }
});

export const { increment } = authSlice.actions;
export default authSlice.reducer;
