import * as fal from "@fal-ai/client";

if (!process.env.FAL_KEY) {
  throw new Error("FAL_KEY environment variable is required");
}

fal.config({
  credentials: process.env.FAL_KEY,
});

export interface FoodImageGenerationParams {
  prompt: string;
  dishName: string;
  style?: "professional" | "rustic" | "modern" | "artistic";
}

export async function generateFoodImage({
  prompt,
  dishName,
  style = "professional"
}: FoodImageGenerationParams) {
  const stylePrompts = {
    professional: "professional food photography, studio lighting, high-end restaurant presentation, shallow depth of field, elegant plating",
    rustic: "rustic food photography, natural lighting, artisanal presentation, organic feel, warm tones",
    modern: "modern minimalist food photography, clean background, geometric plating, contemporary styling",
    artistic: "artistic food photography, creative composition, dramatic lighting, avant-garde presentation"
  };

  const fullPrompt = `${prompt}, ${dishName}, ${stylePrompts[style]}, 8k resolution, appetizing, ultra detailed, mouth-watering, professional color grading`;

  try {
    const result = await fal.subscribe("fal-ai/flux-pro/v1.1", {
      input: {
        prompt: fullPrompt,
        num_images: 1,
        image_size: "landscape_16_9",
        num_inference_steps: 50,
        guidance_scale: 7.5,
        enable_safety_checker: true,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          console.log("Generating image:", update.logs?.map(l => l.message).join("\n"));
        }
      },
    });

    if (!result.data.images || result.data.images.length === 0) {
      throw new Error("No images generated");
    }

    return {
      url: result.data.images[0].url,
      width: result.data.images[0].width,
      height: result.data.images[0].height,
      contentType: result.data.images[0].content_type,
    };
  } catch (error) {
    console.error("Fal.ai image generation error:", error);
    throw new Error(`Failed to generate image: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function generateMultipleFoodImages(
  items: FoodImageGenerationParams[]
): Promise<Array<{ dishName: string; imageUrl: string }>> {
  const results = await Promise.allSettled(
    items.map(item => generateFoodImage(item))
  );

  return results.map((result, index) => ({
    dishName: items[index].dishName,
    imageUrl: result.status === "fulfilled" ? result.value.url : "",
  }));
}
