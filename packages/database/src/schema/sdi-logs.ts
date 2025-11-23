import { pgTable, text, timestamp, jsonb, varchar, pgEnum } from 'drizzle-orm/pg-core';
import { createId } from '../utils';
import { organizations } from './organizations';
import { invoices } from './invoices';

export const sdiEventTypeEnum = pgEnum('sdi_event_type', [
  'submission', // Invio
  'receipt', // Ricevuta consegna (RC)
  'acceptance', // Notifica accettazione (MC)
  'rejection', // Notifica rifiuto (NS)
  'delivery_failed', // Mancata consegna (MC negativa)
  'payment_notification', // Notifica decorrenza termini
  'metadata_error', // Scarto per errori formali (SE)
]);

/**
 * Tabella Log SDI
 * Traccia tutti gli eventi del Sistema di Interscambio
 */
export const sdiLogs = pgTable('sdi_logs', {
  id: text('id').primaryKey().$defaultFn(createId),

  // Relazioni
  organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  invoiceId: text('invoice_id').references(() => invoices.id, { onDelete: 'set null' }),

  // Tipo Evento
  eventType: sdiEventTypeEnum('event_type').notNull(),

  // Identificativi SDI
  transmissionId: varchar('transmission_id', { length: 50 }), // IdentificativoSdI
  messageId: varchar('message_id', { length: 50 }), // MessageId
  fileName: varchar('file_name', { length: 100 }), // NomeFile

  // Dettagli Evento
  eventDate: timestamp('event_date').notNull(), // Data/ora evento
  description: text('description'),

  // Payload Completo (XML ricevuto da SDI)
  rawXml: text('raw_xml'), // XML completo notifica
  parsedData: jsonb('parsed_data').$type<{
    recipientCode?: string; // CodiceDestinatario
    recipientPec?: string; // PecDestinatario
    outcomeCode?: string; // Esito (EC01-EC02)
    errorCode?: string; // Codice errore
    errorDescription?: string; // Descrizione errore
    refDate?: string; // DataRiferimento
    notes?: string; // Note
  }>(),

  // HTTP Request/Response (se API REST)
  httpStatus: varchar('http_status', { length: 10 }),
  requestPayload: jsonb('request_payload'),
  responsePayload: jsonb('response_payload'),

  // Error Handling
  isError: varchar('is_error', { length: 10 }).notNull().default('false'),
  errorMessage: text('error_message'),
  stackTrace: text('stack_trace'),

  // Metadata
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export type SdiLog = typeof sdiLogs.$inferSelect;
export type NewSdiLog = typeof sdiLogs.$inferInsert;
