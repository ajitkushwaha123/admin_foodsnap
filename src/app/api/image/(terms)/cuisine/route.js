import Image from "@/models/Image";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export const GET = async () => {
  try {
    await dbConnect();
    const uniqueCuisines = await Image.distinct("cuisine");

    const filteredCuisines = uniqueCuisines
      .filter((c) => c && c.trim())
      .sort((a, b) => a.localeCompare(b))
      .map((cuisine) => ({
        label: cuisine,
        value: cuisine.toLowerCase().replace(/\s+/g, "_"),
      }));

    return NextResponse.json({
      message: "Unique cuisines retrieved successfully",
      success: true,
      data: filteredCuisines,
    });
  } catch (err) {
    return NextResponse.json({
      message: err.message || "Failed to retrieve unique cuisines",
      success: false,
    });
  }
};
