"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useImage } from "@/store/hooks/useImage";
import { TagInput } from "./tags";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Heart } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { CategorySearch } from "./category-search";

export const ImageSheet = ({ image, children, categories }) => {
  const status = image?.approved ? "Approved" : "Unapproved";
  const [formData, setFormData] = useState(image || {});
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { updateImage } = useImage();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setErrorMsg("");
      await updateImage(image._id, formData);
    } catch (err) {
      setErrorMsg("Failed to update image. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="overflow-y-auto px-4">
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold">
            Edit Image Data
          </SheetTitle>
        </SheetHeader>

        {/* Image Preview */}
        <Card className="rounded-md p-3 shadow-sm transition relative mt-4">
          <div className="relative h-48">
            <img
              src={image?.image_url}
              alt={image?.title || "Image"}
              className="w-full h-[100%] object-cover rounded"
            />
            <div className="absolute top-2 left-2">
              <Badge
                className={
                  formData?.approved
                    ? "bg-green-600 text-white"
                    : "bg-red-500 text-white"
                }
              >
                {formData?.approved ? "Approved" : "Unapproved"}
              </Badge>
            </div>
          </div>
        </Card>

        <Separator className="my-4" />

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-md border border-neutral-800 bg-neutral-900 text-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-white hover:text-black transition-colors">
            <Download size={16} />
            <span>{image?.downloads || 0} Downloads</span>
          </button>

          <button className="flex items-center gap-2 rounded-md border border-neutral-800 bg-neutral-900 text-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-white hover:text-black transition-colors">
            <Heart size={16} className="text-red-400" />
            <span>{image?.likes || 0} Likes</span>
          </button>
        </div>

        <Separator className="my-4" />

        <div className="flex items-center space-x-2">
          <Checkbox
            id="approved"
            checked={formData?.approved || false}
            onCheckedChange={(val) => handleChange("approved", val)}
          />
          <Label
            htmlFor="approved"
            className="text-sm font-medium leading-none cursor-pointer"
          >
            Mark as Approved
          </Label>
        </div>

        <div className="space-y-5 mt-5">
          <div className="grid gap-2">
            <Label>Title</Label>
            <Input
              value={formData.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea
              rows={3}
              value={formData.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Food Type</Label>
              <Select
                value={formData.food_type || ""}
                onValueChange={(val) => handleChange("food_type", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select food type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="veg">Veg</SelectItem>
                  <SelectItem value="non_veg">Non-Veg</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Premium</Label>
              <Select
                value={formData?.premium}
                onValueChange={(val) => handleChange("premium", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Premium" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">True</SelectItem>
                  <SelectItem value="false">False</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Quality Score</Label>
              <Input
                value={formData?.quality_score || 0}
                onChange={(e) => handleChange("quality_score", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Popularity Score</Label>
              <Input
                value={formData?.popularity_score || 0}
                onChange={(e) =>
                  handleChange("popularity_score", e.target.value)
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="grid gap-2">
              <Label>Category</Label>
              <CategorySearch
                category={formData?.category}
                onChange={(val) => handleChange("category", val)}
              />
            </div>

            <div className="grid gap-2">
              <Label>Sub Category</Label>
              <Input
                value={formData.sub_category || ""}
                onChange={(e) => handleChange("sub_category", e.target.value)}
              />
            </div>
          </div>

          {/* Tags */}
          <div className="grid gap-2">
            <Label>Manual Tags</Label>
            <TagInput
              tags={formData?.manual_tags || []}
              setTags={(newTags) => handleChange("manual_tags", newTags)}
            />
          </div>

          <div className="grid gap-2">
            <Label>Auto Tags (comma separated)</Label>
            <TagInput
              tags={formData?.auto_tags || []}
              setTags={(newTags) => handleChange("auto_tags", newTags)}
            />
          </div>
        </div>

        {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}

        <Separator className="my-4" />

        <SheetFooter className="flex justify-end gap-2 sticky bottom-0 bg-white dark:bg-neutral-950 py-3 border-t">
          <SheetClose asChild>
            <Button variant="outline" disabled={saving}>
              Cancel
            </Button>
          </SheetClose>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
