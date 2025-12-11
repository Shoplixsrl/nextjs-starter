"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { SpotifyHeader } from "@/components/spotify/spotify-header";
import { SpotifyCard } from "@/components/spotify/spotify-card";
import { SpotifyTrackRow } from "@/components/spotify/spotify-tracklist";
import { categories, searchAll, Track } from "@/lib/spotify-data";
import { cn } from "@/lib/utils";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "artists" | "tracks" | "albums" | "playlists">("all");

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    return searchAll(searchQuery);
  }, [searchQuery]);

  const hasResults = searchResults && (
    searchResults.tracks.length > 0 ||
    searchResults.artists.length > 0 ||
    searchResults.albums.length > 0 ||
    searchResults.playlists.length > 0
  );

  const filters = [
    { key: "all", label: "All" },
    { key: "artists", label: "Artists" },
    { key: "tracks", label: "Songs" },
    { key: "albums", label: "Albums" },
    { key: "playlists", label: "Playlists" },
  ] as const;

  return (
    <div className="min-h-full bg-[#121212]">
      {/* Header */}
      <SpotifyHeader
        showSearch
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Content */}
      <div className="px-6 pb-8">
        {!searchQuery.trim() ? (
          /* Browse Categories */
          <>
            <h2 className="text-2xl font-bold text-white mb-6">Browse all</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/genre/${category.id}`}
                  className="relative aspect-square rounded-lg overflow-hidden group"
                  style={{ backgroundColor: category.color }}
                >
                  <h3 className="absolute top-4 left-4 text-2xl font-bold text-white z-10">
                    {category.name}
                  </h3>
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={200}
                    height={200}
                    className="absolute bottom-0 right-0 w-24 h-24 object-cover rotate-25 translate-x-4 translate-y-2 shadow-xl"
                  />
                </Link>
              ))}
            </div>
          </>
        ) : hasResults ? (
          /* Search Results */
          <>
            {/* Filter Pills */}
            <div className="flex gap-2 mb-6">
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                    activeFilter === filter.key
                      ? "bg-white text-black"
                      : "bg-[#232323] text-white hover:bg-[#2a2a2a]"
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Results */}
            <div className="space-y-8">
              {/* Top Result & Songs */}
              {(activeFilter === "all" || activeFilter === "tracks") && searchResults.tracks.length > 0 && (
                <div className={cn(
                  "grid gap-6",
                  activeFilter === "all" ? "grid-cols-[1fr_1fr] lg:grid-cols-[400px_1fr]" : "grid-cols-1"
                )}>
                  {/* Top Result */}
                  {activeFilter === "all" && searchResults.artists.length > 0 && (
                    <section>
                      <h2 className="text-2xl font-bold text-white mb-4">Top result</h2>
                      <Link
                        href={`/artist/${searchResults.artists[0].id}`}
                        className="block p-5 bg-[#181818] hover:bg-[#282828] rounded-lg transition-colors group"
                      >
                        <div className="w-24 h-24 rounded-full overflow-hidden mb-5 shadow-lg">
                          <Image
                            src={searchResults.artists[0].image}
                            alt={searchResults.artists[0].name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">
                          {searchResults.artists[0].name}
                        </h3>
                        <span className="inline-block px-3 py-1 bg-black/30 rounded-full text-xs font-bold text-white">
                          Artist
                        </span>
                      </Link>
                    </section>
                  )}

                  {/* Songs */}
                  <section className={activeFilter === "all" ? "" : "col-span-full"}>
                    <h2 className="text-2xl font-bold text-white mb-4">Songs</h2>
                    <div className="space-y-1">
                      {searchResults.tracks.slice(0, activeFilter === "all" ? 4 : 20).map((track) => (
                        <SpotifyTrackRow
                          key={track.id}
                          track={track}
                          context={{
                            type: "search",
                            id: searchQuery,
                            name: `Search: ${searchQuery}`,
                            tracks: searchResults.tracks,
                          }}
                        />
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {/* Artists */}
              {(activeFilter === "all" || activeFilter === "artists") && searchResults.artists.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Artists</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {searchResults.artists.slice(0, activeFilter === "all" ? 6 : 12).map((artist) => (
                      <SpotifyCard key={artist.id} item={artist} type="artist" />
                    ))}
                  </div>
                </section>
              )}

              {/* Albums */}
              {(activeFilter === "all" || activeFilter === "albums") && searchResults.albums.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Albums</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {searchResults.albums.slice(0, activeFilter === "all" ? 6 : 12).map((album) => (
                      <SpotifyCard key={album.id} item={album} type="album" />
                    ))}
                  </div>
                </section>
              )}

              {/* Playlists */}
              {(activeFilter === "all" || activeFilter === "playlists") && searchResults.playlists.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Playlists</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {searchResults.playlists.slice(0, activeFilter === "all" ? 6 : 12).map((playlist) => (
                      <SpotifyCard key={playlist.id} item={playlist} type="playlist" />
                    ))}
                  </div>
                </section>
              )}
            </div>
          </>
        ) : searchQuery.trim() ? (
          /* No Results */
          <div className="flex flex-col items-center justify-center py-20">
            <h2 className="text-2xl font-bold text-white mb-2">
              No results found for &quot;{searchQuery}&quot;
            </h2>
            <p className="text-[#b3b3b3]">
              Please make sure your words are spelled correctly, or use fewer or different keywords.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
