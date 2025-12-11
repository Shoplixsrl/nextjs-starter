"use client";

import { useEffect, useState } from "react";
import { X, Play, Plus, ThumbsUp, ThumbsDown, Volume2, VolumeX } from "lucide-react";
import { Movie, getGenreNames } from "@/lib/netflix-data";
import { useMovieDetails, MovieDetails } from "@/hooks/use-tmdb";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  onPlay?: (movie: Movie) => void;
}

export function MovieModal({ movie, isOpen, onClose, onPlay }: MovieModalProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  // Fetch detailed info from TMDB
  const { data: details, loading } = useMovieDetails(
    movie?.id ?? null,
    movie?.media_type ?? "movie"
  );

  const genres = movie ? getGenreNames(movie.genre_ids) : [];

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Auto-show trailer after delay if available
  useEffect(() => {
    if (isOpen && details?.trailer) {
      const timer = setTimeout(() => setShowTrailer(true), 1500);
      return () => clearTimeout(timer);
    }
    setShowTrailer(false);
  }, [isOpen, details?.trailer]);

  if (!movie || !isOpen) return null;

  // Combine local and API data
  const cast = details?.cast?.map((c) => c.name).join(", ") || "Loading...";
  const creators = details?.creators?.join(", ") || details?.director || "";
  const similarContent = details?.similar || details?.recommendations || [];

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="absolute inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 top-8 md:top-12 max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg bg-[#181818] shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#181818] flex items-center justify-center hover:bg-gray-700 transition-colors"
        >
          <X className="h-5 w-5 text-white" />
        </button>

        {/* Hero Section with Trailer */}
        <div className="relative aspect-video">
          {/* Background Image or Trailer */}
          {showTrailer && details?.trailer ? (
            <iframe
              src={`${details.trailer.embedUrl}&mute=${isMuted ? 1 : 0}&autoplay=1&controls=0&modestbranding=1&showinfo=0`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={details.trailer.name}
            />
          ) : (
            <img
              src={movie.backdrop_path}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/30 pointer-events-none" />

          {/* Volume Control (when trailer is playing) */}
          {showTrailer && details?.trailer && (
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="absolute bottom-24 right-6 z-10 w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center bg-black/50 hover:border-white transition-colors"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5 text-white" />
              ) : (
                <Volume2 className="h-5 w-5 text-white" />
              )}
            </button>
          )}

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              {movie.title}
            </h1>

            <div className="flex items-center gap-3 flex-wrap">
              <Button
                onClick={() => onPlay?.(movie)}
                className="bg-white hover:bg-white/80 text-black font-semibold px-6 py-5 text-base rounded"
              >
                <Play className="h-5 w-5 mr-2 fill-black" />
                Play
              </Button>
              <button className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors bg-black/30">
                <Plus className="h-5 w-5 text-white" />
              </button>
              <button className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors bg-black/30">
                <ThumbsUp className="h-4 w-4 text-white" />
              </button>
              <button className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors bg-black/30">
                <ThumbsDown className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6 md:p-10 pt-0 md:pt-0">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="md:col-span-2 space-y-4">
              {/* Metadata */}
              <div className="flex items-center gap-3 text-sm flex-wrap">
                <span className="text-green-500 font-semibold">
                  {movie.match_percentage}% Match
                </span>
                <span className="text-gray-400">
                  {new Date(movie.release_date).getFullYear()}
                </span>
                <span className="border border-gray-500 px-1 text-xs text-gray-400">
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
                <span className="border border-gray-500 px-1 text-xs text-gray-400">
                  HD
                </span>
                <span className="border border-gray-500 px-1 text-xs text-gray-400">
                  5.1
                </span>
              </div>

              {/* Tagline */}
              {details?.tagline && (
                <p className="text-gray-400 italic">&ldquo;{details.tagline}&rdquo;</p>
              )}

              {/* Description */}
              <p className="text-gray-200 text-base leading-relaxed">
                {movie.overview}
              </p>
            </div>

            {/* Right Column - Additional Info */}
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-500">Cast: </span>
                <span className="text-gray-300">{cast}</span>
              </div>
              <div>
                <span className="text-gray-500">Genres: </span>
                <span className="text-gray-300">{genres.join(", ")}</span>
              </div>
              {creators && (
                <div>
                  <span className="text-gray-500">
                    {movie.media_type === "tv" ? "Creators: " : "Director: "}
                  </span>
                  <span className="text-gray-300">{creators}</span>
                </div>
              )}
            </div>
          </div>

          {/* Trailer Section */}
          {details?.allVideos && details.allVideos.length > 1 && (
            <div className="mt-10">
              <h3 className="text-xl font-semibold text-white mb-4">
                Videos & Trailers
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {details.allVideos.slice(0, 6).map((video) => (
                  <a
                    key={video.key}
                    href={`https://www.youtube.com/watch?v=${video.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative aspect-video rounded overflow-hidden bg-gray-800"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                      alt={video.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                      <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center bg-black/50">
                        <Play className="h-6 w-6 text-white fill-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80">
                      <p className="text-white text-xs truncate">{video.name}</p>
                      <p className="text-gray-400 text-[10px]">{video.type}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* More Like This Section */}
          {similarContent.length > 0 && (
            <div className="mt-10">
              <h3 className="text-xl font-semibold text-white mb-4">
                More Like This
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {similarContent.slice(0, 6).map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#2a2a2a] rounded overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                  >
                    <div className="relative aspect-video">
                      <img
                        src={item.backdrop_path}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/netflix/backdrops/placeholder.jpg";
                        }}
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="text-white text-sm font-medium truncate mb-1">
                        {item.title}
                      </h4>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-green-500 text-xs font-semibold">
                          {item.match_percentage}% Match
                        </span>
                        <span className="border border-gray-500 px-1 text-[10px] text-gray-400">
                          {item.maturity_rating}
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs line-clamp-2">
                        {item.overview}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* About Section */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-white mb-4">
              About {movie.title}
            </h3>
            <div className="space-y-2 text-sm">
              {creators && (
                <div>
                  <span className="text-gray-500">
                    {movie.media_type === "tv" ? "Creators: " : "Director: "}
                  </span>
                  <span className="text-gray-300">{creators}</span>
                </div>
              )}
              <div>
                <span className="text-gray-500">Cast: </span>
                <span className="text-gray-300">{cast}</span>
              </div>
              <div>
                <span className="text-gray-500">Genres: </span>
                <span className="text-gray-300">{genres.join(", ")}</span>
              </div>
              <div>
                <span className="text-gray-500">Maturity rating: </span>
                <span className="border border-gray-500 px-1 text-xs text-gray-400 mr-2">
                  {movie.maturity_rating}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
