/**
 * FatturaPA Validator
 * Validates invoice data against FatturaPA specifications
 */

import { z } from 'zod';

/**
 * Validation schemas for FatturaPA data
 */

const addressSchema = z.object({
  street: z.string().min(1).max(60),
  streetNumber: z.string().max(8),
  zip: z.string().regex(/^\d{5}$/),
  city: z.string().min(1).max(60),
  province: z.string().length(2).regex(/^[A-Z]{2}$/),
  country: z.string().length(2).regex(/^[A-Z]{2}$/),
});

const contactSchema = z.object({
  phone: z.string().max(12).optional(),
  fax: z.string().max(12).optional(),
  email: z.string().email().max(256).optional(),
});

const companyDataSchema = z.object({
  vatNumber: z.string().regex(/^[A-Z]{2}[0-9A-Z]{2,28}$/).optional(),
  fiscalCode: z.string().max(28).optional(),
  businessName: z.string().min(1).max(80).optional(),
  firstName: z.string().max(60).optional(),
  lastName: z.string().max(60).optional(),
  title: z.string().max(10).optional(),
  eoriCode: z.string().max(17).optional(),
  address: addressSchema,
  permanentEstablishment: addressSchema.optional(),
  reaRegistration: z.object({
    office: z.string().length(2),
    number: z.string().max(20),
    shareCapital: z.string().optional(),
    solePartner: z.enum(['SU', 'SM']).optional(),
    liquidationStatus: z.enum(['LS', 'LN']).optional(),
  }).optional(),
  contact: contactSchema.optional(),
  adminReference: z.string().max(20).optional(),
});

const invoiceLineSchema = z.object({
  lineNumber: z.number().int().positive(),
  itemCode: z.object({
    type: z.string().max(35),
    value: z.string().max(35),
  }).optional(),
  description: z.string().min(1).max(1000),
  quantity: z.string().regex(/^-?\d+(\.\d{2,8})?$/),
  unitOfMeasure: z.string().max(10),
  unitPrice: z.string().regex(/^-?\d+(\.\d{2,8})?$/),
  discountsMarkups: z.array(z.object({
    type: z.enum(['SC', 'MG']),
    percentage: z.string().regex(/^\d+(\.\d{2})?$/).optional(),
    amount: z.string().regex(/^\d+(\.\d{2})?$/).optional(),
  })).optional(),
  totalPrice: z.string().regex(/^-?\d+(\.\d{2,8})?$/),
  vatRate: z.string().regex(/^\d+(\.\d{2})?$/),
  exemptionCode: z.string().regex(/^N[1-7]$/).optional(),
  exemptionReason: z.string().max(100).optional(),
  withholdingTax: z.literal('SI').optional(),
  adminReferences: z.array(z.string().max(20)).optional(),
});

const vatSummarySchema = z.object({
  taxableAmount: z.string().regex(/^-?\d+(\.\d{2})?$/),
  vatRate: z.string().regex(/^\d+(\.\d{2})?$/),
  vatAmount: z.string().regex(/^-?\d+(\.\d{2})?$/),
  exemptionCode: z.string().regex(/^N[1-7]$/).optional(),
  exemptionReason: z.string().max(100).optional(),
  adminReference: z.string().max(20).optional(),
  reverseCharge: z.literal('SI').optional(),
  exigibility: z.enum(['I', 'D', 'S']).optional(),
  legalReference: z.string().max(100).optional(),
});

const paymentDetailSchema = z.object({
  beneficiary: z.string().max(200).optional(),
  paymentMethod: z.string().regex(/^MP\d{2}$/),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  amount: z.string().regex(/^\d+(\.\d{2})?$/),
  postOfficeCode: z.string().max(20).optional(),
  payerSurname: z.string().max(60).optional(),
  payerFirstName: z.string().max(60).optional(),
  payerFiscalCode: z.string().max(16).optional(),
  payerTitle: z.string().max(10).optional(),
  bankAccount: z.object({
    iban: z.string().regex(/^[A-Z]{2}\d{2}[A-Z0-9]+$/).optional(),
    bic: z.string().regex(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/).optional(),
    financialInstitution: z.string().max(80).optional(),
  }).optional(),
  postalPayment: z.object({
    accountHolder: z.string().max(200).optional(),
    accountNumber: z.string().max(20).optional(),
  }).optional(),
});

const paymentDataSchema = z.object({
  paymentConditions: z.enum(['TP01', 'TP02', 'TP03']),
  details: z.array(paymentDetailSchema).min(1),
});

const invoiceBodySchema = z.object({
  generalData: z.object({
    documentType: z.string().regex(/^TD\d{2}$/),
    currency: z.string().length(3),
    invoiceNumber: z.string().min(1).max(20),
    invoiceDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    vendor: companyDataSchema.optional(),
    customer: companyDataSchema,
    intermediary: companyDataSchema.optional(),
    issuer: z.enum(['CC', 'TZ']).optional(),
    subject: z.array(z.string().max(200)).optional(),
    art73: z.boolean().optional(),
  }),
  goodsServices: z.object({
    lines: z.array(invoiceLineSchema).min(1),
    vatSummary: z.array(vatSummarySchema).min(1),
  }),
  vehicles: z.array(z.object({
    registrationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    registrationNumber: z.string().max(15),
    totalKm: z.string().optional(),
  })).optional(),
  payment: z.array(paymentDataSchema).optional(),
  attachments: z.array(z.object({
    name: z.string().max(60),
    algorithm: z.string().optional(),
    format: z.string().optional(),
    description: z.string().max(100).optional(),
    data: z.string(), // Base64
  })).optional(),
});

const fatturaPASchema = z.object({
  transmissionData: z.object({
    transmissionId: z.string().min(1).max(5),
    transmissionFormat: z.enum(['FPR12', 'FPA12']),
    transmissionCode: z.string().min(7),
    sender: z.object({
      vatNumber: z.string().regex(/^[A-Z]{2}\d{11}$/),
      fiscalCode: z.string().max(16).optional(),
      businessName: z.string().max(80).optional(),
      firstName: z.string().max(60).optional(),
      lastName: z.string().max(60).optional(),
      taxRegime: z.string().regex(/^RF\d{2}$/),
      address: addressSchema,
      contact: contactSchema.optional(),
      issuingOfficeRef: z.string().max(20).optional(),
    }),
  }),
  invoiceBody: z.array(invoiceBodySchema).min(1),
});

export type ValidatedFatturaPA = z.infer<typeof fatturaPASchema>;

/**
 * Validate FatturaPA data
 */
export function validateFatturaPA(data: unknown): {
  success: boolean;
  data?: ValidatedFatturaPA;
  errors?: z.ZodError;
} {
  try {
    const validated = fatturaPASchema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error };
    }
    throw error;
  }
}

/**
 * Validation utilities
 */
export const ValidationUtils = {
  /**
   * Check if VAT number is valid (Italian format)
   */
  isValidItalianVAT(vat: string): boolean {
    return /^IT\d{11}$/.test(vat);
  },

  /**
   * Check if fiscal code is valid (Italian format)
   */
  isValidItalianFiscalCode(fc: string): boolean {
    return /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/.test(fc);
  },

  /**
   * Check if SDI code is valid (7 characters)
   */
  isValidSDICode(code: string): boolean {
    return /^[A-Z0-9]{7}$/.test(code);
  },

  /**
   * Check if PEC email is valid
   */
  isValidPEC(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  /**
   * Format amount to FatturaPA decimal format
   */
  formatAmount(amount: number): string {
    return amount.toFixed(2);
  },

  /**
   * Format date to YYYY-MM-DD
   */
  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  },
};
