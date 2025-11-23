import { eq, and, desc, ilike, sql } from "drizzle-orm";
import { getDb, products, productVariants, productCategories } from "@repo/database";
import type { CreateProductInput, Product, UUID, PaginationParams } from "@repo/types";

// ============================================================================
// PRODUCT CRUD OPERATIONS
// ============================================================================

export async function createProduct(
  storeId: UUID,
  data: CreateProductInput
): Promise<Product> {
  const db = getDb();

  const [product] = await db
    .insert(products)
    .values({
      storeId,
      ...data,
    })
    .returning();

  return product as Product;
}

export async function getProduct(productId: UUID): Promise<Product | null> {
  const db = getDb();

  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, productId))
    .limit(1);

  return (product as Product) || null;
}

export async function getProductBySlug(
  storeId: UUID,
  slug: string
): Promise<Product | null> {
  const db = getDb();

  const [product] = await db
    .select()
    .from(products)
    .where(and(eq(products.storeId, storeId), eq(products.slug, slug)))
    .limit(1);

  return (product as Product) || null;
}

export async function updateProduct(
  productId: UUID,
  data: Partial<CreateProductInput>
): Promise<Product> {
  const db = getDb();

  const [product] = await db
    .update(products)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(products.id, productId))
    .returning();

  return product as Product;
}

export async function deleteProduct(productId: UUID): Promise<void> {
  const db = getDb();
  await db.delete(products).where(eq(products.id, productId));
}

// ============================================================================
// PRODUCT LISTING & SEARCH
// ============================================================================

export async function listProducts(
  storeId: UUID,
  params: PaginationParams & {
    status?: "draft" | "active" | "archived";
    categoryId?: UUID;
    search?: string;
  }
) {
  const db = getDb();
  const { page = 1, limit = 20, status, categoryId, search } = params;
  const offset = (page - 1) * limit;

  let query = db.select().from(products).where(eq(products.storeId, storeId));

  if (status) {
    query = query.where(eq(products.status, status)) as any;
  }

  if (search) {
    query = query.where(
      sql`${products.name} ILIKE ${"%" + search + "%"} OR ${products.description} ILIKE ${"%" + search + "%"}`
    ) as any;
  }

  const items = await query
    .orderBy(desc(products.createdAt))
    .limit(limit)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(products)
    .where(eq(products.storeId, storeId));

  return {
    data: items as Product[],
    pagination: {
      page,
      limit,
      total: Number(count),
      totalPages: Math.ceil(Number(count) / limit),
    },
  };
}

// ============================================================================
// PRODUCT VARIANTS
// ============================================================================

export async function getProductVariants(productId: UUID) {
  const db = getDb();

  const variants = await db
    .select()
    .from(productVariants)
    .where(eq(productVariants.productId, productId))
    .orderBy(productVariants.sortOrder);

  return variants;
}

export async function createProductVariant(
  productId: UUID,
  data: {
    name: string;
    sku?: string;
    price: string;
    inventoryQuantity?: number;
    options?: Record<string, string>;
  }
) {
  const db = getDb();

  const [variant] = await db
    .insert(productVariants)
    .values({
      productId,
      ...data,
    })
    .returning();

  return variant;
}

// ============================================================================
// INVENTORY MANAGEMENT
// ============================================================================

export async function adjustInventory(
  productId: UUID,
  variantId: UUID | null,
  adjustment: number
): Promise<void> {
  const db = getDb();

  if (variantId) {
    await db
      .update(productVariants)
      .set({
        inventoryQuantity: sql`${productVariants.inventoryQuantity} + ${adjustment}`,
        updatedAt: new Date(),
      })
      .where(eq(productVariants.id, variantId));
  } else {
    await db
      .update(products)
      .set({
        inventoryQuantity: sql`${products.inventoryQuantity} + ${adjustment}`,
        updatedAt: new Date(),
      })
      .where(eq(products.id, productId));
  }
}

export async function getLowStockProducts(storeId: UUID) {
  const db = getDb();

  return await db
    .select()
    .from(products)
    .where(
      and(
        eq(products.storeId, storeId),
        eq(products.trackInventory, true),
        sql`${products.inventoryQuantity} <= ${products.lowStockThreshold}`
      )
    )
    .orderBy(products.inventoryQuantity);
}
