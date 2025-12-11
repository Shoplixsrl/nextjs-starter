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
  ArrowLeft,
  List,
  Grid3X3,
  Pin,
} from "lucide-react";

interface LibraryItem {
  id: string;
  name: string;
  image: string;
  type: "liked" | "playlist" | "artist" | "album";
  owner?: string;
  artist?: string;
}

// Spotify Logo SVG Component
function SpotifyLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

export function SpotifySidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [libraryFilter, setLibraryFilter] = useState<"all" | "playlists" | "artists" | "albums">("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Search, label: "Cerca", href: "/search" },
  ];

  const libraryItems: LibraryItem[] = [
    {
      id: "liked-songs",
      name: "Brani che ti piacciono",
      image: "",
      type: "liked" as const,
    },
    ...userLibrary.playlists.map((p) => ({
      id: p.id,
      name: p.title,
      image: p.image,
      type: "playlist" as const,
      owner: p.owner,
    })),
    ...userLibrary.followedArtists.map((a) => ({
      id: a.id,
      name: a.name,
      image: a.image,
      type: "artist" as const,
    })),
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
        "flex flex-col h-full bg-black transition-all duration-300 gap-2 p-2",
        isCollapsed ? "w-[72px]" : "w-[340px]"
      )}
    >
      {/* Top Navigation Card */}
      <div className="bg-[#121212] rounded-lg">
        {/* Spotify Logo - Always visible */}
        <div className={cn(
          "flex items-center px-4 pt-4 pb-2",
          isCollapsed ? "justify-center" : "justify-start"
        )}>
          <Link href="/" className={cn(
            "flex items-center gap-2 text-white hover:opacity-80 transition-opacity",
            isCollapsed && "justify-center"
          )}>
            <SpotifyLogo className="w-8 h-8 flex-shrink-0" />
            {!isCollapsed && (
              <span className="font-bold text-xl tracking-tight">Spotify</span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="px-2 pb-4 space-y-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-5 px-3 py-3 rounded-md transition-colors group",
                  isActive
                    ? "text-white"
                    : "text-[#b3b3b3] hover:text-white",
                  isCollapsed && "justify-center px-0"
                )}
              >
                <item.icon className={cn(
                  "w-6 h-6 flex-shrink-0",
                  isActive && "fill-white"
                )} />
                {!isCollapsed && (
                  <span className={cn(
                    "font-semibold",
                    isActive && "font-bold"
                  )}>{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Library Section Card */}
      <div className="bg-[#121212] rounded-lg flex-1 flex flex-col min-h-0">
        {/* Library Header */}
        <div className={cn(
          "flex items-center justify-between p-4 pb-2",
          isCollapsed && "flex-col gap-2"
        )}>
          <button
            className={cn(
              "flex items-center gap-3 text-[#b3b3b3] hover:text-white transition-colors group",
              isCollapsed && "justify-center"
            )}
            onClick={() => isCollapsed && setIsCollapsed(false)}
          >
            <Library className="w-6 h-6 flex-shrink-0" />
            {!isCollapsed && <span className="font-bold">La tua libreria</span>}
          </button>

          <div className={cn(
            "flex items-center gap-2",
            isCollapsed && "flex-col"
          )}>
            {!isCollapsed && (
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-[#b3b3b3] hover:text-white hover:bg-[#1a1a1a] rounded-full"
                title="Crea playlist"
              >
                <Plus className="w-4 h-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "w-8 h-8 text-[#b3b3b3] hover:text-white hover:bg-[#1a1a1a] rounded-full",
                isCollapsed && "mt-2"
              )}
              onClick={() => setIsCollapsed(!isCollapsed)}
              title={isCollapsed ? "Espandi" : "Comprimi"}
            >
              {isCollapsed ? (
                <ArrowRight className="w-4 h-4" />
              ) : (
                <ArrowLeft className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Filter Pills - Only when expanded */}
        {!isCollapsed && (
          <div className="px-4 pb-2">
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              {[
                { key: "all", label: "Tutto" },
                { key: "playlists", label: "Playlist" },
                { key: "artists", label: "Artisti" },
                { key: "albums", label: "Album" },
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
          </div>
        )}

        {/* Search & View Toggle - Only when expanded */}
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
              <span className="text-sm">Recenti</span>
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
                      "aspect-square mb-2 rounded overflow-hidden bg-[#282828]",
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
                          unoptimized
                        />
                      )}
                    </div>
                    <p className="text-sm font-medium text-white truncate">{item.name}</p>
                    <p className="text-xs text-[#b3b3b3] capitalize">
                      {item.type === "liked" ? "Playlist" : item.type === "artist" ? "Artista" : item.type === "album" ? "Album" : "Playlist"}
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
                    isCollapsed && "justify-center px-0"
                  )}
                  title={isCollapsed ? item.name : undefined}
                >
                  <div className={cn(
                    "w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-[#282828]",
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
                        unoptimized
                      />
                    )}
                  </div>

                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{item.name}</p>
                      <p className="text-xs text-[#b3b3b3] truncate">
                        {item.type === "liked"
                          ? `Playlist • ${userLibrary.likedSongs.totalTracks} brani`
                          : item.type === "artist"
                          ? "Artista"
                          : item.type === "album"
                          ? `Album • ${item.artist}`
                          : `Playlist • ${item.owner || 'Sconosciuto'}`}
                      </p>
                    </div>
                  )}

                  {!isCollapsed && item.type === "liked" && (
                    <Pin className="w-4 h-4 text-[#1DB954] flex-shrink-0" />
                  )}
                </Link>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Install App - Only when expanded */}
      {!isCollapsed && (
        <div className="bg-[#121212] rounded-lg p-4">
          <button className="flex items-center gap-3 text-[#b3b3b3] hover:text-white transition-colors w-full">
            <div className="w-6 h-6 flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3v10.586l-3.293-3.293-1.414 1.414L12 16.414l4.707-4.707-1.414-1.414L12 13.586V3h-1.5zm-7.5 14V19h15v-2H4.5z"/>
              </svg>
            </div>
            <span className="text-sm font-medium">Installa app</span>
          </button>
        </div>
      )}
    </div>
  );
}
