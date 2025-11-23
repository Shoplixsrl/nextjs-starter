import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY environment variable is required");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-11-20.acacia",
  typescript: true,
});

export const STRIPE_PLANS = {
  free: {
    name: "Free",
    price: 0,
    priceId: null,
    features: {
      restaurants: 1,
      menus: 2,
      aiGeneration: "basic",
      imageGeneration: false,
      pdfExport: false,
      qrCodes: "static",
      analytics: "basic",
    },
  },
  professional: {
    name: "Professional",
    price: 29,
    priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID,
    features: {
      restaurants: 5,
      menus: Infinity,
      aiGeneration: "advanced",
      imageGeneration: true,
      pdfExport: true,
      qrCodes: "dynamic",
      analytics: "advanced",
      foodCost: true,
      multiLanguage: true,
    },
  },
  enterprise: {
    name: "Enterprise",
    price: 99,
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID,
    features: {
      restaurants: Infinity,
      menus: Infinity,
      aiGeneration: "custom",
      imageGeneration: true,
      pdfExport: true,
      qrCodes: "analytics",
      analytics: "advanced",
      foodCost: true,
      multiLanguage: true,
      whiteLabel: true,
      api: true,
      support: "24/7",
    },
  },
} as const;

export type SubscriptionTier = keyof typeof STRIPE_PLANS;
