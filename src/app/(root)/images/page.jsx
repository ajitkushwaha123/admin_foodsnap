"use client";
import { ImageCard } from "@/components/global/images/image-card";
import { useImage } from "@/store/hooks/useImage";
import React, { useEffect } from "react";

const page = () => {
  const { images, loading, error, getImages, categories, getCategories } =
    useImage();

  useEffect(() => {
    getImages();
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {images.map((img) => (
        <ImageCard key={img._id} image={img} categories={categories} />
      ))}
    </div>
  );
};

export default page;
