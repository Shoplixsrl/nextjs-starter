"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePlayer } from "@/lib/player-context";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { Playlist, Album, Artist } from "@/lib/spotify-data";

interface SpotifyCardProps {
  item: Playlist | Album | Artist;
  type: "playlist" | "album" | "artist";
}

export function SpotifyCard({ item, type }: SpotifyCardProps) {
  const { currentTrack, isPlaying, playingFrom, playPlaylist, playAlbum, togglePlay } = usePlayer();

  const isCurrentlyPlaying =
    (type === "playlist" && playingFrom.type === "playlist" && playingFrom.id === item.id) ||
    (type === "album" && playingFrom.type === "album" && playingFrom.id === item.id);

  const href =
    type === "playlist"
      ? `/playlist/${item.id}`
      : type === "album"
      ? `/album/${item.id}`
      : `/artist/${item.id}`;

  const title = type === "artist" ? (item as Artist).name : (item as Playlist | Album).title;
  const subtitle =
    type === "playlist"
      ? (item as Playlist).description || `By ${(item as Playlist).owner}`
      : type === "album"
      ? (item as Album).artist.name
      : `Artist`;
  const image = type === "artist" ? (item as Artist).image : (item as Playlist | Album).image;

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isCurrentlyPlaying) {
      togglePlay();
    } else if (type === "playlist") {
      playPlaylist(item as Playlist);
    } else if (type === "album") {
      playAlbum(item as Album);
    }
  };

  return (
    <Link
      href={href}
      className="group relative p-4 bg-[#181818] hover:bg-[#282828] rounded-md transition-all duration-300"
    >
      {/* Image */}
      <div className="relative mb-4">
        <div
          className={cn(
            "aspect-square rounded-md overflow-hidden shadow-lg",
            type === "artist" && "rounded-full"
          )}
        >
          <Image
            src={image}
            alt={title}
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Play Button */}
        {type !== "artist" && (
          <Button
            onClick={handlePlay}
            className={cn(
              "absolute right-2 bottom-2 w-12 h-12 rounded-full bg-[#1DB954] hover:bg-[#1ed760] hover:scale-105 shadow-xl transition-all duration-300",
              "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0",
              isCurrentlyPlaying && "opacity-100 translate-y-0"
            )}
          >
            {isCurrentlyPlaying && isPlaying ? (
              <Pause className="w-5 h-5 fill-black text-black" />
            ) : (
              <Play className="w-5 h-5 fill-black text-black ml-0.5" />
            )}
          </Button>
        )}
      </div>

      {/* Text */}
      <div>
        <h3 className="font-bold text-white text-base mb-1 truncate">{title}</h3>
        <p className="text-sm text-[#b3b3b3] line-clamp-2">{subtitle}</p>
      </div>
    </Link>
  );
}

// Smaller horizontal card for "Recently Played" sections
interface SpotifyRowCardProps {
  item: Playlist | Album;
  type: "playlist" | "album";
}

export function SpotifyRowCard({ item, type }: SpotifyRowCardProps) {
  const { isPlaying, playingFrom, playPlaylist, playAlbum, togglePlay } = usePlayer();

  const isCurrentlyPlaying =
    (type === "playlist" && playingFrom.type === "playlist" && playingFrom.id === item.id) ||
    (type === "album" && playingFrom.type === "album" && playingFrom.id === item.id);

  const href = type === "playlist" ? `/playlist/${item.id}` : `/album/${item.id}`;
  const title = (item as Playlist | Album).title;
  const image = (item as Playlist | Album).image;

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isCurrentlyPlaying) {
      togglePlay();
    } else if (type === "playlist") {
      playPlaylist(item as Playlist);
    } else if (type === "album") {
      playAlbum(item as Album);
    }
  };

  return (
    <Link
      href={href}
      className="group relative flex items-center bg-white/10 hover:bg-white/20 rounded overflow-hidden transition-all duration-300"
    >
      <div className="w-20 h-20 flex-shrink-0">
        <Image
          src={image}
          alt={title}
          width={80}
          height={80}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="flex-1 px-4 font-bold text-white text-sm truncate">{title}</span>
      <Button
        onClick={handlePlay}
        className={cn(
          "absolute right-2 w-12 h-12 rounded-full bg-[#1DB954] hover:bg-[#1ed760] hover:scale-105 shadow-xl transition-all duration-300",
          "opacity-0 group-hover:opacity-100",
          isCurrentlyPlaying && "opacity-100"
        )}
      >
        {isCurrentlyPlaying && isPlaying ? (
          <Pause className="w-5 h-5 fill-black text-black" />
        ) : (
          <Play className="w-5 h-5 fill-black text-black ml-0.5" />
        )}
      </Button>
    </Link>
  );
}
