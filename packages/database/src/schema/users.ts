import { pgTable, text, timestamp, boolean, varchar, pgEnum } from 'drizzle-orm/pg-core';
import { createId } from '../utils';
import { organizations } from './organizations';

export const userRoleEnum = pgEnum('user_role', ['owner', 'admin', 'accountant', 'user', 'viewer']);

/**
 * Tabella Utenti
 * Gestisce gli utenti della piattaforma con supporto multi-tenant
 */
export const users = pgTable('users', {
  id: text('id').primaryKey().$defaultFn(createId),

  // Relazione con Organizzazione
  organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),

  // Dati Anagrafici
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: boolean('email_verified').notNull().default(false),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),

  // Auth (se implementi auth custom, altrimenti usa Clerk/Auth0/etc)
  passwordHash: text('password_hash'), // Hash password

  // Ruolo e Permessi
  role: userRoleEnum('role').notNull().default('user'),
  permissions: text('permissions').array().$type<string[]>(), // permessi granulari

  // Contatti
  phone: varchar('phone', { length: 20 }),
  avatar: text('avatar'), // URL immagine profilo

  // Preferenze
  language: varchar('language', { length: 5 }).notNull().default('it-IT'),
  timezone: varchar('timezone', { length: 50 }).notNull().default('Europe/Rome'),

  // Notifiche
  notificationPreferences: text('notification_preferences').array().notNull().default([
    'invoice_sent',
    'invoice_received',
    'payment_reminder',
    'sdi_notification'
  ]),

  // Security
  twoFactorEnabled: boolean('two_factor_enabled').notNull().default(false),
  twoFactorSecret: text('two_factor_secret'), // Encrypted TOTP secret

  // Session Management
  lastLoginAt: timestamp('last_login_at'),
  lastActivityAt: timestamp('last_activity_at'),

  // Status
  isActive: boolean('is_active').notNull().default(true),

  // Metadata
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
