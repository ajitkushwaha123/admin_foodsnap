import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import sidebarReducer from "./slice/sidebarSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    sidebar: sidebarReducer,
  },
});
