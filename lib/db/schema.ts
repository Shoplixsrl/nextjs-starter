import { pgTable, text, serial, integer, boolean, timestamp, jsonb, uuid, decimal, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const subscriptionTierEnum = pgEnum('subscription_tier', ['free', 'starter', 'professional', 'enterprise']);
export const menuStatusEnum = pgEnum('menu_status', ['draft', 'published', 'archived']);
export const qrCodeTypeEnum = pgEnum('qr_code_type', ['static', 'dynamic', 'analytics']);
export const menuItemCategoryEnum = pgEnum('menu_item_category', ['appetizer', 'main', 'dessert', 'beverage', 'special']);

// Users & Authentication
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  password: text("password").notNull(),
  subscriptionTier: subscriptionTierEnum("subscription_tier").default('free').notNull(),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  subscriptionExpiresAt: timestamp("subscription_expires_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Restaurants
export const restaurants = pgTable("restaurants", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  name: text("name").notNull(),
  description: text("description"),
  address: text("address"),
  phone: text("phone"),
  email: text("email"),
  website: text("website"),
  logo: text("logo"), // URL to logo image
  coverImage: text("cover_image"),
  cuisineType: text("cuisine_type"),

  // Branding
  primaryColor: text("primary_color").default("#000000"),
  secondaryColor: text("secondary_color").default("#ffffff"),
  fontFamily: text("font_family").default("Inter"),

  // Settings
  settings: jsonb("settings").$type<{
    timezone?: string;
    currency?: string;
    language?: string;
    allergenWarnings?: boolean;
    showPrices?: boolean;
    showCalories?: boolean;
  }>(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Menus
export const menus = pgTable("menus", {
  id: uuid("id").defaultRandom().primaryKey(),
  restaurantId: uuid("restaurant_id").references(() => restaurants.id, { onDelete: "cascade" }).notNull(),
  name: text("name").notNull(),
  description: text("description"),
  status: menuStatusEnum("status").default('draft').notNull(),

  // AI Generation Metadata
  aiPrompt: text("ai_prompt"), // Original prompt used to generate
  aiModel: text("ai_model"), // Which AI model was used
  generationMetadata: jsonb("generation_metadata").$type<{
    style?: string;
    targetAudience?: string;
    priceRange?: string;
    specialRequirements?: string[];
  }>(),

  // Layout & Design
  template: text("template").default("modern"),
  customCss: text("custom_css"),
  layout: jsonb("layout").$type<{
    columns?: number;
    showImages?: boolean;
    imageSize?: string;
    itemSpacing?: string;
  }>(),

  // Publishing
  publishedAt: timestamp("published_at"),
  publishedUrl: text("published_url"), // Public URL slug

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Menu Categories
export const menuCategories = pgTable("menu_categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  menuId: uuid("menu_id").references(() => menus.id, { onDelete: "cascade" }).notNull(),
  name: text("name").notNull(),
  description: text("description"),
  displayOrder: integer("display_order").default(0).notNull(),
  icon: text("icon"), // Icon name from lucide-react
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Menu Items
export const menuItems = pgTable("menu_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  categoryId: uuid("category_id").references(() => menuCategories.id, { onDelete: "cascade" }).notNull(),
  name: text("name").notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }),

  // Images
  image: text("image"), // Main image URL
  imageGeneratedByAi: boolean("image_generated_by_ai").default(false),
  imagePrompt: text("image_prompt"), // Prompt used for fal.ai generation

  // Nutrition & Dietary
  calories: integer("calories"),
  allergens: jsonb("allergens").$type<string[]>(),
  dietaryInfo: jsonb("dietary_info").$type<{
    vegetarian?: boolean;
    vegan?: boolean;
    glutenFree?: boolean;
    dairyFree?: boolean;
    nutFree?: boolean;
    halal?: boolean;
    kosher?: boolean;
  }>(),

  // Ingredients & Costing
  ingredients: jsonb("ingredients").$type<Array<{
    name: string;
    quantity: number;
    unit: string;
    cost?: number;
  }>>(),
  foodCost: decimal("food_cost", { precision: 10, scale: 2 }), // Total ingredient cost
  targetMargin: integer("target_margin"), // Percentage

  // Additional Info
  preparationTime: integer("preparation_time"), // in minutes
  servingSize: text("serving_size"),
  spicyLevel: integer("spicy_level"), // 0-5

  // Availability
  available: boolean("available").default(true),
  availableFrom: timestamp("available_from"),
  availableUntil: timestamp("available_until"),

  displayOrder: integer("display_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// QR Codes
export const qrCodes = pgTable("qr_codes", {
  id: uuid("id").defaultRandom().primaryKey(),
  menuId: uuid("menu_id").references(() => menus.id, { onDelete: "cascade" }).notNull(),
  name: text("name").notNull(),
  type: qrCodeTypeEnum("type").default('dynamic').notNull(),

  // QR Code Data
  shortCode: text("short_code").notNull().unique(), // Short URL code
  qrCodeImage: text("qr_code_image"), // URL to generated QR image

  // Customization
  design: jsonb("design").$type<{
    foregroundColor?: string;
    backgroundColor?: string;
    logo?: string;
    cornerStyle?: string;
    dotStyle?: string;
  }>(),

  // Analytics Settings
  trackScans: boolean("track_scans").default(true),
  scanLimit: integer("scan_limit"), // Max scans allowed

  // Availability
  active: boolean("active").default(true),
  expiresAt: timestamp("expires_at"),

  // Location/Table Assignment
  location: text("location"), // e.g., "Table 5", "Bar Counter"

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// QR Code Scans (Analytics)
export const qrCodeScans = pgTable("qr_code_scans", {
  id: uuid("id").defaultRandom().primaryKey(),
  qrCodeId: uuid("qr_code_id").references(() => qrCodes.id, { onDelete: "cascade" }).notNull(),

  // Scan Data
  scannedAt: timestamp("scanned_at").defaultNow().notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),

  // Location Data
  country: text("country"),
  city: text("city"),
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),

  // Session Data
  sessionDuration: integer("session_duration"), // seconds
  pagesViewed: integer("pages_viewed"),
});

// AI Generation History
export const aiGenerations = pgTable("ai_generations", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  restaurantId: uuid("restaurant_id").references(() => restaurants.id, { onDelete: "cascade" }),

  type: text("type").notNull(), // 'menu', 'item', 'description', 'image'
  prompt: text("prompt").notNull(),
  model: text("model").notNull(),

  result: jsonb("result"),
  cost: decimal("cost", { precision: 10, scale: 4 }), // API cost

  success: boolean("success").default(true),
  errorMessage: text("error_message"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Analytics & Insights
export const menuAnalytics = pgTable("menu_analytics", {
  id: uuid("id").defaultRandom().primaryKey(),
  menuId: uuid("menu_id").references(() => menus.id, { onDelete: "cascade" }).notNull(),
  date: timestamp("date").notNull(),

  // View Metrics
  totalViews: integer("total_views").default(0),
  uniqueVisitors: integer("unique_visitors").default(0),
  avgSessionDuration: integer("avg_session_duration"), // seconds

  // Item Metrics
  mostViewedItems: jsonb("most_viewed_items").$type<Array<{
    itemId: string;
    views: number;
  }>>(),

  // Device Data
  deviceBreakdown: jsonb("device_breakdown").$type<{
    mobile?: number;
    tablet?: number;
    desktop?: number;
  }>(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  restaurants: many(restaurants),
  aiGenerations: many(aiGenerations),
}));

export const restaurantsRelations = relations(restaurants, ({ one, many }) => ({
  user: one(users, {
    fields: [restaurants.userId],
    references: [users.id],
  }),
  menus: many(menus),
  aiGenerations: many(aiGenerations),
}));

export const menusRelations = relations(menus, ({ one, many }) => ({
  restaurant: one(restaurants, {
    fields: [menus.restaurantId],
    references: [restaurants.id],
  }),
  categories: many(menuCategories),
  qrCodes: many(qrCodes),
  analytics: many(menuAnalytics),
}));

export const menuCategoriesRelations = relations(menuCategories, ({ one, many }) => ({
  menu: one(menus, {
    fields: [menuCategories.menuId],
    references: [menus.id],
  }),
  items: many(menuItems),
}));

export const menuItemsRelations = relations(menuItems, ({ one }) => ({
  category: one(menuCategories, {
    fields: [menuItems.categoryId],
    references: [menuCategories.id],
  }),
}));

export const qrCodesRelations = relations(qrCodes, ({ one, many }) => ({
  menu: one(menus, {
    fields: [qrCodes.menuId],
    references: [menus.id],
  }),
  scans: many(qrCodeScans),
}));

export const qrCodeScansRelations = relations(qrCodeScans, ({ one }) => ({
  qrCode: one(qrCodes, {
    fields: [qrCodeScans.qrCodeId],
    references: [qrCodes.id],
  }),
}));

export const aiGenerationsRelations = relations(aiGenerations, ({ one }) => ({
  user: one(users, {
    fields: [aiGenerations.userId],
    references: [users.id],
  }),
  restaurant: one(restaurants, {
    fields: [aiGenerations.restaurantId],
    references: [restaurants.id],
  }),
}));

export const menuAnalyticsRelations = relations(menuAnalytics, ({ one }) => ({
  menu: one(menus, {
    fields: [menuAnalytics.menuId],
    references: [menus.id],
  }),
}));
