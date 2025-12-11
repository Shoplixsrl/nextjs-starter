"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Bell, ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserProfile } from "@/lib/netflix-data";

interface NetflixHeaderProps {
  currentProfile?: UserProfile;
  onSearch?: (query: string) => void;
  onProfileClick?: () => void;
}

const navLinks = [
  { label: "Home", href: "/netflix" },
  { label: "TV Shows", href: "/netflix?category=tv" },
  { label: "Movies", href: "/netflix?category=movies" },
  { label: "New & Popular", href: "/netflix?category=new" },
  { label: "My List", href: "/netflix/my-list" },
  { label: "Browse by Languages", href: "/netflix?category=languages" },
];

export function NetflixHeader({
  currentProfile,
  onSearch,
  onProfileClick,
}: NetflixHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "bg-[#141414]" : "bg-gradient-to-b from-black/80 to-transparent"
      )}
    >
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        {/* Left section */}
        <div className="flex items-center gap-8">
          {/* Netflix Logo */}
          <Link href="/netflix" className="flex-shrink-0">
            <svg
              viewBox="0 0 111 30"
              className="h-6 md:h-8 fill-[#e50914]"
              aria-label="Netflix"
            >
              <path d="M105.062 14.28L111 30c-1.75-.25-3.499-.563-5.28-.845l-3.345-8.686-3.437 7.969c-1.687-.282-3.344-.376-5.031-.595l6.031-13.75L94.468 0h5.063l3.062 7.874L105.875 0h5.124l-5.937 14.28zM90.47 0h-4.594v27.25c1.5.094 3.062.156 4.594.343V0zm-8.563 26.937c-4.187-.281-8.375-.53-12.656-.625V0h4.687v21.875c2.688.062 5.375.28 7.969.405v4.657zM64.25 10.657v4.687h-6.406V26H53.22V0h13.125v4.687h-8.5v5.97h6.406zm-18.906-5.97V26.25c-1.563 0-3.156 0-4.688.062V4.687h-4.844V0h14.406v4.687h-4.874zM30.75 15.593c-2.062 0-4.5 0-6.25.095v6.968c2.75-.188 5.5-.406 8.281-.5v4.5l-12.968 1.032V0H32.78v4.687H24.5V11c1.813 0 4.594-.094 6.25-.094v4.688zM4.78 12.968v16.375C3.094 29.531 1.593 29.75 0 30V0h4.469l6.093 17.032V0h4.688v28.062c-1.656.282-3.344.376-5.125.625L4.78 12.968z" />
            </svg>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex items-center gap-1 text-sm text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            Browse
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative flex items-center">
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <div className="flex items-center bg-black/80 border border-white px-2">
                  <Search className="h-5 w-5 text-white" />
                  <input
                    type="text"
                    placeholder="Titles, people, genres"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-white text-sm py-1 px-2 w-48 md:w-64 outline-none placeholder:text-gray-400"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Kids */}
          <Link
            href="/netflix/kids"
            className="hidden md:block text-sm text-gray-300 hover:text-white transition-colors"
          >
            Kids
          </Link>

          {/* Notifications */}
          <button className="relative text-white hover:text-gray-300 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-[#e50914] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile */}
          <button
            onClick={onProfileClick}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded overflow-hidden">
              <img
                src={
                  currentProfile?.avatar ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop"
                }
                alt={currentProfile?.name || "Profile"}
                className="w-full h-full object-cover"
              />
            </div>
            <ChevronDown className="h-4 w-4 text-white group-hover:rotate-180 transition-transform" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 border-t border-gray-800">
          <nav className="flex flex-col py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-6 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
