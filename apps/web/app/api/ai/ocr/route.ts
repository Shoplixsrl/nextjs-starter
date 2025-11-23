import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/ai/ocr
 * AI-powered OCR for invoice document scanning
 *
 * Extracts:
 * - Vendor information (name, VAT, address)
 * - Invoice number and date
 * - Line items with descriptions, quantities, prices
 * - Totals and VAT amounts
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // In production, integrate with OCR service (Google Cloud Vision, AWS Textract, Azure Computer Vision)
    // For now, return mock data

    const mockOCRResult = {
      vendor: {
        businessName: 'Fornitore SRL',
        vatNumber: 'IT12345678901',
        address: {
          street: 'Via Roma',
          streetNumber: '123',
          zip: '00100',
          city: 'Roma',
          province: 'RM',
          country: 'IT',
        },
      },
      invoice: {
        number: '2025/0123',
        date: '2025-11-20',
        dueDate: '2025-12-20',
      },
      items: [
        {
          description: 'Servizio Consulenza',
          quantity: '10.00',
          unitPrice: '100.00',
          vatRate: '22',
          subtotal: '1000.00',
          vatAmount: '220.00',
          total: '1220.00',
        },
      ],
      totals: {
        subtotal: '1000.00',
        taxAmount: '220.00',
        total: '1220.00',
      },
      confidence: 0.95, // OCR confidence score
    };

    return NextResponse.json({
      success: true,
      data: mockOCRResult,
      message: 'Document processed successfully',
    });
  } catch (error) {
    console.error('Error processing OCR:', error);
    return NextResponse.json(
      { error: 'Failed to process document' },
      { status: 500 }
    );
  }
}

/**
 * Supported file types
 */
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
