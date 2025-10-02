import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ---- Thunks ----
export const fetchImages = createAsyncThunk(
  "images/fetchImages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/images");
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "images/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/images/category");
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const createCategory = createAsyncThunk(
  "images/createCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/images/category", categoryData);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateImageById = createAsyncThunk(
  "images/updateImageById",
  async ({ imageId, updateData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/images/${imageId}`, updateData);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ---- Initial State ----
const initialState = {
  images: [],
  categories: [],
  loading: false,
  error: null,
};

// ---- Slice ----
const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    clearImages: (state) => {
      state.images = [];
      state.error = null;
    },
    clearCategories: (state) => {
      state.categories = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ---- Images ----
      .addCase(fetchImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload || [];
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch images";
      })

      // ---- Categories ----
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload || [];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch categories";
      })

      // ---- Create Category ----
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.error = action.payload || "Failed to create category";
      })

      // ---- Update Image ----
      .addCase(updateImageById.fulfilled, (state, action) => {
        const index = state.images.findIndex(
          (img) => img._id === action.payload._id
        );
        if (index !== -1) {
          state.images[index] = action.payload;
        }
      })
      .addCase(updateImageById.rejected, (state, action) => {
        state.error = action.payload || "Failed to update image";
      });
  },
});

export const { clearImages, clearCategories, clearSubCategories } =
  imageSlice.actions;
export default imageSlice.reducer;
