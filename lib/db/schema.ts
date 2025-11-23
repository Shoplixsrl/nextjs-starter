import { pgTable, text, varchar, uuid, timestamp, decimal, integer, boolean, jsonb, pgEnum, index, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ============================================================================
// ENUMS
// ============================================================================

export const userRoleEnum = pgEnum('user_role', ['owner', 'admin', 'manager', 'chef', 'staff']);
export const measurementUnitEnum = pgEnum('measurement_unit', ['kg', 'g', 'l', 'ml', 'pcs', 'lb', 'oz', 'cup', 'tbsp', 'tsp']);
export const wasteReasonEnum = pgEnum('waste_reason', ['spoilage', 'overproduction', 'preparation_error', 'quality_control', 'customer_return', 'other']);
export const orderStatusEnum = pgEnum('order_status', ['draft', 'pending', 'confirmed', 'received', 'cancelled']);
export const menuItemStatusEnum = pgEnum('menu_item_status', ['active', 'inactive', 'seasonal', 'sold_out']);

// ============================================================================
// CORE TABLES - Multi-tenancy & Authentication
// ============================================================================

export const organizations = pgTable('organizations', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  logo: text('logo'),
  currency: varchar('currency', { length: 3 }).notNull().default('EUR'),
  timezone: varchar('timezone', { length: 50 }).notNull().default('Europe/Rome'),
  settings: jsonb('settings').default({}),
  subscriptionTier: varchar('subscription_tier', { length: 50 }).default('trial'), // trial, basic, pro, enterprise
  subscriptionExpiresAt: timestamp('subscription_expires_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  slugIdx: uniqueIndex('org_slug_idx').on(table.slug),
}));

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  avatar: text('avatar'),
  role: userRoleEnum('role').notNull().default('staff'),
  passwordHash: text('password_hash').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  lastLoginAt: timestamp('last_login_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  emailIdx: uniqueIndex('user_email_org_idx').on(table.email, table.organizationId),
  orgIdx: index('user_org_idx').on(table.organizationId),
}));

export const locations = pgTable('locations', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  address: text('address'),
  city: varchar('city', { length: 100 }),
  country: varchar('country', { length: 100 }),
  phone: varchar('phone', { length: 50 }),
  isActive: boolean('is_active').default(true).notNull(),
  settings: jsonb('settings').default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  orgIdx: index('location_org_idx').on(table.organizationId),
}));

// ============================================================================
// SUPPLIERS & INGREDIENTS
// ============================================================================

export const suppliers = pgTable('suppliers', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  address: text('address'),
  website: text('website'),
  notes: text('notes'),
  paymentTerms: varchar('payment_terms', { length: 100 }),
  isActive: boolean('is_active').default(true).notNull(),
  rating: decimal('rating', { precision: 2, scale: 1 }), // 0.0 to 5.0
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  orgIdx: index('supplier_org_idx').on(table.organizationId),
}));

export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // 'ingredient' or 'menu_item'
  color: varchar('color', { length: 7 }), // hex color
  parentId: uuid('parent_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  orgIdx: index('category_org_idx').on(table.organizationId),
  typeIdx: index('category_type_idx').on(table.type),
}));

export const ingredients = pgTable('ingredients', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  categoryId: uuid('category_id').references(() => categories.id, { onDelete: 'set null' }),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  sku: varchar('sku', { length: 100 }),
  unit: measurementUnitEnum('unit').notNull(),
  currentPrice: decimal('current_price', { precision: 10, scale: 4 }).notNull(),
  averagePrice: decimal('average_price', { precision: 10, scale: 4 }), // AI-calculated moving average
  minStockLevel: decimal('min_stock_level', { precision: 10, scale: 2 }),
  maxStockLevel: decimal('max_stock_level', { precision: 10, scale: 2 }),
  preferredSupplierId: uuid('preferred_supplier_id').references(() => suppliers.id, { onDelete: 'set null' }),
  allergens: jsonb('allergens').default([]), // array of allergen strings
  nutritionalInfo: jsonb('nutritional_info').default({}),
  shelfLife: integer('shelf_life'), // days
  imageUrl: text('image_url'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  orgIdx: index('ingredient_org_idx').on(table.organizationId),
  categoryIdx: index('ingredient_category_idx').on(table.categoryId),
  skuIdx: index('ingredient_sku_idx').on(table.sku),
}));

