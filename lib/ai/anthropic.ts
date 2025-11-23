import Anthropic from "@anthropic-ai/sdk";

if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error("ANTHROPIC_API_KEY environment variable is required");
}

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateMenuWithAI(prompt: string) {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 4096,
    temperature: 1,
    messages: [
      {
        role: "user",
        content: `You are an expert restaurant menu designer and culinary consultant. Generate a complete restaurant menu based on this description:

${prompt}

Return a JSON object with this structure:
{
  "menuName": "Menu name",
  "description": "Menu description",
  "categories": [
    {
      "name": "Category name",
      "description": "Category description",
      "icon": "lucide icon name",
      "items": [
        {
          "name": "Dish name",
          "description": "Appetizing description",
          "price": 15.99,
          "allergens": ["gluten", "dairy"],
          "dietaryInfo": {
            "vegetarian": false,
            "vegan": false,
            "glutenFree": false
          },
          "ingredients": [
            {
              "name": "Ingredient name",
              "quantity": 100,
              "unit": "g"
            }
          ],
          "preparationTime": 20,
          "spicyLevel": 2,
          "imagePrompt": "Professional food photography prompt for fal.ai"
        }
      ]
    }
  ]
}

Make the descriptions mouth-watering and professional. Include realistic pricing. Be creative!`
      }
    ]
  });

  const textContent = message.content.find(block => block.type === 'text');
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text content in AI response');
  }

  // Extract JSON from code block if wrapped
  let jsonText = textContent.text.trim();
  if (jsonText.startsWith('```json')) {
    jsonText = jsonText.replace(/```json\n?/, '').replace(/\n?```$/, '');
  } else if (jsonText.startsWith('```')) {
    jsonText = jsonText.replace(/```\n?/, '').replace(/\n?```$/, '');
  }

  return JSON.parse(jsonText);
}

export async function improveMenuItemDescription(itemName: string, currentDescription: string) {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 500,
    messages: [
      {
        role: "user",
        content: `Improve this menu item description to make it more appetizing and professional:

Item: ${itemName}
Current: ${currentDescription}

Return only the improved description, nothing else.`
      }
    ]
  });

  const textContent = message.content.find(block => block.type === 'text');
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text content in AI response');
  }

  return textContent.text.trim();
}
