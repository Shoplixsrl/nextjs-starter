"use client";

import { SpotifyHeader } from "@/components/spotify/spotify-header";
import { SpotifyTracklist } from "@/components/spotify/spotify-tracklist";
import { usePlayer } from "@/lib/player-context";
import { userLibrary } from "@/lib/spotify-data";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  Shuffle,
  Heart,
  MoreHorizontal,
  Search,
  List,
  Download,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default function LikedSongsPage() {
  const { isPlaying, playingFrom, playTrack, togglePlay, isShuffled, toggleShuffle } = usePlayer();

  const likedSongs = userLibrary.likedSongs;
  const isCurrentPlaylist = playingFrom.type === "liked";
  const isPlaylistPlaying = isCurrentPlaylist && isPlaying;

  const handlePlay = () => {
    if (isCurrentPlaylist) {
      togglePlay();
    } else if (likedSongs.tracks.length > 0) {
      playTrack(likedSongs.tracks[0], {
        type: "liked",
        id: "liked-songs",
        name: "Liked Songs",
        tracks: likedSongs.tracks,
      });
    }
  };

  return (
    <div className="min-h-full">
      {/* Header with gradient background */}
      <div
        style={{
          background: "linear-gradient(to bottom, #5038a0 0%, #121212 100%)",
        }}
      >
        <SpotifyHeader transparent />

        {/* Playlist Info */}
        <div className="px-6 pb-6 flex items-end gap-6">
          {/* Cover Image */}
          <div className="w-56 h-56 shadow-2xl flex-shrink-0 bg-gradient-to-br from-[#450af5] to-[#8e8ee5] flex items-center justify-center rounded">
            <Heart className="w-20 h-20 text-white fill-white" />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-white">Playlist</span>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
              Liked Songs
            </h1>
            <div className="flex items-center gap-1 text-sm text-white mt-4">
              <span className="font-bold">User</span>
              <span className="text-[#b3b3b3]">•</span>
              <span className="text-[#b3b3b3]">{likedSongs.totalTracks} songs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div
        className="px-6 py-6"
        style={{
          background: "linear-gradient(to bottom, rgba(80, 56, 160, 0.2) 0%, #121212 100px)",
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
              <DropdownMenuSeparator className="bg-[#3e3e3e]" />
              <DropdownMenuItem className="hover:bg-[#3e3e3e] focus:bg-[#3e3e3e] cursor-pointer">
                Share
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
        tracks={likedSongs.tracks}
        context={{
          type: "liked",
          id: "liked-songs",
          name: "Liked Songs",
        }}
      />

      {/* Footer padding */}
      <div className="h-8" />
    </div>
  );
}
