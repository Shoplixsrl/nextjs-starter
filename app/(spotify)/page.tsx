"use client";

import { SpotifyHeader } from "@/components/spotify/spotify-header";
import { SpotifyCard, SpotifyRowCard } from "@/components/spotify/spotify-card";
import { playlists, albums, artists, userLibrary } from "@/lib/spotify-data";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function HomePage() {
  const greeting = getGreeting();

  // Featured playlists and albums for quick access
  const quickPlayItems = [
    ...playlists.slice(0, 3),
    ...albums.slice(0, 3),
  ];

  return (
    <div className="min-h-full">
      {/* Header with gradient background */}
      <div
        className="sticky top-0 z-10"
        style={{
          background: "linear-gradient(to bottom, #1e3a5f 0%, #121212 100%)",
        }}
      >
        <SpotifyHeader />
      </div>

      {/* Content */}
      <div
        className="px-6 pb-8"
        style={{
          background: "linear-gradient(to bottom, #1a3352 0%, #121212 300px)",
        }}
      >
        {/* Greeting */}
        <h1 className="text-3xl font-bold text-white mb-6 pt-2">{greeting}</h1>

        {/* Quick Play Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
          {quickPlayItems.map((item) => (
            <SpotifyRowCard
              key={item.id}
              item={item}
              type={"owner" in item ? "playlist" : "album"}
            />
          ))}
        </div>

        {/* Made For You */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white hover:underline cursor-pointer">
              Made For You
            </h2>
            <span className="text-sm font-bold text-[#b3b3b3] hover:underline cursor-pointer">
              Show all
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {playlists.filter((p) => !p.isPublic).slice(0, 6).map((playlist) => (
              <SpotifyCard key={playlist.id} item={playlist} type="playlist" />
            ))}
          </div>
        </section>

        {/* Recently Played */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white hover:underline cursor-pointer">
              Recently Played
            </h2>
            <span className="text-sm font-bold text-[#b3b3b3] hover:underline cursor-pointer">
              Show all
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {userLibrary.recentlyPlayed.slice(0, 6).map((item) => (
              <SpotifyCard
                key={item.id}
                item={item}
                type={"owner" in item ? "playlist" : "album"}
              />
            ))}
          </div>
        </section>

        {/* Popular Playlists */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white hover:underline cursor-pointer">
              Popular Playlists
            </h2>
            <span className="text-sm font-bold text-[#b3b3b3] hover:underline cursor-pointer">
              Show all
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {playlists.filter((p) => p.isPublic).slice(0, 6).map((playlist) => (
              <SpotifyCard key={playlist.id} item={playlist} type="playlist" />
            ))}
          </div>
        </section>

        {/* Popular Artists */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white hover:underline cursor-pointer">
              Popular Artists
            </h2>
            <span className="text-sm font-bold text-[#b3b3b3] hover:underline cursor-pointer">
              Show all
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {artists.slice(0, 6).map((artist) => (
              <SpotifyCard key={artist.id} item={artist} type="artist" />
            ))}
          </div>
        </section>

        {/* New Releases */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white hover:underline cursor-pointer">
              New Releases
            </h2>
            <span className="text-sm font-bold text-[#b3b3b3] hover:underline cursor-pointer">
              Show all
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {albums.slice(0, 6).map((album) => (
              <SpotifyCard key={album.id} item={album} type="album" />
            ))}
          </div>
        </section>

        {/* Trending Now */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white hover:underline cursor-pointer">
              Trending Now
            </h2>
            <span className="text-sm font-bold text-[#b3b3b3] hover:underline cursor-pointer">
              Show all
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {[...playlists].reverse().slice(0, 6).map((playlist) => (
              <SpotifyCard key={playlist.id} item={playlist} type="playlist" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
