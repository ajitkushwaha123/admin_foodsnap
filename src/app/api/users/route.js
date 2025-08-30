import User from "@/models/User";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const users = await User.find({}).lean();
    return NextResponse.json({
      message: "User fetched successfully",
      success: true,
      data: users,
    });
  } catch (err) {
    return NextResponse.json({
      message: err.message || "Internal Server Error",
      success: false,
    });
  }
};
