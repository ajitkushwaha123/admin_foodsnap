"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckSquare,
  Save,
  Trash2,
  Square,
  X,
  Sparkles,
  Heart,
  Loader2,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const CUISINE_DATA = [
  { title: "Italian", key: "italian" },
  { title: "Chinese", key: "chinese" },
  { title: "Indian", key: "indian" },
  { title: "Mexican", key: "mexican" },
  { title: "Thai", key: "thai" },
  { title: "Japanese", key: "japanese" },
];

const SOURCE_DATA = [
  { title: "User Upload", key: "user-upload" },
  { title: "Restaurant", key: "restaurant" },
  { title: "Zomato", key: "zomato" },
];

const CATEGORY_DATA = [
  { title: "Main Course", key: "main-course" },
  { title: "Dessert", key: "dessert" },
  { title: "Appetizer", key: "appetizer" },
  { title: "Salad", key: "salad" },
  { title: "Soup", key: "soup" },
  { title: "Other", key: "other" },
];

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  image_url: Yup.string().url("Invalid URL"),
  manual_tags: Yup.array().of(
    Yup.string().trim().min(1, "Tag cannot be empty")
  ),
});

const ImageDisplayCard = ({ data }) => (
  <motion.figure
    whileHover={{ scale: 1.01 }}
    className="relative rounded-lg border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 p-3 shadow-sm hover:shadow-lg transition-all flex flex-col gap-3 cursor-pointer"
  >
    <div className="relative">
      <img
        loading="lazy"
        src={data.image_url}
        alt={data.title || "Preview image"}
        className="aspect-[4/3] object-cover rounded-md border border-zinc-200 dark:border-white/10"
      />
    </div>
  </motion.figure>
);

const BasicInfoSection = ({ formik }) => (
  <section className="bg-white dark:bg-zinc-900 rounded-md p-3 space-y-4 shadow-sm border border-zinc-200 dark:border-white/10">
    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
      📋 Basic Info
    </h4>

    <div className="space-y-2">
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Enter image title..."
      />
      {formik.touched.title && formik.errors.title && (
        <p className="text-xs text-red-500">{formik.errors.title}</p>
      )}
    </div>

    <div className="space-y-2">
      <Label htmlFor="description">Description</Label>
      <Textarea
        id="description"
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        rows={4}
        placeholder="Write a short description..."
      />
    </div>
  </section>
);

