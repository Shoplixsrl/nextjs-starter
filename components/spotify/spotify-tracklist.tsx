"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePlayer } from "@/lib/player-context";
import { Track, formatNumber } from "@/lib/spotify-data";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  Heart,
  MoreHorizontal,
  Clock,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SpotifyTracklistProps {
  tracks: Track[];
  showAlbum?: boolean;
  showHeader?: boolean;
  showIndex?: boolean;
  showImage?: boolean;
  context?: {
    type: "playlist" | "album" | "artist" | "liked" | "search";
    id: string;
    name: string;
  };
}

export function SpotifyTracklist({
  tracks,
  showAlbum = true,
  showHeader = true,
  showIndex = true,
  showImage = true,
  context,
}: SpotifyTracklistProps) {
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayer();

  return (
    <div className="px-4">
      {/* Header */}
      {showHeader && (
        <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-[#b3b3b3] text-sm border-b border-[#282828] mb-4">
          <div className="text-center">#</div>
          <div>Title</div>
          {showAlbum && <div>Album</div>}
          <div className="flex justify-end">
            <Clock className="w-4 h-4" />
          </div>
        </div>
      )}

      {/* Tracks */}
      <div className="space-y-0.5">
        {tracks.map((track, index) => {
          const isCurrentTrack = currentTrack?.id === track.id;
          const isTrackPlaying = isCurrentTrack && isPlaying;

          const handlePlay = () => {
            if (isCurrentTrack) {
              togglePlay();
            } else {
              playTrack(track, context ? { ...context, tracks } : undefined);
            }
          };

          return (
            <div
              key={track.id}
              className={cn(
                "group grid gap-4 px-4 py-2 rounded-md transition-colors",
                showAlbum ? "grid-cols-[16px_4fr_2fr_1fr]" : "grid-cols-[16px_4fr_1fr]",
                "hover:bg-white/10",
                isCurrentTrack && "bg-white/10"
              )}
              onDoubleClick={handlePlay}
            >
              {/* Index / Play Button */}
              <div className="flex items-center justify-center">
                <span
                  className={cn(
                    "text-sm group-hover:hidden",
                    isCurrentTrack ? "text-[#1DB954]" : "text-[#b3b3b3]"
                  )}
                >
                  {showIndex ? index + 1 : ""}
                </span>
                <button
                  onClick={handlePlay}
                  className="hidden group-hover:flex items-center justify-center w-4 h-4"
                >
                  {isTrackPlaying ? (
                    <Pause className="w-4 h-4 text-white fill-white" />
                  ) : (
                    <Play className="w-4 h-4 text-white fill-white" />
                  )}
                </button>
                {isTrackPlaying && !showIndex && (
                  <div className="w-4 h-4 group-hover:hidden">
                    <svg className="w-4 h-4 text-[#1DB954]" viewBox="0 0 16 16">
                      <rect x="2" y="4" width="3" height="8" fill="currentColor" className="animate-pulse" />
                      <rect x="6.5" y="2" width="3" height="12" fill="currentColor" className="animate-pulse" style={{ animationDelay: "0.2s" }} />
                      <rect x="11" y="5" width="3" height="6" fill="currentColor" className="animate-pulse" style={{ animationDelay: "0.4s" }} />
                    </svg>
                  </div>
                )}
              </div>

              {/* Track Info */}
              <div className="flex items-center gap-3 min-w-0">
                {showImage && (
                  <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={track.image}
                      alt={track.title}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <p
                    className={cn(
                      "text-base truncate",
                      isCurrentTrack ? "text-[#1DB954]" : "text-white"
                    )}
                  >
                    {track.title}
                  </p>
                  <div className="flex items-center gap-1">
                    {track.explicit && (
                      <span className="bg-[#b3b3b3] text-[#121212] text-[9px] font-bold px-1.5 py-0.5 rounded-sm">
                        E
                      </span>
                    )}
                    <Link
                      href={`/artist/${track.artistId}`}
                      className="text-sm text-[#b3b3b3] hover:text-white hover:underline truncate"
                    >
                      {track.artist.name}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Album */}
              {showAlbum && (
                <div className="flex items-center min-w-0">
                  <Link
                    href={`/album/${track.albumId}`}
                    className="text-sm text-[#b3b3b3] hover:text-white hover:underline truncate"
                  >
                    {track.album.title}
                  </Link>
                </div>
              )}

              {/* Actions & Duration */}
              <div className="flex items-center justify-end gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-4 h-4 text-[#b3b3b3] hover:text-white opacity-0 group-hover:opacity-100"
                >
                  <Heart className="w-4 h-4" />
                </Button>
                <span className="text-sm text-[#b3b3b3] w-12 text-right">{track.duration}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-4 h-4 text-[#b3b3b3] hover:text-white opacity-0 group-hover:opacity-100"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-52 bg-[#282828] border-none text-white">
                    <DropdownMenuItem className="hover:bg-[#3e3e3e] focus:bg-[#3e3e3e] cursor-pointer">
                      Add to queue
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-[#3e3e3e]" />
                    <DropdownMenuItem className="hover:bg-[#3e3e3e] focus:bg-[#3e3e3e] cursor-pointer">
                      Go to artist
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-[#3e3e3e] focus:bg-[#3e3e3e] cursor-pointer">
                      Go to album
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-[#3e3e3e]" />
                    <DropdownMenuItem className="hover:bg-[#3e3e3e] focus:bg-[#3e3e3e] cursor-pointer">
                      Save to your Liked Songs
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-[#3e3e3e] focus:bg-[#3e3e3e] cursor-pointer">
                      Add to playlist
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-[#3e3e3e]" />
                    <DropdownMenuItem className="hover:bg-[#3e3e3e] focus:bg-[#3e3e3e] cursor-pointer">
                      Share
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Compact track row for search results
interface SpotifyTrackRowProps {
  track: Track;
  index?: number;
  context?: {
    type: "playlist" | "album" | "artist" | "liked" | "search";
    id: string;
    name: string;
    tracks?: Track[];
  };
}

export function SpotifyTrackRow({ track, index, context }: SpotifyTrackRowProps) {
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayer();

  const isCurrentTrack = currentTrack?.id === track.id;
  const isTrackPlaying = isCurrentTrack && isPlaying;

  const handlePlay = () => {
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack(track, context);
    }
  };

  return (
    <div
      className={cn(
        "group flex items-center gap-4 p-2 rounded-md transition-colors cursor-pointer",
        "hover:bg-white/10",
        isCurrentTrack && "bg-white/10"
      )}
      onClick={handlePlay}
    >
      {/* Image */}
      <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0">
        <Image
          src={track.image}
          alt={track.title}
          width={40}
          height={40}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          {isTrackPlaying ? (
            <Pause className="w-4 h-4 text-white fill-white" />
          ) : (
            <Play className="w-4 h-4 text-white fill-white" />
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-base truncate",
            isCurrentTrack ? "text-[#1DB954]" : "text-white"
          )}
        >
          {track.title}
        </p>
        <div className="flex items-center gap-1">
          {track.explicit && (
            <span className="bg-[#b3b3b3] text-[#121212] text-[9px] font-bold px-1.5 py-0.5 rounded-sm">
              E
            </span>
          )}
          <span className="text-sm text-[#b3b3b3] truncate">{track.artist.name}</span>
        </div>
      </div>

      {/* Duration */}
      <span className="text-sm text-[#b3b3b3]">{track.duration}</span>
    </div>
  );
}
