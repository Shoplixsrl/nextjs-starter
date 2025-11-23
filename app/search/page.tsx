'use client';

import { Search as SearchIcon } from 'lucide-react';
import { BottomNav } from '@/components/bottom-nav';

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Cerca</h1>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <SearchIcon className="h-24 w-24 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Cerca ristoranti e piatti</h2>
          <p className="text-muted-foreground">
            Funzionalità di ricerca in arrivo
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
