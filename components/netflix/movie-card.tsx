"use client";

import { useState, useRef } from "react";
import { Play, Plus, ThumbsUp, ChevronDown, Check } from "lucide-react";
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
  const [inList, setInList] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const genres = getGenreNames(movie.genre_ids).slice(0, 3);

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsHovered(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
    setIsHovered(false);
  };

  const handleAddToList = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInList(!inList);
    onAddToList?.(movie);
  };

  // Top 10 card design with large ranking numbers
  if (isTop10 && index !== undefined) {
    return (
      <div
        ref={cardRef}
        className="relative flex-shrink-0 cursor-pointer h-36 md:h-44 lg:h-52"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onMoreInfo?.(movie)}
      >
        <div className="flex items-end h-full">
          {/* Large Ranking Number */}
          <div className="relative z-10 flex-shrink-0 -mr-4 md:-mr-6">
            <span
              className="text-[100px] md:text-[130px] lg:text-[160px] font-black leading-none select-none"
              style={{
                color: "#141414",
                WebkitTextStroke: "4px #595959",
                textShadow: "4px 4px 0 #000",
              }}
            >
              {index + 1}
            </span>
          </div>

          {/* Poster Image */}
          <div
            className={cn(
              "relative w-24 md:w-28 lg:w-32 h-full rounded overflow-hidden bg-[#333] transition-all duration-300",
              isHovered && "scale-125 z-50 shadow-2xl"
            )}
          >
            <img
              src={movie.poster_path}
              alt={movie.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />

            {/* Hover Overlay */}
            {isHovered && (
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlay?.(movie);
                    }}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-white/80 mb-1"
                  >
                    <Play className="h-4 w-4 fill-black text-black ml-0.5" />
                  </button>
                  <p className="text-white text-xs font-medium truncate">{movie.title}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Regular card design
  return (
    <div
      ref={cardRef}
      className="relative flex-shrink-0 cursor-pointer group/card w-[160px] md:w-[200px] lg:w-[240px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Card Container */}
      <div
        className={cn(
          "relative rounded overflow-hidden bg-[#181818] transition-all duration-300 ease-out",
          isHovered && "scale-[1.4] z-50 rounded-t"
        )}
        style={{
          transformOrigin: "center top",
          boxShadow: isHovered ? "0 14px 36px rgba(0,0,0,0.75), 0 10px 24px rgba(0,0,0,0.5)" : "none",
        }}
      >
        {/* Image */}
        <div
          className="relative aspect-video cursor-pointer"
          onClick={() => isHovered ? onMoreInfo?.(movie) : setIsHovered(true)}
        >
          <img
            src={movie.backdrop_path}
            alt={movie.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />

          {/* Gradient Overlay on Hover */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-[#181818] to-transparent transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )} />

          {/* Play Button Center */}
          {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPlay?.(movie);
                }}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-transform hover:scale-110"
              >
                <Play className="h-5 w-5 md:h-6 md:w-6 fill-black text-black ml-0.5" />
              </button>
            </div>
          )}
        </div>

        {/* Expanded Info Panel */}
        <div className={cn(
          "bg-[#181818] transition-all duration-300 overflow-hidden",
          isHovered ? "opacity-100" : "opacity-0 h-0"
        )}>
          {isHovered && (
            <div className="p-3 pt-1">
              {/* Action Buttons */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlay?.(movie);
                    }}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-white/80 transition-colors"
                  >
                    <Play className="h-4 w-4 fill-black text-black ml-0.5" />
                  </button>
                  <button
                    onClick={handleAddToList}
                    className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors group/btn"
                  >
                    {inList ? (
                      <Check className="h-4 w-4 text-white" />
                    ) : (
                      <Plus className="h-4 w-4 text-white" />
                    )}
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors"
                  >
                    <ThumbsUp className="h-3.5 w-3.5 text-white" />
                  </button>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoreInfo?.(movie);
                  }}
                  className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors"
                >
                  <ChevronDown className="h-4 w-4 text-white" />
                </button>
              </div>

              {/* Metadata Row */}
              <div className="flex items-center gap-2 text-xs mb-2 flex-wrap">
                <span className="text-[#46d369] font-semibold">
                  {movie.match_percentage}% Match
                </span>
                <span className="border border-gray-500 px-1 text-[10px] text-gray-400">
                  {movie.maturity_rating}
                </span>
                {movie.seasons ? (
                  <span className="text-gray-300">
                    {movie.seasons} Season{movie.seasons > 1 ? "s" : ""}
                  </span>
                ) : movie.runtime ? (
                  <span className="text-gray-300">
                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                  </span>
                ) : null}
                <span className="border border-gray-500 px-1 text-[10px] text-gray-400">HD</span>
              </div>

              {/* Genres */}
              <div className="flex items-center text-xs text-gray-300">
                {genres.map((genre, idx) => (
                  <span key={genre} className="flex items-center">
                    {genre}
                    {idx < genres.length - 1 && (
                      <span className="mx-1.5 w-1 h-1 rounded-full bg-gray-500" />
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Title (visible when not hovered) */}
      <p className={cn(
        "mt-1.5 text-xs text-gray-400 truncate transition-opacity duration-200",
        isHovered && "opacity-0"
      )}>
        {movie.title}
      </p>
    </div>
  );
}
