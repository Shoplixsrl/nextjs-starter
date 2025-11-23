import { NextRequest, NextResponse } from 'next/server';
import { db } from '@fattura-ai/database/client';
import { invoices, invoiceItems } from '@fattura-ai/database/schema';
import { eq } from 'drizzle-orm';

/**
 * GET /api/invoices/[id]
 * Get a single invoice by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const [invoice] = await db.select().from(invoices).where(eq(invoices.id, params.id));

    if (!invoice) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      );
    }

    // Get invoice items
    const items = await db.select().from(invoiceItems).where(eq(invoiceItems.invoiceId, params.id));

    return NextResponse.json({
      invoice: {
        ...invoice,
        items,
      },
    });
  } catch (error) {
    console.error('Error fetching invoice:', error);
    return NextResponse.json(
      { error: 'Failed to fetch invoice' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/invoices/[id]
 * Update an invoice
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const [updated] = await db
      .update(invoices)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(invoices.id, params.id))
      .returning();

    if (!updated) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ invoice: updated });
  } catch (error) {
    console.error('Error updating invoice:', error);
    return NextResponse.json(
      { error: 'Failed to update invoice' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/invoices/[id]
 * Delete an invoice
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.delete(invoices).where(eq(invoices.id, params.id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting invoice:', error);
    return NextResponse.json(
      { error: 'Failed to delete invoice' },
      { status: 500 }
    );
  }
}
