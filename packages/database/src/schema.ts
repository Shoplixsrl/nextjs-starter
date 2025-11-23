import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  integer,
  decimal,
  boolean,
  jsonb,
  pgEnum,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// ============================================================================
// ENUMS
// ============================================================================

export const userRoleEnum = pgEnum("user_role", ["owner", "admin", "editor", "viewer"]);
export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "trialing",
  "active",
  "past_due",
  "canceled",
  "unpaid",
]);
export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "processing",
  "confirmed",
  "shipped",
  "delivered",
  "canceled",
  "refunded",
]);
export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "authorized",
  "captured",
  "failed",
  "refunded",
  "partially_refunded",
]);
export const fulfillmentStatusEnum = pgEnum("fulfillment_status", [
  "unfulfilled",
  "partial",
  "fulfilled",
  "restocked",
]);
export const shippingMethodEnum = pgEnum("shipping_method", [
  "standard",
  "express",
  "overnight",
  "pickup",
]);
export const productStatusEnum = pgEnum("product_status", ["draft", "active", "archived"]);

// ============================================================================
// ORGANIZATIONS & USERS (Multi-tenancy)
// ============================================================================

export const organizations = pgTable("organizations", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  logo: text("logo"),
  website: text("website"),
  subscriptionStatus: subscriptionStatusEnum("subscription_status").default("trialing"),
  subscriptionTier: varchar("subscription_tier", { length: 50 }).default("starter"),
  settings: jsonb("settings").$type<{
    currency?: string;
    timezone?: string;
    language?: string;
    emailNotifications?: boolean;
  }>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  avatar: text("avatar"),
  emailVerified: timestamp("email_verified"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const organizationMembers = pgTable(
  "organization_members",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: userRoleEnum("role").notNull().default("viewer"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    orgUserIdx: uniqueIndex("org_user_idx").on(table.organizationId, table.userId),
  })
);

// ============================================================================
// E-COMMERCE STORES
// ============================================================================

export const stores = pgTable("stores", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  domain: varchar("domain", { length: 255 }),
  customDomain: varchar("custom_domain", { length: 255 }),
  description: text("description"),
  logo: text("logo"),
  favicon: text("favicon"),
  theme: jsonb("theme").$type<{
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
    layout?: string;
  }>(),
  settings: jsonb("settings").$type<{
    currency: string;
    taxRate: number;
    shippingEnabled: boolean;
    inventoryTracking: boolean;
    autoFulfillment: boolean;
  }>(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================================
// PRODUCTS
// ============================================================================

export const products = pgTable(
  "products",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    storeId: uuid("store_id")
      .notNull()
      .references(() => stores.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 500 }).notNull(),
    slug: varchar("slug", { length: 500 }).notNull(),
    description: text("description"),
    shortDescription: text("short_description"),
    status: productStatusEnum("status").default("draft"),
    sku: varchar("sku", { length: 100 }),
    barcode: varchar("barcode", { length: 100 }),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    compareAtPrice: decimal("compare_at_price", { precision: 10, scale: 2 }),
    costPerItem: decimal("cost_per_item", { precision: 10, scale: 2 }),
    trackInventory: boolean("track_inventory").default(true),
    inventoryQuantity: integer("inventory_quantity").default(0),
    lowStockThreshold: integer("low_stock_threshold").default(10),
    weight: decimal("weight", { precision: 10, scale: 2 }),
    weightUnit: varchar("weight_unit", { length: 10 }).default("kg"),
    images: jsonb("images").$type<string[]>(),
    tags: jsonb("tags").$type<string[]>(),
    metadata: jsonb("metadata"),
    seoTitle: varchar("seo_title", { length: 255 }),
    seoDescription: text("seo_description"),
    seoKeywords: jsonb("seo_keywords").$type<string[]>(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    storeSlugIdx: uniqueIndex("store_slug_idx").on(table.storeId, table.slug),
    storeIdIdx: index("product_store_id_idx").on(table.storeId),
    statusIdx: index("product_status_idx").on(table.status),
  })
);

export const productCategories = pgTable(
  "product_categories",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    storeId: uuid("store_id")
      .notNull()
      .references(() => stores.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    description: text("description"),
    parentId: uuid("parent_id"),
    image: text("image"),
    sortOrder: integer("sort_order").default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    storeSlugIdx: uniqueIndex("category_store_slug_idx").on(table.storeId, table.slug),
  })
);

export const productCategoryRelations = pgTable(
  "product_category_relations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => productCategories.id, { onDelete: "cascade" }),
  },
  (table) => ({
    productCategoryIdx: uniqueIndex("product_category_idx").on(table.productId, table.categoryId),
  })
);

