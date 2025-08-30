import Image from "@/models/Image";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export const GET = async () => {
  try {
    await dbConnect();
    const uniqueCategory = await Image.distinct("category");

    const filteredCategory = uniqueCategory
      .filter((c) => c && c.trim())
      .sort((a, b) => a.localeCompare(b))
      .map((category) => ({
        label: category,
        value: category.toLowerCase().replace(/\s+/g, "_"),
      }));

    return NextResponse.json({
      message: "Unique categories retrieved successfully",
      success: true,
      data: filteredCategory,
    });
  } catch (err) {
    return NextResponse.json({
      message: err.message || "Failed to retrieve unique categories",
      success: false,
    });
  }
};
