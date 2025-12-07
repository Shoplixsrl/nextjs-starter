"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center">
              <span className="text-white font-bold text-sm">FP</span>
            </div>
            <span className="font-extrabold text-xl tracking-tight-custom text-[#111]">
              FitPulse
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-[#666] hover:text-[#111] transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-[#666] hover:text-[#111] transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-[#666] hover:text-[#111] transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-[#666] hover:text-[#111] transition-colors"
            >
              Pricing
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="text-sm font-medium">
              Sign In
            </Button>
            <Button className="btn-gradient text-white rounded-full px-6 h-10 text-sm font-semibold border-0">
              Get Started Free
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-[#111]" />
            ) : (
              <Menu className="w-6 h-6 text-[#111]" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-4">
              <Link
                href="#features"
                className="text-sm font-medium text-[#666] hover:text-[#111] transition-colors py-2"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-medium text-[#666] hover:text-[#111] transition-colors py-2"
              >
                How It Works
              </Link>
              <Link
                href="#testimonials"
                className="text-sm font-medium text-[#666] hover:text-[#111] transition-colors py-2"
              >
                Testimonials
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-medium text-[#666] hover:text-[#111] transition-colors py-2"
              >
                Pricing
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                <Button variant="ghost" className="justify-start">
                  Sign In
                </Button>
                <Button className="btn-gradient text-white rounded-full border-0">
                  Get Started Free
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