export const productVariants = pgTable("product_variants", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  sku: varchar("sku", { length: 100 }),
  barcode: varchar("barcode", { length: 100 }),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  compareAtPrice: decimal("compare_at_price", { precision: 10, scale: 2 }),
  costPerItem: decimal("cost_per_item", { precision: 10, scale: 2 }),
  inventoryQuantity: integer("inventory_quantity").default(0),
  weight: decimal("weight", { precision: 10, scale: 2 }),
  options: jsonb("options").$type<Record<string, string>>(),
  image: text("image"),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================================
// CUSTOMERS
// ============================================================================

export const customers = pgTable(
  "customers",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    storeId: uuid("store_id")
      .notNull()
      .references(() => stores.id, { onDelete: "cascade" }),
    email: varchar("email", { length: 255 }).notNull(),
    firstName: varchar("first_name", { length: 255 }),
    lastName: varchar("last_name", { length: 255 }),
    phone: varchar("phone", { length: 50 }),
    avatar: text("avatar"),
    notes: text("notes"),
    tags: jsonb("tags").$type<string[]>(),
    totalSpent: decimal("total_spent", { precision: 10, scale: 2 }).default("0"),
    orderCount: integer("order_count").default(0),
    isEmailVerified: boolean("is_email_verified").default(false),
    acceptsMarketing: boolean("accepts_marketing").default(false),
    lastOrderAt: timestamp("last_order_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    storeEmailIdx: uniqueIndex("customer_store_email_idx").on(table.storeId, table.email),
    storeIdIdx: index("customer_store_id_idx").on(table.storeId),
  })
);

