"use client";

import { use, useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SpotifyHeader } from "@/components/spotify/spotify-header";
import { SpotifyTracklist } from "@/components/spotify/spotify-tracklist";
import { SpotifyCard } from "@/components/spotify/spotify-card";
import { usePlayer } from "@/lib/player-context";
import {
  getArtistById,
  getAlbumsByArtist,
  getTracksByArtist,
  formatNumber,
  artists,
} from "@/lib/spotify-data";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  Shuffle,
  UserPlus,
  MoreHorizontal,
  Check,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default function ArtistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const artist = getArtistById(id);
  const { isPlaying, playingFrom, playTrack, togglePlay, isShuffled, toggleShuffle } = usePlayer();

  const [isFollowing, setIsFollowing] = useState(false);

  if (!artist) {
    notFound();
  }

  const artistTracks = getTracksByArtist(artist.id);
  const artistAlbums = getAlbumsByArtist(artist.id);
  const relatedArtists = artists.filter((a) => a.id !== artist.id).slice(0, 6);

  const isCurrentArtist = playingFrom.type === "artist" && playingFrom.id === artist.id;
  const isArtistPlaying = isCurrentArtist && isPlaying;

  const handlePlay = () => {
    if (isCurrentArtist) {
      togglePlay();
    } else if (artistTracks.length > 0) {
      playTrack(artistTracks[0], {
        type: "artist",
        id: artist.id,
        name: artist.name,
        tracks: artistTracks,
      });
    }
  };

  return (
    <div className="min-h-full">
      {/* Header with background image */}
      <div className="relative">
        {/* Background Image */}
        <div className="absolute inset-0 h-[400px] overflow-hidden">
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-[#121212]" />
        </div>

        <div className="relative">
          <SpotifyHeader transparent />

          {/* Artist Info */}
          <div className="px-6 pb-6 pt-32">
            {/* Verified Badge */}
            {artist.verified && (
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-[#3d91f4] rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-white">Verified Artist</span>
              </div>
            )}

            {/* Name */}
            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight mb-6">
              {artist.name}
            </h1>

            {/* Monthly Listeners */}
            <p className="text-base text-white">
              {formatNumber(artist.monthlyListeners)} monthly listeners
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 py-6 bg-gradient-to-b from-black/30 to-[#121212]">
        <div className="flex items-center gap-6">
          {/* Play Button */}
          <Button
            onClick={handlePlay}
            className="w-14 h-14 rounded-full bg-[#1DB954] hover:bg-[#1ed760] hover:scale-105 shadow-xl transition-all"
          >
            {isArtistPlaying ? (
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

          {/* Follow Button */}
          <Button
            variant="outline"
            onClick={() => setIsFollowing(!isFollowing)}
            className={cn(
              "rounded-full px-6 font-bold text-sm h-8 transition-all",
              isFollowing
                ? "bg-transparent border-white/50 text-white hover:border-white hover:bg-transparent"
                : "bg-transparent border-white/50 text-white hover:border-white hover:bg-transparent hover:scale-105"
            )}
          >
            {isFollowing ? "Following" : "Follow"}
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
                Don&apos;t play this artist
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#3e3e3e] focus:bg-[#3e3e3e] cursor-pointer">
                Go to artist radio
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
        </div>
      </div>

      {/* Popular Tracks */}
      <div className="px-6 pb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Popular</h2>
        <SpotifyTracklist
          tracks={artistTracks.slice(0, 5)}
          showAlbum={true}
          showHeader={false}
          showIndex={true}
          context={{
            type: "artist",
            id: artist.id,
            name: artist.name,
          }}
        />
      </div>

      {/* Discography */}
      {artistAlbums.length > 0 && (
        <div className="px-6 pb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white hover:underline cursor-pointer">
              Discography
            </h2>
            <span className="text-sm font-bold text-[#b3b3b3] hover:underline cursor-pointer">
              Show all
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {artistAlbums.map((album) => (
              <SpotifyCard key={album.id} item={album} type="album" />
            ))}
          </div>
        </div>
      )}

      {/* Related Artists */}
      <div className="px-6 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white hover:underline cursor-pointer">
            Fans also like
          </h2>
          <span className="text-sm font-bold text-[#b3b3b3] hover:underline cursor-pointer">
            Show all
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {relatedArtists.map((a) => (
            <SpotifyCard key={a.id} item={a} type="artist" />
          ))}
        </div>
      </div>

      {/* About */}
      <div className="px-6 pb-8">
        <h2 className="text-2xl font-bold text-white mb-4">About</h2>
        <div className="relative max-w-2xl rounded-lg overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={artist.image}
              alt={artist.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          </div>
          <div className="relative p-6 pt-32">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-white font-bold">
                {formatNumber(artist.followers)} followers
              </span>
            </div>
            <p className="text-sm text-[#b3b3b3] line-clamp-4">{artist.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
