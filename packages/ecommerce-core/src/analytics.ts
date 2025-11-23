import { eq, and, desc, sql, gte, lte } from "drizzle-orm";
import { getDb, orders, orderItems, products, analytics } from "@repo/database";
import type { UUID, DashboardStats } from "@repo/types";

// ============================================================================
// DASHBOARD STATISTICS
// ============================================================================

export async function getDashboardStats(
  storeId: UUID,
  startDate: Date,
  endDate: Date
): Promise<DashboardStats> {
  const db = getDb();

  // Total revenue and orders
  const [revenueData] = await db
    .select({
      totalRevenue: sql<number>`COALESCE(SUM(CAST(${orders.total} AS DECIMAL)), 0)`,
      totalOrders: sql<number>`COUNT(*)`,
    })
    .from(orders)
    .where(
      and(
        eq(orders.storeId, storeId),
        gte(orders.createdAt, startDate),
        lte(orders.createdAt, endDate),
        sql`${orders.status} NOT IN ('canceled', 'refunded')`
      )
    );

  const totalRevenue = Number(revenueData?.totalRevenue || 0);
  const totalOrders = Number(revenueData?.totalOrders || 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Top products
  const topProductsData = await db
    .select({
      productId: orderItems.productId,
      name: orderItems.name,
      revenue: sql<number>`SUM(CAST(${orderItems.total} AS DECIMAL))`,
      orderCount: sql<number>`COUNT(DISTINCT ${orderItems.orderId})`,
    })
    .from(orderItems)
    .innerJoin(orders, eq(orderItems.orderId, orders.id))
    .where(
      and(
        eq(orders.storeId, storeId),
        gte(orders.createdAt, startDate),
        lte(orders.createdAt, endDate),
        sql`${orders.status} NOT IN ('canceled', 'refunded')`
      )
    )
    .groupBy(orderItems.productId, orderItems.name)
    .orderBy(desc(sql`SUM(CAST(${orderItems.total} AS DECIMAL))`))
    .limit(10);

  const topProducts = topProductsData.map((p) => ({
    id: p.productId || ("" as UUID),
    name: p.name,
    revenue: Number(p.revenue),
    orders: Number(p.orderCount),
  }));

  // Revenue by day
  const revenueByDayData = await db
    .select({
      date: sql<string>`DATE(${orders.createdAt})`,
      revenue: sql<number>`SUM(CAST(${orders.total} AS DECIMAL))`,
    })
    .from(orders)
    .where(
      and(
        eq(orders.storeId, storeId),
        gte(orders.createdAt, startDate),
        lte(orders.createdAt, endDate),
        sql`${orders.status} NOT IN ('canceled', 'refunded')`
      )
    )
    .groupBy(sql`DATE(${orders.createdAt})`)
    .orderBy(sql`DATE(${orders.createdAt})`);

  const revenueByDay = revenueByDayData.map((d) => ({
    date: d.date,
    revenue: Number(d.revenue),
  }));

  // Simple conversion rate calculation (placeholder - would need visitor tracking)
  const conversionRate = 0.025; // 2.5% placeholder

  return {
    totalRevenue,
    totalOrders,
    averageOrderValue,
    conversionRate,
    topProducts,
    revenueByDay,
  };
}

// ============================================================================
// ANALYTICS TRACKING
// ============================================================================

export async function trackMetric(
  storeId: UUID,
  metric: string,
  value: number,
  date: Date = new Date(),
  metadata?: Record<string, any>
) {
  const db = getDb();

  await db
    .insert(analytics)
    .values({
      storeId,
      metric,
      value: value.toString(),
      date,
      metadata,
    })
    .onConflictDoUpdate({
      target: [analytics.storeId, analytics.date, analytics.metric],
      set: {
        value: value.toString(),
        metadata,
      },
    });
}

export async function getMetric(storeId: UUID, metric: string, startDate: Date, endDate: Date) {
  const db = getDb();

  return await db
    .select()
    .from(analytics)
    .where(
      and(
        eq(analytics.storeId, storeId),
        eq(analytics.metric, metric),
        gte(analytics.date, startDate),
        lte(analytics.date, endDate)
      )
    )
    .orderBy(analytics.date);
}

// ============================================================================
// PRODUCT PERFORMANCE
// ============================================================================

export async function getProductPerformance(storeId: UUID, startDate: Date, endDate: Date) {
  const db = getDb();

  return await db
    .select({
      productId: products.id,
      productName: products.name,
      views: sql<number>`0`, // Would need tracking
      addToCart: sql<number>`0`, // Would need tracking
      purchases: sql<number>`COUNT(DISTINCT ${orderItems.id})`,
      revenue: sql<number>`COALESCE(SUM(CAST(${orderItems.total} AS DECIMAL)), 0)`,
    })
    .from(products)
    .leftJoin(orderItems, eq(orderItems.productId, products.id))
    .leftJoin(orders, eq(orderItems.orderId, orders.id))
    .where(
      and(
        eq(products.storeId, storeId),
        orders.createdAt ? gte(orders.createdAt, startDate) : sql`TRUE`,
        orders.createdAt ? lte(orders.createdAt, endDate) : sql`TRUE`
      )
    )
    .groupBy(products.id, products.name)
    .orderBy(desc(sql`COALESCE(SUM(CAST(${orderItems.total} AS DECIMAL)), 0)`));
}
