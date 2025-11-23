'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Star, Download, Eye, ShoppingCart, Clock, Zap } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

interface ProductData {
  id: string;
  title: string;
  description: string;
  shortDescription: string | null;
  productType: string;
  saleType: string;
  status: string;
  instantBuyPrice: string | null;
  currentBid: string | null;
  startingBid: string | null;
  reservePrice: string | null;
  monthlyPrice: string | null;
  yearlyPrice: string | null;
  auctionStartDate: Date | null;
  auctionEndDate: Date | null;
  thumbnail: string | null;
  images: string[] | null;
  category: string | null;
  tags: string[] | null;
  views: number | null;
  downloads: number | null;
  sales: number | null;
  rating: string | null;
  reviewCount: number | null;
  createdAt: Date;
  seller: {
    id: string;
    username: string;
    displayName: string | null;
    avatar: string | null;
    isVerified: boolean | null;
    rating: string | null;
    totalSales: number | null;
  };
  files: Array<{
    id: string;
    fileName: string;
    fileUrl: string;
    fileSize: number;
    fileType: string | null;
  }>;
  reviews: Array<{
    id: string;
    rating: number;
    title: string | null;
    comment: string | null;
    createdAt: Date;
    reviewer: {
      username: string;
      displayName: string | null;
      avatar: string | null;
    };
  }>;
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchProduct();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/products/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data.product);
      } else {
        toast.error('Product not found');
      }
    } catch (error) {
      console.error('Failed to fetch product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground text-lg">Product not found</p>
        </div>
      </div>
    );
  }

  const handlePurchase = (type: 'instant' | 'subscription') => {
    toast.info('Payment integration coming soon!');
  };

  const handleBid = () => {
    toast.info('Bidding system coming soon!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Image */}
            <div className="aspect-video relative overflow-hidden rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100">
              {product.thumbnail ? (
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-6xl font-bold text-indigo-300">
                  {product.title.charAt(0)}
                </div>
              )}
            </div>

            {/* Product Info */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 className="text-3xl font-bold">{product.title}</h1>
                      {product.saleType === 'instant_buy' && (
                        <Badge variant="default"><Zap className="h-3 w-3 mr-1" />Buy Now</Badge>
                      )}
                      {product.saleType === 'auction' && (
                        <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Auction</Badge>
                      )}
                    </div>

                    {product.shortDescription && (
                      <p className="text-lg text-muted-foreground">{product.shortDescription}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  {product.rating && product.reviewCount ? (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{parseFloat(product.rating).toFixed(1)}</span>
                      <span>({product.reviewCount} reviews)</span>
                    </div>
                  ) : null}
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{product.views || 0} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>{product.sales || 0} sales</span>
                  </div>
                </div>

                {product.category && (
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{product.category}</Badge>
                    {product.tags?.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <Separator />

                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mb-2">Description</h3>
                  <p className="whitespace-pre-wrap text-muted-foreground">{product.description}</p>
                </div>

                {product.files && product.files.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Included Files</h3>
                      <div className="space-y-2">
                        {product.files.map((file) => (
                          <div key={file.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div className="flex items-center gap-2">
                              <Download className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{file.fileName}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {(file.fileSize / 1024 / 1024).toFixed(2)} MB
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Reviews */}
            {product.reviews && product.reviews.length > 0 && (
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <h3 className="text-xl font-semibold">Reviews</h3>
                  <div className="space-y-4">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="space-y-2">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={review.reviewer.avatar || undefined} />
                            <AvatarFallback>
                              {(review.reviewer.displayName || review.reviewer.username).charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">
                                {review.reviewer.displayName || review.reviewer.username}
                              </span>
                              <div className="flex items-center">
                                {Array.from({ length: review.rating }).map((_, i) => (
                                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                              </span>
                            </div>
                            {review.title && <p className="font-medium text-sm mt-1">{review.title}</p>}
                            {review.comment && <p className="text-sm text-muted-foreground mt-1">{review.comment}</p>}
                          </div>
                        </div>
                        <Separator />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <Card className="sticky top-24">
              <CardContent className="pt-6 space-y-4">
                {/* Seller Info */}
                <div className="flex items-center gap-3 pb-4 border-b">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={product.seller.avatar || undefined} />
                    <AvatarFallback>
                      {(product.seller.displayName || product.seller.username).charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{product.seller.displayName || product.seller.username}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {product.seller.isVerified && <Badge variant="outline" className="text-xs">✓ Verified</Badge>}
                      <span>{product.seller.totalSales || 0} sales</span>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="space-y-4">
                  {(product.saleType === 'instant_buy' || product.saleType === 'both') && product.instantBuyPrice && (
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">
                        ${parseFloat(product.instantBuyPrice).toFixed(2)}
                      </div>
                      <Button className="w-full" size="lg" onClick={() => handlePurchase('instant')}>
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Buy Now
                      </Button>
                    </div>
                  )}

                  {(product.saleType === 'auction' || product.saleType === 'both') && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Current Bid</span>
                        <span className="text-2xl font-bold">
                          ${parseFloat(product.currentBid || product.startingBid || '0').toFixed(2)}
                        </span>
                      </div>
                      {product.auctionEndDate && (
                        <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-50 p-2 rounded">
                          <Clock className="h-4 w-4" />
                          <span>Ends {formatDistanceToNow(new Date(product.auctionEndDate), { addSuffix: true })}</span>
                        </div>
                      )}
                      <Button className="w-full" variant="outline" onClick={handleBid}>
                        Place Bid
                      </Button>
                    </div>
                  )}

                  {product.productType === 'subscription' && (product.monthlyPrice || product.yearlyPrice) && (
                    <div className="space-y-2 pt-4 border-t">
                      <h4 className="font-semibold">Subscription</h4>
                      {product.monthlyPrice && (
                        <Button
                          className="w-full"
                          variant="outline"
                          onClick={() => handlePurchase('subscription')}
                        >
                          ${parseFloat(product.monthlyPrice).toFixed(2)}/month
                        </Button>
                      )}
                      {product.yearlyPrice && (
                        <Button
                          className="w-full"
                          variant="outline"
                          onClick={() => handlePurchase('subscription')}
                        >
                          ${parseFloat(product.yearlyPrice).toFixed(2)}/year
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
