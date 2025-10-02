import Category from "@/models/Category";
import { NextResponse } from "next/server";

// GET already exists
export const GET = async () => {
  try {
    const categories = await Category.find({}).lean();

    return NextResponse.json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Internal Server Error",
        error: err.message,
      },
      { status: 500 }
    );
  }
};

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { name, parentId = null } = body;

    if (!name || name.trim() === "") {
      return NextResponse.json(
        {
          success: false,
          message: "Category name is required",
        },
        { status: 400 }
      );
    }

    const slug = name.trim().toLowerCase().replace(/\s+/g, "-");

    const existing = await Category.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "Category already exists",
        },
        { status: 409 }
      );
    }

    const newCategory = await Category.create({ name, slug, parentId });

    console.log("New Category Created:", newCategory);

    return NextResponse.json({
      success: true,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Internal Server Error",
        error: err.message,
      },
      { status: 500 }
    );
  }
};
