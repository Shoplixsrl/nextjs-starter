"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePlayer } from "@/lib/player-context";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  Volume1,
  VolumeX,
  Heart,
  Mic2,
  ListMusic,
  Monitor,
  Maximize2,
  PictureInPicture2,
} from "lucide-react";

function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function SpotifyPlayer() {
  const {
    currentTrack,
    isPlaying,
    volume,
    isMuted,
    progress,
    duration,
    isShuffled,
    repeatMode,
    playingFrom,
    togglePlay,
    nextTrack,
    previousTrack,
    setVolume,
    toggleMute,
    seekTo,
    toggleShuffle,
    toggleRepeat,
  } = usePlayer();

  const [isLiked, setIsLiked] = useState(false);
  const [showQueue, setShowQueue] = useState(false);

  const VolumeIcon = isMuted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div className="h-[90px] bg-black border-t border-[#282828] px-4 flex items-center justify-between">
      {/* Now Playing */}
      <div className="flex items-center gap-4 w-[30%] min-w-[180px]">
        {currentTrack ? (
          <>
            <div className="w-14 h-14 rounded overflow-hidden flex-shrink-0 shadow-lg">
              <Image
                src={currentTrack.image}
                alt={currentTrack.title}
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <Link
                href={`/album/${currentTrack.albumId}`}
                className="text-sm text-white hover:underline truncate block"
              >
                {currentTrack.title}
              </Link>
              <Link
                href={`/artist/${currentTrack.artistId}`}
                className="text-xs text-[#b3b3b3] hover:text-white hover:underline truncate block"
              >
                {currentTrack.artist.name}
              </Link>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "w-8 h-8 flex-shrink-0",
                isLiked ? "text-[#1DB954]" : "text-[#b3b3b3] hover:text-white"
              )}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-[#b3b3b3] hover:text-white flex-shrink-0"
            >
              <PictureInPicture2 className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <div className="text-[#b3b3b3] text-sm">No track playing</div>
        )}
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center gap-2 w-[40%] max-w-[722px]">
        {/* Control Buttons */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "w-8 h-8",
              isShuffled ? "text-[#1DB954]" : "text-[#b3b3b3] hover:text-white"
            )}
            onClick={toggleShuffle}
          >
            <Shuffle className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-[#b3b3b3] hover:text-white"
            onClick={previousTrack}
          >
            <SkipBack className="w-5 h-5 fill-current" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 bg-white hover:bg-white hover:scale-105 text-black rounded-full transition-transform"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-[#b3b3b3] hover:text-white"
            onClick={nextTrack}
          >
            <SkipForward className="w-5 h-5 fill-current" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "w-8 h-8 relative",
              repeatMode !== "off" ? "text-[#1DB954]" : "text-[#b3b3b3] hover:text-white"
            )}
            onClick={toggleRepeat}
          >
            {repeatMode === "one" ? (
              <Repeat1 className="w-4 h-4" />
            ) : (
              <Repeat className="w-4 h-4" />
            )}
            {repeatMode !== "off" && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#1DB954] rounded-full" />
            )}
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs text-[#b3b3b3] w-10 text-right">
            {formatTime(progress)}
          </span>
          <Slider
            value={[progress]}
            max={duration || 100}
            step={1000}
            className="flex-1 h-1 cursor-pointer [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:opacity-0 hover:[&_[role=slider]]:opacity-100 [&_[data-state=active]_[role=slider]]:opacity-100"
            onValueChange={([value]) => seekTo(value)}
          />
          <span className="text-xs text-[#b3b3b3] w-10">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center justify-end gap-2 w-[30%] min-w-[180px]">
        {playingFrom.name && (
          <Link
            href={
              playingFrom.type === "playlist"
                ? `/playlist/${playingFrom.id}`
                : playingFrom.type === "album"
                ? `/album/${playingFrom.id}`
                : playingFrom.type === "artist"
                ? `/artist/${playingFrom.id}`
                : "#"
            }
            className="text-xs text-[#1DB954] hover:underline truncate max-w-[100px] hidden lg:block"
          >
            {playingFrom.name}
          </Link>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-[#b3b3b3] hover:text-white"
        >
          <Mic2 className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "w-8 h-8",
            showQueue ? "text-[#1DB954]" : "text-[#b3b3b3] hover:text-white"
          )}
          onClick={() => setShowQueue(!showQueue)}
        >
          <ListMusic className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-[#b3b3b3] hover:text-white"
        >
          <Monitor className="w-4 h-4" />
        </Button>

        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-[#b3b3b3] hover:text-white"
            onClick={toggleMute}
          >
            <VolumeIcon className="w-4 h-4" />
          </Button>
          <Slider
            value={[isMuted ? 0 : volume * 100]}
            max={100}
            step={1}
            className="w-24 h-1 cursor-pointer [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:opacity-0 hover:[&_[role=slider]]:opacity-100"
            onValueChange={([value]) => setVolume(value / 100)}
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-[#b3b3b3] hover:text-white"
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
