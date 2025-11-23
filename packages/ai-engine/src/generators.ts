import { complete } from "./client";
import {
  getStoreGenerationPrompt,
  getProductGenerationPrompt,
  getDescriptionOptimizationPrompt,
  getSEOOptimizationPrompt,
  getAnalyticsInsightsPrompt,
  SYSTEM_PROMPT,
} from "./prompts";
import type { CreateStorePrompt } from "@repo/types";

// ============================================================================
// STORE GENERATION
// ============================================================================

export interface GeneratedStore {
  name: string;
  description: string;
  settings: {
    currency: string;
    timezone: string;
    taxRate: number;
    shippingEnabled: boolean;
    inventoryTracking: boolean;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontFamily: string;
    headingFont: string;
  };
  categories: Array<{
    name: string;
    slug: string;
    description: string;
    parentId?: string;
  }>;
  sampleProducts: Array<{
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    price: string;
    compareAtPrice?: string;
    category: string;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string[];
    tags: string[];
  }>;
  pages: {
    homepage: {
      hero: { title: string; subtitle: string; cta: string };
      sections: Array<{ type: string; content: any }>;
    };
    about: { title: string; content: string };
  };
}

export async function generateStore(
  input: CreateStorePrompt
): Promise<GeneratedStore> {
  const prompt = getStoreGenerationPrompt(input);

  const response = await complete(
    [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `${prompt}\n\nIMPORTANT: Return ONLY valid JSON, no markdown formatting or explanation.`,
      },
    ],
    { temperature: 0.8, maxTokens: 4096 }
  );

  try {
    const cleaned = response.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    console.error("Response:", response);
    throw new Error("Failed to generate store configuration");
  }
}

// ============================================================================
// PRODUCT GENERATION
// ============================================================================

export interface GeneratedProduct {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: string;
  compareAtPrice?: string;
  costPerItem?: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  tags: string[];
  variants?: Array<{
    name: string;
    options: Record<string, string>;
    price: string;
  }>;
}

export async function generateProducts(input: {
  category: string;
  count?: number;
  priceRange?: { min: number; max: number };
  style?: string;
}): Promise<GeneratedProduct[]> {
  const prompt = getProductGenerationPrompt(input);

  const response = await complete(
    [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `${prompt}\n\nIMPORTANT: Return ONLY a valid JSON array, no markdown formatting or explanation.`,
      },
    ],
    { temperature: 0.8, maxTokens: 4096 }
  );

  try {
    const cleaned = response.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    throw new Error("Failed to generate products");
  }
}

// ============================================================================
// DESCRIPTION OPTIMIZATION
// ============================================================================

export async function optimizeDescription(
  productName: string,
  currentDescription?: string
): Promise<string> {
  const prompt = getDescriptionOptimizationPrompt(productName, currentDescription);

  const response = await complete(
    [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: prompt },
    ],
    { temperature: 0.7, maxTokens: 1024 }
  );

  return response.trim();
}

// ============================================================================
// SEO OPTIMIZATION
// ============================================================================

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  slug: string;
  h1: string;
}

export async function generateSEOMetadata(content: {
  type: "product" | "category" | "page";
  name: string;
  description?: string;
  keywords?: string[];
}): Promise<SEOMetadata> {
  const prompt = getSEOOptimizationPrompt(content);

  const response = await complete(
    [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `${prompt}\n\nIMPORTANT: Return ONLY valid JSON, no markdown formatting or explanation.`,
      },
    ],
    { temperature: 0.7, maxTokens: 512 }
  );

  try {
    const cleaned = response.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    throw new Error("Failed to generate SEO metadata");
  }
}

// ============================================================================
// ANALYTICS INSIGHTS
// ============================================================================

export interface AnalyticsInsights {
  assessment: string;
  strengths: string[];
  improvements: string[];
  recommendations: Array<{
    title: string;
    description: string;
    impact: string;
    priority: "high" | "medium" | "low";
  }>;
  growthOpportunities: string[];
}

export async function generateAnalyticsInsights(data: {
  revenue: number;
  orders: number;
  conversionRate: number;
  averageOrderValue: number;
  topProducts?: Array<{ name: string; revenue: number }>;
}): Promise<AnalyticsInsights> {
  const prompt = getAnalyticsInsightsPrompt(data);

  const response = await complete(
    [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `${prompt}\n\nIMPORTANT: Return as structured JSON with sections: assessment, strengths (array), improvements (array), recommendations (array of objects with title, description, impact, priority), growthOpportunities (array).`,
      },
    ],
    { temperature: 0.7, maxTokens: 2048 }
  );

  try {
    const cleaned = response.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    throw new Error("Failed to generate analytics insights");
  }
}
