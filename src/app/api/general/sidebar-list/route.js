import { RESPONSE_CODES } from "@/constants/response";
import { required_fields } from "@/helper/api-helper";
import dbConnect from "@/lib/dbConnect";
import SidebarItem from "@/models/SidebarItem";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await dbConnect();
    const sidebarItems = await SidebarItem.find().sort({ order: 1 });

    return NextResponse.json(
      {
        message: RESPONSE_CODES.FETCHED_SUCCESS.message,
        data: sidebarItems,
      },
      { status: RESPONSE_CODES.FETCHED_SUCCESS.status }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: err.message || RESPONSE_CODES.INTERNAL_SERVER_ERROR.message,
      },
      { status: RESPONSE_CODES.INTERNAL_SERVER_ERROR.status }
    );
  }
};
