"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Product } from '@/lib/types/product';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/cart-context';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link href={`/products/${product.slug}`}>
      <div
        className="group relative overflow-hidden rounded-lg bg-white transition-all duration-300 hover:shadow-soft"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square overflow-hidden bg-neutral-50">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-500 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div
            className={`absolute inset-0 bg-black/5 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        <div className="p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
            {product.category}
          </p>
          <h3 className="mt-1 font-medium text-neutral-900">{product.name}</h3>
          <p className="mt-2 text-lg font-light text-neutral-800">
            ${product.price.toFixed(2)}
          </p>

          <Button
            onClick={handleAddToCart}
            variant="outline"
            size="sm"
            className={`mt-3 w-full border-neutral-200 bg-white transition-all duration-300 hover:bg-neutral-50 ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            }`}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
}
