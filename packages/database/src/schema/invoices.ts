import { pgTable, text, timestamp, boolean, jsonb, varchar, decimal, pgEnum, date } from 'drizzle-orm/pg-core';
import { createId } from '../utils';
import { organizations } from './organizations';
import { contacts } from './contacts';

export const invoiceTypeEnum = pgEnum('invoice_type', [
  'TD01', // Fattura
  'TD02', // Acconto/Anticipo su fattura
  'TD03', // Acconto/Anticipo su parcella
  'TD04', // Nota di Credito
  'TD05', // Nota di Debito
  'TD06', // Parcella
  'TD16', // Integrazione fattura reverse charge interno
  'TD17', // Integrazione/autofattura per acquisto servizi dall'estero
  'TD18', // Integrazione per acquisto di beni intracomunitari
  'TD19', // Integrazione/autofattura per acquisto di beni ex art.17 c.2 DPR 633/72
  'TD20', // Autofattura per regolarizzazione e integrazione delle fatture
  'TD21', // Autofattura per splafonamento
  'TD22', // Estrazione beni da Deposito IVA
  'TD23', // Estrazione beni da Deposito IVA con versamento dell\'IVA
  'TD24', // Fattura differita di cui all\'art.21, comma 4, lett. a)
  'TD25', // Fattura differita di cui all\'art.21, comma 4, terzo periodo lett. b)
  'TD26', // Cessione di beni ammortizzabili e per passaggi interni
  'TD27', // Fattura per autoconsumo o per cessioni gratuite senza rivalsa
  'TD28', // Acquisti da San Marino con IVA
  'TD29', // Regolarizzazione/Integrazione
]);

export const invoiceStatusEnum = pgEnum('invoice_status', [
  'draft', // Bozza
  'pending', // In attesa di invio
  'sent', // Inviata a SDI
  'delivered', // Consegnata al destinatario
  'accepted', // Accettata
  'rejected', // Rifiutata
  'paid', // Pagata
  'overdue', // Scaduta
  'cancelled', // Annullata
]);

export const paymentStatusEnum = pgEnum('payment_status', [
  'unpaid',
  'partial',
  'paid',
  'overpaid',
]);

/**
 * Tabella Fatture
 * Gestisce tutte le fatture elettroniche con formato FatturaPA compliant
 */
