import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux";

import authReducer from "../redux/slices/authSlice";
import workspaceReducer from "../redux/slices/workspaceSlice";
import spaceReducer from "../redux/slices/spaceSlice";


const reducers = {
  authReducer,
  workspaceReducer,
  spaceReducer,
}

function render(
  ui,
  {
    preloadedState,
    store = configureStore({ reducer: reducers, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from "@testing-library/react"
// override render method
export { render }
