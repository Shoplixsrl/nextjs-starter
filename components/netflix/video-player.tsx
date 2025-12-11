"use client";

import { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  MessageSquare,
  ArrowLeft,
  RotateCcw,
  RotateCw,
  Loader2,
} from "lucide-react";
import { Movie } from "@/lib/netflix-data";
import { useMovieDetails } from "@/hooks/use-tmdb";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  movie: Movie;
  onClose: () => void;
}

export function VideoPlayer({ movie, onClose }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch trailer from TMDB
  const { data: details, loading } = useMovieDetails(
    movie.id,
    movie.media_type
  );

  const trailer = details?.trailer;

  const handleMouseMove = () => {
    setShowControls(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleBack = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case " ":
        case "k":
          e.preventDefault();
          setIsPlaying((prev) => !prev);
          break;
        case "m":
          setIsMuted((prev) => !prev);
          break;
        case "f":
          toggleFullscreen();
          break;
        case "Escape":
          handleBack();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Hide controls timer
  useEffect(() => {
    const hideControls = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setShowControls(true);

      timeoutRef.current = setTimeout(() => {
        if (isPlaying) setShowControls(false);
      }, 3000);
    };

    hideControls();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isPlaying]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black"
      onMouseMove={handleMouseMove}
    >
      {/* Video/Trailer Content */}
      <div className="absolute inset-0">
        {loading ? (
          // Loading State
          <div className="w-full h-full flex flex-col items-center justify-center bg-black">
            <Loader2 className="w-16 h-16 text-red-600 animate-spin mb-4" />
            <p className="text-white text-lg">Loading trailer...</p>
          </div>
        ) : trailer ? (
          // YouTube Trailer
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&fs=0&disablekb=1&playsinline=1`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={trailer.name}
          />
        ) : (
          // Fallback to backdrop image
          <>
            <img
              src={movie.backdrop_path}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white">
                <p className="text-2xl font-semibold mb-2">No Trailer Available</p>
                <p className="text-gray-400">Preview not available for this title</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Controls Overlay */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Top Bar - Back Button */}
        <div className="absolute top-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
          <button
            onClick={handleBack}
            className="flex items-center gap-3 text-white hover:text-gray-300 transition-colors p-2 -ml-2 rounded-lg hover:bg-white/10"
          >
            <ArrowLeft className="w-8 h-8" />
            <span className="text-lg font-medium hidden md:inline">Back to Browse</span>
          </button>
        </div>

        {/* Center Play/Pause Button */}
        {!trailer && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-12 pointer-events-auto">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110"
              >
                {isPlaying ? (
                  <Pause className="w-12 h-12 text-white" />
                ) : (
                  <Play className="w-12 h-12 text-white ml-1" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-black via-black/60 to-transparent">
          {/* Title */}
          <div className="mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">{movie.title}</h2>
            {trailer && (
              <p className="text-gray-400 text-sm mt-1">{trailer.name}</p>
            )}
            {!trailer && movie.seasons && (
              <p className="text-gray-400 text-sm mt-1">S1:E1 "Pilot"</p>
            )}
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 md:gap-6">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7" />
                ) : (
                  <Play className="w-7 h-7" />
                )}
              </button>

              <div className="flex items-center gap-2 group/vol">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-6 h-6" />
                  ) : (
                    <Volume2 className="w-6 h-6" />
                  )}
                </button>
                <div className="w-0 group-hover/vol:w-24 overflow-hidden transition-all duration-300">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(Number(e.target.value));
                      setIsMuted(Number(e.target.value) === 0);
                    }}
                    className="w-24 h-1 accent-white cursor-pointer"
                  />
                </div>
              </div>

              {trailer && (
                <span className="text-white text-sm">
                  Trailer
                </span>
              )}
            </div>

            <div className="flex items-center gap-4">
              {movie.media_type === "tv" && (
                <button className="hidden md:flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded text-white text-sm transition-colors">
                  Next Episode
                  <SkipForward className="w-4 h-4" />
                </button>
              )}

              <button className="text-white hover:text-gray-300 transition-colors">
                <MessageSquare className="w-6 h-6" />
              </button>

              <button className="text-white hover:text-gray-300 transition-colors">
                <Settings className="w-6 h-6" />
              </button>

              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {isFullscreen ? (
                  <Minimize className="w-6 h-6" />
                ) : (
                  <Maximize className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