export const invoices = pgTable('invoices', {
  id: text('id').primaryKey().$defaultFn(createId),

  // Relazioni
  organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  contactId: text('contact_id').notNull().references(() => contacts.id),

  // Numerazione Fattura (FatturaPA)
  number: varchar('number', { length: 20 }).notNull(), // Numero fattura
  year: varchar('year', { length: 4 }).notNull(), // Anno di riferimento
  fullNumber: varchar('full_number', { length: 50 }).notNull(), // es. "2025/0001"

  // Tipo Documento (TD01-TD29)
  type: invoiceTypeEnum('type').notNull().default('TD01'),

  // Date
  issueDate: date('issue_date').notNull(), // Data emissione
  dueDate: date('due_date'), // Data scadenza pagamento
  paymentDate: timestamp('payment_date'), // Data effettivo pagamento

  // Importi (in centesimi)
  subtotal: decimal('subtotal', { precision: 12, scale: 2 }).notNull(), // Imponibile
  taxAmount: decimal('tax_amount', { precision: 12, scale: 2 }).notNull(), // Totale IVA
  total: decimal('total', { precision: 12, scale: 2 }).notNull(), // Totale documento
  discountAmount: decimal('discount_amount', { precision: 12, scale: 2 }), // Sconto totale
  stampDuty: decimal('stamp_duty', { precision: 12, scale: 2 }), // Bollo (2,00€ se > 77,47€)
  withholdingTax: decimal('withholding_tax', { precision: 12, scale: 2 }), // Ritenuta d'acconto
  socialSecurityContribution: decimal('social_security_contribution', { precision: 12, scale: 2 }), // Contributo previdenziale (4%)
  netToPay: decimal('net_to_pay', { precision: 12, scale: 2 }).notNull(), // Totale da pagare (netto)

  // Riepilogo IVA per aliquota (per FatturaPA)
  vatSummary: jsonb('vat_summary').notNull().$type<Array<{
    vatRate: string; // "0", "4", "5", "10", "22"
    taxableAmount: string; // Imponibile
    vatAmount: string; // IVA
    exemptionCode?: string; // N1-N7 se esente
    exemptionReason?: string; // Motivazione esenzione
  }>>(),

  // Dati Pagamento (FatturaPA)
  paymentConditions: varchar('payment_conditions', { length: 10 }).notNull().default('TP02'), // TP01-TP03
  paymentMethod: varchar('payment_method', { length: 10 }).notNull().default('MP05'), // MP01-MP23
  paymentTerms: varchar('payment_terms', { length: 10 }), // Giorni scadenza
  bankAccount: jsonb('bank_account').$type<{
    iban: string;
    bic?: string;
    bankName: string;
  }>(),

  // Note e Causale
  subject: text('subject'), // Causale
  notes: text('notes'), // Note
  internalNotes: text('internal_notes'), // Note interne (non su fattura)

  // Riferimenti
  orderReference: varchar('order_reference', { length: 100 }), // Numero ordine
  contractReference: varchar('contract_reference', { length: 100 }), // Numero contratto
  cupCode: varchar('cup_code', { length: 15 }), // CUP (Codice Unico Progetto) per PA
  cigCode: varchar('cig_code', { length: 15 }), // CIG (Codice Identificativo Gara) per PA

  // SDI - Sistema di Interscambio
  sdiStatus: invoiceStatusEnum('sdi_status').notNull().default('draft'),
  sdiMessageId: varchar('sdi_message_id', { length: 50 }), // ID messaggio SDI
  sdiTransmissionId: varchar('sdi_transmission_id', { length: 50 }), // Identificativo trasmissione
  sdiFileName: varchar('sdi_file_name', { length: 100 }), // Nome file XML
  sdiSentAt: timestamp('sdi_sent_at'), // Data invio SDI
  sdiDeliveredAt: timestamp('sdi_delivered_at'), // Data consegna
  sdiAcceptedAt: timestamp('sdi_accepted_at'), // Data accettazione
  sdiRejectedAt: timestamp('sdi_rejected_at'), // Data rifiuto
  sdiRejectionReason: text('sdi_rejection_reason'), // Motivo rifiuto

  // File Attachments
  xmlFile: text('xml_file'), // URL file XML FatturaPA
  pdfFile: text('pdf_file'), // URL PDF fattura
  signedXmlFile: text('signed_xml_file'), // URL XML firmato digitalmente
  attachments: jsonb('attachments').$type<Array<{
    name: string;
    url: string;
    type: string;
    size: number;
  }>>(),

  // Stato Pagamento
  paymentStatus: paymentStatusEnum('payment_status').notNull().default('unpaid'),
  paidAmount: decimal('paid_amount', { precision: 12, scale: 2 }).notNull().default('0'),
  remainingAmount: decimal('remaining_amount', { precision: 12, scale: 2 }),

  // Storni e Rettifiche
  relatedInvoiceId: text('related_invoice_id'), // Fattura correlata (per note credito/debito)
  creditNotes: text('credit_notes').array(), // IDs note di credito emesse

  // Split Payment (PA)
  splitPayment: boolean('split_payment').notNull().default(false),

  // Reverse Charge
  reverseCharge: boolean('reverse_charge').notNull().default(false),

  // Conservazione Sostitutiva
  archived: boolean('archived').notNull().default(false),
  archivedAt: timestamp('archived_at'),
  archiveReference: varchar('archive_reference', { length: 100 }), // Riferimento conservazione

  // Email Tracking
  emailSent: boolean('email_sent').notNull().default(false),
  emailSentAt: timestamp('email_sent_at'),
  emailOpenedAt: timestamp('email_opened_at'),

  // Metadata
  isRecurring: boolean('is_recurring').notNull().default(false), // Fattura ricorrente
  recurringSchedule: jsonb('recurring_schedule').$type<{
    frequency: 'monthly' | 'quarterly' | 'yearly';
    dayOfMonth?: number;
    endDate?: string;
  }>(),

  tags: text('tags').array(),

  // Audit
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  createdBy: text('created_by'),
  lockedAt: timestamp('locked_at'), // Lock dopo invio SDI
  lockedBy: text('locked_by'),
});

export type Invoice = typeof invoices.$inferSelect;
export type NewInvoice = typeof invoices.$inferInsert;
