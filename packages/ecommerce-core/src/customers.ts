import { eq, and, desc, sql, ilike } from "drizzle-orm";
import { getDb, customers, customerAddresses } from "@repo/database";
import type { Customer, Address, UUID, PaginationParams } from "@repo/types";

// ============================================================================
// CUSTOMER CRUD
// ============================================================================

export async function createCustomer(
  storeId: UUID,
  data: {
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    acceptsMarketing?: boolean;
  }
): Promise<Customer> {
  const db = getDb();

  const [customer] = await db
    .insert(customers)
    .values({
      storeId,
      ...data,
    })
    .returning();

  return customer as Customer;
}

export async function getCustomer(customerId: UUID): Promise<Customer | null> {
  const db = getDb();

  const [customer] = await db
    .select()
    .from(customers)
    .where(eq(customers.id, customerId))
    .limit(1);

  return (customer as Customer) || null;
}

export async function getCustomerByEmail(
  storeId: UUID,
  email: string
): Promise<Customer | null> {
  const db = getDb();

  const [customer] = await db
    .select()
    .from(customers)
    .where(and(eq(customers.storeId, storeId), eq(customers.email, email)))
    .limit(1);

  return (customer as Customer) || null;
}

export async function updateCustomer(
  customerId: UUID,
  data: Partial<{
    firstName: string;
    lastName: string;
    phone: string;
    notes: string;
    tags: string[];
    acceptsMarketing: boolean;
  }>
): Promise<Customer> {
  const db = getDb();

  const [customer] = await db
    .update(customers)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(customers.id, customerId))
    .returning();

  return customer as Customer;
}

export async function listCustomers(
  storeId: UUID,
  params: PaginationParams & {
    search?: string;
  }
) {
  const db = getDb();
  const { page = 1, limit = 20, search } = params;
  const offset = (page - 1) * limit;

  let conditions = [eq(customers.storeId, storeId)];

  if (search) {
    conditions.push(
      sql`${customers.email} ILIKE ${"%" + search + "%"} OR ${customers.firstName} ILIKE ${"%" + search + "%"} OR ${customers.lastName} ILIKE ${"%" + search + "%"}` as any
    );
  }

  const items = await db
    .select()
    .from(customers)
    .where(and(...conditions))
    .orderBy(desc(customers.createdAt))
    .limit(limit)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(customers)
    .where(and(...conditions));

  return {
    data: items as Customer[],
    pagination: {
      page,
      limit,
      total: Number(count),
      totalPages: Math.ceil(Number(count) / limit),
    },
  };
}

// ============================================================================
// CUSTOMER ADDRESSES
// ============================================================================

export async function addCustomerAddress(
  customerId: UUID,
  address: Address & { isDefault?: boolean }
) {
  const db = getDb();

  // If this is default, unset other defaults
  if (address.isDefault) {
    await db
      .update(customerAddresses)
      .set({ isDefault: false })
      .where(eq(customerAddresses.customerId, customerId));
  }

  const [newAddress] = await db
    .insert(customerAddresses)
    .values({
      customerId,
      ...address,
    })
    .returning();

  return newAddress;
}

export async function getCustomerAddresses(customerId: UUID) {
  const db = getDb();

  return await db
    .select()
    .from(customerAddresses)
    .where(eq(customerAddresses.customerId, customerId))
    .orderBy(desc(customerAddresses.isDefault));
}

// ============================================================================
// CUSTOMER SEGMENTS
// ============================================================================

export async function getHighValueCustomers(storeId: UUID, minSpent: number = 1000) {
  const db = getDb();

  return await db
    .select()
    .from(customers)
    .where(
      and(
        eq(customers.storeId, storeId),
        sql`CAST(${customers.totalSpent} AS DECIMAL) >= ${minSpent}`
      )
    )
    .orderBy(desc(customers.totalSpent));
}

export async function getAtRiskCustomers(storeId: UUID, daysSinceLastOrder: number = 90) {
  const db = getDb();

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysSinceLastOrder);

  return await db
    .select()
    .from(customers)
    .where(
      and(
        eq(customers.storeId, storeId),
        sql`${customers.lastOrderAt} < ${cutoffDate}`,
        sql`${customers.orderCount} > 0`
      )
    )
    .orderBy(customers.lastOrderAt);
}
