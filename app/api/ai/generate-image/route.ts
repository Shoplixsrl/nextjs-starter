import { NextRequest, NextResponse } from "next/server";
import { generateFoodImage } from "@/lib/ai/fal";

export async function POST(request: NextRequest) {
  try {
    const { prompt, dishName, style = "professional" } = await request.json();

    if (!prompt || !dishName) {
      return NextResponse.json(
        { error: "Prompt and dishName are required" },
        { status: 400 }
      );
    }

    const image = await generateFoodImage({
      prompt,
      dishName,
      style,
    });

    return NextResponse.json({
      success: true,
      image,
    });
  } catch (error) {
    console.error("Image generation error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate image",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
