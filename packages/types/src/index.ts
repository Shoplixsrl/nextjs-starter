import { z } from "zod";

// ============================================================================
// BASE TYPES
// ============================================================================

export type UUID = string;
export type Timestamp = Date;

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ============================================================================
// USER & ORGANIZATION
// ============================================================================

export const userRoleSchema = z.enum(["owner", "admin", "editor", "viewer"]);
export type UserRole = z.infer<typeof userRoleSchema>;

export const subscriptionStatusSchema = z.enum([
  "trialing",
  "active",
  "past_due",
  "canceled",
  "unpaid",
]);
export type SubscriptionStatus = z.infer<typeof subscriptionStatusSchema>;

export interface User {
  id: UUID;
  email: string;
  name?: string;
  avatar?: string;
  emailVerified?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Organization {
  id: UUID;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  website?: string;
  subscriptionStatus?: SubscriptionStatus;
  subscriptionTier?: string;
  settings?: OrganizationSettings;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface OrganizationSettings {
  currency?: string;
  timezone?: string;
  language?: string;
  emailNotifications?: boolean;
}

export interface OrganizationMember {
  id: UUID;
  organizationId: UUID;
  userId: UUID;
  role: UserRole;
  createdAt: Timestamp;
}

// ============================================================================
// STORE
// ============================================================================

export interface Store {
  id: UUID;
  organizationId: UUID;
  name: string;
  domain?: string;
  customDomain?: string;
  description?: string;
  logo?: string;
  favicon?: string;
  theme?: StoreTheme;
  settings?: StoreSettings;
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface StoreTheme {
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
  layout?: string;
}

export interface StoreSettings {
  currency: string;
  taxRate: number;
  shippingEnabled: boolean;
  inventoryTracking: boolean;
  autoFulfillment: boolean;
}

// ============================================================================
// PRODUCT
// ============================================================================

export const productStatusSchema = z.enum(["draft", "active", "archived"]);
export type ProductStatus = z.infer<typeof productStatusSchema>;

export interface Product {
  id: UUID;
  storeId: UUID;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  status: ProductStatus;
  sku?: string;
  barcode?: string;
  price: string;
  compareAtPrice?: string;
  costPerItem?: string;
  trackInventory: boolean;
  inventoryQuantity: number;
  lowStockThreshold: number;
  weight?: string;
  weightUnit?: string;
  images?: string[];
  tags?: string[];
  metadata?: Record<string, any>;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  status: productStatusSchema.default("draft"),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  compareAtPrice: z.string().regex(/^\d+(\.\d{1,2})?$/).optional(),
  costPerItem: z.string().regex(/^\d+(\.\d{1,2})?$/).optional(),
  trackInventory: z.boolean().default(true),
  inventoryQuantity: z.number().int().min(0).default(0),
  lowStockThreshold: z.number().int().min(0).default(10),
  weight: z.string().optional(),
  weightUnit: z.string().default("kg"),
  images: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.array(z.string()).optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

export interface ProductVariant {
  id: UUID;
  productId: UUID;
  name: string;
  sku?: string;
  barcode?: string;
  price: string;
  compareAtPrice?: string;
  costPerItem?: string;
  inventoryQuantity: number;
  weight?: string;
  options?: Record<string, string>;
  image?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ProductCategory {
  id: UUID;
  storeId: UUID;
  name: string;
  slug: string;
  description?: string;
  parentId?: UUID;
  image?: string;
  sortOrder: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ============================================================================
// CUSTOMER
// ============================================================================

export interface Customer {
  id: UUID;
  storeId: UUID;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  notes?: string;
  tags?: string[];
  totalSpent: string;
  orderCount: number;
  isEmailVerified: boolean;
  acceptsMarketing: boolean;
  lastOrderAt?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Address {
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
}

export const addressSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  company: z.string().optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
  phone: z.string().optional(),
});

// ============================================================================
// ORDER
// ============================================================================

export const orderStatusSchema = z.enum([
  "pending",
  "processing",
  "confirmed",
  "shipped",
  "delivered",
  "canceled",
  "refunded",
]);
export type OrderStatus = z.infer<typeof orderStatusSchema>;

export const paymentStatusSchema = z.enum([
  "pending",
  "authorized",
  "captured",
  "failed",
  "refunded",
  "partially_refunded",
]);
export type PaymentStatus = z.infer<typeof paymentStatusSchema>;

export const fulfillmentStatusSchema = z.enum([
  "unfulfilled",
  "partial",
  "fulfilled",
  "restocked",
]);
export type FulfillmentStatus = z.infer<typeof fulfillmentStatusSchema>;

export interface Order {
  id: UUID;
  storeId: UUID;
  customerId?: UUID;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  currency: string;
  subtotal: string;
  tax: string;
  shipping: string;
  discount: string;
  total: string;
  customerEmail?: string;
  customerPhone?: string;
  shippingAddress?: Address;
  billingAddress?: Address;
  notes?: string;
  tags?: string[];
  metadata?: Record<string, any>;
  canceledAt?: Timestamp;
  cancelReason?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface OrderItem {
  id: UUID;
  orderId: UUID;
  productId?: UUID;
  variantId?: UUID;
  name: string;
  sku?: string;
  quantity: number;
  price: string;
  total: string;
  image?: string;
  metadata?: Record<string, any>;
  createdAt: Timestamp;
}

// ============================================================================
// FULFILLMENT
// ============================================================================

export const shippingMethodSchema = z.enum(["standard", "express", "overnight", "pickup"]);
export type ShippingMethod = z.infer<typeof shippingMethodSchema>;

export interface Fulfillment {
  id: UUID;
  orderId: UUID;
  trackingNumber?: string;
  trackingUrl?: string;
  carrier?: string;
  shippingMethod?: ShippingMethod;
  status: string;
  shippedAt?: Timestamp;
  deliveredAt?: Timestamp;
  estimatedDelivery?: Timestamp;
  notes?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ============================================================================
// AI
// ============================================================================

export interface AIConversation {
  id: UUID;
  organizationId: UUID;
  userId: UUID;
  title?: string;
  storeId?: UUID;
  metadata?: Record<string, any>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type AIMessageRole = "user" | "assistant" | "system";

export interface AIMessage {
  id: UUID;
  conversationId: UUID;
  role: AIMessageRole;
  content: string;
  metadata?: Record<string, any>;
  createdAt: Timestamp;
}

export const aiGenerationTypeSchema = z.enum(["product", "category", "page", "theme", "store"]);
export type AIGenerationType = z.infer<typeof aiGenerationTypeSchema>;

export interface AIGeneration {
  id: UUID;
  conversationId: UUID;
  storeId?: UUID;
  type: AIGenerationType;
  generatedData: Record<string, any>;
  prompt?: string;
  isApplied: boolean;
  createdAt: Timestamp;
}

export const createStorePromptSchema = z.object({
  name: z.string().min(1, "Store name is required"),
  description: z.string().optional(),
  industry: z.string().optional(),
  style: z.string().optional(),
  primaryColor: z.string().optional(),
});

export type CreateStorePrompt = z.infer<typeof createStorePromptSchema>;

// ============================================================================
// ANALYTICS
// ============================================================================

export interface AnalyticsMetric {
  id: UUID;
  storeId: UUID;
  date: Timestamp;
  metric: string;
  value: string;
  metadata?: Record<string, any>;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  conversionRate: number;
  topProducts: Array<{
    id: UUID;
    name: string;
    revenue: number;
    orders: number;
  }>;
  revenueByDay: Array<{
    date: string;
    revenue: number;
  }>;
}
