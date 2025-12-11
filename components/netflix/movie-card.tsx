"use client";

import { useState, useRef } from "react";
import { Play, Plus, ThumbsUp, ChevronDown } from "lucide-react";
import { Movie, getGenreNames } from "@/lib/netflix-data";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  movie: Movie;
  index?: number;
  isTop10?: boolean;
  onPlay?: (movie: Movie) => void;
  onAddToList?: (movie: Movie) => void;
  onMoreInfo?: (movie: Movie) => void;
}

export function MovieCard({
  movie,
  index,
  isTop10 = false,
  onPlay,
  onAddToList,
  onMoreInfo,
}: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverPosition, setHoverPosition] = useState<"left" | "center" | "right">("center");
  const cardRef = useRef<HTMLDivElement>(null);

  const genres = getGenreNames(movie.genre_ids).slice(0, 3);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      if (rect.left < 100) {
        setHoverPosition("left");
      } else if (rect.right > viewportWidth - 100) {
        setHoverPosition("right");
      } else {
        setHoverPosition("center");
      }
    }
    setIsHovered(true);
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative flex-shrink-0 cursor-pointer transition-all duration-300",
        isTop10 ? "w-32 md:w-40" : "w-40 md:w-52"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top 10 Number */}
      {isTop10 && index !== undefined && (
        <div className="absolute -left-6 md:-left-8 top-0 bottom-0 flex items-center z-0">
          <span
            className="text-[80px] md:text-[100px] font-bold text-transparent leading-none"
            style={{
              WebkitTextStroke: "2px #808080",
            }}
          >
            {index + 1}
          </span>
        </div>
      )}

      {/* Card Container */}
      <div
        className={cn(
          "relative overflow-visible rounded",
          isTop10 && "ml-6 md:ml-8"
        )}
      >
        {/* Base Image */}
        <div className="relative aspect-video rounded overflow-hidden bg-gray-800">
          <img
            src={movie.backdrop_path}
            alt={movie.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Hover Card */}
        {isHovered && (
          <div
            className={cn(
              "absolute z-50 w-[300px] bg-[#181818] rounded-lg shadow-2xl overflow-hidden",
              "transition-all duration-300 ease-out",
              "animate-in zoom-in-95",
              hoverPosition === "left" && "-top-4 left-0",
              hoverPosition === "center" && "-top-4 left-1/2 -translate-x-1/2",
              hoverPosition === "right" && "-top-4 right-0"
            )}
            style={{
              boxShadow: "0 0 30px rgba(0,0,0,0.8)",
            }}
          >
            {/* Preview Image */}
            <div className="relative aspect-video">
              <img
                src={movie.backdrop_path}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />

              {/* Title on image */}
              <div className="absolute bottom-2 left-3 right-3">
                <h3 className="text-white font-semibold text-sm truncate">
                  {movie.title}
                </h3>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-3 space-y-3">
              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onPlay?.(movie)}
                    className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-white/80 transition-colors"
                  >
                    <Play className="h-5 w-5 fill-black text-black ml-0.5" />
                  </button>
                  <button
                    onClick={() => onAddToList?.(movie)}
                    className="w-9 h-9 rounded-full border-2 border-gray-500 flex items-center justify-center hover:border-white transition-colors"
                  >
                    <Plus className="h-5 w-5 text-white" />
                  </button>
                  <button className="w-9 h-9 rounded-full border-2 border-gray-500 flex items-center justify-center hover:border-white transition-colors">
                    <ThumbsUp className="h-4 w-4 text-white" />
                  </button>
                </div>
                <button
                  onClick={() => onMoreInfo?.(movie)}
                  className="w-9 h-9 rounded-full border-2 border-gray-500 flex items-center justify-center hover:border-white transition-colors"
                >
                  <ChevronDown className="h-5 w-5 text-white" />
                </button>
              </div>

              {/* Metadata */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-green-500 font-semibold">
                  {movie.match_percentage}% Match
                </span>
                <span className="border border-gray-500 px-1 text-gray-400">
                  {movie.maturity_rating}
                </span>
                {movie.seasons ? (
                  <span className="text-gray-400">
                    {movie.seasons} Season{movie.seasons > 1 ? "s" : ""}
                  </span>
                ) : (
                  <span className="text-gray-400">
                    {movie.runtime && `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
                  </span>
                )}
                <span className="border border-gray-500 px-1 text-gray-400 text-[10px]">
                  HD
                </span>
              </div>

              {/* Genres */}
              <div className="flex items-center gap-1 text-xs text-gray-300">
                {genres.map((genre, idx) => (
                  <span key={genre} className="flex items-center">
                    {genre}
                    {idx < genres.length - 1 && (
                      <span className="mx-1 text-gray-600">•</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
