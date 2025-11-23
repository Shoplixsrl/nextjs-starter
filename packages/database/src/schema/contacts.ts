import { pgTable, text, timestamp, boolean, jsonb, varchar, pgEnum } from 'drizzle-orm/pg-core';
import { createId } from '../utils';
import { organizations } from './organizations';

export const contactTypeEnum = pgEnum('contact_type', ['customer', 'supplier', 'both']);
export const contactCategoryEnum = pgEnum('contact_category', ['company', 'individual', 'freelance', 'public_administration']);

/**
 * Tabella Contatti (Clienti/Fornitori)
 * Gestisce anagrafiche clienti e fornitori con tutti i dati necessari per FatturaPA
 */
export const contacts = pgTable('contacts', {
  id: text('id').primaryKey().$defaultFn(createId),

  // Relazione con Organizzazione
  organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),

  // Tipo Contatto
  type: contactTypeEnum('type').notNull(),
  category: contactCategoryEnum('category').notNull(),

  // Dati Anagrafici
  businessName: text('business_name'), // Per aziende/PA
  firstName: text('first_name'), // Per persone fisiche
  lastName: text('last_name'),
  fullName: text('full_name').notNull(), // Nome completo (generato)

  // Dati Fiscali (FatturaPA)
  vatNumber: varchar('vat_number', { length: 16 }), // Partita IVA (può essere estera)
  fiscalCode: varchar('fiscal_code', { length: 16 }), // Codice Fiscale
  taxRegime: varchar('tax_regime', { length: 10 }), // RF01-RF20 (se forfettario)

  // Indirizzo Sede Legale
  address: jsonb('address').notNull().$type<{
    street: string;
    streetNumber: string;
    zip: string;
    city: string;
    province: string;
    country: string;
  }>(),

  // Contatti
  email: varchar('email', { length: 255 }),
  pec: varchar('pec', { length: 255 }), // PEC (se presente)
  phone: varchar('phone', { length: 20 }),
  mobile: varchar('mobile', { length: 20 }),
  website: varchar('website', { length: 255 }),

  // SDI - Sistema di Interscambio
  sdiCode: varchar('sdi_code', { length: 7 }), // Codice Destinatario SDI
  sdiPec: varchar('sdi_pec', { length: 255 }), // PEC per invio tramite SDI

  // Split Payment (PA)
  splitPayment: boolean('split_payment').notNull().default(false), // Scissione dei pagamenti

  // Dati Bancari
  iban: varchar('iban', { length: 34 }),
  bic: varchar('bic', { length: 11 }),
  bankName: text('bank_name'),

  // Condizioni Pagamento Default
  paymentTermsDays: varchar('payment_terms_days', { length: 10 }).notNull().default('30'), // TP01, TP02, TP03
  paymentMethod: varchar('payment_method', { length: 10 }).notNull().default('MP05'), // MP01-MP23

  // Pricing
  defaultDiscount: varchar('default_discount', { length: 10 }), // Sconto percentuale default
  priceList: text('price_list'), // Listino prezzi applicato

  // Note e Riferimenti
  notes: text('notes'),
  internalCode: varchar('internal_code', { length: 50 }), // Codice cliente interno
  tags: text('tags').array(), // Tag per categorizzazione

  // CRM Data
  source: varchar('source', { length: 100 }), // Canale acquisizione
  assignedTo: text('assigned_to'), // Utente assegnato (commerciale)

  // Statistiche
  totalInvoiced: varchar('total_invoiced', { length: 20 }).notNull().default('0'), // Totale fatturato
  totalPaid: varchar('total_paid', { length: 20 }).notNull().default('0'), // Totale incassato
  openBalance: varchar('open_balance', { length: 20 }).notNull().default('0'), // Saldo aperto
  lastInvoiceDate: timestamp('last_invoice_date'),

  // Status
  isActive: boolean('is_active').notNull().default(true),
  isBlocked: boolean('is_blocked').notNull().default(false), // Bloccato per morosità

  // Metadata
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  createdBy: text('created_by'),
});

export type Contact = typeof contacts.$inferSelect;
export type NewContact = typeof contacts.$inferInsert;
