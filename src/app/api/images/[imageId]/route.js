import dbConnect from "@/lib/dbConnect";
import Image from "@/models/Image";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  try {
    await dbConnect();
    const { imageId } = await params;

    console.log("Image ID to update:", imageId);
    const image = await Image.findById(imageId);

    if (!image) {
      return NextResponse.json(
        { message: "Image not found", success: false },
        { status: 404 }
      );
    }

    const body = await req.json();
    console.log("Request body:", body);

    const updatedImage = await Image.findByIdAndUpdate(
      imageId,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedImage) {
      return NextResponse.json(
        { message: "Image not found", success: false },
        { status: 404 }
      );
    }

    console.log("Updated Image:", updatedImage);

    return NextResponse.json(
      {
        message: "Image updated successfully",
        success: true,
        data: updatedImage,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        success: false,
        error: err.message,
      },
      { status: 500 }
    );
  }
};

export const GET = async (req, { params }) => {
  try {
    await dbConnect();
    const { imageId } = await params;
    console.log("Fetching image with ID:", imageId);
    const image = await Image.findById(imageId);
    if (!image) {
      return NextResponse.json(
        { message: "Image not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Image fetched successfully", success: true, data: image },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error", success: false, error: err.message },
      { status: 500 }
    );
  }
};
