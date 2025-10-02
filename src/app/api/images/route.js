import dbConnect from "@/lib/dbConnect";
import Image from "@/models/Image";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnect();

    const images = await Image.find({});

    return NextResponse.json(
      {
        message: "Fetched all images successfully",
        success: true,
        data: images,
      },
      { data: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Failed to fetch all images",
        success: false,
        err: err.message,
      },
      { status: 500 }
    );
  }
};
