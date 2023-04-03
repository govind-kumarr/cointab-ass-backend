import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./feature";

export const store = configureStore({
  reducer: appReducer,
});


