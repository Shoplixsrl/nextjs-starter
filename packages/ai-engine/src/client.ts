import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";

// ============================================================================
// AI CLIENT INITIALIZATION
// ============================================================================

let anthropicClient: Anthropic | null = null;
let openaiClient: OpenAI | null = null;

export function getAnthropicClient(): Anthropic {
  if (!anthropicClient) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error("ANTHROPIC_API_KEY environment variable is not set");
    }
    anthropicClient = new Anthropic({ apiKey });
  }
  return anthropicClient;
}

export function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY environment variable is not set");
    }
    openaiClient = new OpenAI({ apiKey });
  }
  return openaiClient;
}

// ============================================================================
// AI PROVIDER SELECTION
// ============================================================================

export type AIProvider = "anthropic" | "openai";

export function getDefaultProvider(): AIProvider {
  return process.env.AI_PROVIDER === "openai" ? "openai" : "anthropic";
}

// ============================================================================
// STREAMING CHAT
// ============================================================================

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface StreamOptions {
  provider?: AIProvider;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export async function* streamChat(
  messages: ChatMessage[],
  options: StreamOptions = {}
): AsyncGenerator<string> {
  const provider = options.provider || getDefaultProvider();

  if (provider === "anthropic") {
    yield* streamChatAnthropic(messages, options);
  } else {
    yield* streamChatOpenAI(messages, options);
  }
}

async function* streamChatAnthropic(
  messages: ChatMessage[],
  options: StreamOptions
): AsyncGenerator<string> {
  const client = getAnthropicClient();
  const model = options.model || "claude-3-5-sonnet-20241022";

  // Extract system message if present
  const systemMessage = messages.find((m) => m.role === "system");
  const conversationMessages = messages
    .filter((m) => m.role !== "system")
    .map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

  const stream = await client.messages.stream({
    model,
    max_tokens: options.maxTokens || 4096,
    temperature: options.temperature || 0.7,
    system: systemMessage?.content,
    messages: conversationMessages,
  });

  for await (const chunk of stream) {
    if (
      chunk.type === "content_block_delta" &&
      chunk.delta.type === "text_delta"
    ) {
      yield chunk.delta.text;
    }
  }
}

async function* streamChatOpenAI(
  messages: ChatMessage[],
  options: StreamOptions
): AsyncGenerator<string> {
  const client = getOpenAIClient();
  const model = options.model || "gpt-4-turbo-preview";

  const stream = await client.chat.completions.create({
    model,
    messages: messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
    temperature: options.temperature || 0.7,
    max_tokens: options.maxTokens || 4096,
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      yield content;
    }
  }
}

// ============================================================================
// NON-STREAMING COMPLETION
// ============================================================================

export async function complete(
  messages: ChatMessage[],
  options: StreamOptions = {}
): Promise<string> {
  const provider = options.provider || getDefaultProvider();

  if (provider === "anthropic") {
    return completeAnthropic(messages, options);
  } else {
    return completeOpenAI(messages, options);
  }
}

async function completeAnthropic(
  messages: ChatMessage[],
  options: StreamOptions
): Promise<string> {
  const client = getAnthropicClient();
  const model = options.model || "claude-3-5-sonnet-20241022";

  const systemMessage = messages.find((m) => m.role === "system");
  const conversationMessages = messages
    .filter((m) => m.role !== "system")
    .map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

  const response = await client.messages.create({
    model,
    max_tokens: options.maxTokens || 4096,
    temperature: options.temperature || 0.7,
    system: systemMessage?.content,
    messages: conversationMessages,
  });

  const content = response.content[0];
  return content.type === "text" ? content.text : "";
}

async function completeOpenAI(
  messages: ChatMessage[],
  options: StreamOptions
): Promise<string> {
  const client = getOpenAIClient();
  const model = options.model || "gpt-4-turbo-preview";

  const response = await client.chat.completions.create({
    model,
    messages: messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
    temperature: options.temperature || 0.7,
    max_tokens: options.maxTokens || 4096,
  });

  return response.choices[0]?.message?.content || "";
}
