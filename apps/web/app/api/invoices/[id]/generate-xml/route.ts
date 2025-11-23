import { NextRequest, NextResponse } from 'next/server';
import { db } from '@fattura-ai/database/client';
import { invoices, invoiceItems, organizations, contacts } from '@fattura-ai/database/schema';
import { eq } from 'drizzle-orm';
import { generateFatturaPA } from '@fattura-ai/fatturapa/generator';
import { mapInvoiceToFatturaPA } from '@fattura-ai/fatturapa/mapper';

/**
 * POST /api/invoices/[id]/generate-xml
 * Generate FatturaPA XML for an invoice
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Fetch invoice with related data
    const [invoice] = await db.select().from(invoices).where(eq(invoices.id, params.id));

    if (!invoice) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      );
    }

    const items = await db.select().from(invoiceItems).where(eq(invoiceItems.invoiceId, params.id));
    const [organization] = await db.select().from(organizations).where(eq(organizations.id, invoice.organizationId));
    const [contact] = await db.select().from(contacts).where(eq(contacts.id, invoice.contactId));

    if (!organization || !contact) {
      return NextResponse.json(
        { error: 'Missing organization or contact data' },
        { status: 400 }
      );
    }

    // Map to FatturaPA format
    const fatturaPAData = mapInvoiceToFatturaPA(invoice, items, organization, contact);

    // Generate XML
    const xml = generateFatturaPA(fatturaPAData);

    // Generate filename
    const fileName = `IT${organization.vatNumber}_${invoice.number.replace('/', '_')}.xml`;

    // In production, save to storage (S3, etc)
    // For now, return the XML

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error('Error generating FatturaPA XML:', error);
    return NextResponse.json(
      { error: 'Failed to generate XML', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
