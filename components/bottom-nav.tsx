'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, ShoppingBag, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/cart-context';

export function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  const navItems = [
    {
      label: 'Home',
      href: '/',
      icon: Home,
      match: (path: string) => path === '/',
    },
    {
      label: 'Cerca',
      href: '/search',
      icon: Search,
      match: (path: string) => path === '/search',
    },
    {
      label: 'Ordini',
      href: '/orders',
      icon: ShoppingBag,
      match: (path: string) => path === '/orders',
    },
    {
      label: 'Profilo',
      href: '/profile',
      icon: User,
      match: (path: string) => path === '/profile',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border shadow-[0_-2px_10px_rgba(0,0,0,0.05)] pb-safe">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const isActive = item.match(pathname);
            const Icon = item.icon;
            const showBadge = item.href === '/orders' && totalItems > 0;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-0.5 min-w-[70px] transition-colors relative',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <div className="relative">
                  <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
                  {showBadge && (
                    <span className="absolute -top-1 -right-1 h-4 min-w-[16px] px-1 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span
                  className={cn(
                    'text-[11px] font-medium',
                    isActive && 'font-semibold'
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
