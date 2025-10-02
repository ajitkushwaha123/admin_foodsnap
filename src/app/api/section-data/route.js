import dbConnect from "@/lib/dbConnect";
import Image from "@/models/Image";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnect();

    const images_count = await Image.countDocuments();

    console.log(images_count);

    return NextResponse.json(
      {
        message: "Fetched image count successfully",
        success: true,
        data: {
          images_count,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: err.message || "Internal Server Error",
        success: false,
        err: err.message,
      },
      { status: 500 }
    );
  }
};
