import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";

export default configureStore({
  reducer: {
    authReducer,
  },
});
