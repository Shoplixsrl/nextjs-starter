import { pgTable, uuid, varchar, text, timestamp, decimal, integer, boolean, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const productTypeEnum = pgEnum('product_type', ['digital_download', 'subscription', 'license']);
export const saleTypeEnum = pgEnum('sale_type', ['instant_buy', 'auction', 'both']);
export const productStatusEnum = pgEnum('product_status', ['draft', 'active', 'sold', 'archived']);
export const orderStatusEnum = pgEnum('order_status', ['pending', 'completed', 'cancelled', 'refunded']);
export const paymentStatusEnum = pgEnum('payment_status', ['pending', 'completed', 'failed', 'refunded']);
export const subscriptionStatusEnum = pgEnum('subscription_status', ['active', 'cancelled', 'expired', 'paused']);

// Users Table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  displayName: varchar('display_name', { length: 100 }),
  bio: text('bio'),
  avatar: text('avatar'),
  stripeAccountId: varchar('stripe_account_id', { length: 255 }),
  stripeCustomerId: varchar('stripe_customer_id', { length: 255 }),
  totalRevenue: decimal('total_revenue', { precision: 10, scale: 2 }).default('0'),
  totalSales: integer('total_sales').default(0),
  rating: decimal('rating', { precision: 3, scale: 2 }),
  isVerified: boolean('is_verified').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Products Table
export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  sellerId: uuid('seller_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 200 }).notNull(),
  slug: varchar('slug', { length: 220 }).notNull().unique(),
  description: text('description').notNull(),
  shortDescription: varchar('short_description', { length: 300 }),
  productType: productTypeEnum('product_type').notNull(),
  saleType: saleTypeEnum('sale_type').notNull(),
  status: productStatusEnum('status').default('draft').notNull(),

  // Pricing
  instantBuyPrice: decimal('instant_buy_price', { precision: 10, scale: 2 }),
  startingBid: decimal('starting_bid', { precision: 10, scale: 2 }),
  currentBid: decimal('current_bid', { precision: 10, scale: 2 }),
  reservePrice: decimal('reserve_price', { precision: 10, scale: 2 }),
  monthlyPrice: decimal('monthly_price', { precision: 10, scale: 2 }),
  yearlyPrice: decimal('yearly_price', { precision: 10, scale: 2 }),

  // Auction details
  auctionStartDate: timestamp('auction_start_date'),
  auctionEndDate: timestamp('auction_end_date'),

  // Media
  thumbnail: text('thumbnail'),
  images: text('images').array(),
  previewUrl: text('preview_url'),

  // Metadata
  category: varchar('category', { length: 100 }),
  tags: text('tags').array(),
  fileSize: varchar('file_size', { length: 50 }),
  downloadLimit: integer('download_limit').default(-1), // -1 = unlimited

  // Stats
  views: integer('views').default(0),
  downloads: integer('downloads').default(0),
  sales: integer('sales').default(0),
  rating: decimal('rating', { precision: 3, scale: 2 }),
  reviewCount: integer('review_count').default(0),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Product Files Table
export const productFiles = pgTable('product_files', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  fileName: varchar('file_name', { length: 255 }).notNull(),
  fileUrl: text('file_url').notNull(),
  fileSize: integer('file_size').notNull(), // in bytes
  fileType: varchar('file_type', { length: 100 }),
  isMainFile: boolean('is_main_file').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Orders Table
export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  buyerId: uuid('buyer_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  sellerId: uuid('seller_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  orderNumber: varchar('order_number', { length: 50 }).notNull().unique(),
  status: orderStatusEnum('status').default('pending').notNull(),
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  platformFee: decimal('platform_fee', { precision: 10, scale: 2 }).notNull(),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  stripePaymentIntentId: varchar('stripe_payment_intent_id', { length: 255 }),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Order Items Table
export const orderItems = pgTable('order_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'restrict' }),
  productTitle: varchar('product_title', { length: 200 }).notNull(),
  productThumbnail: text('product_thumbnail'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  downloadedAt: timestamp('downloaded_at'),
  downloadCount: integer('download_count').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Bids Table
export const bids = pgTable('bids', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  bidderId: uuid('bidder_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  isAutoBid: boolean('is_auto_bid').default(false),
  maxAutoBid: decimal('max_auto_bid', { precision: 10, scale: 2 }),
  isWinning: boolean('is_winning').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Subscriptions Table
export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  subscriberId: uuid('subscriber_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  sellerId: uuid('seller_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  status: subscriptionStatusEnum('status').default('active').notNull(),
  interval: varchar('interval', { length: 20 }).notNull(), // 'monthly' or 'yearly'
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 255 }),
  currentPeriodStart: timestamp('current_period_start').notNull(),
  currentPeriodEnd: timestamp('current_period_end').notNull(),
  cancelAt: timestamp('cancel_at'),
  cancelledAt: timestamp('cancelled_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Payments Table
export const payments = pgTable('payments', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').references(() => orders.id, { onDelete: 'set null' }),
  subscriptionId: uuid('subscription_id').references(() => subscriptions.id, { onDelete: 'set null' }),
  payerId: uuid('payer_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  recipientId: uuid('recipient_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  platformFee: decimal('platform_fee', { precision: 10, scale: 2 }).notNull(),
  netAmount: decimal('net_amount', { precision: 10, scale: 2 }).notNull(),
  status: paymentStatusEnum('status').default('pending').notNull(),
  stripePaymentId: varchar('stripe_payment_id', { length: 255 }),
  paymentMethod: varchar('payment_method', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Reviews Table
export const reviews = pgTable('reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  reviewerId: uuid('reviewer_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  orderItemId: uuid('order_item_id').references(() => orderItems.id, { onDelete: 'set null' }),
  rating: integer('rating').notNull(), // 1-5
  title: varchar('title', { length: 200 }),
  comment: text('comment'),
  isVerifiedPurchase: boolean('is_verified_purchase').default(false),
  helpfulCount: integer('helpful_count').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  products: many(products),
  orders: many(orders),
  bids: many(bids),
  subscriptions: many(subscriptions),
  reviews: many(reviews),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  seller: one(users, {
    fields: [products.sellerId],
    references: [users.id],
  }),
  files: many(productFiles),
  orderItems: many(orderItems),
  bids: many(bids),
  subscriptions: many(subscriptions),
  reviews: many(reviews),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  buyer: one(users, {
    fields: [orders.buyerId],
    references: [users.id],
  }),
  items: many(orderItems),
  payment: one(payments),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  subscriber: one(users, {
    fields: [subscriptions.subscriberId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [subscriptions.productId],
    references: [products.id],
  }),
  seller: one(users, {
    fields: [subscriptions.sellerId],
    references: [users.id],
  }),
}));
