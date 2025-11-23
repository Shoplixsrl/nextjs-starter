import { pgTable, text, timestamp, varchar, decimal, integer } from 'drizzle-orm/pg-core';
import { createId } from '../utils';
import { invoices } from './invoices';
import { products } from './products';

/**
 * Tabella Righe Fattura
 * Dettaglio dei prodotti/servizi venduti in ogni fattura
 */
export const invoiceItems = pgTable('invoice_items', {
  id: text('id').primaryKey().$defaultFn(createId),

  // Relazioni
  invoiceId: text('invoice_id').notNull().references(() => invoices.id, { onDelete: 'cascade' }),
  productId: text('product_id').references(() => products.id), // Opzionale: può essere prodotto custom

  // Ordinamento
  lineNumber: integer('line_number').notNull(), // Numero riga (1, 2, 3...)

  // Descrizione
  description: text('description').notNull(), // Descrizione completa
  code: varchar('code', { length: 50 }), // Codice prodotto

  // Quantità e Unità di Misura
  quantity: decimal('quantity', { precision: 12, scale: 3 }).notNull(),
  unitOfMeasure: varchar('unit_of_measure', { length: 10 }).notNull().default('pz'),

  // Prezzi (in centesimi)
  unitPrice: decimal('unit_price', { precision: 12, scale: 2 }).notNull(),
  discount: decimal('discount', { precision: 5, scale: 2 }), // Percentuale sconto (es. 10.00 = 10%)
  discountAmount: decimal('discount_amount', { precision: 12, scale: 2 }), // Importo sconto

  // Totali
  subtotal: decimal('subtotal', { precision: 12, scale: 2 }).notNull(), // Imponibile riga
  vatRate: varchar('vat_rate', { length: 5 }).notNull(), // "0", "4", "5", "10", "22"
  vatAmount: decimal('vat_amount', { precision: 12, scale: 2 }).notNull(), // IVA riga
  total: decimal('total', { precision: 12, scale: 2 }).notNull(), // Totale riga

  // Esenzione IVA (se applicabile)
  vatExemptionCode: varchar('vat_exemption_code', { length: 10 }), // N1-N7
  vatExemptionReason: text('vat_exemption_reason'), // Motivazione esenzione

  // Ritenuta d'acconto su questa riga
  withholdingTax: decimal('withholding_tax', { precision: 12, scale: 2 }),
  withholdingTaxRate: decimal('withholding_tax_rate', { precision: 5, scale: 2 }), // % ritenuta

  // Note
  notes: text('notes'),

  // Metadata
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type InvoiceItem = typeof invoiceItems.$inferSelect;
export type NewInvoiceItem = typeof invoiceItems.$inferInsert;
