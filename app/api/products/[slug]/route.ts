import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { products, users, productFiles, reviews } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const product = await db.query.products.findFirst({
      where: eq(products.slug, slug),
      with: {
        seller: {
          columns: {
            id: true,
            username: true,
            displayName: true,
            avatar: true,
            isVerified: true,
            rating: true,
            totalSales: true,
          },
        },
        files: true,
        reviews: {
          with: {
            reviewer: {
              columns: {
                username: true,
                displayName: true,
                avatar: true,
              },
            },
          },
          orderBy: [desc(reviews.createdAt)],
          limit: 10,
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Increment view count
    await db
      .update(products)
      .set({ views: (product.views || 0) + 1 })
      .where(eq(products.id, product.id));

    return NextResponse.json({ product });

  } catch (error) {
    console.error('Get product error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
