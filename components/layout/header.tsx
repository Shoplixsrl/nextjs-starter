"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, MapPin, User, Heart, Ticket } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Browse Events", href: "/events" },
  { name: "Categories", href: "/events?view=categories" },
  { name: "Create Event", href: "/create" },
];

export function Header({ className }: { className?: string }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className={cn("sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b", className)}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center gap-2 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search events..."
                className="pl-10 bg-secondary border-0"
              />
            </div>
            <Button variant="outline" size="icon" className="shrink-0">
              <MapPin className="h-4 w-4" />
            </Button>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Mobile search toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Favorites */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Heart className="h-5 w-5" />
            </Button>

            {/* Tickets */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Ticket className="h-5 w-5" />
            </Button>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Link href="/profile" className="w-full">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/profile/tickets" className="w-full">My Tickets</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/profile/saved" className="w-full">Saved Events</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sign In / Sign Up */}
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button size="sm" className="btn-gradient">
                Sign Up
              </Button>
            </div>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-6 mt-6">
                  {/* Mobile navigation */}
                  <nav className="flex flex-col gap-4">
                    {navigation.map((item) => (
                      <SheetClose asChild key={item.name}>
                        <Link
                          href={item.href}
                          className="text-lg font-medium hover:text-primary transition-colors"
                        >
                          {item.name}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>

                  <div className="border-t pt-4">
                    <SheetClose asChild>
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 py-2 hover:text-primary"
                      >
                        <User className="h-5 w-5" />
                        My Profile
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/profile/tickets"
                        className="flex items-center gap-3 py-2 hover:text-primary"
                      >
                        <Ticket className="h-5 w-5" />
                        My Tickets
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/profile/saved"
                        className="flex items-center gap-3 py-2 hover:text-primary"
                      >
                        <Heart className="h-5 w-5" />
                        Saved Events
                      </Link>
                    </SheetClose>
                  </div>

                  <div className="border-t pt-4 flex flex-col gap-2">
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                    <Button className="w-full btn-gradient">
                      Sign Up
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile search bar */}
        {isSearchOpen && (
          <div className="lg:hidden pb-4 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search events..."
                className="pl-10 bg-secondary border-0"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
