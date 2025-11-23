'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/cart-context';
import { restaurants } from '@/lib/mock-data';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const deliveryFee = 3.99;
  const serviceFee = 1.99;
  const total = totalPrice + deliveryFee + serviceFee;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      clearCart();
      alert('Ordine confermato! Grazie per aver ordinato da FoodHub 🎉');
      router.push('/');
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
          <div className="max-w-screen-xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => router.back()}
                size="icon"
                variant="ghost"
                className="rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold">Carrello</h1>
            </div>
          </div>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Il tuo carrello è vuoto</h2>
          <p className="text-muted-foreground mb-6 text-center">
            Aggiungi i tuoi piatti preferiti per iniziare
          </p>
          <Button onClick={() => router.push('/')} className="rounded-full">
            Esplora i ristoranti
          </Button>
        </div>
      </div>
    );
  }

  const groupedItems = items.reduce((acc, item) => {
    const restaurantId = item.restaurantId;
    if (!acc[restaurantId]) {
      acc[restaurantId] = [];
    }
    acc[restaurantId].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.back()}
              size="icon"
              variant="ghost"
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Carrello</h1>
              <p className="text-sm text-muted-foreground">
                {items.length} {items.length === 1 ? 'articolo' : 'articoli'}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCart}
              className="text-destructive hover:text-destructive"
            >
              Svuota
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {Object.entries(groupedItems).map(([restaurantId, restaurantItems]) => {
              const restaurant = restaurants.find((r) => r.id === restaurantId);
              if (!restaurant) return null;

              return (
                <Card key={restaurantId} className="shadow-md border-0">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-bold mb-4">{restaurant.name}</h2>
                    <div className="space-y-4">
                      {restaurantItems.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{item.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                              {item.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-primary">
                                €{(item.price * item.quantity).toFixed(2)}
                              </span>
                              <div className="flex items-center gap-2">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-8 w-8 rounded-full"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  {item.quantity === 1 ? (
                                    <Trash2 className="h-3 w-3" />
                                  ) : (
                                    <Minus className="h-3 w-3" />
                                  )}
                                </Button>
                                <span className="w-8 text-center font-semibold">
                                  {item.quantity}
                                </span>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-8 w-8 rounded-full"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <Card className="shadow-md border-0 sticky top-24">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-lg font-bold">Riepilogo ordine</h2>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotale</span>
                    <span className="font-medium">€{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Consegna</span>
                    <span className="font-medium">€{deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Costo servizio</span>
                    <span className="font-medium">€{serviceFee.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">Totale</span>
                  <span className="font-bold text-2xl text-primary">
                    €{total.toFixed(2)}
                  </span>
                </div>

                <Button
                  className="w-full rounded-full h-12 text-base shadow-lg"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? 'Elaborazione...' : 'Procedi al checkout'}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Tempo di consegna stimato: 30-40 min
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
