import { RESPONSE_CODES } from "@/constants/response";
import { NextResponse } from "next/server";


export const required_fields = (fields = {}) => {
  for (const [key, value] of Object.entries(fields)) {
    if (!value) {
      const error = RESPONSE_CODES.MISSING_REQUIRED_FIELDS(key);
      return NextResponse.json(
        { message: error.message },
        { status: error.status }
      );
    }
  }
  return null; 
};
