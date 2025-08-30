import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchImages = createAsyncThunk(
  "image/fetchImages",
  async (filters, { rejectWithValue, getState }) => {
    try {
      console.log("Current filters:", filters);

      const params = new URLSearchParams(filters).toString();
      const url = params ? `/api/image?${params}` : "/api/image";

      console.log("Fetching images from:", url);
      const res = await axios.get(url);

      return res.data.data;
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || "Failed to fetch images";
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  images: [],
  loading: false,
  error: null,
  filters: {},
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetImages: (state) => {
      state.images = [];
      state.loading = false;
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImages.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      state.images = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchImages.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const { clearError, resetImages, setFilters } = imageSlice.actions;

export default imageSlice.reducer;
