'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/navbar';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, TrendingUp, Clock, Zap } from 'lucide-react';

interface Product {
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
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeTab !== 'all') {
        params.set('saleType', activeTab);
      }

      const response = await fetch(`/api/products?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) {
        params.set('search', searchQuery);
      }
      if (activeTab !== 'all') {
        params.set('saleType', activeTab);
      }

      const response = await fetch(`/api/products?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Failed to search products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            VibeCode Market
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The ultimate marketplace for digital products. Buy instantly, bid in auctions, or subscribe to your favorite creators.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mt-8">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for digital products, templates, code..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit">Search</Button>
            </div>
          </form>
        </div>

        {/* Tabs for filtering */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              All
            </TabsTrigger>
            <TabsTrigger value="instant_buy" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Buy Now
            </TabsTrigger>
            <TabsTrigger value="auction" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Auctions
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products found</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
