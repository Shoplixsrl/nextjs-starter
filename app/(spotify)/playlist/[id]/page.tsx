"use client";

import { use } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SpotifyHeader } from "@/components/spotify/spotify-header";
import { SpotifyTracklist } from "@/components/spotify/spotify-tracklist";
import { usePlayer } from "@/lib/player-context";
import { getPlaylistById, formatNumber } from "@/lib/spotify-data";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  Shuffle,
  Heart,
  MoreHorizontal,
  Clock,
  Download,
  Search,
  List,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default function PlaylistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const playlist = getPlaylistById(id);
  const { isPlaying, playingFrom, playPlaylist, togglePlay, isShuffled, toggleShuffle } = usePlayer();

  if (!playlist) {
    notFound();
  }

  const isCurrentPlaylist = playingFrom.type === "playlist" && playingFrom.id === playlist.id;
  const isPlaylistPlaying = isCurrentPlaylist && isPlaying;

  const handlePlay = () => {
    if (isCurrentPlaylist) {
      togglePlay();
    } else {
      playPlaylist(playlist);
    }
  };

  return (
    <div className="min-h-full">
      {/* Header with gradient background */}
      <div
        style={{
          background: `linear-gradient(to bottom, ${playlist.color} 0%, #121212 100%)`,
        }}
      >
        <SpotifyHeader transparent />

        {/* Playlist Info */}
        <div className="px-6 pb-6 flex items-end gap-6">
          {/* Cover Image */}
          <div className="w-56 h-56 shadow-2xl flex-shrink-0">
            <Image
              src={playlist.image}
              alt={playlist.title}
              width={224}
              height={224}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-white">
              {playlist.isPublic ? "Public Playlist" : "Playlist"}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight line-clamp-2">
              {playlist.title}
            </h1>
            {playlist.description && (
              <p className="text-sm text-[#b3b3b3] mt-2 line-clamp-2">
                {playlist.description}
              </p>
            )}
            <div className="flex items-center gap-1 text-sm text-white mt-2">
              <span className="font-bold">{playlist.owner}</span>
              {playlist.followers > 0 && (
                <>
                  <span className="text-[#b3b3b3]">•</span>
                  <span className="text-[#b3b3b3]">
                    {formatNumber(playlist.followers)} likes
                  </span>
                </>
              )}
              <span className="text-[#b3b3b3]">•</span>
              <span className="text-[#b3b3b3]">
                {playlist.totalTracks} songs, {playlist.duration}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div
        className="px-6 py-6"
        style={{
          background: `linear-gradient(to bottom, ${playlist.color}33 0%, #121212 100px)`,
        }}
      >
        <div className="flex items-center gap-6">
          {/* Play Button */}
          <Button
            onClick={handlePlay}
            className="w-14 h-14 rounded-full bg-[#1DB954] hover:bg-[#1ed760] hover:scale-105 shadow-xl transition-all"
          >
            {isPlaylistPlaying ? (
              <Pause className="w-6 h-6 fill-black text-black" />
            ) : (
              <Play className="w-6 h-6 fill-black text-black ml-1" />
            )}
          </Button>

          {/* Shuffle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleShuffle}
            className={cn(
              "w-8 h-8",
              isShuffled ? "text-[#1DB954]" : "text-[#b3b3b3] hover:text-white"
            )}
          >
            <Shuffle className="w-6 h-6" />
          </Button>

          {/* Like */}
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-[#b3b3b3] hover:text-white"
          >
            <Heart className="w-6 h-6" />
          </Button>

          {/* Download */}
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-[#b3b3b3] hover:text-white"
          >
            <Download className="w-6 h-6" />
          </Button>

          {/* More */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-[#b3b3b3] hover:text-white"
              >
                <MoreHorizontal className="w-6 h-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-52 bg-[#282828] border-none text-white">
              <DropdownMenuItem className="hover:bg-[#3e3e3e] focus:bg-[#3e3e3e] cursor-pointer">
                Add to queue
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#3e3e3e] focus:bg-[#3e3e3e] cursor-pointer">
                Add to Your Library
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#3e3e3e]" />
              <DropdownMenuItem className="hover:bg-[#3e3e3e] focus:bg-[#3e3e3e] cursor-pointer">
                Share
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#3e3e3e] focus:bg-[#3e3e3e] cursor-pointer">
                Open in Desktop app
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Search */}
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-[#b3b3b3] hover:text-white"
          >
            <Search className="w-5 h-5" />
          </Button>

          {/* View Options */}
          <Button
            variant="ghost"
            className="text-[#b3b3b3] hover:text-white gap-2"
          >
            <span className="text-sm">List</span>
            <List className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Tracklist */}
      <SpotifyTracklist
        tracks={playlist.tracks}
        context={{
          type: "playlist",
          id: playlist.id,
          name: playlist.title,
        }}
      />

      {/* Footer padding */}
      <div className="h-8" />
    </div>
  );
}
