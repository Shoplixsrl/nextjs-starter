import { pgTable, text, varchar, timestamp, boolean, integer, decimal, json, uuid, pgEnum, index, uniqueIndex } from 'drizzle-orm/pg-core';

// Enums
export const userRoleEnum = pgEnum('user_role', ['super_admin', 'tenant_admin', 'manager', 'host', 'waiter', 'customer']);
export const reservationStatusEnum = pgEnum('reservation_status', ['pending', 'confirmed', 'seated', 'completed', 'cancelled', 'no_show']);
export const tableStatusEnum = pgEnum('table_status', ['available', 'occupied', 'reserved', 'maintenance']);

// Tenants (Restaurants)
export const tenants = pgTable('tenants', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  settings: json('settings'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Users
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }),
  email: varchar('email', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }),
  role: userRoleEnum('role').default('customer'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Guests
export const guests = pgTable('guests', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  totalVisits: integer('total_visits').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Tables
export const tables = pgTable('tables', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  number: varchar('number', { length: 50 }).notNull(),
  maxCapacity: integer('max_capacity').notNull(),
  status: tableStatusEnum('status').default('available'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Reservations
export const reservations = pgTable('reservations', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  guestId: uuid('guest_id').references(() => guests.id, { onDelete: 'set null' }),
  tableId: uuid('table_id').references(() => tables.id, { onDelete: 'set null' }),
  partySize: integer('party_size').notNull(),
  reservationDate: timestamp('reservation_date').notNull(),
  status: reservationStatusEnum('status').default('pending'),
  guestName: varchar('guest_name', { length: 255 }).notNull(),
  guestPhone: varchar('guest_phone', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
