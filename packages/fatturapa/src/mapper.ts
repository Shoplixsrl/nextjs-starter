/**
 * Database to FatturaPA Mapper
 * Converts database entities to FatturaPA format
 */

import type { Invoice, InvoiceItem, Organization, Contact } from '@fattura-ai/database';
import type { FatturaPAData } from './types';
import { ValidationUtils } from './validator';

/**
 * Map database invoice to FatturaPA data structure
 */
export function mapInvoiceToFatturaPA(
  invoice: Invoice,
  invoiceItems: InvoiceItem[],
  organization: Organization,
  contact: Contact
): FatturaPAData {
  const transmissionId = generateTransmissionId(organization, invoice);

  return {
    transmissionData: {
      transmissionId,
      transmissionFormat: contact.category === 'public_administration' ? 'FPA12' : 'FPR12',
      transmissionCode: contact.sdiCode || contact.sdiPec || contact.pec || '',

      sender: {
        vatNumber: organization.vatNumber,
        fiscalCode: organization.fiscalCode,
        businessName: organization.businessName,
        taxRegime: organization.taxRegime,
        address: {
          street: organization.legalAddress.street,
          streetNumber: organization.legalAddress.streetNumber,
          zip: organization.legalAddress.zip,
          city: organization.legalAddress.city,
          province: organization.legalAddress.province,
          country: organization.legalAddress.country,
        },
        contact: {
          phone: organization.phone,
          email: organization.email,
        },
      },
    },

    invoiceBody: [
      {
        generalData: {
          documentType: invoice.type,
          currency: 'EUR',
          invoiceNumber: invoice.number,
          invoiceDate: invoice.issueDate.toString(),

          customer: {
            vatNumber: contact.vatNumber,
            fiscalCode: contact.fiscalCode,
            businessName: contact.businessName || undefined,
            firstName: contact.firstName || undefined,
            lastName: contact.lastName || undefined,
            address: {
              street: contact.address.street,
              streetNumber: contact.address.streetNumber,
              zip: contact.address.zip,
              city: contact.address.city,
              province: contact.address.province,
              country: contact.address.country,
            },
            contact: {
              phone: contact.phone,
              email: contact.email,
            },
          },

          subject: invoice.subject ? [invoice.subject] : undefined,
        },

        goodsServices: {
          lines: invoiceItems
            .sort((a, b) => a.lineNumber - b.lineNumber)
            .map(item => ({
              lineNumber: item.lineNumber,
              itemCode: item.code ? {
                type: 'INTERNAL',
                value: item.code,
              } : undefined,
              description: item.description,
              quantity: item.quantity.toString(),
              unitOfMeasure: item.unitOfMeasure,
              unitPrice: ValidationUtils.formatAmount(parseFloat(item.unitPrice)),
              discountsMarkups: item.discount ? [{
                type: 'SC' as const,
                percentage: item.discount.toString(),
              }] : undefined,
              totalPrice: ValidationUtils.formatAmount(parseFloat(item.subtotal)),
              vatRate: item.vatRate,
              exemptionCode: item.vatExemptionCode || undefined,
              exemptionReason: item.vatExemptionReason || undefined,
              withholdingTax: item.withholdingTax && parseFloat(item.withholdingTax) > 0 ? 'SI' : undefined,
            })),

          vatSummary: invoice.vatSummary.map(vat => ({
            taxableAmount: vat.taxableAmount,
            vatRate: vat.vatRate,
            vatAmount: vat.vatAmount,
            exemptionCode: vat.exemptionCode,
            exemptionReason: vat.exemptionReason,
            exigibility: invoice.splitPayment ? 'S' : 'I',
          })),
        },

        payment: invoice.paymentMethod ? [{
          paymentConditions: invoice.paymentConditions as 'TP01' | 'TP02' | 'TP03',
          details: [{
            paymentMethod: invoice.paymentMethod,
            dueDate: invoice.dueDate?.toString(),
            amount: ValidationUtils.formatAmount(parseFloat(invoice.netToPay)),
            bankAccount: invoice.bankAccount ? {
              iban: invoice.bankAccount.iban,
              bic: invoice.bankAccount.bic,
              financialInstitution: invoice.bankAccount.bankName,
            } : undefined,
          }],
        }] : undefined,
      },
    ],
  };
}

/**
 * Generate unique transmission ID
 * Format: Sequential number padded to 5 digits
 */
function generateTransmissionId(organization: Organization, invoice: Invoice): string {
  // Use invoice number as transmission ID (ensure 5 digits max)
  const num = parseInt(invoice.number) || 1;
  return num.toString().padStart(5, '0');
}