export const customerAddresses = pgTable("customer_addresses", {
  id: uuid("id").defaultRandom().primaryKey(),
  customerId: uuid("customer_id")
    .notNull()
    .references(() => customers.id, { onDelete: "cascade" }),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  company: varchar("company", { length: 255 }),
  address1: varchar("address_1", { length: 500 }),
  address2: varchar("address_2", { length: 500 }),
  city: varchar("city", { length: 255 }),
  province: varchar("province", { length: 255 }),
  country: varchar("country", { length: 255 }),
  postalCode: varchar("postal_code", { length: 50 }),
  phone: varchar("phone", { length: 50 }),
  isDefault: boolean("is_default").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================================
// ORDERS
// ============================================================================

export const orders = pgTable(
  "orders",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    storeId: uuid("store_id")
      .notNull()
      .references(() => stores.id, { onDelete: "cascade" }),
    customerId: uuid("customer_id").references(() => customers.id, { onDelete: "set null" }),
    orderNumber: varchar("order_number", { length: 100 }).notNull(),
    status: orderStatusEnum("status").default("pending"),
    paymentStatus: paymentStatusEnum("payment_status").default("pending"),
    fulfillmentStatus: fulfillmentStatusEnum("fulfillment_status").default("unfulfilled"),
    currency: varchar("currency", { length: 10 }).default("USD"),
    subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
    tax: decimal("tax", { precision: 10, scale: 2 }).default("0"),
    shipping: decimal("shipping", { precision: 10, scale: 2 }).default("0"),
    discount: decimal("discount", { precision: 10, scale: 2 }).default("0"),
    total: decimal("total", { precision: 10, scale: 2 }).notNull(),
    customerEmail: varchar("customer_email", { length: 255 }),
    customerPhone: varchar("customer_phone", { length: 50 }),
    shippingAddress: jsonb("shipping_address").$type<{
      firstName?: string;
      lastName?: string;
      company?: string;
      address1?: string;
      address2?: string;
      city?: string;
      province?: string;
      country?: string;
      postalCode?: string;
      phone?: string;
    }>(),
    billingAddress: jsonb("billing_address").$type<{
      firstName?: string;
      lastName?: string;
      company?: string;
      address1?: string;
      address2?: string;
      city?: string;
      province?: string;
      country?: string;
      postalCode?: string;
      phone?: string;
    }>(),
    notes: text("notes"),
    tags: jsonb("tags").$type<string[]>(),
    metadata: jsonb("metadata"),
    canceledAt: timestamp("canceled_at"),
    cancelReason: text("cancel_reason"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    orderNumberIdx: uniqueIndex("order_number_idx").on(table.storeId, table.orderNumber),
    storeIdIdx: index("order_store_id_idx").on(table.storeId),
    customerIdIdx: index("order_customer_id_idx").on(table.customerId),
    statusIdx: index("order_status_idx").on(table.status),
  })
);

export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: uuid("product_id").references(() => products.id, { onDelete: "set null" }),
  variantId: uuid("variant_id").references(() => productVariants.id, { onDelete: "set null" }),
  name: varchar("name", { length: 500 }).notNull(),
  sku: varchar("sku", { length: 100 }),
  quantity: integer("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  image: text("image"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================================
// FULFILLMENT & SHIPPING
// ============================================================================

export const fulfillments = pgTable("fulfillments", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  trackingNumber: varchar("tracking_number", { length: 255 }),
  trackingUrl: text("tracking_url"),
  carrier: varchar("carrier", { length: 100 }),
  shippingMethod: shippingMethodEnum("shipping_method"),
  status: varchar("status", { length: 50 }).default("pending"),
  shippedAt: timestamp("shipped_at"),
  deliveredAt: timestamp("delivered_at"),
  estimatedDelivery: timestamp("estimated_delivery"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const fulfillmentItems = pgTable("fulfillment_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  fulfillmentId: uuid("fulfillment_id")
    .notNull()
    .references(() => fulfillments.id, { onDelete: "cascade" }),
  orderItemId: uuid("order_item_id")
    .notNull()
    .references(() => orderItems.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull(),
});

// ============================================================================
// INVENTORY & WAREHOUSES
// ============================================================================

export const warehouses = pgTable("warehouses", {
  id: uuid("id").defaultRandom().primaryKey(),
  storeId: uuid("store_id")
    .notNull()
    .references(() => stores.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  code: varchar("code", { length: 50 }),
  address: jsonb("address").$type<{
    address1?: string;
    address2?: string;
    city?: string;
    province?: string;
    country?: string;
    postalCode?: string;
  }>(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const inventoryLevels = pgTable(
  "inventory_levels",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    warehouseId: uuid("warehouse_id")
      .notNull()
      .references(() => warehouses.id, { onDelete: "cascade" }),
    productId: uuid("product_id").references(() => products.id, { onDelete: "cascade" }),
    variantId: uuid("variant_id").references(() => productVariants.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull().default(0),
    reservedQuantity: integer("reserved_quantity").notNull().default(0),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    warehouseProductIdx: uniqueIndex("warehouse_product_idx").on(
      table.warehouseId,
      table.productId,
      table.variantId
    ),
  })
);

// ============================================================================
// AI CHAT & GENERATIONS
// ============================================================================

export const aiConversations = pgTable("ai_conversations", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 500 }),
  storeId: uuid("store_id").references(() => stores.id, { onDelete: "set null" }),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const aiMessages = pgTable("ai_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  conversationId: uuid("conversation_id")
    .notNull()
    .references(() => aiConversations.id, { onDelete: "cascade" }),
  role: varchar("role", { length: 50 }).notNull(), // user | assistant | system
  content: text("content").notNull(),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const aiGenerations = pgTable("ai_generations", {
  id: uuid("id").defaultRandom().primaryKey(),
  conversationId: uuid("conversation_id")
    .notNull()
    .references(() => aiConversations.id, { onDelete: "cascade" }),
  storeId: uuid("store_id").references(() => stores.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 100 }).notNull(), // product | category | page | theme
  generatedData: jsonb("generated_data").notNull(),
  prompt: text("prompt"),
  isApplied: boolean("is_applied").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================================
// ANALYTICS
// ============================================================================

export const analytics = pgTable(
  "analytics",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    storeId: uuid("store_id")
      .notNull()
      .references(() => stores.id, { onDelete: "cascade" }),
    date: timestamp("date").notNull(),
    metric: varchar("metric", { length: 100 }).notNull(),
    value: decimal("value", { precision: 15, scale: 2 }).notNull(),
    metadata: jsonb("metadata"),
  },
  (table) => ({
    storeDateMetricIdx: uniqueIndex("store_date_metric_idx").on(
      table.storeId,
      table.date,
      table.metric
    ),
  })
);

// ============================================================================
// RELATIONS
// ============================================================================

export const organizationsRelations = relations(organizations, ({ many }) => ({
  members: many(organizationMembers),
  stores: many(stores),
}));

export const usersRelations = relations(users, ({ many }) => ({
  memberships: many(organizationMembers),
  conversations: many(aiConversations),
}));

export const organizationMembersRelations = relations(organizationMembers, ({ one }) => ({
  organization: one(organizations, {
    fields: [organizationMembers.organizationId],
    references: [organizations.id],
  }),
  user: one(users, {
    fields: [organizationMembers.userId],
    references: [users.id],
  }),
}));

export const storesRelations = relations(stores, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [stores.organizationId],
    references: [organizations.id],
  }),
  products: many(products),
  customers: many(customers),
  orders: many(orders),
  warehouses: many(warehouses),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  store: one(stores, {
    fields: [products.storeId],
    references: [stores.id],
  }),
  variants: many(productVariants),
  categoryRelations: many(productCategoryRelations),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  store: one(stores, {
    fields: [orders.storeId],
    references: [stores.id],
  }),
  customer: one(customers, {
    fields: [orders.customerId],
    references: [customers.id],
  }),
  items: many(orderItems),
  fulfillments: many(fulfillments),
}));

export const customersRelations = relations(customers, ({ one, many }) => ({
  store: one(stores, {
    fields: [customers.storeId],
    references: [stores.id],
  }),
  orders: many(orders),
  addresses: many(customerAddresses),
}));
