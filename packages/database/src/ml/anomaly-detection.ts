/**
 * Anomaly Detection for Invoices
 * Detects unusual patterns and potential errors
 */

export interface Anomaly {
  type: 'error' | 'warning' | 'info';
  category: 'amount' | 'vat' | 'duplicate' | 'customer' | 'timing' | 'fiscal';
  message: string;
  suggestion?: string;
  autoFixAvailable?: boolean;
}

/**
 * Detect anomalies in an invoice
 */
export function detectInvoiceAnomalies(
  invoice: any,
  customerHistory: any[],
  organizationSettings: any
): Anomaly[] {
  const anomalies: Anomaly[] = [];

  // 1. Amount Anomalies
  const avgAmount = customerHistory.length > 0
    ? customerHistory.reduce((sum, inv) => sum + parseFloat(inv.total), 0) / customerHistory.length
    : 0;

  if (avgAmount > 0 && parseFloat(invoice.total) > avgAmount * 3) {
    anomalies.push({
      type: 'warning',
      category: 'amount',
      message: `Importo insolito: €${invoice.total} (media cliente: €${avgAmount.toFixed(2)})`,
      suggestion: 'Verifica che l\'importo sia corretto',
    });
  }

  // 2. VAT Anomalies
  const vatSummary = invoice.vatSummary || [];
  const calculatedVAT = vatSummary.reduce((sum: number, vat: any) => {
    return sum + parseFloat(vat.vatAmount);
  }, 0);

  const declaredVAT = parseFloat(invoice.taxAmount);

  if (Math.abs(calculatedVAT - declaredVAT) > 0.5) {
    anomalies.push({
      type: 'error',
      category: 'vat',
      message: `IVA non quadra: calcolata €${calculatedVAT.toFixed(2)}, dichiarata €${declaredVAT.toFixed(2)}`,
      suggestion: 'Ricalcola l\'IVA automaticamente',
      autoFixAvailable: true,
    });
  }

  // 3. Duplicate Detection
  const duplicateCandidate = customerHistory.find(inv =>
    inv.contactId === invoice.contactId &&
    inv.total === invoice.total &&
    Math.abs(new Date(inv.issueDate).getTime() - new Date(invoice.issueDate).getTime()) < 7 * 24 * 60 * 60 * 1000
  );

  if (duplicateCandidate) {
    anomalies.push({
      type: 'warning',
      category: 'duplicate',
      message: `Possibile duplicato: fattura simile ${duplicateCandidate.number} dello stesso importo`,
      suggestion: 'Verifica che non sia un duplicato',
    });
  }

  // 4. Fiscal Anomalies
  if (invoice.type === 'TD01' && !invoice.vatSummary?.length) {
    anomalies.push({
      type: 'error',
      category: 'fiscal',
      message: 'Fattura ordinaria senza riepilogo IVA',
      suggestion: 'Aggiungi il riepilogo IVA richiesto dalla normativa',
    });
  }

  // Check stamp duty (bollo)
  if (parseFloat(invoice.subtotal) > 77.47 && !invoice.stampDuty) {
    anomalies.push({
      type: 'warning',
      category: 'fiscal',
      message: 'Importo > €77,47 senza marca da bollo',
      suggestion: 'Aggiungi marca da bollo di €2,00 se non esente',
      autoFixAvailable: true,
    });
  }

  // 5. Timing Anomalies
  const issueDate = new Date(invoice.issueDate);
  const dueDate = new Date(invoice.dueDate);
  const daysDiff = Math.floor((dueDate.getTime() - issueDate.getTime()) / (1000 * 60 * 60 * 24));

  if (daysDiff < 0) {
    anomalies.push({
      type: 'error',
      category: 'timing',
      message: 'Data scadenza antecedente alla data emissione',
      suggestion: 'Correggi la data di scadenza',
    });
  }

  if (daysDiff > 120) {
    anomalies.push({
      type: 'warning',
      category: 'timing',
      message: `Scadenza insolita: ${daysDiff} giorni`,
      suggestion: 'Verifica i termini di pagamento',
    });
  }

  // 6. Customer Pattern Anomalies
  if (customerHistory.length > 5) {
    const avgDaysBetweenInvoices = calculateAvgDaysBetween(customerHistory.map(inv => inv.issueDate));

    const lastInvoice = customerHistory[customerHistory.length - 1];
    const daysSinceLastInvoice = Math.floor(
      (issueDate.getTime() - new Date(lastInvoice.issueDate).getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceLastInvoice < avgDaysBetweenInvoices / 3) {
      anomalies.push({
        type: 'info',
        category: 'customer',
        message: `Fatturazione frequente: ${daysSinceLastInvoice} giorni dall\'ultima (media: ${Math.round(avgDaysBetweenInvoices)})`,
        suggestion: 'Pattern insolito ma potrebbe essere normale',
      });
    }
  }

  return anomalies;
}

/**
 * Calculate average days between dates
 */
function calculateAvgDaysBetween(dates: string[]): number {
  if (dates.length < 2) return 0;

  const sortedDates = dates.map(d => new Date(d).getTime()).sort((a, b) => a - b);
  const diffs: number[] = [];

  for (let i = 1; i < sortedDates.length; i++) {
    diffs.push((sortedDates[i] - sortedDates[i - 1]) / (1000 * 60 * 60 * 24));
  }

  return diffs.reduce((a, b) => a + b, 0) / diffs.length;
}

/**
 * Auto-fix common anomalies
 */
export function autoFixAnomaly(invoice: any, anomaly: Anomaly): any {
  const fixed = { ...invoice };

  switch (anomaly.category) {
    case 'vat':
      // Recalculate VAT
      const recalculatedVAT = (fixed.vatSummary || []).reduce((sum: number, vat: any) => {
        return sum + parseFloat(vat.vatAmount);
      }, 0);
      fixed.taxAmount = recalculatedVAT.toFixed(2);
      fixed.total = (parseFloat(fixed.subtotal) + recalculatedVAT).toFixed(2);
      break;

    case 'fiscal':
      if (anomaly.message.includes('bollo')) {
        fixed.stampDuty = '2.00';
        fixed.total = (parseFloat(fixed.total) + 2.00).toFixed(2);
      }
      break;
  }

  return fixed;
}

/**
 * Calculate risk score for an invoice
 */
export function calculateRiskScore(invoice: any, anomalies: Anomaly[]): number {
  let score = 0;

  anomalies.forEach(anomaly => {
    if (anomaly.type === 'error') score += 30;
    else if (anomaly.type === 'warning') score += 15;
    else score += 5;
  });

  // Additional risk factors
  if (parseFloat(invoice.total) > 10000) score += 10;
  if (!invoice.dueDate) score += 20;
  if (invoice.sdiStatus === 'rejected') score += 50;

  return Math.min(100, score);
}
