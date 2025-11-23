import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { products, productFiles } from '@/lib/db/schema';
import { getSession } from '@/lib/auth/session';
import { z } from 'zod';

const createProductSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(10),
  shortDescription: z.string().max(300).optional(),
  productType: z.enum(['digital_download', 'subscription', 'license']),
  saleType: z.enum(['instant_buy', 'auction', 'both']),
  instantBuyPrice: z.string().optional(),
  startingBid: z.string().optional(),
  reservePrice: z.string().optional(),
  monthlyPrice: z.string().optional(),
  yearlyPrice: z.string().optional(),
  auctionStartDate: z.string().optional(),
  auctionEndDate: z.string().optional(),
  thumbnail: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  files: z.array(z.object({
    fileName: z.string(),
    fileUrl: z.string(),
    fileSize: z.number(),
    fileType: z.string().optional(),
    isMainFile: z.boolean().optional(),
  })).optional(),
});

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') + '-' + Date.now();
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const data = createProductSchema.parse(body);

    const slug = generateSlug(data.title);

    // Create product
    const [product] = await db.insert(products).values({
      sellerId: session.userId,
      title: data.title,
      slug,
      description: data.description,
      shortDescription: data.shortDescription,
      productType: data.productType,
      saleType: data.saleType,
      status: 'active',
      instantBuyPrice: data.instantBuyPrice,
      startingBid: data.startingBid,
      currentBid: data.startingBid,
      reservePrice: data.reservePrice,
      monthlyPrice: data.monthlyPrice,
      yearlyPrice: data.yearlyPrice,
      auctionStartDate: data.auctionStartDate ? new Date(data.auctionStartDate) : null,
      auctionEndDate: data.auctionEndDate ? new Date(data.auctionEndDate) : null,
      thumbnail: data.thumbnail,
      category: data.category,
      tags: data.tags,
    }).returning();

    // Add product files if provided
    if (data.files && data.files.length > 0) {
      await db.insert(productFiles).values(
        data.files.map(file => ({
          productId: product.id,
          fileName: file.fileName,
          fileUrl: file.fileUrl,
          fileSize: file.fileSize,
          fileType: file.fileType,
          isMainFile: file.isMainFile || false,
        }))
      );
    }

    return NextResponse.json({
      product,
      message: 'Product created successfully',
    }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Create product error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
