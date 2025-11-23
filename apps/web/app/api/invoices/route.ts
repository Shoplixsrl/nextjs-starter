import { NextRequest, NextResponse } from 'next/server';
import { db } from '@fattura-ai/database/client';
import { invoices, invoiceItems } from '@fattura-ai/database/schema';
import { eq } from 'drizzle-orm';

/**
 * GET /api/invoices
 * List all invoices for an organization
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const organizationId = searchParams.get('organizationId');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');

    if (!organizationId) {
      return NextResponse.json(
        { error: 'organizationId is required' },
        { status: 400 }
      );
    }

    // Query invoices
    let query = db.select().from(invoices).where(eq(invoices.organizationId, organizationId));

    if (status) {
      query = query.where(eq(invoices.sdiStatus, status as any));
    }

    const results = await query.limit(limit);

    return NextResponse.json({
      invoices: results,
      total: results.length,
    });
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch invoices' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/invoices
 * Create a new invoice
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { organizationId, contactId, items, ...invoiceData } = body;

    if (!organizationId || !contactId) {
      return NextResponse.json(
        { error: 'organizationId and contactId are required' },
        { status: 400 }
      );
    }

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: any) => sum + parseFloat(item.subtotal), 0);
    const taxAmount = items.reduce((sum: number, item: any) => sum + parseFloat(item.vatAmount), 0);
    const total = subtotal + taxAmount;

    // Calculate VAT summary
    const vatSummary = items.reduce((acc: any[], item: any) => {
      const existing = acc.find(v => v.vatRate === item.vatRate);
      if (existing) {
        existing.taxableAmount = (parseFloat(existing.taxableAmount) + parseFloat(item.subtotal)).toString();
        existing.vatAmount = (parseFloat(existing.vatAmount) + parseFloat(item.vatAmount)).toString();
      } else {
        acc.push({
          vatRate: item.vatRate,
          taxableAmount: item.subtotal,
          vatAmount: item.vatAmount,
        });
      }
      return acc;
    }, []);

    // Create invoice
    const [invoice] = await db.insert(invoices).values({
      organizationId,
      contactId,
      ...invoiceData,
      subtotal: subtotal.toString(),
      taxAmount: taxAmount.toString(),
      total: total.toString(),
      netToPay: total.toString(),
      vatSummary,
    }).returning();

    // Create invoice items
    if (items && items.length > 0) {
      await db.insert(invoiceItems).values(
        items.map((item: any, index: number) => ({
          invoiceId: invoice.id,
          lineNumber: index + 1,
          ...item,
        }))
      );
    }

    return NextResponse.json({ invoice }, { status: 201 });
  } catch (error) {
    console.error('Error creating invoice:', error);
    return NextResponse.json(
      { error: 'Failed to create invoice' },
      { status: 500 }
    );
  }
}