// Price history for AI predictions
export const ingredientPriceHistory = pgTable('ingredient_price_history', {
  id: uuid('id').primaryKey().defaultRandom(),
  ingredientId: uuid('ingredient_id').references(() => ingredients.id, { onDelete: 'cascade' }).notNull(),
  supplierId: uuid('supplier_id').references(() => suppliers.id, { onDelete: 'cascade' }),
  price: decimal('price', { precision: 10, scale: 4 }).notNull(),
  effectiveDate: timestamp('effective_date').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  ingredientIdx: index('price_history_ingredient_idx').on(table.ingredientId),
  dateIdx: index('price_history_date_idx').on(table.effectiveDate),
}));

// ============================================================================
// INVENTORY MANAGEMENT
// ============================================================================

export const inventory = pgTable('inventory', {
  id: uuid('id').primaryKey().defaultRandom(),
  locationId: uuid('location_id').references(() => locations.id, { onDelete: 'cascade' }).notNull(),
  ingredientId: uuid('ingredient_id').references(() => ingredients.id, { onDelete: 'cascade' }).notNull(),
  quantity: decimal('quantity', { precision: 10, scale: 2 }).notNull().default('0'),
  unit: measurementUnitEnum('unit').notNull(),
  lotNumber: varchar('lot_number', { length: 100 }),
  expirationDate: timestamp('expiration_date'),
  lastCountedAt: timestamp('last_counted_at'),
  lastCountedBy: uuid('last_counted_by').references(() => users.id, { onDelete: 'set null' }),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  locationIngredientIdx: uniqueIndex('inventory_location_ingredient_idx').on(table.locationId, table.ingredientId, table.lotNumber),
  locationIdx: index('inventory_location_idx').on(table.locationId),
}));

export const inventoryTransactions = pgTable('inventory_transactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  locationId: uuid('location_id').references(() => locations.id, { onDelete: 'cascade' }).notNull(),
  ingredientId: uuid('ingredient_id').references(() => ingredients.id, { onDelete: 'cascade' }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // 'purchase', 'usage', 'waste', 'adjustment', 'transfer'
  quantity: decimal('quantity', { precision: 10, scale: 2 }).notNull(),
  unit: measurementUnitEnum('unit').notNull(),
  cost: decimal('cost', { precision: 10, scale: 2 }),
  referenceId: uuid('reference_id'), // links to purchase order, recipe, waste log, etc.
  referenceType: varchar('reference_type', { length: 50 }), // 'purchase_order', 'recipe', 'waste', etc.
  notes: text('notes'),
  performedBy: uuid('performed_by').references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  locationIdx: index('inventory_tx_location_idx').on(table.locationId),
  ingredientIdx: index('inventory_tx_ingredient_idx').on(table.ingredientId),
  dateIdx: index('inventory_tx_date_idx').on(table.createdAt),
}));

// ============================================================================
// PURCHASE ORDERS
// ============================================================================

export const purchaseOrders = pgTable('purchase_orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  locationId: uuid('location_id').references(() => locations.id, { onDelete: 'cascade' }).notNull(),
  supplierId: uuid('supplier_id').references(() => suppliers.id, { onDelete: 'set null' }),
  orderNumber: varchar('order_number', { length: 100 }).notNull(),
  status: orderStatusEnum('status').notNull().default('draft'),
  orderDate: timestamp('order_date').notNull(),
  expectedDeliveryDate: timestamp('expected_delivery_date'),
  actualDeliveryDate: timestamp('actual_delivery_date'),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  notes: text('notes'),
  createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  orgIdx: index('po_org_idx').on(table.organizationId),
  locationIdx: index('po_location_idx').on(table.locationId),
  orderNumberIdx: uniqueIndex('po_order_number_idx').on(table.orderNumber),
}));

export const purchaseOrderItems = pgTable('purchase_order_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  purchaseOrderId: uuid('purchase_order_id').references(() => purchaseOrders.id, { onDelete: 'cascade' }).notNull(),
  ingredientId: uuid('ingredient_id').references(() => ingredients.id, { onDelete: 'cascade' }).notNull(),
  quantity: decimal('quantity', { precision: 10, scale: 2 }).notNull(),
  unit: measurementUnitEnum('unit').notNull(),
  unitPrice: decimal('unit_price', { precision: 10, scale: 4 }).notNull(),
  totalPrice: decimal('total_price', { precision: 10, scale: 2 }).notNull(),
  receivedQuantity: decimal('received_quantity', { precision: 10, scale: 2 }).default('0'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  poIdx: index('po_item_po_idx').on(table.purchaseOrderId),
}));

