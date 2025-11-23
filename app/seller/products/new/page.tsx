'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/use-auth';

export default function NewProductPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    productType: 'digital_download',
    saleType: 'instant_buy',
    instantBuyPrice: '',
    startingBid: '',
    reservePrice: '',
    monthlyPrice: '',
    yearlyPrice: '',
    auctionStartDate: '',
    auctionEndDate: '',
    thumbnail: '',
    category: '',
    tags: '',
    fileUrl: '',
    fileName: '',
  });

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const files = formData.fileUrl && formData.fileName ? [{
        fileName: formData.fileName,
        fileUrl: formData.fileUrl,
        fileSize: 1000,
        fileType: 'application/octet-stream',
        isMainFile: true,
      }] : [];

      const response = await fetch('/api/products/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
          files,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create product');
      }

      const data = await response.json();
      toast.success('Product created successfully!');
      router.push(`/products/${data.product.slug}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">List a New Product</CardTitle>
            <CardDescription>
              Create a listing for your digital product. Choose between instant purchase, auction, or subscription.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Basic Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="title">Product Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    placeholder="e.g., Premium React Dashboard Template"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Input
                    id="shortDescription"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    placeholder="Brief one-liner description"
                    maxLength={300}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Full Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={6}
                    placeholder="Detailed description of your product, features, what's included, etc."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g., Templates, Code, Design"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="react, typescript, dashboard"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thumbnail">Thumbnail URL</Label>
                  <Input
                    id="thumbnail"
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              {/* Product Type */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Product Type</h3>

                <div className="space-y-2">
                  <Label htmlFor="productType">Type *</Label>
                  <Select
                    value={formData.productType}
                    onValueChange={(value) => setFormData({ ...formData, productType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="digital_download">Digital Download</SelectItem>
                      <SelectItem value="subscription">Subscription</SelectItem>
                      <SelectItem value="license">License</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="saleType">Sale Type *</Label>
                  <Select
                    value={formData.saleType}
                    onValueChange={(value) => setFormData({ ...formData, saleType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instant_buy">Instant Buy</SelectItem>
                      <SelectItem value="auction">Auction</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Pricing</h3>

                {(formData.saleType === 'instant_buy' || formData.saleType === 'both') && (
                  <div className="space-y-2">
                    <Label htmlFor="instantBuyPrice">Instant Buy Price ($)</Label>
                    <Input
                      id="instantBuyPrice"
                      type="number"
                      step="0.01"
                      value={formData.instantBuyPrice}
                      onChange={(e) => setFormData({ ...formData, instantBuyPrice: e.target.value })}
                      placeholder="29.99"
                    />
                  </div>
                )}

                {(formData.saleType === 'auction' || formData.saleType === 'both') && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startingBid">Starting Bid ($)</Label>
                        <Input
                          id="startingBid"
                          type="number"
                          step="0.01"
                          value={formData.startingBid}
                          onChange={(e) => setFormData({ ...formData, startingBid: e.target.value })}
                          placeholder="9.99"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reservePrice">Reserve Price ($)</Label>
                        <Input
                          id="reservePrice"
                          type="number"
                          step="0.01"
                          value={formData.reservePrice}
                          onChange={(e) => setFormData({ ...formData, reservePrice: e.target.value })}
                          placeholder="25.00"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="auctionStartDate">Auction Start Date</Label>
                        <Input
                          id="auctionStartDate"
                          type="datetime-local"
                          value={formData.auctionStartDate}
                          onChange={(e) => setFormData({ ...formData, auctionStartDate: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="auctionEndDate">Auction End Date</Label>
                        <Input
                          id="auctionEndDate"
                          type="datetime-local"
                          value={formData.auctionEndDate}
                          onChange={(e) => setFormData({ ...formData, auctionEndDate: e.target.value })}
                        />
                      </div>
                    </div>
                  </>
                )}

                {formData.productType === 'subscription' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="monthlyPrice">Monthly Price ($)</Label>
                      <Input
                        id="monthlyPrice"
                        type="number"
                        step="0.01"
                        value={formData.monthlyPrice}
                        onChange={(e) => setFormData({ ...formData, monthlyPrice: e.target.value })}
                        placeholder="9.99"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="yearlyPrice">Yearly Price ($)</Label>
                      <Input
                        id="yearlyPrice"
                        type="number"
                        step="0.01"
                        value={formData.yearlyPrice}
                        onChange={(e) => setFormData({ ...formData, yearlyPrice: e.target.value })}
                        placeholder="99.99"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Files */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Product Files</h3>

                <div className="space-y-2">
                  <Label htmlFor="fileName">File Name</Label>
                  <Input
                    id="fileName"
                    value={formData.fileName}
                    onChange={(e) => setFormData({ ...formData, fileName: e.target.value })}
                    placeholder="product-file.zip"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fileUrl">File URL</Label>
                  <Input
                    id="fileUrl"
                    value={formData.fileUrl}
                    onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                    placeholder="https://example.com/files/product.zip"
                  />
                  <p className="text-xs text-muted-foreground">
                    For now, provide a direct URL to your file. File upload feature coming soon.
                  </p>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? 'Creating Product...' : 'Create Product'}
              </Button>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}
