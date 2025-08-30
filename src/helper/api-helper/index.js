import { RESPONSE_CODES } from "@/constants/response";
import axios from "axios";
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

export const fetchCuisine = async () => {
  try {
    const response = await axios.get("/api/image/cuisine");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching cuisines:", error);
    throw error;
  }
};

export const fetchCategory = async () => {
  try {
    const response = await axios.get("/api/image/category");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching cuisines:", error);
    throw error;
  }
};

