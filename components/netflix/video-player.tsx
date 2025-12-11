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
} from "lucide-react";
import { Movie } from "@/lib/netflix-data";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  movie: Movie;
  onClose: () => void;
}

export function VideoPlayer({ movie, onClose }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState((movie.runtime || 45) * 60);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, duration]);

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
        case "ArrowLeft":
          setCurrentTime((prev) => Math.max(0, prev - 10));
          break;
        case "ArrowRight":
          setCurrentTime((prev) => Math.min(duration, prev + 10));
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [duration]);

  const progress = (currentTime / duration) * 100;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black"
      onMouseMove={handleMouseMove}
      onClick={() => setIsPlaying(!isPlaying)}
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        <img
          src={movie.backdrop_path}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Controls Overlay */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0"
        )}
        onClick={(e) => e.stopPropagation()}
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

        {/* Center Controls */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-12 pointer-events-auto">
            <button
              onClick={() => setCurrentTime((prev) => Math.max(0, prev - 10))}
              className="text-white/80 hover:text-white transition-colors p-3"
            >
              <RotateCcw className="w-12 h-12" />
              <span className="text-xs block mt-1">10s</span>
            </button>

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

            <button
              onClick={() => setCurrentTime((prev) => Math.min(duration, prev + 10))}
              className="text-white/80 hover:text-white transition-colors p-3"
            >
              <RotateCw className="w-12 h-12" />
              <span className="text-xs block mt-1">10s</span>
            </button>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-black via-black/60 to-transparent">
          {/* Title */}
          <div className="mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">{movie.title}</h2>
            {movie.seasons && (
              <p className="text-gray-400 text-sm mt-1">S1:E1 "Pilot"</p>
            )}
          </div>

          {/* Progress Bar */}
          <div className="relative mb-4 group cursor-pointer">
            <div className="h-1 group-hover:h-2 bg-gray-600/80 rounded-full transition-all">
              <div
                className="h-full bg-[#e50914] rounded-full relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#e50914] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={(e) => setCurrentTime(Number(e.target.value))}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
            />
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

              <button
                onClick={() => setCurrentTime((prev) => Math.max(0, prev - 10))}
                className="text-white hover:text-gray-300 transition-colors hidden md:block"
              >
                <SkipBack className="w-6 h-6" />
              </button>

              <button
                onClick={() => setCurrentTime((prev) => Math.min(duration, prev + 10))}
                className="text-white hover:text-gray-300 transition-colors hidden md:block"
              >
                <SkipForward className="w-6 h-6" />
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

              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
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
