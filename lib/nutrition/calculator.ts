/**
 * Nutrition Calculator Module
 *
 * Calculates nutritional values for recipes based on ingredients
 */

export interface NutritionalInfo {
  calories: number;
  protein: number;       // grams
  carbohydrates: number; // grams
  fat: number;           // grams
  fiber: number;         // grams
  sugar: number;         // grams
  sodium: number;        // mg
  cholesterol: number;   // mg
  saturatedFat?: number; // grams
  transFat?: number;     // grams
}

export interface IngredientNutrition extends NutritionalInfo {
  ingredientId: string;
  name: string;
  quantity: number;
  unit: string;
  per100g: NutritionalInfo;
}

// USDA nutritional database (sample data)
const NUTRITION_DATABASE: Record<string, NutritionalInfo> = {
  // Vegetables (per 100g)
  tomatoes: {
    calories: 18,
    protein: 0.9,
    carbohydrates: 3.9,
    fat: 0.2,
    fiber: 1.2,
    sugar: 2.6,
    sodium: 5,
    cholesterol: 0,
  },
  onions: {
    calories: 40,
    protein: 1.1,
    carbohydrates: 9.3,
    fat: 0.1,
    fiber: 1.7,
    sugar: 4.2,
    sodium: 4,
    cholesterol: 0,
  },
  // Dairy
  mozzarella: {
    calories: 280,
    protein: 28,
    carbohydrates: 2.2,
    fat: 17,
    fiber: 0,
    sugar: 1.2,
    sodium: 373,
    cholesterol: 79,
    saturatedFat: 11,
  },
  // Meats
  chicken_breast: {
    calories: 165,
    protein: 31,
    carbohydrates: 0,
    fat: 3.6,
    fiber: 0,
    sugar: 0,
    sodium: 74,
    cholesterol: 85,
    saturatedFat: 1,
  },
  // Grains
  pasta: {
    calories: 131,
    protein: 5,
    carbohydrates: 25,
    fat: 1.1,
    fiber: 1.8,
    sugar: 0.6,
    sodium: 1,
    cholesterol: 0,
  },
  // Oils
  olive_oil: {
    calories: 884,
    protein: 0,
    carbohydrates: 0,
    fat: 100,
    fiber: 0,
    sugar: 0,
    sodium: 2,
    cholesterol: 0,
    saturatedFat: 14,
  },
};

/**
 * Get nutritional info for an ingredient (per 100g)
 */
export function getIngredientNutrition(ingredientName: string): NutritionalInfo | null {
  const normalized = ingredientName.toLowerCase().replace(/\s+/g, '_');
  return NUTRITION_DATABASE[normalized] || null;
}

/**
 * Calculate nutrition for a specific quantity of an ingredient
 */
export function calculateIngredientNutrition(
  ingredientName: string,
  quantityGrams: number
): NutritionalInfo | null {
  const base = getIngredientNutrition(ingredientName);
  if (!base) return null;

  const multiplier = quantityGrams / 100;

  return {
    calories: Math.round(base.calories * multiplier),
    protein: Math.round(base.protein * multiplier * 10) / 10,
    carbohydrates: Math.round(base.carbohydrates * multiplier * 10) / 10,
    fat: Math.round(base.fat * multiplier * 10) / 10,
    fiber: Math.round(base.fiber * multiplier * 10) / 10,
    sugar: Math.round(base.sugar * multiplier * 10) / 10,
    sodium: Math.round(base.sodium * multiplier),
    cholesterol: Math.round(base.cholesterol * multiplier),
    saturatedFat: base.saturatedFat
      ? Math.round(base.saturatedFat * multiplier * 10) / 10
      : undefined,
  };
}

/**
 * Calculate total nutrition for a recipe
 */
export function calculateRecipeNutrition(
  ingredients: Array<{
    name: string;
    quantity: number; // in grams
  }>
): NutritionalInfo {
  const total: NutritionalInfo = {
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0,
    cholesterol: 0,
    saturatedFat: 0,
  };

  for (const ingredient of ingredients) {
    const nutrition = calculateIngredientNutrition(
      ingredient.name,
      ingredient.quantity
    );

    if (nutrition) {
      total.calories += nutrition.calories;
      total.protein += nutrition.protein;
      total.carbohydrates += nutrition.carbohydrates;
      total.fat += nutrition.fat;
      total.fiber += nutrition.fiber;
      total.sugar += nutrition.sugar;
      total.sodium += nutrition.sodium;
      total.cholesterol += nutrition.cholesterol;
      if (nutrition.saturatedFat) {
        total.saturatedFat = (total.saturatedFat || 0) + nutrition.saturatedFat;
      }
    }
  }

  // Round all values
  return {
    calories: Math.round(total.calories),
    protein: Math.round(total.protein * 10) / 10,
    carbohydrates: Math.round(total.carbohydrates * 10) / 10,
    fat: Math.round(total.fat * 10) / 10,
    fiber: Math.round(total.fiber * 10) / 10,
    sugar: Math.round(total.sugar * 10) / 10,
    sodium: Math.round(total.sodium),
    cholesterol: Math.round(total.cholesterol),
    saturatedFat: Math.round((total.saturatedFat || 0) * 10) / 10,
  };
}

/**
 * Calculate nutrition per serving
 */
export function calculatePerServing(
  totalNutrition: NutritionalInfo,
  servings: number
): NutritionalInfo {
  return {
    calories: Math.round(totalNutrition.calories / servings),
    protein: Math.round((totalNutrition.protein / servings) * 10) / 10,
    carbohydrates: Math.round((totalNutrition.carbohydrates / servings) * 10) / 10,
    fat: Math.round((totalNutrition.fat / servings) * 10) / 10,
    fiber: Math.round((totalNutrition.fiber / servings) * 10) / 10,
    sugar: Math.round((totalNutrition.sugar / servings) * 10) / 10,
    sodium: Math.round(totalNutrition.sodium / servings),
    cholesterol: Math.round(totalNutrition.cholesterol / servings),
    saturatedFat: totalNutrition.saturatedFat
      ? Math.round((totalNutrition.saturatedFat / servings) * 10) / 10
      : undefined,
  };
}

/**
 * Get allergen information for ingredients
 */
export function detectAllergens(ingredientNames: string[]): string[] {
  const allergenMap: Record<string, string[]> = {
    milk: ['dairy', 'lactose'],
    cheese: ['dairy', 'lactose'],
    mozzarella: ['dairy', 'lactose'],
    parmesan: ['dairy', 'lactose'],
    butter: ['dairy', 'lactose'],
    cream: ['dairy', 'lactose'],
    egg: ['eggs'],
    eggs: ['eggs'],
    wheat: ['gluten', 'wheat'],
    flour: ['gluten', 'wheat'],
    pasta: ['gluten', 'wheat'],
    bread: ['gluten', 'wheat'],
    shrimp: ['shellfish'],
    crab: ['shellfish'],
    lobster: ['shellfish'],
    peanut: ['peanuts'],
    almond: ['tree nuts'],
    walnut: ['tree nuts'],
    cashew: ['tree nuts'],
    soy: ['soy'],
    tofu: ['soy'],
    fish: ['fish'],
    salmon: ['fish'],
    tuna: ['fish'],
  };

  const allergens = new Set<string>();

  for (const ingredient of ingredientNames) {
    const normalized = ingredient.toLowerCase();
    for (const [key, values] of Object.entries(allergenMap)) {
      if (normalized.includes(key)) {
        values.forEach((allergen) => allergens.add(allergen));
      }
    }
  }

  return Array.from(allergens);
}