// ============================================================================
// RECIPES & MENU ITEMS
// ============================================================================

export const recipes = pgTable('recipes', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  servingSize: decimal('serving_size', { precision: 10, scale: 2 }).notNull(),
  servingUnit: varchar('serving_unit', { length: 50 }).notNull(),
  prepTime: integer('prep_time'), // minutes
  cookTime: integer('cook_time'), // minutes
  instructions: text('instructions'),
  imageUrl: text('image_url'),
  cost: decimal('cost', { precision: 10, scale: 2 }), // calculated from ingredients
  aiOptimizedCost: decimal('ai_optimized_cost', { precision: 10, scale: 2 }), // AI-suggested optimal cost
  isActive: boolean('is_active').default(true).notNull(),
  createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  orgIdx: index('recipe_org_idx').on(table.organizationId),
  nameIdx: index('recipe_name_idx').on(table.name),
}));

export const recipeIngredients = pgTable('recipe_ingredients', {
  id: uuid('id').primaryKey().defaultRandom(),
  recipeId: uuid('recipe_id').references(() => recipes.id, { onDelete: 'cascade' }).notNull(),
  ingredientId: uuid('ingredient_id').references(() => ingredients.id, { onDelete: 'cascade' }).notNull(),
  quantity: decimal('quantity', { precision: 10, scale: 4 }).notNull(),
  unit: measurementUnitEnum('unit').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  recipeIdx: index('recipe_ingredient_recipe_idx').on(table.recipeId),
  ingredientIdx: index('recipe_ingredient_ingredient_idx').on(table.ingredientId),
}));

export const menuItems = pgTable('menu_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  categoryId: uuid('category_id').references(() => categories.id, { onDelete: 'set null' }),
  recipeId: uuid('recipe_id').references(() => recipes.id, { onDelete: 'set null' }),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  cost: decimal('cost', { precision: 10, scale: 2 }), // from recipe
  targetFoodCostPercent: decimal('target_food_cost_percent', { precision: 5, scale: 2 }).default('30.00'), // ideal %
  actualFoodCostPercent: decimal('actual_food_cost_percent', { precision: 5, scale: 2 }), // calculated
  imageUrl: text('image_url'),
  status: menuItemStatusEnum('status').notNull().default('active'),
  popularity: integer('popularity').default(0), // calculated from sales
  aiRecommendedPrice: decimal('ai_recommended_price', { precision: 10, scale: 2 }), // AI suggestion
  allergens: jsonb('allergens').default([]),
  nutritionalInfo: jsonb('nutritional_info').default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  orgIdx: index('menu_item_org_idx').on(table.organizationId),
  categoryIdx: index('menu_item_category_idx').on(table.categoryId),
  statusIdx: index('menu_item_status_idx').on(table.status),
}));

// ============================================================================
// SALES & ANALYTICS
// ============================================================================

export const sales = pgTable('sales', {
  id: uuid('id').primaryKey().defaultRandom(),
  locationId: uuid('location_id').references(() => locations.id, { onDelete: 'cascade' }).notNull(),
  menuItemId: uuid('menu_item_id').references(() => menuItems.id, { onDelete: 'set null' }),
  quantity: integer('quantity').notNull(),
  totalRevenue: decimal('total_revenue', { precision: 10, scale: 2 }).notNull(),
  totalCost: decimal('total_cost', { precision: 10, scale: 2 }).notNull(),
  saleDate: timestamp('sale_date').notNull(),
  orderId: varchar('order_id', { length: 100 }), // from POS system
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  locationIdx: index('sales_location_idx').on(table.locationId),
  menuItemIdx: index('sales_menu_item_idx').on(table.menuItemId),
  dateIdx: index('sales_date_idx').on(table.saleDate),
}));

// ============================================================================
// WASTE TRACKING
// ============================================================================

