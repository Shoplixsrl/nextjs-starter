import { NextRequest, NextResponse } from "next/server";
import { generateMenuWithAI } from "@/lib/ai/anthropic";
import { generateMultipleFoodImages } from "@/lib/ai/fal";

export async function POST(request: NextRequest) {
  try {
    const { prompt, generateImages = false } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required and must be a string" },
        { status: 400 }
      );
    }

    // Generate menu structure with AI
    const menuData = await generateMenuWithAI(prompt);

    // Optionally generate images for menu items
    if (generateImages) {
      const imagePrompts = menuData.categories.flatMap((category: any) =>
        category.items
          .filter((item: any) => item.imagePrompt)
          .map((item: any) => ({
            prompt: item.imagePrompt,
            dishName: item.name,
            style: "professional" as const,
          }))
      );

      if (imagePrompts.length > 0) {
        const generatedImages = await generateMultipleFoodImages(imagePrompts);

        // Assign generated image URLs to menu items
        menuData.categories.forEach((category: any) => {
          category.items.forEach((item: any) => {
            const generatedImage = generatedImages.find(
              (img) => img.dishName === item.name
            );
            if (generatedImage && generatedImage.imageUrl) {
              item.image = generatedImage.imageUrl;
              item.imageGeneratedByAi = true;
            }
          });
        });
      }
    }

    return NextResponse.json({
      success: true,
      menu: menuData,
    });
  } catch (error) {
    console.error("Menu generation error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate menu",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
