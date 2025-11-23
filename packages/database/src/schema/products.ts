import { pgTable, text, timestamp, boolean, varchar, decimal, pgEnum } from 'drizzle-orm/pg-core';
import { createId } from '../utils';
import { organizations } from './organizations';

export const productTypeEnum = pgEnum('product_type', ['product', 'service']);
export const vatRateEnum = pgEnum('vat_rate', ['0', '4', '5', '10', '22']); // Aliquote IVA italiane

/**
 * Tabella Prodotti/Servizi
 * Catalogo prodotti e servizi venduti
 */
export const products = pgTable('products', {
  id: text('id').primaryKey().$defaultFn(createId),

  // Relazione con Organizzazione
  organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),

  // Tipo
  type: productTypeEnum('type').notNull(),

  // Identificativi
  code: varchar('code', { length: 50 }).notNull(), // Codice interno
  ean: varchar('ean', { length: 13 }), // Codice EAN/GTIN
  sku: varchar('sku', { length: 50 }), // SKU

  // Descrizione
  name: text('name').notNull(),
  description: text('description'),
  shortDescription: varchar('short_description', { length: 255 }),

  // Prezzi (in centesimi per precisione)
  unitPrice: decimal('unit_price', { precision: 12, scale: 2 }).notNull(), // Prezzo unitario
  costPrice: decimal('cost_price', { precision: 12, scale: 2 }), // Costo acquisto
  listPrice: decimal('list_price', { precision: 12, scale: 2 }), // Prezzo listino

  // IVA e Tassazione
  vatRate: vatRateEnum('vat_rate').notNull().default('22'),
  vatExemptionCode: varchar('vat_exemption_code', { length: 10 }), // N1-N7 (se IVA esente/non imponibile)

  // Unità di Misura (per FatturaPA)
  unitOfMeasure: varchar('unit_of_measure', { length: 10 }).notNull().default('pz'), // pz, kg, h, etc

  // Categoria
  category: text('category'),
  tags: text('tags').array(),

  // Magazzino (opzionale)
  trackInventory: boolean('track_inventory').notNull().default(false),
  currentStock: decimal('current_stock', { precision: 12, scale: 2 }),
  minStockLevel: decimal('min_stock_level', { precision: 12, scale: 2 }),

  // Immagini
  image: text('image'), // URL immagine principale
  images: text('images').array(), // Galleria immagini

  // Note
  notes: text('notes'),

  // Status
  isActive: boolean('is_active').notNull().default(true),
  isFeatured: boolean('is_featured').notNull().default(false),

  // Metadata
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
