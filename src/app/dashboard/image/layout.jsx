"use client";

import { FilterHeader } from "@/components/global/dashboard-header/Image-header";
import ImageCard from "@/components/global/image/image-card";
import { useImage } from "@/store/hooks/useImage";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchCuisine, fetchCategory } from "@/helper/api-helper";

export default function Layout() {
  const [activeFilters, setActiveFilters] = useState({});
  const [cuisines, setCuisines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterLoading, setFilterLoading] = useState(true);
  const [filterError, setFilterError] = useState(null);

  const { images, loading, error, getImages } = useImage();

  const handleFilterChange = (groupId, value) => {
    setActiveFilters((prev) => {
      if (groupId === "tags") {
        const currentTags = prev[groupId] || [];
        return {
          ...prev,
          [groupId]: currentTags.includes(value)
            ? currentTags.filter((v) => v !== value)
            : [...currentTags, value],
        };
      }
      if (prev[groupId] === value) {
        const newFilters = { ...prev };
        delete newFilters[groupId];
        return newFilters;
      }
      return { ...prev, [groupId]: value };
    });
  };

  const handleClearAll = () => setActiveFilters({});

  useEffect(() => {
    const fetchFilters = async () => {
      setFilterLoading(true);
      setFilterError(null);
      try {
        const [cuisineRes, categoryRes] = await Promise.all([
          fetchCuisine(),
          fetchCategory(),
        ]);
        setCuisines(cuisineRes || []);
        setCategories(categoryRes || []);
      } catch (err) {
        setFilterError("Failed to load filters");
        console.error(err);
      } finally {
        setFilterLoading(false);
      }
    };
    fetchFilters();
  }, []);

  useEffect(() => {
    getImages(activeFilters);
  }, [activeFilters]);

  const dynamicFilters = [
    {
      id: "cuisine",
      label: "Cuisine",
      options: cuisines,
    },
    {
      id: "category",
      label: "Category",
      options: categories,
    },
    {
      id: "food_type",
      label: "Food Type",
      options: [
        { label: "Vegetarian", value: "veg" },
        { label: "Non-Vegetarian", value: "non-veg" },
        { label: "Vegan", value: "vegan" },
      ],
    },
    {
      id: "source",
      label: "Source",
      options: [
        { label: "Zomato", value: "zomato" },
        { label: "User Upload", value: "user" },
        { label: "System", value: "system" },
      ],
    },
    {
      id: "tags",
      label: "Tags",
      options: [
        { label: "Paneer", value: "paneer" },
        { label: "Roll", value: "roll" },
        { label: "Street Food", value: "street_food" },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-md border shadow-sm bg-card px-5 py-3">
        {filterLoading ? (
          <div className="flex space-x-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-32 rounded-md" />
            ))}
          </div>
        ) : filterError ? (
          <div className="text-destructive text-sm">{filterError}</div>
        ) : (
          <FilterHeader
            title="Image Library"
            filters={dynamicFilters}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAll}
            onSearch={(val) => console.log("Search:", val)}
          />
        )}
      </div>

      <div className="px-5 pb-5">
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-md" />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="text-center text-destructive py-10">
            Failed to load images
          </div>
        )}

        {!loading && !error && images.length === 0 && (
          <div className="text-center text-muted-foreground py-10">
            No images found. Try adjusting filters.
          </div>
        )}

        {!loading && images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {images.map((img) => (
              <ImageCard key={img._id} image={img} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
