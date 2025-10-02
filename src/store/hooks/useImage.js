import { useSelector, useDispatch } from "react-redux";
import {
  createCategory,
  fetchCategories,
  fetchImages,
  updateImageById,
} from "../slices/imageSlice";

export const useImage = () => {
  const dispatch = useDispatch();
  const { images, loading, error, categories } = useSelector(
    (state) => state.images
  );

  const getImages = async () => {
    try {
      await dispatch(fetchImages()).unwrap();
    } catch (err) {
      console.error("Failed to fetch images:", err);
    }
  };

  const getCategories = async () => {
    try {
      await dispatch(fetchCategories()).unwrap();
    } catch (err) {
      console.error("Failed to fetch Categories : ", err);
    }
  };

  const updateImage = async (imageId, updateData) => {
    try {
      await dispatch(updateImageById({ imageId, updateData })).unwrap();
    } catch (err) {
      console.error("Failed to update image:", err);
    }
  };

  const addCategory = async (categoryData) => {
    try {
      await dispatch(createCategory(categoryData)).unwrap();
    } catch (err) {
      console.error("Failed to add category:", err);
    }
  };

  return {
    images,
    loading,
    error,
    getImages,
    updateImage,
    getCategories,
    categories,
    addCategory,
  };
};
