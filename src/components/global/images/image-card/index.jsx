"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageSheet } from "../image-sheet";

export const ImageCard = ({ image, categories }) => {
  const status = image?.approved ? "Approved" : "Unapproved";

  return (
    <ImageSheet image={image} categories={categories}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2 }}
        className="w-full cursor-pointer"
      >
        <Card className="overflow-hidden rounded-md p-3 shadow-sm hover:shadow-md transition relative">
          <div className="relative">
            <img
              src={image?.image_url}
              alt={image?.title || "Image"}
              className="w-full h-48 object-cover rounded"
            />

            <div className="absolute top-2 left-2">
              <Badge
                className={
                  image?.approved
                    ? "bg-green-600 text-white"
                    : "bg-red-500 text-white"
                }
              >
                {status}
              </Badge>
            </div>
          </div>
        </Card>
      </motion.div>
    </ImageSheet>
  );
};
