"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { userLibrary } from "@/lib/spotify-data";
import {
  Home,
  Search,
  Library,
  Plus,
  Heart,
  ArrowRight,
  List,
  Grid3X3,
  Pin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface LibraryItem {
  id: string;
  name: string;
  image: string;
  type: "liked" | "playlist" | "artist" | "album";
  owner?: string;
  artist?: string;
}

export function SpotifySidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [libraryFilter, setLibraryFilter] = useState<"all" | "playlists" | "artists" | "albums">("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Search, label: "Search", href: "/search" },
  ];

  const libraryItems: LibraryItem[] = [
    // Liked Songs special card
    {
      id: "liked-songs",
      name: "Liked Songs",
      image: "",
      type: "liked" as const,
    },
    // User playlists
    ...userLibrary.playlists.map((p) => ({
      id: p.id,
      name: p.title,
      image: p.image,
      type: "playlist" as const,
      owner: p.owner,
    })),
    // Followed artists
    ...userLibrary.followedArtists.map((a) => ({
      id: a.id,
      name: a.name,
      image: a.image,
      type: "artist" as const,
    })),
    // Saved albums
    ...userLibrary.savedAlbums.map((a) => ({
      id: a.id,
      name: a.title,
      image: a.image,
      type: "album" as const,
      artist: a.artist.name,
    })),
  ];

  const filteredLibrary = libraryItems.filter((item) => {
    if (libraryFilter === "all") return true;
    if (libraryFilter === "playlists") return item.type === "playlist" || item.type === "liked";
    if (libraryFilter === "artists") return item.type === "artist";
    if (libraryFilter === "albums") return item.type === "album";
    return true;
  });

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-black transition-all duration-300",
        isCollapsed ? "w-[72px]" : "w-[340px]"
      )}
    >
      {/* Top Navigation */}
      <div className="p-2">
        <div className="bg-[#121212] rounded-lg p-4">
          {/* Spotify Logo */}
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-1 mb-6 px-2">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              <span className="text-white font-bold text-xl ml-1">Spotify</span>
            </Link>
          )}

          {/* Navigation */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-4 px-3 py-3 rounded-md transition-colors",
                    isActive
                      ? "text-white font-bold"
                      : "text-[#b3b3b3] hover:text-white"
                  )}
                >
                  <item.icon className={cn("w-6 h-6", isActive && "fill-current")} />
                  {!isCollapsed && <span className="text-base">{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Library Section */}
      <div className="flex-1 p-2 pt-0 min-h-0">
        <div className="bg-[#121212] rounded-lg h-full flex flex-col">
          {/* Library Header */}
          <div className="p-4 pb-2">
            <div className="flex items-center justify-between mb-4">
              <button
                className={cn(
                  "flex items-center gap-3 text-[#b3b3b3] hover:text-white transition-colors",
                  isCollapsed && "justify-center w-full"
                )}
              >
                <Library className="w-6 h-6" />
                {!isCollapsed && <span className="font-bold">Your Library</span>}
              </button>

              {!isCollapsed && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-[#b3b3b3] hover:text-white hover:bg-[#282828] rounded-full"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-[#b3b3b3] hover:text-white hover:bg-[#282828] rounded-full"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Filter Pills */}
            {!isCollapsed && (
              <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                {[
                  { key: "all", label: "All" },
                  { key: "playlists", label: "Playlists" },
                  { key: "artists", label: "Artists" },
                  { key: "albums", label: "Albums" },
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setLibraryFilter(filter.key as typeof libraryFilter)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                      libraryFilter === filter.key
                        ? "bg-white text-black"
                        : "bg-[#232323] text-white hover:bg-[#2a2a2a]"
                    )}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search & View Toggle */}
          {!isCollapsed && (
            <div className="px-4 py-2 flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                className="text-[#b3b3b3] hover:text-white hover:bg-transparent p-0 h-auto"
              >
                <Search className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-[#b3b3b3] hover:text-white hover:bg-transparent gap-1 p-0 h-auto"
                onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
              >
                <span className="text-sm">Recents</span>
                {viewMode === "list" ? (
                  <List className="w-4 h-4" />
                ) : (
                  <Grid3X3 className="w-4 h-4" />
                )}
              </Button>
            </div>
          )}

          {/* Library Items */}
          <ScrollArea className="flex-1 px-2">
            <div className={cn(
              "pb-4",
              viewMode === "grid" && !isCollapsed ? "grid grid-cols-2 gap-2 px-2" : "space-y-0.5"
            )}>
              {filteredLibrary.map((item) => {
                const href =
                  item.type === "liked"
                    ? "/collection/tracks"
                    : item.type === "playlist"
                    ? `/playlist/${item.id}`
                    : item.type === "artist"
                    ? `/artist/${item.id}`
                    : `/album/${item.id}`;

                if (viewMode === "grid" && !isCollapsed) {
                  return (
                    <Link
                      key={item.id}
                      href={href}
                      className="group p-2 rounded-md hover:bg-[#282828] transition-colors"
                    >
                      <div className={cn(
                        "aspect-square mb-2 rounded overflow-hidden",
                        item.type === "artist" && "rounded-full"
                      )}>
                        {item.type === "liked" ? (
                          <div className="w-full h-full bg-gradient-to-br from-[#450af5] to-[#c4efd9] flex items-center justify-center">
                            <Heart className="w-8 h-8 text-white fill-white" />
                          </div>
                        ) : (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={150}
                            height={150}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <p className="text-sm font-medium text-white truncate">{item.name}</p>
                      <p className="text-xs text-[#b3b3b3] capitalize">
                        {item.type === "liked" ? "Playlist" : item.type}
                      </p>
                    </Link>
                  );
                }

                return (
                  <Link
                    key={item.id}
                    href={href}
                    className={cn(
                      "flex items-center gap-3 p-2 rounded-md hover:bg-[#282828] transition-colors group",
                      isCollapsed && "justify-center"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded overflow-hidden flex-shrink-0",
                      item.type === "artist" && "rounded-full"
                    )}>
                      {item.type === "liked" ? (
                        <div className="w-full h-full bg-gradient-to-br from-[#450af5] to-[#c4efd9] flex items-center justify-center">
                          <Heart className="w-5 h-5 text-white fill-white" />
                        </div>
                      ) : (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {!isCollapsed && (
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{item.name}</p>
                        <p className="text-xs text-[#b3b3b3] truncate">
                          {item.type === "liked"
                            ? `Playlist • ${userLibrary.likedSongs.totalTracks} songs`
                            : item.type === "artist"
                            ? "Artist"
                            : item.type === "album"
                            ? `Album • ${item.artist}`
                            : `Playlist • ${item.owner || 'Unknown'}`}
                        </p>
                      </div>
                    )}

                    {!isCollapsed && item.type === "liked" && (
                      <Pin className="w-4 h-4 text-[#1DB954] opacity-0 group-hover:opacity-100" />
                    )}
                  </Link>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Collapse Toggle for collapsed state */}
      {isCollapsed && (
        <div className="p-2 pb-4">
          <Button
            variant="ghost"
            size="icon"
            className="w-full h-10 text-[#b3b3b3] hover:text-white hover:bg-[#282828] rounded-full"
            onClick={() => setIsCollapsed(false)}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
