import { pgTable, text, timestamp, varchar, decimal, date, pgEnum } from 'drizzle-orm/pg-core';
import { createId } from '../utils';
import { organizations } from './organizations';
import { invoices } from './invoices';

export const paymentMethodEnum = pgEnum('payment_method', [
  'MP01', // Contanti
  'MP02', // Assegno
  'MP03', // Assegno circolare
  'MP04', // Contanti presso Tesoreria
  'MP05', // Bonifico
  'MP06', // Vaglia cambiario
  'MP07', // Bollettino bancario
  'MP08', // Carta di pagamento
  'MP09', // RID
  'MP10', // RID utenze
  'MP11', // RID veloce
  'MP12', // RIBA
  'MP13', // MAV
  'MP14', // Quietanza erario
  'MP15', // Giroconto su conti di contabilità speciale
  'MP16', // Domiciliazione bancaria
  'MP17', // Domiciliazione postale
  'MP18', // Bollettino di c/c postale
  'MP19', // SEPA Direct Debit
  'MP20', // SEPA Direct Debit CORE
  'MP21', // SEPA Direct Debit B2B
  'MP22', // Trattenuta su somme già riscosse
  'MP23', // PagoPA
]);

/**
 * Tabella Pagamenti
 * Registra i pagamenti effettivi ricevuti/effettuati
 */
export const payments = pgTable('payments', {
  id: text('id').primaryKey().$defaultFn(createId),

  // Relazioni
  organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  invoiceId: text('invoice_id').notNull().references(() => invoices.id, { onDelete: 'cascade' }),

  // Data e Metodo
  paymentDate: date('payment_date').notNull(),
  paymentMethod: paymentMethodEnum('payment_method').notNull(),

  // Importo
  amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),

  // Riferimenti Bancari
  transactionReference: varchar('transaction_reference', { length: 100 }), // CRO, TRN, etc
  bankAccount: varchar('bank_account', { length: 34 }), // IBAN

  // Note
  notes: text('notes'),

  // Metadata
  createdAt: timestamp('created_at').notNull().defaultNow(),
  createdBy: text('created_by'),
});

export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;

/**
 * Tabella Scadenzario
 * Pianifica le scadenze di pagamento
 */
export const paymentSchedule = pgTable('payment_schedule', {
  id: text('id').primaryKey().$defaultFn(createId),

  // Relazioni
  organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  invoiceId: text('invoice_id').notNull().references(() => invoices.id, { onDelete: 'cascade' }),

  // Scadenza
  dueDate: date('due_date').notNull(),
  amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
  paidAmount: decimal('paid_amount', { precision: 12, scale: 2 }).notNull().default('0'),
  remainingAmount: decimal('remaining_amount', { precision: 12, scale: 2 }).notNull(),

  // Status
  isPaid: varchar('is_paid', { length: 10 }).notNull().default('false'),
  isOverdue: varchar('is_overdue', { length: 10 }).notNull().default('false'),

  // Reminder
  reminderSent: varchar('reminder_sent', { length: 10 }).notNull().default('false'),
  reminderSentAt: timestamp('reminder_sent_at'),
  reminderCount: varchar('reminder_count', { length: 10 }).notNull().default('0'),

  // Metadata
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type PaymentScheduleEntry = typeof paymentSchedule.$inferSelect;
export type NewPaymentScheduleEntry = typeof paymentSchedule.$inferInsert;
