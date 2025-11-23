import { pgTable, text, timestamp, boolean, jsonb, varchar, decimal, pgEnum, date } from 'drizzle-orm/pg-core';
import { createId } from '../utils';
import { organizations } from './organizations';
import { contacts } from './contacts';

export const quoteStatusEnum = pgEnum('quote_status', [
  'draft',
  'sent',
  'viewed',
  'accepted',
  'rejected',
  'expired',
  'converted', // Convertito in fattura
]);

/**
 * Tabella Preventivi
 * Gestisce preventivi/offerte che possono essere convertiti in fatture
 */
export const quotes = pgTable('quotes', {
  id: text('id').primaryKey().$defaultFn(createId),

  // Relazioni
  organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  contactId: text('contact_id').notNull().references(() => contacts.id),

  // Numerazione
  number: varchar('number', { length: 20 }).notNull(),
  year: varchar('year', { length: 4 }).notNull(),
  fullNumber: varchar('full_number', { length: 50 }).notNull(),

  // Date
  issueDate: date('issue_date').notNull(),
  validUntil: date('valid_until').notNull(), // Validità preventivo
  acceptedAt: timestamp('accepted_at'),
  rejectedAt: timestamp('rejected_at'),

  // Importi
  subtotal: decimal('subtotal', { precision: 12, scale: 2 }).notNull(),
  taxAmount: decimal('tax_amount', { precision: 12, scale: 2 }).notNull(),
  total: decimal('total', { precision: 12, scale: 2 }).notNull(),
  discountAmount: decimal('discount_amount', { precision: 12, scale: 2 }),

  // Condizioni
  paymentTerms: varchar('payment_terms', { length: 10 }),
  paymentMethod: varchar('payment_method', { length: 10 }),
  deliveryTerms: text('delivery_terms'), // Condizioni consegna

  // Contenuto
  subject: text('subject'),
  notes: text('notes'),
  termsAndConditions: text('terms_and_conditions'), // Termini e condizioni

  // Status
  status: quoteStatusEnum('status').notNull().default('draft'),

  // Conversione
  convertedToInvoiceId: text('converted_to_invoice_id'),
  convertedAt: timestamp('converted_at'),

  // File
  pdfFile: text('pdf_file'),
  attachments: jsonb('attachments').$type<Array<{
    name: string;
    url: string;
    type: string;
    size: number;
  }>>(),

  // Email Tracking
  emailSent: boolean('email_sent').notNull().default(false),
  emailSentAt: timestamp('email_sent_at'),
  emailOpenedAt: timestamp('email_opened_at'),

  // Metadata
  tags: text('tags').array(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  createdBy: text('created_by'),
});

export type Quote = typeof quotes.$inferSelect;
export type NewQuote = typeof quotes.$inferInsert;
