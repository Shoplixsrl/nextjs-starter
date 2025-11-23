import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { products, users } from '@/lib/db/schema';
import { eq, desc, and, sql, or, ilike } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const saleType = searchParams.get('saleType');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build conditions
    const conditions = [eq(products.status, 'active')];

    if (category) {
      conditions.push(eq(products.category, category));
    }

    if (search) {
      conditions.push(
        or(
          ilike(products.title, `%${search}%`),
          ilike(products.description, `%${search}%`)
        )!
      );
    }

    if (saleType && (saleType === 'instant_buy' || saleType === 'auction' || saleType === 'both')) {
      conditions.push(
        or(
          eq(products.saleType, saleType),
          eq(products.saleType, 'both')
        )!
      );
    }

    const result = await db
      .select({
        id: products.id,
        title: products.title,
        slug: products.slug,
        shortDescription: products.shortDescription,
        productType: products.productType,
        saleType: products.saleType,
        status: products.status,
        instantBuyPrice: products.instantBuyPrice,
        currentBid: products.currentBid,
        startingBid: products.startingBid,
        monthlyPrice: products.monthlyPrice,
        yearlyPrice: products.yearlyPrice,
        auctionEndDate: products.auctionEndDate,
        thumbnail: products.thumbnail,
        category: products.category,
        tags: products.tags,
        views: products.views,
        sales: products.sales,
        rating: products.rating,
        reviewCount: products.reviewCount,
        createdAt: products.createdAt,
        seller: {
          id: users.id,
          username: users.username,
          displayName: users.displayName,
          avatar: users.avatar,
          isVerified: users.isVerified,
        },
      })
      .from(products)
      .leftJoin(users, eq(products.sellerId, users.id))
      .where(and(...conditions)!)
      .orderBy(desc(products.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({
      products: result,
      total: result.length,
      limit,
      offset,
    });

  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
