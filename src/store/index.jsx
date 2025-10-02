import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./slices/imageSlice";

export const store = configureStore({
  reducer: {
    images: imageReducer,
  },
});
