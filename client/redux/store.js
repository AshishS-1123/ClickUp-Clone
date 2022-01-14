import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import workspaceReducer from "./slices/workspaceSlice";

export default configureStore({
  reducer: {
    authReducer,
    workspaceReducer,
  },
});
