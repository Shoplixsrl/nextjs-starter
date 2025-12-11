"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Movie } from "@/lib/netflix-data";
import { MovieCard } from "./movie-card";
import { cn } from "@/lib/utils";

interface ContentRowProps {
  title: string;
  movies: Movie[];
  isTop10?: boolean;
  onPlay?: (movie: Movie) => void;
  onAddToList?: (movie: Movie) => void;
  onMoreInfo?: (movie: Movie) => void;
}

export function ContentRow({
  title,
  movies,
  isTop10 = false,
  onPlay,
  onAddToList,
  onMoreInfo,
}: ContentRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const updateArrows = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.clientWidth * 0.75;
      rowRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative group/row py-4 md:py-6">
      {/* Title */}
      <h2 className="text-sm md:text-base lg:text-lg font-bold text-white px-4 md:px-12 mb-2 md:mb-3 flex items-center">
        {title}
        {isTop10 && (
          <span className="ml-2 text-[10px] bg-[#e50914] text-white px-1.5 py-0.5 rounded font-medium">
            TOP 10
          </span>
        )}
        <span className="flex items-center ml-2 opacity-0 group-hover/row:opacity-100 transition-opacity text-[#54b9c5] text-xs font-normal">
          Explore All
          <ChevronRight className="h-4 w-4" />
        </span>
      </h2>

      {/* Row Container */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className={cn(
            "absolute left-0 top-0 bottom-6 z-40 w-10 md:w-14 flex items-center justify-center",
            "bg-gradient-to-r from-[#141414]/90 to-transparent",
            "opacity-0 group-hover/row:opacity-100 transition-opacity duration-300",
            !showLeftArrow && "pointer-events-none"
          )}
        >
          <ChevronLeft className={cn(
            "h-8 w-8 text-white transition-opacity",
            !showLeftArrow && "opacity-0"
          )} />
        </button>

        {/* Content Scroll Area */}
        <div
          ref={rowRef}
          onScroll={updateArrows}
          className="flex gap-1 md:gap-2 overflow-x-auto scrollbar-hide scroll-smooth px-4 md:px-12 pb-2"
        >
          {movies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              index={index}
              isTop10={isTop10}
              onPlay={onPlay}
              onAddToList={onAddToList}
              onMoreInfo={onMoreInfo}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className={cn(
            "absolute right-0 top-0 bottom-6 z-40 w-10 md:w-14 flex items-center justify-center",
            "bg-gradient-to-l from-[#141414]/90 to-transparent",
            "opacity-0 group-hover/row:opacity-100 transition-opacity duration-300",
            !showRightArrow && "pointer-events-none"
          )}
        >
          <ChevronRight className={cn(
            "h-8 w-8 text-white transition-opacity",
            !showRightArrow && "opacity-0"
          )} />
        </button>
      </div>
    </div>
  );
}
