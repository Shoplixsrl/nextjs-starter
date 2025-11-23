import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ShoppingCart, Package } from 'lucide-react';
import productsData from '@/lib/data/products.json';
import type { Product } from '@/lib/types/product';
import { ProductCarousel } from '@/components/product-carousel';
import { AddToCartButton } from '@/components/add-to-cart-button';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const products = productsData as Product[];

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} - Nordic Store`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-6">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">
          <ProductCarousel images={product.images} productName={product.name} />

          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-light text-neutral-900 lg:text-4xl">
                {product.name}
              </h1>
              <p className="mt-4 text-3xl font-light text-neutral-900">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Package className="h-4 w-4" />
              <span>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            <div className="prose prose-neutral max-w-none">
              <p className="text-neutral-700">{product.description}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="border-neutral-300">
                  {tag}
                </Badge>
              ))}
            </div>

            <AddToCartButton product={product} />

            <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-soft">
              <h3 className="mb-4 font-medium text-neutral-900">Product Details</h3>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li className="flex justify-between">
                  <span>Category:</span>
                  <span className="font-medium">{product.category}</span>
                </li>
                <li className="flex justify-between">
                  <span>Stock:</span>
                  <span className="font-medium">{product.stock} units</span>
                </li>
                <li className="flex justify-between">
                  <span>Product ID:</span>
                  <span className="font-medium">#{product.id}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
