import dbConnect from "@/lib/dbConnect";
import Image from "@/models/Image";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  try {
    await dbConnect();

    const { id } = await params;
    const body = await req.json();

    const updatedImage = await Image.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedImage) {
      return NextResponse.json(
        {
          message: "Image not found",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Image updated successfully",
        data: updatedImage,
        success: true,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("PUT request error:", err);

    if (err.name === "ValidationError") {
      return NextResponse.json(
        {
          message: err.message,
          success: false,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Internal Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
};
