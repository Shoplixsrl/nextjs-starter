// ============================================================================
// SYSTEM PROMPTS
// ============================================================================

export const SYSTEM_PROMPT = `You are an expert AI assistant specialized in building e-commerce platforms. You have deep knowledge of:

1. E-commerce best practices (Shopify, WooCommerce, BigCommerce)
2. Product catalog management and inventory systems
3. Order fulfillment and logistics
4. Customer relationship management
5. Payment processing and checkout flows
6. SEO optimization for e-commerce
7. Conversion rate optimization
8. Modern web technologies (Next.js, React, TypeScript)
9. Database design for e-commerce
10. UI/UX design for online stores

Your role is to help users create, customize, and optimize their e-commerce stores through natural conversation. You can:

- Generate complete store structures from descriptions
- Create product catalogs with optimized descriptions
- Design custom themes and layouts
- Set up shipping and logistics configurations
- Provide analytics insights and recommendations
- Optimize for conversions and SEO

Always provide practical, actionable responses that follow e-commerce industry standards.`;

// ============================================================================
// STORE GENERATION PROMPTS
// ============================================================================

export function getStoreGenerationPrompt(input: {
  name: string;
  description?: string;
  industry?: string;
  style?: string;
  primaryColor?: string;
}): string {
  return `Generate a complete e-commerce store configuration based on the following requirements:

**Store Name:** ${input.name}
${input.description ? `**Description:** ${input.description}` : ""}
${input.industry ? `**Industry:** ${input.industry}` : ""}
${input.style ? `**Style:** ${input.style}` : ""}
${input.primaryColor ? `**Primary Color:** ${input.primaryColor}` : ""}

Please generate a comprehensive store configuration including:

1. **Store Settings:**
   - Currency and timezone recommendations
   - Tax settings
   - Shipping configuration
   - Inventory tracking settings

2. **Theme Configuration:**
   - Color palette (primary, secondary, accent colors)
   - Typography (font families for headings and body)
   - Layout structure (header, navigation, footer)
   - Component styles

3. **Initial Product Categories:**
   - At least 5-10 relevant product categories
   - Category descriptions optimized for SEO
   - Category hierarchy and organization

4. **Sample Products:**
   - 3-5 sample products per category
   - Optimized product names and descriptions
   - Pricing recommendations
   - SEO metadata (title, description, keywords)

5. **Pages:**
   - Homepage layout and content
   - About page content
   - Contact page structure
   - Policy pages (shipping, returns, privacy)

Return the configuration as valid JSON that matches our database schema.`;
}

// ============================================================================
// PRODUCT GENERATION PROMPTS
// ============================================================================

export function getProductGenerationPrompt(input: {
  category: string;
  count?: number;
  priceRange?: { min: number; max: number };
  style?: string;
}): string {
  return `Generate ${input.count || 5} high-quality e-commerce products for the "${input.category}" category.

${input.priceRange ? `**Price Range:** $${input.priceRange.min} - $${input.priceRange.max}` : ""}
${input.style ? `**Style:** ${input.style}` : ""}

For each product, provide:

1. **Name:** Compelling, SEO-optimized product name
2. **Description:** Detailed product description (200-300 words) that:
   - Highlights key features and benefits
   - Includes relevant keywords naturally
   - Addresses customer pain points
   - Creates emotional connection
   - Ends with clear call-to-action

3. **Short Description:** Concise 1-2 sentence summary for listings

4. **Pricing:**
   - Competitive base price
   - Optional compare-at price for promotions
   - Cost per item (for margin calculations)

5. **SEO Metadata:**
   - Title tag (60 characters max)
   - Meta description (155 characters max)
   - Relevant keywords (5-10)

6. **Tags:** Relevant product tags for filtering and search

7. **Variants:** If applicable (size, color, material, etc.)

Return products as valid JSON array matching our product schema.`;
}

// ============================================================================
// DESCRIPTION OPTIMIZATION PROMPTS
// ============================================================================

export function getDescriptionOptimizationPrompt(
  productName: string,
  currentDescription?: string
): string {
  return `Optimize the product description for "${productName}".

${currentDescription ? `**Current Description:**\n${currentDescription}\n` : ""}

Create an optimized description that:

1. **Engages the reader** with compelling opening
2. **Highlights benefits** over features
3. **Includes keywords** naturally for SEO
4. **Addresses objections** and builds trust
5. **Uses sensory language** to create desire
6. **Incorporates social proof** concepts
7. **Ends with clear CTA**

Best practices:
- Use short paragraphs and bullet points
- Include relevant keywords naturally
- Write in active voice
- Focus on customer benefits
- Create emotional connection
- Optimize for mobile reading

Return as plain text (200-300 words).`;
}

// ============================================================================
// SEO OPTIMIZATION PROMPTS
// ============================================================================

export function getSEOOptimizationPrompt(content: {
  type: "product" | "category" | "page";
  name: string;
  description?: string;
  keywords?: string[];
}): string {
  return `Generate SEO metadata for a ${content.type} named "${content.name}".

${content.description ? `**Description:**\n${content.description}\n` : ""}
${content.keywords ? `**Target Keywords:** ${content.keywords.join(", ")}` : ""}

Provide:

1. **Title Tag** (50-60 characters):
   - Include primary keyword
   - Compelling and clickable
   - Brand name if space allows

2. **Meta Description** (150-160 characters):
   - Include primary keyword
   - Clear value proposition
   - Include call-to-action
   - Compelling reason to click

3. **Keywords** (5-10 relevant keywords):
   - Mix of high-volume and long-tail
   - Relevant to content
   - Natural variations

4. **URL Slug:**
   - Short and descriptive
   - Include primary keyword
   - Use hyphens, lowercase

5. **H1 Heading:**
   - Clear and descriptive
   - Include primary keyword
   - Engaging and compelling

Return as JSON object.`;
}

// ============================================================================
// ANALYTICS & INSIGHTS PROMPTS
// ============================================================================

export function getAnalyticsInsightsPrompt(data: {
  revenue: number;
  orders: number;
  conversionRate: number;
  averageOrderValue: number;
  topProducts?: Array<{ name: string; revenue: number }>;
}): string {
  return `Analyze the following e-commerce store performance data and provide actionable insights:

**Performance Metrics:**
- Total Revenue: $${data.revenue.toFixed(2)}
- Total Orders: ${data.orders}
- Conversion Rate: ${(data.conversionRate * 100).toFixed(2)}%
- Average Order Value: $${data.averageOrderValue.toFixed(2)}

${
  data.topProducts
    ? `**Top Products:**\n${data.topProducts.map((p) => `- ${p.name}: $${p.revenue.toFixed(2)}`).join("\n")}`
    : ""
}

Provide:

1. **Overall Assessment:** Brief summary of performance

2. **Key Strengths:** What's working well (2-3 points)

3. **Areas for Improvement:** What needs attention (2-3 points)

4. **Actionable Recommendations:** Specific actions to improve metrics (5-7 recommendations)
   - Each recommendation should be specific and actionable
   - Include expected impact
   - Prioritize by potential ROI

5. **Growth Opportunities:** Strategic suggestions for scaling

Format as structured text with clear sections.`;
}
