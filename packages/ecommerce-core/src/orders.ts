import { eq, and, desc, sql } from "drizzle-orm";
import { getDb, orders, orderItems, customers, fulfillments } from "@repo/database";
import type { Order, OrderItem, UUID, PaginationParams, Address } from "@repo/types";

// ============================================================================
// ORDER CREATION
// ============================================================================

export interface CreateOrderInput {
  storeId: UUID;
  customerId?: UUID;
  customerEmail?: string;
  customerPhone?: string;
  items: Array<{
    productId?: UUID;
    variantId?: UUID;
    name: string;
    sku?: string;
    quantity: number;
    price: string;
    image?: string;
  }>;
  shippingAddress?: Address;
  billingAddress?: Address;
  currency?: string;
  tax?: string;
  shipping?: string;
  discount?: string;
  notes?: string;
}

export async function createOrder(data: CreateOrderInput): Promise<Order> {
  const db = getDb();

  // Calculate totals
  const subtotal = data.items.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  const tax = parseFloat(data.tax || "0");
  const shipping = parseFloat(data.shipping || "0");
  const discount = parseFloat(data.discount || "0");
  const total = subtotal + tax + shipping - discount;

  // Generate order number
  const orderNumber = await generateOrderNumber(data.storeId);

  // Create order
  const [order] = await db
    .insert(orders)
    .values({
      storeId: data.storeId,
      customerId: data.customerId,
      orderNumber,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      currency: data.currency || "USD",
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      shipping: shipping.toFixed(2),
      discount: discount.toFixed(2),
      total: total.toFixed(2),
      shippingAddress: data.shippingAddress,
      billingAddress: data.billingAddress,
      notes: data.notes,
      status: "pending",
      paymentStatus: "pending",
      fulfillmentStatus: "unfulfilled",
    })
    .returning();

  // Create order items
  const orderItemsData = data.items.map((item) => ({
    orderId: order.id,
    productId: item.productId,
    variantId: item.variantId,
    name: item.name,
    sku: item.sku,
    quantity: item.quantity,
    price: item.price,
    total: (parseFloat(item.price) * item.quantity).toFixed(2),
    image: item.image,
  }));

  await db.insert(orderItems).values(orderItemsData);

  // Update customer stats if customerId provided
  if (data.customerId) {
    await updateCustomerStats(data.customerId, total);
  }

  return order as Order;
}

async function generateOrderNumber(storeId: UUID): Promise<string> {
  const db = getDb();

  const [lastOrder] = await db
    .select()
    .from(orders)
    .where(eq(orders.storeId, storeId))
    .orderBy(desc(orders.createdAt))
    .limit(1);

  const lastNumber = lastOrder?.orderNumber
    ? parseInt(lastOrder.orderNumber.split("-")[1] || "0")
    : 0;

  const nextNumber = lastNumber + 1;
  return `ORD-${String(nextNumber).padStart(6, "0")}`;
}

async function updateCustomerStats(customerId: UUID, orderTotal: number) {
  const db = getDb();

  await db
    .update(customers)
    .set({
      totalSpent: sql`${customers.totalSpent} + ${orderTotal}`,
      orderCount: sql`${customers.orderCount} + 1`,
      lastOrderAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(customers.id, customerId));
}

// ============================================================================
// ORDER RETRIEVAL
// ============================================================================

export async function getOrder(orderId: UUID): Promise<Order | null> {
  const db = getDb();

  const [order] = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);

  return (order as Order) || null;
}

export async function getOrderItems(orderId: UUID): Promise<OrderItem[]> {
  const db = getDb();

  const items = await db
    .select()
    .from(orderItems)
    .where(eq(orderItems.orderId, orderId));

  return items as OrderItem[];
}

export async function listOrders(
  storeId: UUID,
  params: PaginationParams & {
    status?: string;
    customerId?: UUID;
  }
) {
  const db = getDb();
  const { page = 1, limit = 20, status, customerId } = params;
  const offset = (page - 1) * limit;

  let conditions = [eq(orders.storeId, storeId)];

  if (status) {
    conditions.push(eq(orders.status, status as any));
  }

  if (customerId) {
    conditions.push(eq(orders.customerId, customerId));
  }

  const items = await db
    .select()
    .from(orders)
    .where(and(...conditions))
    .orderBy(desc(orders.createdAt))
    .limit(limit)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(orders)
    .where(and(...conditions));

  return {
    data: items as Order[],
    pagination: {
      page,
      limit,
      total: Number(count),
      totalPages: Math.ceil(Number(count) / limit),
    },
  };
}

// ============================================================================
// ORDER STATUS UPDATES
// ============================================================================

export async function updateOrderStatus(
  orderId: UUID,
  status: "pending" | "processing" | "confirmed" | "shipped" | "delivered" | "canceled" | "refunded"
): Promise<Order> {
  const db = getDb();

  const [order] = await db
    .update(orders)
    .set({
      status,
      updatedAt: new Date(),
      ...(status === "canceled" ? { canceledAt: new Date() } : {}),
    })
    .where(eq(orders.id, orderId))
    .returning();

  return order as Order;
}

export async function updatePaymentStatus(
  orderId: UUID,
  paymentStatus: "pending" | "authorized" | "captured" | "failed" | "refunded" | "partially_refunded"
): Promise<Order> {
  const db = getDb();

  const [order] = await db
    .update(orders)
    .set({
      paymentStatus,
      updatedAt: new Date(),
    })
    .where(eq(orders.id, orderId))
    .returning();

  return order as Order;
}

export async function updateFulfillmentStatus(
  orderId: UUID,
  fulfillmentStatus: "unfulfilled" | "partial" | "fulfilled" | "restocked"
): Promise<Order> {
  const db = getDb();

  const [order] = await db
    .update(orders)
    .set({
      fulfillmentStatus,
      updatedAt: new Date(),
    })
    .where(eq(orders.id, orderId))
    .returning();

  return order as Order;
}

// ============================================================================
// FULFILLMENT
// ============================================================================

export async function createFulfillment(data: {
  orderId: UUID;
  trackingNumber?: string;
  carrier?: string;
  itemIds: UUID[];
}) {
  const db = getDb();

  const [fulfillment] = await db
    .insert(fulfillments)
    .values({
      orderId: data.orderId,
      trackingNumber: data.trackingNumber,
      carrier: data.carrier,
      status: "pending",
    })
    .returning();

  // Mark order as fulfilled if all items are fulfilled
  await updateFulfillmentStatus(data.orderId, "fulfilled");

  return fulfillment;
}
