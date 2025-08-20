import { RESPONSE_CODES } from "@/constants/response";
import dbConnect from "@/lib/dbConnect";
import Event from "@/models/Event";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const typeKey = searchParams.get("typeKey");
    const userId = searchParams.get("userId");
    const kind = searchParams.get("kind");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const limit = Math.min(
      parseInt(searchParams.get("limit") || "50", 10),
      200
    );

    const q = {};
    if (typeKey) q.typeKey = typeKey;
    if (userId) q.userId = userId;
    if (kind) q.kind = kind;
    if (from || to) q.occurredAt = {};
    if (from) q.occurredAt.$gte = new Date(from);
    if (to) q.occurredAt.$lte = new Date(to);

    const data = await Event.find(q)
      .sort({ occurredAt: -1 })
      .limit(limit)
      .lean();

    console.log("Fetched events:", data);

    return NextResponse.json(
      {
        data,
        message: RESPONSE_CODES.FETCHED_SUCCESS.message,
      },
      { status: RESPONSE_CODES.FETCHED_SUCCESS.status }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: RESPONSE_CODES.INTERNAL_SERVER_ERROR.message,
      },
      {
        status: RESPONSE_CODES.INTERNAL_SERVER_ERROR.status,
      }
    );
  }
};
