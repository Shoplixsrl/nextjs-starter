"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Music,
  Cpu,
  UtensilsCrossed,
  Trophy,
  Palette,
  Users,
  GraduationCap,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/types";

const categoryIcons: Record<Category, React.ElementType> = {
  music: Music,
  tech: Cpu,
  food: UtensilsCrossed,
  sports: Trophy,
  arts: Palette,
  networking: Users,
  education: GraduationCap,
  health: Heart,
};

const categoryColors: Record<Category, string> = {
  music: "from-purple-500 to-pink-500",
  tech: "from-blue-500 to-cyan-500",
  food: "from-orange-500 to-red-500",
  sports: "from-green-500 to-emerald-500",
  arts: "from-pink-500 to-rose-500",
  networking: "from-indigo-500 to-purple-500",
  education: "from-yellow-500 to-orange-500",
  health: "from-teal-500 to-green-500",
};

interface CategoryCardProps {
  category: {
    id: Category;
    name: string;
    image: string;
    count: number;
  };
  variant?: "default" | "compact" | "icon-only";
  className?: string;
}

export function CategoryCard({ category, variant = "default", className }: CategoryCardProps) {
  const Icon = categoryIcons[category.id];

  if (variant === "icon-only") {
    return (
      <Link
        href={`/events?category=${category.id}`}
        className={cn(
          "flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-secondary transition-colors group",
          className
        )}
      >
        <div
          className={cn(
            "p-4 rounded-full bg-gradient-to-br text-white transition-transform group-hover:scale-110",
            categoryColors[category.id]
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <span className="text-sm font-medium text-center">{category.name}</span>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/events?category=${category.id}`}
        className={cn(
          "flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors",
          className
        )}
      >
        <div
          className={cn(
            "p-2 rounded-lg bg-gradient-to-br text-white",
            categoryColors[category.id]
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{category.name}</p>
          <p className="text-sm text-muted-foreground">{category.count} events</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/events?category=${category.id}`}
      className={cn("group block", className)}
    >
      <div className="relative overflow-hidden rounded-xl aspect-[4/3] card-hover">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div
            className={cn(
              "p-3 rounded-full bg-white/20 backdrop-blur-sm mb-3 transition-transform group-hover:scale-110",
            )}
          >
            <Icon className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold mb-1">{category.name}</h3>
          <p className="text-sm text-white/80">{category.count} events</p>
        </div>
      </div>
    </Link>
  );
}

export function getCategoryIcon(category: Category) {
  return categoryIcons[category];
}

export function getCategoryColor(category: Category) {
  return categoryColors[category];
}
