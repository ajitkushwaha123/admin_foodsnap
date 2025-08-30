"use client";
import { useSelector, useDispatch } from "react-redux";
import {  fetchImages } from "../slice/imageSlice";

export const useImage = () => {
  const dispatch = useDispatch();
  const { images, loading, error } = useSelector(
    (state) => state.image
  );

  const getImages = (filters) => dispatch(fetchImages(filters)).unwrap();
  const clearImageError = () => dispatch(clearError()).unwrap();
  const resetImages = () => dispatch(resetImages()).unwrap();

  return {
    images,
    loading,
    error,
    getImages,
    clearImageError,
    resetImages,
  };
};
