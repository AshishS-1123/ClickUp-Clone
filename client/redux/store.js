import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import workspaceReducer from "./slices/workspaceSlice";
import spaceReducer from "./slices/spaceSlice";

export default configureStore({
  reducer: {
    authReducer,
    workspaceReducer,
    spaceReducer,
  },
});
