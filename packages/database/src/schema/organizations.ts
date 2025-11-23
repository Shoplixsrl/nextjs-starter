import { pgTable, text, timestamp, boolean, jsonb, varchar } from 'drizzle-orm/pg-core';
import { createId } from '../utils';

/**
 * Tabella Organizzazioni (Multi-tenant)
 * Ogni azienda/professionista ha la propria organizzazione
 */
export const organizations = pgTable('organizations', {
  id: text('id').primaryKey().$defaultFn(createId),

  // Dati Anagrafici
  businessName: text('business_name').notNull(), // Denominazione / Ragione Sociale
  tradeName: text('trade_name'), // Nome Commerciale
  vatNumber: varchar('vat_number', { length: 11 }).notNull().unique(), // Partita IVA
  fiscalCode: varchar('fiscal_code', { length: 16 }), // Codice Fiscale

  // Regime Fiscale (per FatturaPA)
  taxRegime: varchar('tax_regime', { length: 10 }).notNull(), // RF01, RF02, RF04, RF05, RF09, RF10, RF11, RF12, RF13, RF14, RF15, RF16, RF17, RF18, RF19, RF20

  // Sede Legale
  legalAddress: jsonb('legal_address').notNull().$type<{
    street: string;
    streetNumber: string;
    zip: string;
    city: string;
    province: string;
    country: string; // IT per default
  }>(),

  // Sede Operativa (se diversa)
  operationalAddress: jsonb('operational_address').$type<{
    street: string;
    streetNumber: string;
    zip: string;
    city: string;
    province: string;
    country: string;
  }>(),

  // Contatti
  phone: varchar('phone', { length: 20 }),
  email: varchar('email', { length: 255 }).notNull(),
  pec: varchar('pec', { length: 255 }).notNull(), // PEC obbligatoria per fatturazione elettronica
  website: varchar('website', { length: 255 }),

  // SDI - Sistema di Interscambio
  sdiCode: varchar('sdi_code', { length: 7 }), // Codice Destinatario SDI (7 caratteri)

  // Dati Bancari
  bankAccounts: jsonb('bank_accounts').$type<Array<{
    iban: string;
    bic?: string;
    bankName: string;
    isDefault: boolean;
  }>>(),

  // Certificato Firma Digitale
  digitalSignature: jsonb('digital_signature').$type<{
    certificatePath?: string;
    password?: string; // Encrypted
    expiryDate?: string;
    issuer?: string;
  }>(),

  // Logo e Branding
  logo: text('logo'), // URL o base64
  brandColor: varchar('brand_color', { length: 7 }), // HEX color

  // Configurazioni Fatturazione
  invoiceSettings: jsonb('invoice_settings').$type<{
    invoicePrefix: string; // Prefisso numerazione (es. "FATT-")
    lastInvoiceNumber: number; // Ultimo numero fattura
    invoiceNumberFormat: string; // es. "YYYY/NNNN"
    paymentTermsDays: number; // Giorni scadenza default
    defaultPaymentMethod: string; // MP01, MP02, etc
    notes?: string; // Note standard fattura
  }>(),

  // Subscription & Billing
  subscriptionPlan: varchar('subscription_plan', { length: 50 }).notNull().default('free'), // free, starter, professional, enterprise
  subscriptionStatus: varchar('subscription_status', { length: 20 }).notNull().default('active'), // active, suspended, cancelled
  subscriptionEndsAt: timestamp('subscription_ends_at'),

  // Features Enabled (per piano)
  features: jsonb('features').$type<{
    maxInvoicesPerMonth: number;
    maxUsers: number;
    aiAssistant: boolean;
    apiAccess: boolean;
    customBranding: boolean;
    multiCurrency: boolean;
    advancedReports: boolean;
    bankReconciliation: boolean;
  }>(),

  // Metadata
  isActive: boolean('is_active').notNull().default(true),
  onboardingCompleted: boolean('onboarding_completed').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Organization = typeof organizations.$inferSelect;
export type NewOrganization = typeof organizations.$inferInsert;
