import { eq, and, sql } from "drizzle-orm";
import { getDb, warehouses, inventoryLevels } from "@repo/database";
import type { UUID } from "@repo/types";

// ============================================================================
// WAREHOUSE MANAGEMENT
// ============================================================================

export async function createWarehouse(
  storeId: UUID,
  data: {
    name: string;
    code?: string;
    address?: {
      address1?: string;
      city?: string;
      country?: string;
      postalCode?: string;
    };
  }
) {
  const db = getDb();

  const [warehouse] = await db
    .insert(warehouses)
    .values({
      storeId,
      ...data,
    })
    .returning();

  return warehouse;
}

export async function getWarehouse(warehouseId: UUID) {
  const db = getDb();

  const [warehouse] = await db
    .select()
    .from(warehouses)
    .where(eq(warehouses.id, warehouseId))
    .limit(1);

  return warehouse;
}

export async function listWarehouses(storeId: UUID) {
  const db = getDb();

  return await db
    .select()
    .from(warehouses)
    .where(eq(warehouses.storeId, storeId));
}

// ============================================================================
// INVENTORY LEVELS
// ============================================================================

export async function setInventoryLevel(data: {
  warehouseId: UUID;
  productId?: UUID;
  variantId?: UUID;
  quantity: number;
}) {
  const db = getDb();

  const existing = await db
    .select()
    .from(inventoryLevels)
    .where(
      and(
        eq(inventoryLevels.warehouseId, data.warehouseId),
        data.productId ? eq(inventoryLevels.productId, data.productId) : sql`TRUE`,
        data.variantId ? eq(inventoryLevels.variantId, data.variantId) : sql`TRUE`
      )
    )
    .limit(1);

  if (existing.length > 0) {
    const [updated] = await db
      .update(inventoryLevels)
      .set({
        quantity: data.quantity,
        updatedAt: new Date(),
      })
      .where(eq(inventoryLevels.id, existing[0].id))
      .returning();

    return updated;
  } else {
    const [created] = await db
      .insert(inventoryLevels)
      .values(data)
      .returning();

    return created;
  }
}

export async function adjustInventoryLevel(
  warehouseId: UUID,
  productId: UUID | null,
  variantId: UUID | null,
  adjustment: number
) {
  const db = getDb();

  await db
    .update(inventoryLevels)
    .set({
      quantity: sql`${inventoryLevels.quantity} + ${adjustment}`,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(inventoryLevels.warehouseId, warehouseId),
        productId ? eq(inventoryLevels.productId, productId) : sql`TRUE`,
        variantId ? eq(inventoryLevels.variantId, variantId) : sql`TRUE`
      )
    );
}

export async function getInventoryLevel(
  warehouseId: UUID,
  productId?: UUID,
  variantId?: UUID
) {
  const db = getDb();

  const [level] = await db
    .select()
    .from(inventoryLevels)
    .where(
      and(
        eq(inventoryLevels.warehouseId, warehouseId),
        productId ? eq(inventoryLevels.productId, productId) : sql`TRUE`,
        variantId ? eq(inventoryLevels.variantId, variantId) : sql`TRUE`
      )
    )
    .limit(1);

  return level;
}

export async function getTotalInventory(productId: UUID, variantId?: UUID): Promise<number> {
  const db = getDb();

  const [result] = await db
    .select({ total: sql<number>`COALESCE(SUM(${inventoryLevels.quantity}), 0)` })
    .from(inventoryLevels)
    .where(
      and(
        eq(inventoryLevels.productId, productId),
        variantId ? eq(inventoryLevels.variantId, variantId) : sql`TRUE`
      )
    );

  return Number(result?.total || 0);
}
