import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSidebarItems = createAsyncThunk(
  "sidebar/fetchSidebarItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/general/sidebar-list");
      console.log("Fetched sidebar items:", response.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch sidebar items"
      );
    }
  }
);

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetSidebar: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSidebarItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSidebarItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSidebarItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
