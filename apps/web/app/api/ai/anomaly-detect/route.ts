import { NextRequest, NextResponse } from 'next/server';
import { db } from '@fattura-ai/database/client';
import { invoices } from '@fattura-ai/database/schema';
import { eq } from 'drizzle-orm';
import { detectInvoiceAnomalies, autoFixAnomaly, calculateRiskScore } from '@fattura-ai/database/ml/anomaly-detection';

/**
 * POST /api/ai/anomaly-detect
 * Detect anomalies in an invoice using ML
 */
export async function POST(request: NextRequest) {
  try {
    const { invoiceId, autoFix = false } = await request.json();

    if (!invoiceId) {
      return NextResponse.json(
        { error: 'invoiceId is required' },
        { status: 400 }
      );
    }

    // Fetch invoice
    const [invoice] = await db.select().from(invoices).where(eq(invoices.id, invoiceId));

    if (!invoice) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      );
    }

    // Fetch customer history
    const customerHistory = await db
      .select()
      .from(invoices)
      .where(eq(invoices.contactId, invoice.contactId))
      .limit(50);

    // Detect anomalies
    const anomalies = detectInvoiceAnomalies(
      invoice,
      customerHistory,
      {} // Organization settings
    );

    // Calculate risk score
    const riskScore = calculateRiskScore(invoice, anomalies);

    // Auto-fix if requested
    let fixedInvoice = invoice;
    if (autoFix && anomalies.some(a => a.autoFixAvailable)) {
      anomalies.forEach(anomaly => {
        if (anomaly.autoFixAvailable) {
          fixedInvoice = autoFixAnomaly(fixedInvoice, anomaly);
        }
      });

      // Update invoice in database
      await db
        .update(invoices)
        .set(fixedInvoice)
        .where(eq(invoices.id, invoiceId));
    }

    return NextResponse.json({
      invoice: fixedInvoice,
      anomalies,
      riskScore,
      riskLevel: riskScore > 70 ? 'high' : riskScore > 40 ? 'medium' : 'low',
      autoFixed: autoFix,
    });
  } catch (error) {
    console.error('Error detecting anomalies:', error);
    return NextResponse.json(
      { error: 'Failed to detect anomalies' },
      { status: 500 }
    );
  }
}
