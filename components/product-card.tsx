import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, Star, Eye } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    slug: string;
    shortDescription: string | null;
    productType: string;
    saleType: string;
    instantBuyPrice: string | null;
    currentBid: string | null;
    startingBid: string | null;
    monthlyPrice: string | null;
    auctionEndDate: Date | null;
    thumbnail: string | null;
    category: string | null;
    views: number | null;
    sales: number | null;
    rating: string | null;
    reviewCount: number | null;
    seller: {
      username: string;
      displayName: string | null;
      avatar: string | null;
      isVerified: boolean | null;
    } | null;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const getPrice = () => {
    if (product.saleType === 'instant_buy' && product.instantBuyPrice) {
      return `$${parseFloat(product.instantBuyPrice).toFixed(2)}`;
    }
    if (product.saleType === 'auction') {
      const price = product.currentBid || product.startingBid;
      return price ? `$${parseFloat(price).toFixed(2)}` : 'No bids';
    }
    if (product.monthlyPrice) {
      return `$${parseFloat(product.monthlyPrice).toFixed(2)}/mo`;
    }
    return 'See details';
  };

  const getSaleTypeBadge = () => {
    if (product.saleType === 'instant_buy') return <Badge variant="default">Buy Now</Badge>;
    if (product.saleType === 'auction') return <Badge variant="secondary">Auction</Badge>;
    if (product.saleType === 'both') return <Badge variant="outline">Both</Badge>;
    return null;
  };

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
        <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100">
          {product.thumbnail ? (
            <img
              src={product.thumbnail}
              alt={product.title}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-4xl font-bold text-indigo-300">
              {product.title.charAt(0)}
            </div>
          )}
          <div className="absolute top-3 right-3">
            {getSaleTypeBadge()}
          </div>
        </div>

        <CardHeader className="pb-3">
          <h3 className="font-semibold text-lg line-clamp-2 leading-tight">{product.title}</h3>
          {product.shortDescription && (
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {product.shortDescription}
            </p>
          )}
        </CardHeader>

        <CardContent className="space-y-3 pb-3">
          {product.seller && (
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={product.seller.avatar || undefined} />
                <AvatarFallback className="text-xs">
                  {(product.seller.displayName || product.seller.username).charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">
                {product.seller.displayName || product.seller.username}
              </span>
              {product.seller.isVerified && (
                <Badge variant="outline" className="text-xs">✓</Badge>
              )}
            </div>
          )}

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {product.rating && product.reviewCount ? (
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{parseFloat(product.rating).toFixed(1)}</span>
                <span>({product.reviewCount})</span>
              </div>
            ) : null}
            {product.views !== null && (
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{product.views}</span>
              </div>
            )}
          </div>

          {product.saleType === 'auction' && product.auctionEndDate && (
            <div className="flex items-center gap-1 text-xs text-orange-600">
              <Clock className="h-3 w-3" />
              <span>Ends {formatDistanceToNow(new Date(product.auctionEndDate), { addSuffix: true })}</span>
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-3 border-t">
          <div className="w-full flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">{getPrice()}</span>
            {product.category && (
              <Badge variant="outline" className="text-xs">
                {product.category}
              </Badge>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
