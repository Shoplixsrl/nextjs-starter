'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ShoppingCart, Package, User, LogOut, Plus, LayoutDashboard } from 'lucide-react';

export function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            VibeCode Market
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
              Browse Products
            </Link>
            <Link href="/auctions" className="text-sm font-medium hover:text-primary transition-colors">
              Auctions
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Button variant="default" size="sm" asChild>
                <Link href="/seller/products/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Sell Product
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatar || undefined} alt={user.displayName || user.username} />
                      <AvatarFallback>
                        {(user.displayName || user.username).charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.displayName || user.username}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/seller/dashboard">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Seller Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/buyer/purchases">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      My Purchases
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/buyer/subscriptions">
                      <Package className="mr-2 h-4 w-4" />
                      My Subscriptions
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/users/${user.username}`}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">Sign in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/register">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
