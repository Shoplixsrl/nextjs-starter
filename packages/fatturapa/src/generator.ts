/**
 * FatturaPA XML Generator
 * Generates valid FatturaPA XML v1.2.2 files from invoice data
 */

import { XMLBuilder } from 'fast-xml-parser';
import type { FatturaPAData, InvoiceBody } from './types';

const NAMESPACE = 'http://ivaservizi.agenziaentrate.gov.it/docs/xsd/fatture/v1.2';
const SCHEMA_LOCATION = 'http://ivaservizi.agenziaentrate.gov.it/docs/xsd/fatture/v1.2 http://www.fatturapa.gov.it/export/fatturazione/sdi/fatturapa/v1.2/Schema_del_file_xml_FatturaPA_versione_1.2.xsd';

/**
 * Generate FatturaPA XML from structured data
 */
export class FatturaPAGenerator {
  private builder: XMLBuilder;

  constructor() {
    this.builder = new XMLBuilder({
      ignoreAttributes: false,
      format: true,
      indentBy: '  ',
      suppressEmptyNode: true,
      attributeNamePrefix: '@_',
    });
  }

  /**
   * Generate complete FatturaPA XML
   */
  generate(data: FatturaPAData): string {
    const xml = {
      '?xml': {
        '@_version': '1.0',
        '@_encoding': 'UTF-8',
      },
      'p:FatturaElettronica': {
        '@_versione': data.transmissionData.transmissionFormat,
        '@_xmlns:ds': 'http://www.w3.org/2000/09/xmldsig#',
        '@_xmlns:p': NAMESPACE,
        '@_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        '@_xsi:schemaLocation': SCHEMA_LOCATION,

        'FatturaElettronicaHeader': this.buildHeader(data.transmissionData),
        'FatturaElettronicaBody': data.invoiceBody.map(body => this.buildBody(body)),
      },
    };

    return this.builder.build(xml);
  }

  /**
   * Build transmission header
   */
  private buildHeader(transmission: FatturaPAData['transmissionData']) {
    return {
      DatiTrasmissione: {
        IdTrasmittente: {
          IdPaese: transmission.sender.vatNumber.substring(0, 2),
          IdCodice: transmission.sender.vatNumber.substring(2),
        },
        ProgressivoInvio: transmission.transmissionId,
        FormatoTrasmissione: transmission.transmissionFormat,
        CodiceDestinatario: transmission.transmissionCode.length === 7 ? transmission.transmissionCode : '0000000',
        ...(transmission.transmissionCode.includes('@') && {
          PECDestinatario: transmission.transmissionCode,
        }),
      },
      CedentePrestatore: {
        DatiAnagrafici: {
          IdFiscaleIVA: {
            IdPaese: transmission.sender.vatNumber.substring(0, 2),
            IdCodice: transmission.sender.vatNumber.substring(2),
          },
          ...(transmission.sender.fiscalCode && {
            CodiceFiscale: transmission.sender.fiscalCode,
          }),
          Anagrafica: {
            ...(transmission.sender.businessName ? {
              Denominazione: transmission.sender.businessName,
            } : {
              Nome: transmission.sender.firstName,
              Cognome: transmission.sender.lastName,
            }),
          },
          RegimeFiscale: transmission.sender.taxRegime,
        },
        Sede: this.buildAddress(transmission.sender.address),
        ...(transmission.sender.contact && {
          Contatti: this.buildContact(transmission.sender.contact),
        }),
      },
    };
  }

  /**
   * Build invoice body
   */
  private buildBody(body: InvoiceBody) {
    return {
      DatiGenerali: {
        DatiGeneraliDocumento: {
          TipoDocumento: body.generalData.documentType,
          Divisa: body.generalData.currency,
          Data: body.generalData.invoiceDate,
          Numero: body.generalData.invoiceNumber,
          ...(body.generalData.subject && body.generalData.subject.length > 0 && {
            Causale: body.generalData.subject,
          }),
        },
        ...(body.generalData.customer && {
          DatiOrdineAcquisto: null, // Placeholder for order data
        }),
      },
      DatiBeniServizi: {
        DettaglioLinee: body.goodsServices.lines.map(line => ({
          NumeroLinea: line.lineNumber,
          ...(line.itemCode && {
            CodiceArticolo: {
              CodiceTipo: line.itemCode.type,
              CodiceValore: line.itemCode.value,
            },
          }),
          Descrizione: line.description,
          Quantita: line.quantity,
          UnitaMisura: line.unitOfMeasure,
          PrezzoUnitario: line.unitPrice,
          ...(line.discountsMarkups && line.discountsMarkups.length > 0 && {
            ScontoMaggiorazione: line.discountsMarkups.map(dm => ({
              Tipo: dm.type,
              ...(dm.percentage && { Percentuale: dm.percentage }),
              ...(dm.amount && { Importo: dm.amount }),
            })),
          }),
          PrezzoTotale: line.totalPrice,
          AliquotaIVA: line.vatRate,
          ...(line.exemptionCode && {
            Natura: line.exemptionCode,
          }),
          ...(line.withholdingTax && {
            Ritenuta: line.withholdingTax,
          }),
        })),
        DatiRiepilogo: body.goodsServices.vatSummary.map(vat => ({
          AliquotaIVA: vat.vatRate,
          ...(vat.exemptionCode && {
            Natura: vat.exemptionCode,
          }),
          ImponibileImporto: vat.taxableAmount,
          Imposta: vat.vatAmount,
          ...(vat.exigibility && {
            EsigibilitaIVA: vat.exigibility,
          }),
          ...(vat.legalReference && {
            RiferimentoNormativo: vat.legalReference,
          }),
        })),
      },
      ...(body.payment && body.payment.length > 0 && {
        DatiPagamento: body.payment.map(p => ({
          CondizioniPagamento: p.paymentConditions,
          DettaglioPagamento: p.details.map(detail => ({
            ...(detail.beneficiary && { Beneficiario: detail.beneficiary }),
            ModalitaPagamento: detail.paymentMethod,
            ...(detail.dueDate && { DataScadenzaPagamento: detail.dueDate }),
            ImportoPagamento: detail.amount,
            ...(detail.bankAccount?.iban && { IBAN: detail.bankAccount.iban }),
            ...(detail.bankAccount?.bic && { BIC: detail.bankAccount.bic }),
          })),
        })),
      }),
    };
  }

  /**
   * Build address object
   */
  private buildAddress(address: FatturaPAData['transmissionData']['sender']['address']) {
    return {
      Indirizzo: address.street,
      NumeroCivico: address.streetNumber,
      CAP: address.zip,
      Comune: address.city,
      Provincia: address.province,
      Nazione: address.country,
    };
  }

  /**
   * Build contact object
   */
  private buildContact(contact: { phone?: string; email?: string }) {
    return {
      ...(contact.phone && { Telefono: contact.phone }),
      ...(contact.email && { Email: contact.email }),
    };
  }

  /**
   * Generate filename according to SDI specifications
   * Format: IT{VAT}_{PROGRESSIVE}.xml
   */
  generateFileName(vatNumber: string, progressive: string): string {
    return `IT${vatNumber}_${progressive}.xml`;
  }
}

/**
 * Convenience function to generate FatturaPA XML
 */
export function generateFatturaPA(data: FatturaPAData): string {
  const generator = new FatturaPAGenerator();
  return generator.generate(data);
}
