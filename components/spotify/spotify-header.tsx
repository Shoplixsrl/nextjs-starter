"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  User,
  ExternalLink,
  Settings,
  LogOut,
  Crown,
  Home,
  Compass,
} from "lucide-react";

interface SpotifyHeaderProps {
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  backgroundColor?: string;
  transparent?: boolean;
}

export function SpotifyHeader({
  showSearch = false,
  searchValue = "",
  onSearchChange,
  backgroundColor,
  transparent = false,
}: SpotifyHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-10 px-6 py-4 flex items-center justify-between gap-4 transition-colors duration-300",
        transparent && !isScrolled ? "bg-transparent" : backgroundColor ? "" : "bg-[#121212]"
      )}
      style={backgroundColor && !transparent ? { backgroundColor } : undefined}
    >
      {/* Navigation Arrows */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 bg-black/70 hover:bg-black/80 rounded-full text-white"
          onClick={() => router.back()}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 bg-black/70 hover:bg-black/80 rounded-full text-white"
          onClick={() => router.forward()}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>

        {/* Home & Browse Buttons on Search page */}
        {showSearch && (
          <div className="flex items-center gap-2 ml-2">
            <Link href="/">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "w-12 h-12 rounded-full",
                  pathname === "/"
                    ? "bg-white text-black hover:bg-white"
                    : "bg-[#282828] text-white hover:bg-[#3e3e3e]"
                )}
              >
                <Home className="w-6 h-6" />
              </Button>
            </Link>
          </div>
        )}

        {/* Search Input */}
        {showSearch && (
          <div className="relative ml-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#b3b3b3]" />
            <Input
              type="text"
              placeholder="What do you want to play?"
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-[360px] h-12 pl-12 pr-4 bg-[#242424] border-none rounded-full text-white placeholder:text-[#b3b3b3] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-0"
            />
            {searchValue && (
              <button
                onClick={() => onSearchChange?.("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#b3b3b3] hover:text-white"
              >
                ×
              </button>
            )}
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        {/* Premium Button */}
        <Link href="#">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full bg-white text-black hover:bg-white hover:scale-105 border-none font-bold text-sm h-8 px-4 transition-transform"
          >
            Explore Premium
          </Button>
        </Link>

        {/* Install App */}
        <Link href="#">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full bg-black/70 hover:bg-black/90 text-white font-bold text-sm h-8 px-4 gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Install App
          </Button>
        </Link>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 bg-black/70 hover:bg-black/90 rounded-full text-white"
        >
          <Bell className="w-4 h-4" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 bg-black/70 hover:bg-black/90 rounded-full overflow-hidden p-0"
            >
              <Image
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                alt="User"
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-[#282828] border-none text-white">
            <DropdownMenuItem className="hover:bg-[#3e3e3e] focus:bg-[#3e3e3e] cursor-pointer">
              <User className="w-4 h-4 mr-2" />
              Account
              <ExternalLink className="w-3 h-3 ml-auto" />
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-[#3e3e3e] focus:bg-[#3e3e3e] cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-[#3e3e3e] focus:bg-[#3e3e3e] cursor-pointer">
              <Crown className="w-4 h-4 mr-2 text-[#1DB954]" />
              Upgrade to Premium
              <ExternalLink className="w-3 h-3 ml-auto" />
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-[#3e3e3e] focus:bg-[#3e3e3e] cursor-pointer">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#3e3e3e]" />
            <DropdownMenuItem className="hover:bg-[#3e3e3e] focus:bg-[#3e3e3e] cursor-pointer">
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
