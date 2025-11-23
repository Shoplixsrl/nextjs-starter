import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { SYSTEM_PROMPT } from "@repo/ai-engine/prompts";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: anthropic("claude-3-5-sonnet-20241022"),
    system: SYSTEM_PROMPT,
    messages,
    maxTokens: 4096,
    temperature: 0.7,
  });

  return result.toDataStreamResponse();
}
