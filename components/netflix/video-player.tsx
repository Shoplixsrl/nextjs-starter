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
  Flag,
} from "lucide-react";
import { Movie } from "@/lib/netflix-data";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

interface VideoPlayerProps {
  movie: Movie;
  onClose: () => void;
}

export function VideoPlayer({ movie, onClose }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState((movie.runtime || 45) * 60); // Convert to seconds
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Format time as HH:MM:SS
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Simulate video playback
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

  // Auto-hide controls
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

  // Handle mouse movement
  const handleMouseMove = () => {
    setShowControls(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Handle keyboard shortcuts
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
          onClose();
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
  }, [duration, onClose]);

  const progress = (currentTime / duration) * 100;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black"
      onMouseMove={handleMouseMove}
    >
      {/* Video Background (simulated with image) */}
      <div className="absolute inset-0">
        <img
          src={movie.backdrop_path}
          alt={movie.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Mock Video Content Text */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity duration-500",
          showControls ? "opacity-0" : "opacity-100"
        )}
      >
        <div className="text-center text-white/30">
          <Play className="w-24 h-24 mx-auto mb-4" />
          <p className="text-2xl">Now Playing</p>
          <p className="text-4xl font-bold mt-2">{movie.title}</p>
        </div>
      </div>

      {/* Controls Overlay */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
            >
              <ArrowLeft className="w-8 h-8" />
            </button>

            <div className="flex items-center gap-4">
              <button className="text-white hover:text-gray-300 transition-colors">
                <Flag className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Center Play/Pause */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setCurrentTime((prev) => Math.max(0, prev - 10))}
              className="text-white/80 hover:text-white transition-colors"
            >
              <SkipBack className="w-10 h-10" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-10 h-10 text-white" />
              ) : (
                <Play className="w-10 h-10 text-white ml-1" />
              )}
            </button>

            <button
              onClick={() => setCurrentTime((prev) => Math.min(duration, prev + 10))}
              className="text-white/80 hover:text-white transition-colors"
            >
              <SkipForward className="w-10 h-10" />
            </button>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/90 to-transparent">
          {/* Progress Bar */}
          <div className="group mb-4">
            <div className="relative">
              {/* Buffer bar (simulated) */}
              <div className="absolute inset-0 h-1 bg-gray-600 rounded-full" />

              {/* Progress bar */}
              <div
                className="absolute inset-y-0 left-0 h-1 bg-[#e50914] rounded-full"
                style={{ width: `${progress}%` }}
              />

              {/* Scrubber */}
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={(e) => setCurrentTime(Number(e.target.value))}
                className="absolute inset-0 w-full h-1 opacity-0 cursor-pointer"
              />

              {/* Thumb */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#e50914] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ left: `calc(${progress}% - 6px)` }}
              />
            </div>

            {/* Preview thumbnail (simulated) */}
            <div
              className="absolute bottom-8 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ left: `${progress}%`, transform: "translateX(-50%)" }}
            >
              <div className="w-40 aspect-video bg-gray-800 rounded overflow-hidden mb-1">
                <img
                  src={movie.backdrop_path}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="block text-center text-white text-xs">
                {formatTime(currentTime)}
              </span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Play/Pause */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8" />
                )}
              </button>

              {/* Skip buttons */}
              <button
                onClick={() => setCurrentTime((prev) => Math.max(0, prev - 10))}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <SkipBack className="w-6 h-6" />
              </button>
              <button
                onClick={() => setCurrentTime((prev) => Math.min(duration, prev + 10))}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <SkipForward className="w-6 h-6" />
              </button>

              {/* Volume */}
              <div className="flex items-center gap-2 group/volume">
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
                <div className="w-0 group-hover/volume:w-20 overflow-hidden transition-all duration-300">
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    max={100}
                    step={1}
                    onValueChange={(value) => {
                      setVolume(value[0]);
                      setIsMuted(value[0] === 0);
                    }}
                    className="w-20"
                  />
                </div>
              </div>

              {/* Time */}
              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Title */}
            <div className="hidden md:block text-white text-lg font-medium">
              {movie.title}
              {movie.seasons && (
                <span className="text-gray-400 ml-2">S1:E1</span>
              )}
            </div>

            <div className="flex items-center gap-4">
              {/* Next Episode (for TV) */}
              {movie.media_type === "tv" && (
                <button className="flex items-center gap-1 text-white hover:text-gray-300 transition-colors">
                  <span className="text-sm hidden md:inline">Next Episode</span>
                  <SkipForward className="w-6 h-6" />
                </button>
              )}

              {/* Subtitles */}
              <button className="text-white hover:text-gray-300 transition-colors">
                <MessageSquare className="w-6 h-6" />
              </button>

              {/* Settings */}
              <button className="text-white hover:text-gray-300 transition-colors">
                <Settings className="w-6 h-6" />
              </button>

              {/* Fullscreen */}
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
