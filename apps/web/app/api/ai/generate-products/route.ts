import { NextRequest, NextResponse } from "next/server";
import { generateProducts } from "@repo/ai-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { category, count, priceRange, style } = body;

    if (!category) {
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 }
      );
    }

    // Generate products
    const products = await generateProducts({
      category,
      count,
      priceRange,
      style,
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Product generation error:", error);

    return NextResponse.json(
      { error: "Failed to generate products" },
      { status: 500 }
    );
  }
}
