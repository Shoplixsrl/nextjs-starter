import { NextRequest, NextResponse } from 'next/server';
import { db } from '@fattura-ai/database/client';
import { sdiLogs, invoices } from '@fattura-ai/database/schema';
import { eq } from 'drizzle-orm';

/**
 * POST /api/sdi/webhook
 * Webhook endpoint for SDI notifications
 *
 * Handles:
 * - RC (Ricevuta di Consegna) - Delivery receipt
 * - NS (Notifica di Scarto) - Rejection notice
 * - MC (Notifica di Mancata Consegna) - Delivery failure
 * - NE (Notifica Esito) - Outcome notification
 * - DT (Notifica Decorrenza Termini) - Terms notice
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventType, transmissionId, messageId, invoiceId, outcome, errorCode, errorDescription, rawXml } = body;

    // Log SDI event
    await db.insert(sdiLogs).values({
      organizationId: body.organizationId,
      invoiceId: invoiceId || null,
      eventType,
      transmissionId,
      messageId,
      eventDate: new Date(),
      description: errorDescription || `${eventType} event received`,
      rawXml,
      parsedData: {
        outcomeCode: outcome,
        errorCode,
        errorDescription,
      },
      isError: errorCode ? 'true' : 'false',
      errorMessage: errorDescription,
    });

    // Update invoice status based on event
    if (invoiceId) {
      let newStatus;
      let updateFields: any = {
        updatedAt: new Date(),
      };

      switch (eventType) {
        case 'receipt':
          newStatus = 'sent';
          updateFields.sdiSentAt = new Date();
          break;
        case 'acceptance':
          newStatus = 'delivered';
          updateFields.sdiDeliveredAt = new Date();
          updateFields.sdiAcceptedAt = new Date();
          break;
        case 'rejection':
          newStatus = 'rejected';
          updateFields.sdiRejectedAt = new Date();
          updateFields.sdiRejectionReason = errorDescription;
          break;
        case 'delivery_failed':
          newStatus = 'rejected';
          updateFields.sdiRejectedAt = new Date();
          updateFields.sdiRejectionReason = 'Delivery failed';
          break;
      }

      if (newStatus) {
        await db.update(invoices)
          .set({
            sdiStatus: newStatus as any,
            ...updateFields,
          })
          .where(eq(invoices.id, invoiceId));
      }
    }

    return NextResponse.json({
      success: true,
      message: 'SDI notification processed',
    });
  } catch (error) {
    console.error('Error processing SDI webhook:', error);
    return NextResponse.json(
      { error: 'Failed to process SDI notification' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/sdi/webhook
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'SDI Webhook',
    timestamp: new Date().toISOString(),
  });
}
