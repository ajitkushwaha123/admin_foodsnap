import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import sidebarReducer from "./slice/sidebarSlice";
import eventsReducer from "./slice/eventSlice";
import imageReducer from "./slice/imageSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    sidebar: sidebarReducer,
    events: eventsReducer,
    image: imageReducer,
  },
});
