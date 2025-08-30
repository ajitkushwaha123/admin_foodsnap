"use client";

import React, { useState } from "react";
import ImageEditSheet from "../ImageEditSheet";

export default function ImageCard({ image, onUpdate }) {
  const [formData, setFormData] = useState(image);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (updatedData) => {
    setFormData(updatedData);
    if (onUpdate) onUpdate(updatedData);
  };

  return (
    <div className="rounded-sm overflow-hidden shadow-md border bg-card hover:shadow-lg transition cursor-pointer">
      <ImageEditSheet
        data={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