export const wasteLogs = pgTable('waste_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  locationId: uuid('location_id').references(() => locations.id, { onDelete: 'cascade' }).notNull(),
  ingredientId: uuid('ingredient_id').references(() => ingredients.id, { onDelete: 'set null' }),
  menuItemId: uuid('menu_item_id').references(() => menuItems.id, { onDelete: 'set null' }),
  quantity: decimal('quantity', { precision: 10, scale: 2 }).notNull(),
  unit: measurementUnitEnum('unit').notNull(),
  cost: decimal('cost', { precision: 10, scale: 2 }).notNull(),
  reason: wasteReasonEnum('reason').notNull(),
  notes: text('notes'),
  imageUrl: text('image_url'), // for computer vision analysis
  aiAnalysis: jsonb('ai_analysis').default({}), // AI-generated insights
  loggedBy: uuid('logged_by').references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  locationIdx: index('waste_location_idx').on(table.locationId),
  dateIdx: index('waste_date_idx').on(table.createdAt),
  reasonIdx: index('waste_reason_idx').on(table.reason),
}));

// ============================================================================
// AI & PREDICTIONS
// ============================================================================

export const aiPredictions = pgTable('ai_predictions', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  locationId: uuid('location_id').references(() => locations.id, { onDelete: 'cascade' }),
  predictionType: varchar('prediction_type', { length: 100 }).notNull(), // 'demand', 'price', 'waste', 'menu_optimization'
  targetId: uuid('target_id'), // ingredient_id or menu_item_id
  targetType: varchar('target_type', { length: 50 }), // 'ingredient' or 'menu_item'
  predictionData: jsonb('prediction_data').notNull(), // ML model output
  confidence: decimal('confidence', { precision: 5, scale: 2 }), // 0-100
  validFrom: timestamp('valid_from').notNull(),
  validUntil: timestamp('valid_until').notNull(),
  actualValue: jsonb('actual_value'), // for model accuracy tracking
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  orgIdx: index('ai_prediction_org_idx').on(table.organizationId),
  typeIdx: index('ai_prediction_type_idx').on(table.predictionType),
  dateIdx: index('ai_prediction_date_idx').on(table.validFrom),
}));

export const aiInsights = pgTable('ai_insights', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  locationId: uuid('location_id').references(() => locations.id, { onDelete: 'cascade' }),
  insightType: varchar('insight_type', { length: 100 }).notNull(), // 'cost_saving', 'waste_reduction', 'revenue_opportunity'
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  impact: jsonb('impact').notNull(), // estimated savings, revenue increase, etc.
  priority: varchar('priority', { length: 20 }).notNull(), // 'low', 'medium', 'high', 'critical'
  status: varchar('status', { length: 20 }).notNull().default('active'), // 'active', 'dismissed', 'implemented'
  actionItems: jsonb('action_items').default([]),
  dismissedBy: uuid('dismissed_by').references(() => users.id, { onDelete: 'set null' }),
  dismissedAt: timestamp('dismissed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  orgIdx: index('ai_insight_org_idx').on(table.organizationId),
  statusIdx: index('ai_insight_status_idx').on(table.status),
  priorityIdx: index('ai_insight_priority_idx').on(table.priority),
}));

// ============================================================================
// RELATIONS
// ============================================================================

export const organizationsRelations = relations(organizations, ({ many }) => ({
  users: many(users),
  locations: many(locations),
  suppliers: many(suppliers),
  ingredients: many(ingredients),
  recipes: many(recipes),
  menuItems: many(menuItems),
}));

export const usersRelations = relations(users, ({ one }) => ({
  organization: one(organizations, {
    fields: [users.organizationId],
    references: [organizations.id],
  }),
}));

export const locationsRelations = relations(locations, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [locations.organizationId],
    references: [organizations.id],
  }),
  inventory: many(inventory),
  sales: many(sales),
}));

export const ingredientsRelations = relations(ingredients, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [ingredients.organizationId],
    references: [organizations.id],
  }),
  category: one(categories, {
    fields: [ingredients.categoryId],
    references: [categories.id],
  }),
  preferredSupplier: one(suppliers, {
    fields: [ingredients.preferredSupplierId],
    references: [suppliers.id],
  }),
  priceHistory: many(ingredientPriceHistory),
  recipeIngredients: many(recipeIngredients),
}));

export const recipesRelations = relations(recipes, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [recipes.organizationId],
    references: [organizations.id],
  }),
  ingredients: many(recipeIngredients),
  menuItems: many(menuItems),
}));

export const menuItemsRelations = relations(menuItems, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [menuItems.organizationId],
    references: [organizations.id],
  }),
  recipe: one(recipes, {
    fields: [menuItems.recipeId],
    references: [recipes.id],
  }),
  category: one(categories, {
    fields: [menuItems.categoryId],
    references: [categories.id],
  }),
  sales: many(sales),
}));
