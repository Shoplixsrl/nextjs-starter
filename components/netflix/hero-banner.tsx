"use client";

import { useState, useEffect } from "react";
import { Play, Info, VolumeX, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Movie, getGenreNames } from "@/lib/netflix-data";
import { cn } from "@/lib/utils";

interface HeroBannerProps {
  content: Movie[];
  onPlayClick?: (movie: Movie) => void;
  onInfoClick?: (movie: Movie) => void;
}

export function HeroBanner({ content, onPlayClick, onInfoClick }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const currentMovie = content[currentIndex];

  useEffect(() => {
    setIsLoaded(true);

    // Auto-rotate featured content every 10 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % content.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [content.length]);

  if (!currentMovie) return null;

  const genres = getGenreNames(currentMovie.genre_ids);

  return (
    <div className="relative h-[80vh] md:h-[90vh] w-full overflow-hidden">
      {/* Background Image with Gradient */}
      <div className="absolute inset-0">
        <div
          className={cn(
            "absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          style={{
            backgroundImage: `url(${currentMovie.backdrop_path})`,
          }}
        />

        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/40" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#141414] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-4 md:px-12 pt-20">
        <div className="max-w-2xl">
          {/* Netflix Original Badge */}
          {currentMovie.match_percentage >= 95 && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#e50914] font-bold text-sm tracking-widest">
                N
              </span>
              <span className="text-gray-400 text-xs tracking-widest uppercase">
                Series
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-lg">
            {currentMovie.title}
          </h1>

          {/* Metadata */}
          <div className="flex items-center gap-3 text-sm text-gray-300 mb-4">
            <span className="text-green-500 font-semibold">
              {currentMovie.match_percentage}% Match
            </span>
            <span>{new Date(currentMovie.release_date).getFullYear()}</span>
            <span className="border border-gray-500 px-1 text-xs">
              {currentMovie.maturity_rating}
            </span>
            {currentMovie.seasons && (
              <span>{currentMovie.seasons} Season{currentMovie.seasons > 1 ? "s" : ""}</span>
            )}
            {currentMovie.runtime && (
              <span>{Math.floor(currentMovie.runtime / 60)}h {currentMovie.runtime % 60}m</span>
            )}
            <span className="border border-gray-500 px-1 text-xs">HD</span>
          </div>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-200 mb-6 line-clamp-3 max-w-xl drop-shadow-md">
            {currentMovie.overview}
          </p>

          {/* Genres */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            {genres.map((genre, index) => (
              <span key={genre}>
                {genre}
                {index < genres.length - 1 && <span className="mx-2">•</span>}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <Button
              onClick={() => onPlayClick?.(currentMovie)}
              className="bg-white hover:bg-white/80 text-black font-semibold px-6 py-6 text-lg rounded"
            >
              <Play className="h-6 w-6 mr-2 fill-black" />
              Play
            </Button>
            <Button
              onClick={() => onInfoClick?.(currentMovie)}
              variant="secondary"
              className="bg-gray-500/70 hover:bg-gray-500/50 text-white font-semibold px-6 py-6 text-lg rounded"
            >
              <Info className="h-6 w-6 mr-2" />
              More Info
            </Button>
          </div>
        </div>
      </div>

      {/* Mute Button */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-32 right-12 z-20 p-2 border border-gray-400 rounded-full text-white hover:bg-white/10 transition-colors"
      >
        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </button>

      {/* Content Indicator Dots */}
      <div className="absolute bottom-40 right-12 z-20 flex items-center gap-1">
        {content.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-3 h-1 rounded-sm transition-all duration-300",
              index === currentIndex ? "bg-white w-6" : "bg-gray-500"
            )}
          />
        ))}
      </div>

      {/* Maturity Rating Badge */}
      <div className="absolute bottom-32 right-32 z-20 flex items-center">
        <div className="bg-gray-800/80 border-l-2 border-white px-3 py-1">
          <span className="text-white text-sm">{currentMovie.maturity_rating}</span>
        </div>
      </div>
    </div>
  );
}
