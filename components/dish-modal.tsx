'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Minus, Plus, X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Dish } from '@/lib/mock-data';
import { tagLabels } from '@/lib/mock-data';
import { useCart } from '@/contexts/cart-context';

interface DishModalProps {
  dish: Dish | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DishModal({ dish, open, onOpenChange }: DishModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  if (!dish) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(dish);
    }
    setQuantity(1);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/90 backdrop-blur-sm p-2 shadow-lg hover:bg-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative h-64 w-full">
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">{dish.name}</h2>
            <p className="text-muted-foreground">{dish.description}</p>
          </div>

          {dish.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {dish.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="rounded-full">
                  {tagLabels[tag]}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-3">
              <Button
                size="icon"
                variant="outline"
                className="h-10 w-10 rounded-full"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-semibold w-8 text-center">
                {quantity}
              </span>
              <Button
                size="icon"
                variant="outline"
                className="h-10 w-10 rounded-full"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  €{(dish.price * quantity).toFixed(2)}
                </div>
                {quantity > 1 && (
                  <div className="text-xs text-muted-foreground">
                    €{dish.price.toFixed(2)} cad.
                  </div>
                )}
              </div>
              <Button
                onClick={handleAddToCart}
                className="h-12 px-8 rounded-full shadow-lg"
              >
                Aggiungi
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
