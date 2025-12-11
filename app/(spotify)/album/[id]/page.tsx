"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SpotifyHeader } from "@/components/spotify/spotify-header";
import { SpotifyTracklist } from "@/components/spotify/spotify-tracklist";
import { SpotifyCard } from "@/components/spotify/spotify-card";
import { usePlayer } from "@/lib/player-context";
import { getAlbumById, getAlbumsByArtist, tracks as allTracks } from "@/lib/spotify-data";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  Shuffle,
  Heart,
  MoreHorizontal,
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

export default function AlbumPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const album = getAlbumById(id);
  const { isPlaying, playingFrom, playAlbum, togglePlay, isShuffled, toggleShuffle } = usePlayer();

  if (!album) {
    notFound();
  }

  const albumTracks = allTracks.filter((t) => t.albumId === album.id);
  const moreFromArtist = getAlbumsByArtist(album.artistId).filter((a) => a.id !== album.id);

  const isCurrentAlbum = playingFrom.type === "album" && playingFrom.id === album.id;
  const isAlbumPlaying = isCurrentAlbum && isPlaying;

  const handlePlay = () => {
    if (isCurrentAlbum) {
      togglePlay();
    } else {
      playAlbum(album);
    }
  };

  const year = new Date(album.releaseDate).getFullYear();

  return (
    <div className="min-h-full">
      {/* Header with gradient background */}
      <div
        style={{
          background: `linear-gradient(to bottom, ${album.color} 0%, #121212 100%)`,
        }}
      >
        <SpotifyHeader transparent />

        {/* Album Info */}
        <div className="px-6 pb-6 flex items-end gap-6">
          {/* Cover Image */}
          <div className="w-56 h-56 shadow-2xl flex-shrink-0">
            <Image
              src={album.image}
              alt={album.title}
              width={224}
              height={224}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-white capitalize">
              {album.type}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight line-clamp-2">
              {album.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-white mt-4">
              <Link href={`/artist/${album.artistId}`} className="flex items-center gap-2 hover:underline">
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <Image
                    src={album.artist.image}
                    alt={album.artist.name}
                    width={24}
                    height={24}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-bold">{album.artist.name}</span>
              </Link>
              <span className="text-[#b3b3b3]">•</span>
              <span className="text-[#b3b3b3]">{year}</span>
              <span className="text-[#b3b3b3]">•</span>
              <span className="text-[#b3b3b3]">
                {album.totalTracks} songs, {album.duration}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div
        className="px-6 py-6"
        style={{
          background: `linear-gradient(to bottom, ${album.color}33 0%, #121212 100px)`,
        }}
      >
        <div className="flex items-center gap-6">
          {/* Play Button */}
          <Button
            onClick={handlePlay}
            className="w-14 h-14 rounded-full bg-[#1DB954] hover:bg-[#1ed760] hover:scale-105 shadow-xl transition-all"
          >
            {isAlbumPlaying ? (
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
                Go to artist
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#3e3e3e] focus:bg-[#3e3e3e] cursor-pointer">
                Share
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Spacer */}
          <div className="flex-1" />

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
        tracks={albumTracks}
        showAlbum={false}
        showImage={false}
        context={{
          type: "album",
          id: album.id,
          name: album.title,
        }}
      />

      {/* Album Info */}
      <div className="px-6 py-8 border-t border-[#282828] mt-8">
        <p className="text-sm text-[#b3b3b3] mb-1">
          {new Date(album.releaseDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-xs text-[#b3b3b3]">
          © {year} {album.artist.name}
        </p>
      </div>

      {/* More from Artist */}
      {moreFromArtist.length > 0 && (
        <div className="px-6 pb-8">
          <div className="flex items-center justify-between mb-4">
            <Link
              href={`/artist/${album.artistId}`}
              className="text-2xl font-bold text-white hover:underline"
            >
              More by {album.artist.name}
            </Link>
            <Link
              href={`/artist/${album.artistId}/discography`}
              className="text-sm font-bold text-[#b3b3b3] hover:underline"
            >
              See discography
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {moreFromArtist.slice(0, 6).map((a) => (
              <SpotifyCard key={a.id} item={a} type="album" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
