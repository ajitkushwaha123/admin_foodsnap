import Image from "@/models/Image";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    console.log("Request received" , req.url);
    const { searchParams } = new URL(req.url);
    const cuisine = searchParams.get("cuisine");

    const filter = {};
    if (cuisine) {
      filter.cuisine = { $regex: new RegExp(cuisine, 'i') };
    }

    const images = await Image.find(filter).limit(50);

    return NextResponse.json({
      cuisine,
      message: "Images retrieved successfully",
      success: true,
      data: images,
    });
  } catch (err) {
    return NextResponse.json({
      message: err.message || "Failed to retrieve images",
      success: false,
    });
  }
};