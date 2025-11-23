import { NextRequest, NextResponse } from "next/server";
import { generateStore } from "@repo/ai-engine";
import { createStorePromptSchema } from "@repo/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const validatedInput = createStorePromptSchema.parse(body);

    // Generate store configuration
    const storeConfig = await generateStore(validatedInput);

    return NextResponse.json(storeConfig);
  } catch (error) {
    console.error("Store generation error:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate store" },
      { status: 500 }
    );
  }
}