const TagSection = ({ formik }) => {
  const [tagInput, setTagInput] = useState("");

  const handleTagKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim() !== "") {
      e.preventDefault();
      if (!formik.values.manual_tags.includes(tagInput.trim())) {
        formik.setFieldValue("manual_tags", [
          ...formik.values.manual_tags,
          tagInput.trim(),
        ]);
      }
      setTagInput("");
    }
  };

  const removeTag = (i) => {
    formik.setFieldValue(
      "manual_tags",
      formik.values.manual_tags.filter((_, idx) => idx !== i)
    );
  };

  return (
    <>
      <section className="bg-white dark:bg-zinc-900 rounded-md p-3 space-y-3 shadow-sm border border-zinc-200 dark:border-white/10">
        <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">
          🏷️ Manual Tags
        </h4>
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {formik.values.manual_tags?.map((tag, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-1 px-3 py-1 rounded-md border border-zinc-400 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800 text-sm"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => removeTag(i)}
                  className="ml-1 text-zinc-600 hover:text-red-500"
                >
                  <X size={14} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Input
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
          placeholder="Type a tag and press Enter or ,"
        />
      </section>
      <section className="bg-white dark:bg-zinc-900 rounded-md p-3 space-y-3 shadow-sm border border-zinc-200 dark:border-white/10">
        <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">
          🏷️ Auto Tags
        </h4>
        <div className="flex flex-wrap gap-2">
          {formik.values.auto_tags?.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-md border border-zinc-400 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800 text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>
    </>
  );
};

const AdditionalInfoSection = ({ formik }) => (
  <section className="bg-white dark:bg-zinc-900 rounded-md p-3 space-y-4 shadow-sm border border-zinc-200 dark:border-white/10">
    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
      📊 Additional Info
    </h4>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label className="my-2">Cuisine</Label>
        <Select
          value={formik.values.cuisine}
          onValueChange={(val) => formik.setFieldValue("cuisine", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select cuisine" />
          </SelectTrigger>
          <SelectContent>
            {CUISINE_DATA.map((cuisine, idx) => (
              <SelectItem key={idx} value={cuisine.key}>
                {cuisine.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="my-2">Source</Label>
        <Select
          value={formik.values.source}
          onValueChange={(val) => formik.setFieldValue("source", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select source" />
          </SelectTrigger>
          <SelectContent>
            {SOURCE_DATA.map((source, idx) => (
              <SelectItem key={idx} value={source.key}>
                {source.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="my-2">Category</Label>
        <Select
          value={formik.values.category}
          onValueChange={(val) => formik.setFieldValue("category", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORY_DATA.map((cat, idx) => (
              <SelectItem key={idx} value={cat.key}>
                {cat.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="my-2">Sub Category</Label>
        <Select
          value={formik.values.sub_category}
          onValueChange={(val) => formik.setFieldValue("sub_category", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select sub category" />
          </SelectTrigger>
          <SelectContent>{/* Subcategory data would go here */}</SelectContent>
        </Select>
      </div>

      <div>
        <Label className="my-2">Food Type</Label>
        <Select
          value={formik.values.food_type}
          onValueChange={(val) => formik.setFieldValue("food_type", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select food type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="veg">Veg</SelectItem>
            <SelectItem value="non-veg">Non-Veg</SelectItem>
            <SelectItem value="vegan">Vegan</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </section>
);

const StatusAndMetricsSection = ({ formik }) => (
  <section className="bg-white dark:bg-zinc-900 rounded-md p-6 space-y-6 shadow-sm border border-zinc-200 dark:border-white/10">
    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center">
      <Sparkles className="h-5 w-5 mr-2 text-yellow-500" /> Status & Metrics
    </h4>
    <div className="grid grid-cols-2 gap-6">
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg shadow-sm">
        <Label
          htmlFor="approved-status"
          className="text-sm font-medium text-gray-600 dark:text-gray-400"
        >
          Approved
        </Label>
        <button
          type="button"
          onClick={() =>
            formik.setFieldValue("approved", !formik.values.approved)
          }
          className="flex items-center space-x-2 p-2 rounded-md transition-colors duration-200"
        >
          {formik.values.approved ? (
            <CheckSquare className="h-6 w-6 text-green-500" />
          ) : (
            <Square className="h-6 w-6 text-gray-400" />
          )}
        </button>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg shadow-sm">
        <Label
          htmlFor="system-approved-status"
          className="text-sm font-medium text-gray-600 dark:text-gray-400"
        >
          System Approved
        </Label>
        <button
          type="button"
          onClick={() =>
            formik.setFieldValue(
              "system_approved",
              !formik.values.system_approved
            )
          }
          className="flex items-center space-x-2 p-2 rounded-md transition-colors duration-200"
        >
          {formik.values.system_approved ? (
            <CheckSquare className="h-6 w-6 text-green-500" />
          ) : (
            <Square className="h-6 w-6 text-gray-400" />
          )}
        </button>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg shadow-sm">
        <Label
          htmlFor="premium-status"
          className="text-sm font-medium text-gray-600 dark:text-gray-400"
        >
          Premium
        </Label>
        <button
          type="button"
          onClick={() =>
            formik.setFieldValue("premium", !formik.values.premium)
          }
          className="flex items-center space-x-2 p-2 rounded-md transition-colors duration-200"
        >
          {formik.values.premium ? (
            <CheckSquare className="h-6 w-6 text-yellow-500" />
          ) : (
            <Square className="h-6 w-6 text-gray-400" />
          )}
        </button>
      </div>
    </div>

    <hr className="border-t border-zinc-200 dark:border-white/10" />

    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center">
      <Heart className="h-5 w-5 mr-2 text-pink-500" /> Engagement
    </h4>
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-2 p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg shadow-sm">
        <Label
          htmlFor="quality_score"
          className="text-sm font-medium text-gray-600 dark:text-gray-400"
        >
          Quality Score
        </Label>
        <Input
          id="quality_score"
          type="number"
          name="quality_score"
          value={formik.values.quality_score}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full"
        />
      </div>

      <div className="space-y-2 p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg shadow-sm">
        <Label
          htmlFor="popularity_score"
          className="text-sm font-medium text-gray-600 dark:text-gray-400"
        >
          Popularity Score
        </Label>
        <Input
          id="popularity_score"
          type="number"
          name="popularity_score"
          value={formik.values.popularity_score}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full"
        />
      </div>

      <div className="space-y-2 p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg shadow-sm">
        <Label
          htmlFor="likes"
          className="text-sm font-medium text-gray-600 dark:text-gray-400"
        >
          Likes
        </Label>
        <Input
          id="likes"
          type="number"
          name="likes"
          value={formik.values.likes}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full"
        />
      </div>
    </div>
  </section>
);

const SheetActions = ({ onSave, onDelete, isLoading, isDeleting }) => {
  return (
    <SheetFooter className="border-t w-full border-zinc-200 dark:border-white/10 px-3 py-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm flex flex-col sm:flex-row sm:justify-end gap-2">
      <Button
        type="button"
        variant="destructive"
        onClick={onDelete}
        disabled={isLoading || isDeleting}
        className="w-[50%] h-11 text-sm font-semibold shadow-md rounded-lg"
      >
        {isDeleting ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="mr-2 h-4 w-4" />
        )}
        Delete
      </Button>
      <Button
        type="submit"
        onClick={onSave}
        disabled={isLoading || isDeleting}
        className="w-[50%] h-11 text-sm font-semibold shadow-md rounded-lg"
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Save className="mr-2 h-4 w-4" />
        )}
        Save Changes
      </Button>
    </SheetFooter>
  );
};

export default function ImageEditSheet({ data, onSubmit }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.put(`/api/image/${data._id}`, values);
      // Corrected Sonner syntax
      toast.success("Image updated successfully!", {
        description: `The image data for "${values.title}" has been saved.`,
      });
      console.log("Update Response:", response.data);
      setIsSheetOpen(false);
    } catch (err) {
      console.error("Update Error:", err);
      // Corrected Sonner syntax
      toast.error("Update failed.", {
        description: err.message || "An error occurred while saving.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(`/api/image/${data._id}`);
      // Corrected Sonner syntax
      toast.warning("Image deleted.", {
        description: "The image has been deleted successfully.",
      });
      console.log("Delete Response:", response.data);
      setIsSheetOpen(false);
      if (onSubmit) {
        onSubmit({ action: "delete", id: data._id });
      }
    } catch (err) {
      console.error("Delete Error:", err);
      toast.error("Deletion failed.", {
        description: err.message || "An error occurred while deleting.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: data?.title || "",
      description: data?.description || "",
      image_url: data?.image_url || "",
      manual_tags: data?.manual_tags || [],
      auto_tags: data?.auto_tags || [],
      cuisine: data?.cuisine || "",
      source: data?.source || "",
      approved: data?.approved ?? true,
      system_approved: data?.system_approved ?? true,
      premium: data?.premium ?? true,
      quality_score: data?.quality_score ?? 0,
      popularity_score: data?.popularity_score ?? 0,
      likes: data?.likes ?? 0,
      category: data?.category || "",
      sub_category: data?.sub_category || "",
      food_type: data?.food_type || "veg",
      resId: data?.resId || "",
      createdAt: data?.createdAt || "",
      updatedAt: data?.updatedAt || "",
      __v: data?.__v ?? 0,
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      await handleUpdate(values);
    },
    enableReinitialize: true,
  });

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <div>
          <ImageDisplayCard data={data} />
        </div>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[800px] max-w-[90vw] overflow-y-auto flex flex-col bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 shadow-md"
      >
        <SheetHeader className="border-b border-zinc-200 dark:border-white/10 px-3 py-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
          <SheetTitle className="text-md py-2 font-bold text-black dark:text-white flex items-center gap-2">
            ✨ Edit Image Data
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={formik.handleSubmit} className="flex flex-col flex-1">
          <ScrollArea className="flex-1 px-3">
            <div className="space-y-6 py-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-sm p-3 border border-zinc-200 dark:border-white/10 overflow-hidden shadow-sm"
              >
                <img
                  src={formik.values.image_url}
                  alt={formik.values.title || "Preview image"}
                  className="w-full rounded-sm h-48 object-cover"
                />
              </motion.div>
              <BasicInfoSection formik={formik} />
              <TagSection formik={formik} />
              <AdditionalInfoSection formik={formik} />
              <StatusAndMetricsSection formik={formik} />
            </div>
          </ScrollArea>

          <SheetActions
            onSave={formik.handleSubmit}
            onDelete={handleDelete}
            isLoading={isLoading}
            isDeleting={isDeleting}
          />
        </form>
      </SheetContent>
    </Sheet>
  );
}
