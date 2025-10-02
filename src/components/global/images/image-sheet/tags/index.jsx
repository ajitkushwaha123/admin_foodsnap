"use client";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";

export const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-2">
      <Input
        placeholder="Type and press Enter..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="flex my-1 flex-wrap gap-2">
        {tags.map((tag, i) => (
          <Badge
            key={i}
            variant="secondary"
            className="flex bg-gray-900 rounded-sm text-white items-center gap-1 px-2 py-1"
          >
            {tag}
            <button
              type="button"
              className="ml-1"
              onClick={() => removeTag(tag)}
            >
              <X size={14} />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};
