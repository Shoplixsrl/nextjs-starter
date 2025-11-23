'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Clock, Euro, Star, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { BottomNav } from '@/components/bottom-nav';
import { DishModal } from '@/components/dish-modal';
import { restaurants, dishes, tagLabels } from '@/lib/mock-data';
import type { Dish, DishTag } from '@/lib/mock-data';
import { useCart } from '@/contexts/cart-context';
import Link from 'next/link';

export default function RestaurantPage() {
  const params = useParams();
  const router = useRouter();
  const restaurantId = params.id as string;
  const restaurant = restaurants.find((r) => r.id === restaurantId);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [selectedTag, setSelectedTag] = useState<DishTag | 'all'>('all');
  const { totalItems, addItem } = useCart();

  const restaurantDishes = dishes.filter((d) => d.restaurantId === restaurantId);

  const filteredDishes = useMemo(() => {
    if (selectedTag === 'all') return restaurantDishes;
    return restaurantDishes.filter((dish) => dish.tags.includes(selectedTag));
  }, [selectedTag, restaurantDishes]);

  const categories = Array.from(new Set(restaurantDishes.map((d) => d.category)));
  const availableTags: Array<DishTag | 'all'> = ['all'];
  const tagSet = new Set<DishTag>();
  restaurantDishes.forEach((dish) => {
    dish.tags.forEach((tag) => tagSet.add(tag));
  });
  availableTags.push(...Array.from(tagSet));

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Ristorante non trovato</h1>
          <Button onClick={() => router.push('/')}>Torna alla home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Image */}
      <div className="relative h-64 w-full">
        <Image
          src={restaurant.heroImage}
          alt={restaurant.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Back Button */}
        <Button
          onClick={() => router.back()}
          size="icon"
          variant="ghost"
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-lg"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        {/* Cart Button */}
        {totalItems > 0 && (
          <Link href="/cart">
            <Button className="absolute top-4 right-4 rounded-full shadow-lg bg-white text-foreground hover:bg-white/90">
              <ShoppingBag className="h-4 w-4 mr-2" />
              {totalItems}
            </Button>
          </Link>
        )}

        {/* Restaurant Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
          <p className="text-sm mb-3 text-white/90">{restaurant.description}</p>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Star className="h-4 w-4 fill-white" />
              <span className="font-semibold">{restaurant.rating}</span>
            </div>
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
      </div>

      {/* Filters */}
      <div className="sticky top-0 z-30 bg-white border-b border-border shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {availableTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? 'default' : 'outline'}
                className="rounded-full cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-1.5 whitespace-nowrap"
                onClick={() => setSelectedTag(tag)}
              >
                {tag === 'all' ? 'Tutti' : tagLabels[tag]}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        {categories.map((category) => {
          const categoryDishes = filteredDishes.filter((d) => d.category === category);
          if (categoryDishes.length === 0) return null;

          return (
            <div key={category} className="mb-8">
              <h2 className="text-xl font-bold mb-4">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryDishes.map((dish) => (
                  <Card
                    key={dish.id}
                    className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-md"
                    onClick={() => setSelectedDish(dish)}
                  >
                    <div className="flex">
                      <div className="flex-1 p-4">
                        <h3 className="font-bold text-base mb-1">{dish.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {dish.description}
                        </p>
                        {dish.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {dish.tags.map((tag) => (
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
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-primary">
                            €{dish.price.toFixed(2)}
                          </span>
                          <Button
                            size="sm"
                            className="rounded-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              addItem(dish);
                            }}
                          >
                            Aggiungi
                          </Button>
                        </div>
                      </div>
                      <div className="relative w-32 h-32 flex-shrink-0">
                        <Image
                          src={dish.image}
                          alt={dish.name}
                          fill
                          className="object-cover rounded-r-lg"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <DishModal
        dish={selectedDish}
        open={!!selectedDish}
        onOpenChange={(open) => !open && setSelectedDish(null)}
      />

      <BottomNav />
    </div>
  );
}
