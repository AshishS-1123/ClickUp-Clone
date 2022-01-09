import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";

export default configureStore({
  reducer: rootReducer,
});
