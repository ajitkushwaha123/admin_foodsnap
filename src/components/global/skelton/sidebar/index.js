"use client";

import React from "react";
import { motion } from "framer-motion";

const SidebarSkeleton = () => {
  return (
    <div className="p-4 space-y-4">
      {/* Top section */}
      <div className="space-y-3">
        <div className="h-10 w-10 rounded-xl bg-gray-200 animate-pulse" />
        <div className="h-3 w-3/4 rounded-lg bg-gray-200 animate-pulse" />
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-300 my-2" />

      {/* Sidebar list items */}
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="flex items-center space-x-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="h-6 w-6 rounded-md bg-gray-200 animate-pulse" />
            <div className="h-3 w-2/3 rounded-lg bg-gray-200 animate-pulse" />
          </motion.div>
        ))}
      </div>

      {/* Bottom section (profile/settings) */}
      <div className="absolute bottom-4 w-[85%] space-y-3">
        <div className="h-3 w-1/2 rounded-lg bg-gray-200 animate-pulse" />
        <div className="h-3 w-1/3 rounded-lg bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
};

export default SidebarSkeleton;
