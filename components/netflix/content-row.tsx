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
  const [isHovered, setIsHovered] = useState(false);

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
      const scrollAmount = rowRef.current.clientWidth * 0.8;
      rowRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="relative group py-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Title */}
      <h2 className="text-lg md:text-xl font-semibold text-white px-4 md:px-12 mb-2 flex items-center group/title cursor-pointer hover:text-gray-300 transition-colors">
        {title}
        {isTop10 && (
          <span className="ml-2 text-xs bg-[#e50914] text-white px-2 py-0.5 rounded">
            TOP 10
          </span>
        )}
        <ChevronRight className="h-5 w-5 ml-1 opacity-0 group-hover/title:opacity-100 group-hover/title:translate-x-1 transition-all" />
        <span className="text-sm font-normal text-[#54b9c5] ml-1 opacity-0 group-hover/title:opacity-100 transition-opacity">
          Explore All
        </span>
      </h2>

      {/* Row Container */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className={cn(
            "absolute left-0 top-0 bottom-0 z-40 w-12 md:w-16 flex items-center justify-center",
            "bg-black/50 hover:bg-black/80 transition-all duration-300",
            "opacity-0 group-hover:opacity-100",
            !showLeftArrow && "invisible"
          )}
        >
          <ChevronLeft className="h-8 w-8 text-white" />
        </button>

        {/* Content Scroll Area */}
        <div
          ref={rowRef}
          onScroll={updateArrows}
          className={cn(
            "flex gap-2 overflow-x-scroll scrollbar-hide scroll-smooth",
            "px-4 md:px-12 pb-8",
            isTop10 && "gap-4"
          )}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
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
            "absolute right-0 top-0 bottom-0 z-40 w-12 md:w-16 flex items-center justify-center",
            "bg-black/50 hover:bg-black/80 transition-all duration-300",
            "opacity-0 group-hover:opacity-100",
            !showRightArrow && "invisible"
          )}
        >
          <ChevronRight className="h-8 w-8 text-white" />
        </button>
      </div>
    </div>
  );
}
