import { pgTable, text, serial, integer, timestamp, boolean, decimal, jsonb, varchar, pgEnum, date } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ============= ENUMS =============
export const userRoleEnum = pgEnum('user_role', ['admin', 'manager', 'production', 'sales', 'quality']);
export const orderStatusEnum = pgEnum('order_status', ['draft', 'confirmed', 'in_production', 'completed', 'delivered', 'cancelled']);
export const productionStatusEnum = pgEnum('production_status', ['pending', 'in_progress', 'completed', 'on_hold', 'cancelled']);
export const productTypeEnum = pgEnum('product_type', ['umbrella_central', 'umbrella_lateral', 'gazebo', 'pergola', 'custom']);
export const materialTypeEnum = pgEnum('material_type', ['fabric', 'frame_wood', 'frame_aluminum', 'frame_metal', 'lever', 'crown', 'fasteners', 'lighting', 'other']);
export const phaseStatusEnum = pgEnum('phase_status', ['not_started', 'in_progress', 'completed', 'failed']);
export const qualityStatusEnum = pgEnum('quality_status', ['pending', 'passed', 'failed', 'needs_rework']);

// ============= USERS =============
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  role: userRoleEnum('role').notNull().default('sales'),
  password: varchar('password', { length: 255 }).notNull(),
  avatar: text('avatar'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ============= CUSTOMERS =============
export const customers = pgTable('customers', {
  id: serial('id').primaryKey(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  companyName: varchar('company_name', { length: 255 }),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  address: text('address'),
  city: varchar('city', { length: 100 }),
  postalCode: varchar('postal_code', { length: 20 }),
  country: varchar('country', { length: 100 }).notNull().default('Italy'),
  vatNumber: varchar('vat_number', { length: 50 }),
  notes: text('notes'),
  rating: integer('rating').default(5),
  totalOrders: integer('total_orders').notNull().default(0),
  totalRevenue: decimal('total_revenue', { precision: 12, scale: 2 }).notNull().default('0'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ============= PRODUCTS =============
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  type: productTypeEnum('type').notNull(),
  description: text('description'),
  basePrice: decimal('base_price', { precision: 10, scale: 2 }).notNull(),
  image: text('image'),
  specifications: jsonb('specifications'), // {dimensions, weight, materials, etc}
  isActive: boolean('is_active').notNull().default(true),
  productionTime: integer('production_time').notNull().default(7), // days
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ============= MATERIALS =============
export const materials = pgTable('materials', {
  id: serial('id').primaryKey(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  type: materialTypeEnum('type').notNull(),
  description: text('description'),
  unitOfMeasure: varchar('unit_of_measure', { length: 20 }).notNull(), // meters, pieces, kg, etc
  unitCost: decimal('unit_cost', { precision: 10, scale: 2 }).notNull(),
  currentStock: decimal('current_stock', { precision: 10, scale: 2 }).notNull().default('0'),
  minStock: decimal('min_stock', { precision: 10, scale: 2 }).notNull().default('0'),
  maxStock: decimal('max_stock', { precision: 10, scale: 2 }),
  supplierId: integer('supplier_id'),
  attributes: jsonb('attributes'), // {color, pattern, size, finish, etc}
  image: text('image'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ============= SUPPLIERS =============
export const suppliers = pgTable('suppliers', {
  id: serial('id').primaryKey(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  address: text('address'),
  city: varchar('city', { length: 100 }),
  postalCode: varchar('postal_code', { length: 20 }),
  country: varchar('country', { length: 100 }).notNull().default('Italy'),
  vatNumber: varchar('vat_number', { length: 50 }),
  website: varchar('website', { length: 255 }),
  rating: integer('rating').default(5),
  paymentTerms: varchar('payment_terms', { length: 100 }),
  deliveryTime: integer('delivery_time'), // average days
  notes: text('notes'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ============= BILL OF MATERIALS =============
export const billOfMaterials = pgTable('bill_of_materials', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').notNull(),
  materialId: integer('material_id').notNull(),
  quantity: decimal('quantity', { precision: 10, scale: 3 }).notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ============= ORDERS =============
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  orderNumber: varchar('order_number', { length: 50 }).notNull().unique(),
  customerId: integer('customer_id').notNull(),
  status: orderStatusEnum('status').notNull().default('draft'),
  orderDate: date('order_date').notNull(),
  deliveryDate: date('delivery_date'),
  totalAmount: decimal('total_amount', { precision: 12, scale: 2 }).notNull(),
  discount: decimal('discount', { precision: 5, scale: 2 }).default('0'),
  notes: text('notes'),
  salesPersonId: integer('sales_person_id'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ============= ORDER ITEMS =============
export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').notNull(),
  productId: integer('product_id').notNull(),
  quantity: integer('quantity').notNull(),
  unitPrice: decimal('unit_price', { precision: 10, scale: 2 }).notNull(),
  configuration: jsonb('configuration'), // {fabric, color, dimensions, customizations}
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ============= PRODUCTION ORDERS =============
export const productionOrders = pgTable('production_orders', {
  id: serial('id').primaryKey(),
  productionNumber: varchar('production_number', { length: 50 }).notNull().unique(),
  orderItemId: integer('order_item_id').notNull(),
  status: productionStatusEnum('status').notNull().default('pending'),
  priority: integer('priority').notNull().default(3), // 1=urgent, 5=low
  scheduledStart: date('scheduled_start'),
  scheduledEnd: date('scheduled_end'),
  actualStart: timestamp('actual_start'),
  actualEnd: timestamp('actual_end'),
  assignedTo: integer('assigned_to'), // user_id
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ============= PRODUCTION PHASES =============
// The 6 production phases for umbrella manufacturing
export const productionPhases = pgTable('production_phases', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  orderNumber: integer('order_number').notNull(), // sequence: 1-6
  description: text('description'),
  estimatedDuration: integer('estimated_duration').notNull(), // hours
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ============= PRODUCTION TRACKING =============
export const productionTracking = pgTable('production_tracking', {
  id: serial('id').primaryKey(),
  productionOrderId: integer('production_order_id').notNull(),
  phaseId: integer('phase_id').notNull(),
  status: phaseStatusEnum('status').notNull().default('not_started'),
  startedAt: timestamp('started_at'),
  completedAt: timestamp('completed_at'),
  assignedTo: integer('assigned_to'),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ============= QUALITY CHECKS =============
export const qualityChecks = pgTable('quality_checks', {
  id: serial('id').primaryKey(),
  productionOrderId: integer('production_order_id').notNull(),
  phaseId: integer('phase_id'),
  checklistData: jsonb('checklist_data').notNull(), // {items: [{name, checked, notes}]}
  status: qualityStatusEnum('status').notNull().default('pending'),
  inspectorId: integer('inspector_id').notNull(),
  defects: text('defects'),
  actionsTaken: text('actions_taken'),
  inspectionDate: timestamp('inspection_date').notNull().defaultNow(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ============= INVENTORY MOVEMENTS =============
export const inventoryMovements = pgTable('inventory_movements', {
  id: serial('id').primaryKey(),
  materialId: integer('material_id').notNull(),
  movementType: varchar('movement_type', { length: 20 }).notNull(), // in, out, adjustment
  quantity: decimal('quantity', { precision: 10, scale: 3 }).notNull(),
  referenceType: varchar('reference_type', { length: 50 }), // production_order, purchase_order, adjustment
  referenceId: integer('reference_id'),
  notes: text('notes'),
  userId: integer('user_id'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ============= PURCHASE ORDERS =============
export const purchaseOrders = pgTable('purchase_orders', {
  id: serial('id').primaryKey(),
  poNumber: varchar('po_number', { length: 50 }).notNull().unique(),
  supplierId: integer('supplier_id').notNull(),
  orderDate: date('order_date').notNull(),
  expectedDelivery: date('expected_delivery'),
  actualDelivery: date('actual_delivery'),
  status: varchar('status', { length: 20 }).notNull().default('pending'), // pending, ordered, partial, received, cancelled
  totalAmount: decimal('total_amount', { precision: 12, scale: 2 }).notNull(),
  notes: text('notes'),
  createdBy: integer('created_by'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ============= PURCHASE ORDER ITEMS =============
export const purchaseOrderItems = pgTable('purchase_order_items', {
  id: serial('id').primaryKey(),
  purchaseOrderId: integer('purchase_order_id').notNull(),
  materialId: integer('material_id').notNull(),
  quantity: decimal('quantity', { precision: 10, scale: 3 }).notNull(),
  unitPrice: decimal('unit_price', { precision: 10, scale: 2 }).notNull(),
  receivedQuantity: decimal('received_quantity', { precision: 10, scale: 3 }).notNull().default('0'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ============= RELATIONS =============
export const materialsRelations = relations(materials, ({ one }) => ({
  supplier: one(suppliers, {
    fields: [materials.supplierId],
    references: [suppliers.id],
  }),
}));

export const billOfMaterialsRelations = relations(billOfMaterials, ({ one }) => ({
  product: one(products, {
    fields: [billOfMaterials.productId],
    references: [products.id],
  }),
  material: one(materials, {
    fields: [billOfMaterials.materialId],
    references: [materials.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  customer: one(customers, {
    fields: [orders.customerId],
    references: [customers.id],
  }),
  salesPerson: one(users, {
    fields: [orders.salesPersonId],
    references: [users.id],
  }),
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one, many }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
  productionOrders: many(productionOrders),
}));

export const productionOrdersRelations = relations(productionOrders, ({ one, many }) => ({
  orderItem: one(orderItems, {
    fields: [productionOrders.orderItemId],
    references: [orderItems.id],
  }),
  assignedUser: one(users, {
    fields: [productionOrders.assignedTo],
    references: [users.id],
  }),
  tracking: many(productionTracking),
  qualityChecks: many(qualityChecks),
}));

export const productionTrackingRelations = relations(productionTracking, ({ one }) => ({
  productionOrder: one(productionOrders, {
    fields: [productionTracking.productionOrderId],
    references: [productionOrders.id],
  }),
  phase: one(productionPhases, {
    fields: [productionTracking.phaseId],
    references: [productionPhases.id],
  }),
  assignedUser: one(users, {
    fields: [productionTracking.assignedTo],
    references: [users.id],
  }),
}));

export const qualityChecksRelations = relations(qualityChecks, ({ one }) => ({
  productionOrder: one(productionOrders, {
    fields: [qualityChecks.productionOrderId],
    references: [productionOrders.id],
  }),
  phase: one(productionPhases, {
    fields: [qualityChecks.phaseId],
    references: [productionPhases.id],
  }),
  inspector: one(users, {
    fields: [qualityChecks.inspectorId],
    references: [users.id],
  }),
}));

export const inventoryMovementsRelations = relations(inventoryMovements, ({ one }) => ({
  material: one(materials, {
    fields: [inventoryMovements.materialId],
    references: [materials.id],
  }),
  user: one(users, {
    fields: [inventoryMovements.userId],
    references: [users.id],
  }),
}));

export const purchaseOrdersRelations = relations(purchaseOrders, ({ one, many }) => ({
  supplier: one(suppliers, {
    fields: [purchaseOrders.supplierId],
    references: [suppliers.id],
  }),
  creator: one(users, {
    fields: [purchaseOrders.createdBy],
    references: [users.id],
  }),
  items: many(purchaseOrderItems),
}));

export const purchaseOrderItemsRelations = relations(purchaseOrderItems, ({ one }) => ({
  purchaseOrder: one(purchaseOrders, {
    fields: [purchaseOrderItems.purchaseOrderId],
    references: [purchaseOrders.id],
  }),
  material: one(materials, {
    fields: [purchaseOrderItems.materialId],
    references: [materials.id],
  }),
}));
