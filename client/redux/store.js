import { configureStore } from "@reduxjs/toolkit";
// import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";

// import rootReducer from "./reducers/rootReducer";
import authReducer from "./reducers/authReducer";

export default configureStore({
  reducer: {
    authReducer
  },
});
