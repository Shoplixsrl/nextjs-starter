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
  const cardRef = useRef<HTMLDivElement>(null);

  const genres = getGenreNames(movie.genre_ids).slice(0, 3);

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative flex-shrink-0 cursor-pointer group/card",
        isTop10 ? "w-28 md:w-36 lg:w-44" : "w-36 md:w-44 lg:w-56"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onMoreInfo?.(movie)}
    >
      {/* Top 10 Number */}
      {isTop10 && index !== undefined && (
        <div className="absolute -left-4 md:-left-6 top-0 bottom-0 flex items-center z-0 pointer-events-none">
          <span
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-transparent leading-none select-none"
            style={{
              WebkitTextStroke: "2px #595959",
            }}
          >
            {index + 1}
          </span>
        </div>
      )}

      {/* Card Container */}
      <div
        className={cn(
          "relative rounded-md overflow-hidden bg-[#2f2f2f] transition-transform duration-300",
          isTop10 && "ml-4 md:ml-6",
          isHovered && "scale-110 z-30"
        )}
        style={{
          boxShadow: isHovered ? "0 8px 40px rgba(0,0,0,0.6)" : "none",
        }}
      >
        {/* Image */}
        <div className="relative aspect-video">
          <img
            src={movie.backdrop_path}
            alt={movie.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />

          {/* Hover Overlay */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-[#181818] via-black/20 to-transparent transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )} />

          {/* Play button on hover */}
          <div className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPlay?.(movie);
              }}
              className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
            >
              <Play className="h-6 w-6 fill-black text-black ml-1" />
            </button>
          </div>
        </div>

        {/* Info panel on hover */}
        <div className={cn(
          "bg-[#181818] transition-all duration-300 overflow-hidden",
          isHovered ? "max-h-40 p-3" : "max-h-0 p-0"
        )}>
          {/* Action Buttons */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPlay?.(movie);
                }}
                className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-white/80 transition-colors"
              >
                <Play className="h-4 w-4 fill-black text-black ml-0.5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToList?.(movie);
                }}
                className="w-7 h-7 rounded-full border border-gray-500 flex items-center justify-center hover:border-white transition-colors"
              >
                <Plus className="h-4 w-4 text-white" />
              </button>
              <button
                onClick={(e) => e.stopPropagation()}
                className="w-7 h-7 rounded-full border border-gray-500 flex items-center justify-center hover:border-white transition-colors"
              >
                <ThumbsUp className="h-3 w-3 text-white" />
              </button>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMoreInfo?.(movie);
              }}
              className="w-7 h-7 rounded-full border border-gray-500 flex items-center justify-center hover:border-white transition-colors"
            >
              <ChevronDown className="h-4 w-4 text-white" />
            </button>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-1.5 text-[10px] mb-1.5 flex-wrap">
            <span className="text-green-500 font-semibold">
              {movie.match_percentage}% Match
            </span>
            <span className="border border-gray-500 px-1 text-gray-400">
              {movie.maturity_rating}
            </span>
            {movie.seasons ? (
              <span className="text-gray-400">
                {movie.seasons}S
              </span>
            ) : movie.runtime ? (
              <span className="text-gray-400">
                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
              </span>
            ) : null}
          </div>

          {/* Genres */}
          <div className="flex items-center gap-1 text-[10px] text-gray-300">
            {genres.map((genre, idx) => (
              <span key={genre} className="flex items-center">
                {genre}
                {idx < genres.length - 1 && (
                  <span className="mx-0.5 text-gray-600">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Title below card (always visible) */}
      <h3 className={cn(
        "mt-2 text-xs text-gray-300 truncate transition-opacity duration-300",
        isTop10 && "ml-4 md:ml-6",
        isHovered && "opacity-0"
      )}>
        {movie.title}
      </h3>
    </div>
  );
}
