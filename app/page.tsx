'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Euro, Star, ShoppingBag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/bottom-nav';
import { restaurants, cuisineLabels, tagLabels } from '@/lib/mock-data';
import type { Cuisine, DishTag } from '@/lib/mock-data';
import { useCart } from '@/contexts/cart-context';

export default function HomePage() {
  const [selectedCuisine, setSelectedCuisine] = useState<Cuisine | 'all'>('all');
  const [selectedTag, setSelectedTag] = useState<DishTag | 'all'>('all');
  const { totalItems } = useCart();

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      if (selectedCuisine !== 'all' && restaurant.cuisine !== selectedCuisine) {
        return false;
      }
      if (selectedTag !== 'all' && !restaurant.tags.includes(selectedTag)) {
        return false;
      }
      return true;
    });
  }, [selectedCuisine, selectedTag]);

  const cuisines: Array<Cuisine | 'all'> = ['all', 'italian', 'japanese', 'mexican', 'american', 'chinese', 'indian', 'mediterranean'];
  const tags: Array<DishTag | 'all'> = ['all', 'vegetarian', 'vegan', 'spicy', 'gluten-free'];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">FoodHub</h1>
              <p className="text-sm text-muted-foreground">Consegna a domicilio</p>
            </div>
            {totalItems > 0 && (
              <Link href="/cart">
                <Button className="rounded-full shadow-lg relative">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Carrello
                  <span className="absolute -top-2 -right-2 h-6 w-6 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* Cuisine Filter */}
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3">Cucine</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {cuisines.map((cuisine) => (
              <Button
                key={cuisine}
                variant={selectedCuisine === cuisine ? 'default' : 'outline'}
                className="rounded-full whitespace-nowrap"
                onClick={() => setSelectedCuisine(cuisine)}
              >
                {cuisine === 'all' ? 'Tutte' : cuisineLabels[cuisine]}
              </Button>
            ))}
          </div>
        </div>

        {/* Tag Filter */}
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3">Filtri</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? 'default' : 'outline'}
                className="rounded-full cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-1.5"
                onClick={() => setSelectedTag(tag)}
              >
                {tag === 'all' ? 'Tutti' : tagLabels[tag]}
              </Badge>
            ))}
          </div>
        </div>

        {/* Restaurants Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">
              {filteredRestaurants.length} Ristoranti disponibili
            </h2>
          </div>

          {filteredRestaurants.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Nessun ristorante trovato con questi filtri</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSelectedCuisine('all');
                  setSelectedTag('all');
                }}
              >
                Rimuovi filtri
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRestaurants.map((restaurant) => (
                <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-0 shadow-md">
                    <div className="relative h-48 w-full">
                      <Image
                        src={restaurant.heroImage}
                        alt={restaurant.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-sm font-bold">{restaurant.rating}</span>
                      </div>
                    </div>
                    <CardContent className="p-4 space-y-3">
                      <div>
                        <h3 className="font-bold text-lg mb-1">{restaurant.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {restaurant.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4 text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{restaurant.deliveryTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Euro className="h-4 w-4" />
                            <span>€{restaurant.deliveryFee.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {restaurant.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {restaurant.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs rounded-full"
                            >
                              {tagLabels[tag]}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
