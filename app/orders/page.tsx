'use client';

import { ShoppingBag } from 'lucide-react';
import { BottomNav } from '@/components/bottom-nav';
import { useCart } from '@/contexts/cart-context';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function OrdersPage() {
  const { totalItems } = useCart();

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">I tuoi ordini</h1>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Nessun ordine ancora</h2>
          <p className="text-muted-foreground mb-6">
            {totalItems > 0
              ? 'Completa il tuo ordine nel carrello per iniziare!'
              : 'Inizia a ordinare dai tuoi ristoranti preferiti'}
          </p>
          {totalItems > 0 ? (
            <Link href="/cart">
              <Button className="rounded-full">Vai al carrello</Button>
            </Link>
          ) : (
            <Link href="/">
              <Button className="rounded-full">Esplora i ristoranti</Button>
            </Link>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
