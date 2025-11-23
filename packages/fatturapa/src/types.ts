/**
 * TypeScript types for FatturaPA XML format v1.2.2
 * Based on official specifications from AgID
 */

export interface FatturaPAData {
  // Header - Dati Trasmissione
  transmissionData: {
    transmissionId: string; // ID univoco trasmissione
    transmissionFormat: 'FPR12' | 'FPA12'; // Formato trasmissione
    transmissionCode: string; // Codice destinatario SDI (7 char) o PEC

    // Cedente/Prestatore (chi emette)
    sender: {
      vatNumber: string; // 11 chars
      fiscalCode?: string;
      businessName?: string; // Denominazione
      firstName?: string; // Nome (persone fisiche)
      lastName?: string; // Cognome
      taxRegime: string; // RF01-RF20
      address: Address;
      contact?: ContactInfo;
      issuingOfficeRef?: string; // Riferimento amministrazione
    };
  };

  // Body - Dati Fattura
  invoiceBody: InvoiceBody[];
}

export interface Address {
  street: string; // Indirizzo
  streetNumber: string; // Numero civico
  zip: string; // CAP
  city: string; // Comune
  province: string; // Provincia (2 char)
  country: string; // Nazione (ISO 3166-1 alpha-2)
}

export interface ContactInfo {
  phone?: string;
  fax?: string;
  email?: string;
}

export interface InvoiceBody {
  // Dati Generali
  generalData: {
    documentType: string; // TD01-TD29
    currency: string; // EUR
    invoiceNumber: string;
    invoiceDate: string; // YYYY-MM-DD

    // Cedente/Prestatore (vendor)
    vendor?: CompanyData;

    // Cessionario/Committente (customer)
    customer: CompanyData;

    // Terzo Intermediario (se presente)
    intermediary?: CompanyData;

    // Soggetto Emittente
    issuer?: 'CC' | 'TZ'; // CC=Cessionario/Committente, TZ=Terzo

    // Causale
    subject?: string[];

    // Art. 73 DPR 633/72
    art73?: boolean;
  };

  // Dati Beni Servizi (righe fattura)
  goodsServices: {
    lines: InvoiceLine[];

    // Dati Riepilogo per aliquota IVA
    vatSummary: VATSummary[];
  };

  // Dati Veicoli (se applicabile)
  vehicles?: VehicleData[];

  // Dati Pagamento
  payment?: PaymentData[];

  // Allegati
  attachments?: Attachment[];
}

export interface CompanyData {
  // Identificativi Fiscali
  vatNumber?: string;
  fiscalCode?: string;

  // Anagrafica
  businessName?: string; // Denominazione
  firstName?: string; // Nome
  lastName?: string; // Cognome
  title?: string; // Titolo
  eoriCode?: string; // Codice EORI

  // Sede
  address: Address;

  // Stabile Organizzazione (se diversa da sede)
  permanentEstablishment?: Address;

  // Iscrizione REA
  reaRegistration?: {
    office: string; // Ufficio
    number: string; // Numero REA
    shareCapital?: string; // Capitale sociale
    solePartner?: 'SU' | 'SM'; // Socio unico: SU=Sì, SM=No
    liquidationStatus?: 'LS' | 'LN'; // In liquidazione: LS=Sì, LN=No
  };

  // Contatti
  contact?: ContactInfo;

  // Riferimento Amministrazione (PA)
  adminReference?: string;
}

export interface InvoiceLine {
  lineNumber: number;

  // Codifica Articolo
  itemCode?: {
    type: string; // Tipo codifica
    value: string; // Codice
  };

  // Descrizione
  description: string;

  // Quantità
  quantity: string; // Decimal
  unitOfMeasure: string;

  // Prezzo Unitario
  unitPrice: string; // Decimal

  // Sconti/Maggiorazioni
  discountsMarkups?: DiscountMarkup[];

  // Totale
  totalPrice: string; // Decimal

  // IVA
  vatRate: string; // Decimal or "0"
  exemptionCode?: string; // N1-N7 (se IVA esente)
  exemptionReason?: string; // Natura operazione

  // Ritenuta
  withholdingTax?: 'SI';

  // Riferimenti Amministrativi
  adminReferences?: string[];

  // Altri Dati
  otherData?: {
    type: string;
    reference?: string;
    date?: string;
    numItem?: string;
    code?: string;
    codeType?: string;
  }[];
}

export interface DiscountMarkup {
  type: 'SC' | 'MG'; // SC=Sconto, MG=Maggiorazione
  percentage?: string; // Percentuale
  amount?: string; // Importo
}

export interface VATSummary {
  taxableAmount: string; // Imponibile
  vatRate: string; // Aliquota
  vatAmount: string; // Imposta
  exemptionCode?: string; // N1-N7
  exemptionReason?: string; // Natura
  adminReference?: string;

  // Reverse Charge
  reverseCharge?: 'SI';

  // Exigibility (esigibilità IVA)
  exigibility?: 'I' | 'D' | 'S'; // I=Immediata, D=Differita, S=Scissione pagamenti

  // Riferimento normativo
  legalReference?: string;
}

export interface VehicleData {
  registrationDate: string;
  registrationNumber: string;
  totalKm?: string;
}

export interface PaymentData {
  paymentConditions: 'TP01' | 'TP02' | 'TP03'; // TP01=Pagamento a rate, TP02=Completo, TP03=Anticipato

  // Dettaglio Pagamento
  details: PaymentDetail[];
}

export interface PaymentDetail {
  beneficiary?: string;
  paymentMethod: string; // MP01-MP23
  dueDate?: string;
  amount: string;
  postOfficeCode?: string;
  payerSurname?: string;
  payerFirstName?: string;
  payerFiscalCode?: string;
  payerTitle?: string;

  // Coordinate bancarie
  bankAccount?: {
    iban?: string;
    bic?: string;
    financialInstitution?: string;
  };

  // Bollettino postale
  postalPayment?: {
    accountHolder?: string;
    accountNumber?: string;
  };
}

export interface Attachment {
  name: string; // Nome file
  algorithm?: string; // Algoritmo compressione
  format?: string; // Formato
  description?: string;
  data: string; // Base64 encoded
}
